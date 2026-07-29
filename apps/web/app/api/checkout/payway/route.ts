import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
    }

    const orderId = uuidv4();
    const totalAmount = items.reduce((sum: number, item: any) => sum + (Number(item.price) * item.quantity), 0);

    // 1. Guardar la Orden como "Pendiente" en Supabase
    const supabase = await createClient();
    
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_name: `${customer?.firstName || ''} ${customer?.lastName || ''}`.trim() || 'Cliente',
        customer_email: customer?.email || 'test@test.com',
        customer_phone: customer?.phone || null,
        shipping_address: customer?.address ? `${customer.address}, ${customer.city || ''}, ${customer.zip || ''}` : null,
        total_ars: totalAmount,
        payment_method: 'payway',
        status: 'pending',
        payment_id: `PAYWAY_${orderId}`, // Usamos esto como referencia temporal
      });

    if (orderError) {
      console.error('Error al guardar la orden en Supabase:', orderError);
    }

    if (!orderError) {
      const orderItems = items.map((item: any) => ({
        order_id: orderId,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: Number(item.price),
        subtotal: Number(item.price) * item.quantity,
      }));
      await supabase.from('order_items').insert(orderItems);
    }

    // 2. Conectar con la API de Payway
    // Nota: La API de Sandbox de Payway para links de pago (Hosted Checkout) varía.
    // Aquí preparamos la estructura base. En un entorno real de Payway, 
    // enviarías una petición POST a https://api.decidir.com/api/v2/ con PAYWAY_PRIVATE_KEY.
    
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    
    // COMO ES MODO PRUEBA, simularemos la respuesta exitosa devolviendo directo a success
    // Esto te permite probar el flujo completo hasta que Payway habilite tu cuenta para Hosted Checkout.
    const mockPaywayRedirectUrl = `${protocol}://${host}/checkout/success?payway_order=${orderId}`;

    return NextResponse.json({ 
      id: `pw_${orderId}`,
      init_point: mockPaywayRedirectUrl,
      order_id: orderId 
    });

  } catch (error: any) {
    console.error('Error en checkout Payway:', error);
    return NextResponse.json({ error: error.message || 'Error al procesar el pago con Payway' }, { status: 500 });
  }
}
