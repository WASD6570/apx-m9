import mercadopago from "mercadopago";
import { orderData } from "models/order";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function getMerchantOrder(id: string): Promise<any> {
  return await mercadopago.merchant_orders.get(id);
}

export async function createPreference(order: orderData) {
  const test = await mercadopago.preferences.create(order);
  return test;
}

export async function getPayment(paymentId: string): Promise<any> {
  return await mercadopago.payment.get(Number(paymentId));
}
