import React from 'react';
import { createClient } from '@/lib/supabase-server';
import DashboardClient from './DashboardClient';
import { Order, Product, ConfiguratorBuild, UserProfile } from '@/types';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 1. Fetch Orders (30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false });
    
  // 2. Fetch Customers
  const { count: customersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer');

  // 3. Fetch Low Stock Products
  const { data: lowStockProducts } = await supabase
    .from('products')
    .select('*')
    .lte('stock_quantity', 5) // O usar low_stock_threshold si es dinámico
    .order('stock_quantity', { ascending: true });

  // 4. Fetch Abandoned Carts / Builds
  const { count: abandonedCartsCount } = await supabase
    .from('configurator_builds')
    .select('*', { count: 'exact', head: true })
    .eq('is_completed', false);

  const typedOrders = (orders as Order[]) || [];
  const typedProducts = (lowStockProducts as Product[]) || [];

  // Calcular KPIs
  const ingresosTotales = typedOrders
    .filter(o => o.payment_status === 'approved' || o.status === 'confirmed' || o.status === 'shipped' || o.status === 'delivered')
    .reduce((sum, order) => sum + (order.total_ars || 0), 0);
    
  const kpis = {
    ingresos: ingresosTotales,
    pedidos: typedOrders.length,
    clientes: customersCount || 0,
    alertasStock: typedProducts.length,
    carritosAbandonados: abandonedCartsCount || 0
  };

  // Generar datos del gráfico (agrupado por día de los últimos 30 días)
  const chartDataMap = new Map();
  // Inicializar últimos 7 días por defecto para que no quede vacío si no hay ventas
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayStr = `${d.getDate()} ${d.toLocaleString('es', { month: 'short' }).replace('.', '')}`;
    chartDataMap.set(dayStr, 0);
  }

  typedOrders.forEach(order => {
    if (order.status !== 'cancelled' && order.status !== 'refunded') {
      const d = new Date(order.created_at);
      const dayStr = `${d.getDate()} ${d.toLocaleString('es', { month: 'short' }).replace('.', '')}`;
      chartDataMap.set(dayStr, (chartDataMap.get(dayStr) || 0) + (order.total_ars || 0));
    }
  });

  const chartData = Array.from(chartDataMap.entries()).map(([name, ventas]) => ({
    name,
    ventas
  })).reverse(); // Orden cronológico (ya está al revés)
  
  // Re-ordenar correctamente
  const sortedChartData = Array.from(chartDataMap.entries()).map(([name, ventas]) => ({ name, ventas }));

  return (
    <DashboardClient 
      kpis={kpis} 
      chartData={sortedChartData} 
      recentOrders={typedOrders.slice(0, 5)} 
      lowStockProducts={typedProducts}
    />
  );
}
