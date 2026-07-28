import React from 'react';
import { createClient } from '@/lib/supabase-server';
import OrdersKanbanClient from './OrdersKanbanClient';

export default async function AdminOrders() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <OrdersKanbanClient initialOrders={orders || []} />
  );
}
