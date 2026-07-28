import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@/lib/supabase-server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customer } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
    }

    // 1. Generar un ID único para la orden (External Reference)
    const orderId = uuidv4();

    // 2. Configurar Mercado Pago
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! });
    const preference = new Preference(client);

    // Calcular el total
    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Determinar la URL base dinámica (Vercel o localhost)
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // 3. Crear la Preferencia en MP
    const prefResult = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'ARS',
          picture_url: item.image,
        })),
        payer: {
          name: customer?.firstName || 'Cliente',
          surname: customer?.lastName || 'SR',
          email: customer?.email || 'test@test.com',
        },
        external_reference: orderId, // Clave para enlazar con nuestra DB
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/pending`,
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/webhook/mercadopago`,
      }
    });

    // 4. Guardar la Orden como "Pendiente" en Supabase
    // NOTA: Para hacer el INSERT desde el servidor con Anon Key, necesitamos asegurar que la política RLS en Supabase permita INSERTS a anónimos.
    const supabase = createClient();
    
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_name: `${customer?.firstName} ${customer?.lastName}`,
        customer_email: customer?.email,
        customer_phone: customer?.phone,
        total_amount: totalAmount,
        status: 'pending',
        mp_preference_id: prefResult.id,
      });

    if (orderError) {
      console.error('Error al guardar la orden en Supabase:', orderError);
      // Podríamos fallar acá, pero priorizamos que pague.
    }

    // Guardar los items de la orden
    if (!orderError) {
      const orderItems = items.map((item: any) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price,
      }));
      
      await supabase.from('order_items').insert(orderItems);
    }

    // 5. Devolver el Link de Pago (init_point) al frontend
    return NextResponse.json({ 
      id: prefResult.id,
      init_point: prefResult.init_point,
      order_id: orderId 
    });

  } catch (error) {
    console.error('Error en checkout:', error);
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
  }
}
