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
    // Aquí iría la llamada a la API de MP (Preferences)
    console.log('Iniciando Mercado Pago para la orden', order.order_number);
    return { 
      success: true, 
      redirect_url: `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MOCK_PREF_${order.id}` 
    };
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
