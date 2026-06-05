// ============================================================
// SOBRE RUEDAS — Payment Controller
// Orquestador de pasarelas de pago (Mercado Pago, PayPal, MODO, Nave, Payway)
// ============================================================

import { PaymentMethod, Order } from '@/types';

export interface PaymentInitResponse {
  success: boolean;
  redirect_url?: string;
  payment_id?: string;
  error?: string;
}

export class PaymentController {
  /**
   * Inicializa un pago dependiendo del método seleccionado
   */
  static async initializePayment(
    order: Order,
    method: PaymentMethod
  ): Promise<PaymentInitResponse> {
    switch (method) {
      case 'mercadopago':
        return await this.initMercadoPago(order);
      case 'paypal':
        return await this.initPayPal(order);
      case 'modo':
        return await this.initMODO(order);
      case 'nave':
        return await this.initNave(order);
      case 'payway':
        return await this.initPayway(order);
      default:
        return { success: false, error: 'Método de pago no soportado' };
    }
  }

  // ── IMPLEMENTACIONES (STUBS) ───────────────────────────────
  
  private static async initMercadoPago(order: Order): Promise<PaymentInitResponse> {
    console.log('Iniciando Mercado Pago para la orden', order.order_number);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      const payload = {
        orderId: order.id,
        items: order.items?.map(item => ({
          productId: item.product_id || item.id,
          name: item.product_name,
          quantity: item.quantity,
          unitPrice: item.unit_price_ars
        })) || [],
        buyer: {
          name: order.buyer_name,
          email: order.buyer_email,
          phone: order.buyer_phone,
          address: {
            street: order.shipping_address?.street,
            zip: order.shipping_address?.zip
          }
        },
        discountAmount: order.discount_amount || 0,
      };

      const response = await fetch(`${apiUrl}/api/payments/mercadopago/preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al crear preferencia de Mercado Pago');
      }

      const data = await response.json();
      
      return { 
        success: true, 
        redirect_url: data.init_point 
      };
    } catch (error: any) {
      console.error('[MP Init Error]', error);
      return {
        success: false,
        error: error.message
      }
    }
  }

  private static async initPayPal(order: Order): Promise<PaymentInitResponse> {
    // Aquí iría la llamada a la API de PayPal (Orders V2)
    console.log('Iniciando PayPal para la orden', order.order_number);
    return { 
      success: true, 
      redirect_url: `https://www.paypal.com/checkoutnow?token=MOCK_TOKEN_${order.id}` 
    };
  }

  private static async initMODO(order: Order): Promise<PaymentInitResponse> {
    // MODO suele usar un QR o un link de pago
    console.log('Iniciando MODO para la orden', order.order_number);
    return { 
      success: true, 
      redirect_url: `https://checkout.modo.com.ar/payment/MOCK_ID_${order.id}` 
    };
  }

  private static async initNave(order: Order): Promise<PaymentInitResponse> {
    // Pasarela Nave (Galicia)
    console.log('Iniciando Nave para la orden', order.order_number);
    return { 
      success: true, 
      redirect_url: `https://nave.com.ar/pay/MOCK_ID_${order.id}` 
    };
  }

  private static async initPayway(order: Order): Promise<PaymentInitResponse> {
    // Payway (Prisma)
    console.log('Iniciando Payway para la orden', order.order_number);
    return { 
      success: true, 
      redirect_url: `https://checkout.payway.com.ar/payment/MOCK_ID_${order.id}` 
    };
  }
}
