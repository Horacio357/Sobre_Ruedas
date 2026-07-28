import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    // Mercado Pago envía notificaciones por querystring a veces (data.id y type) o en el body.
    const url = new URL(req.url);
    const dataId = url.searchParams.get('data.id');
    const type = url.searchParams.get('type');
    
    // Fallback al body si no vienen por querystring
    let body;
    try {
      body = await req.json();
    } catch(e) {
      body = {};
    }

    const paymentId = dataId || body?.data?.id;
    const notificationType = type || body?.type;

    console.log(`[Webhook MP] Recibida notificación de tipo ${notificationType} con ID ${paymentId}`);

    if (notificationType === 'payment' && paymentId) {
      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! });
      const paymentClient = new Payment(client);
      
      // Obtener los detalles reales del pago en MP para evitar fraudes (Spoofing)
      const payment = await paymentClient.get({ id: paymentId });
      
      if (payment.status === 'approved') {
        // Obtenemos la referencia externa que pusimos al crear la orden (nuestro UUID)
        const orderId = payment.external_reference;
        
        if (orderId) {
          console.log(`[Webhook MP] Pago aprobado para la orden ${orderId}`);
          
          const supabase = createClient();
          // Actualizar el estado en Supabase usando nuestra Supabase Admin Key o Anon Key
          const { error } = await supabase
            .from('orders')
            .update({ 
              status: 'paid',
              payment_id: payment.id?.toString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', orderId);
            
          if (error) {
            console.error('[Webhook MP] Error al actualizar la base de datos:', error);
          } else {
            console.log(`[Webhook MP] Orden ${orderId} marcada como PAGADA con éxito.`);
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('[Webhook MP] Error fatal:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
