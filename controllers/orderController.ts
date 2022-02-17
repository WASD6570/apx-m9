import { Order } from "models/order";
import { createPreference } from "lib/mercagopago";
import type { orderData } from "models/order";
import type { PaymentGetResponse } from "mercadopago/resources/payment";
import { sendPaymentStatusEmail } from "lib/sendgrid";
import { getUserData } from "controllers/userController";

function preferenceObjectCreator(item) {
  try {
    const mercadopagoFormatObject = {
      title: item.Name,
      description: "test description",
      picture_url: item.Images[0].thumbnails.large.url,
      categoty_id: "test",
      quantity: 1,
      currency: "ARS",
      unit_price: 50,
      //unit_price: item["Unit cost"],
      objectID: item.objectID,
    };
    return mercadopagoFormatObject;
  } catch (error) {
    console.log(
      error.message,
      "error en la funcion helper preferenceObjectCreator"
    );
  }
}

async function createPreferenceInMP(
  id: string,
  item
): Promise<{ link: string }> {
  const realItem = preferenceObjectCreator(item);
  const order = await Order.createNewOrder(id, realItem);
  const { body } = await createPreference(order);
  Order.updateOrder(order.external_reference, {
    mercadopagoResponse: body,
  } as orderData);
  return { link: body.init_point };
}

async function updateOrderInDb<OrderInfo extends PaymentGetResponse>(
  orderInfo: OrderInfo
): Promise<void> {
  const userId = await Order.getBuyer(orderInfo.body.external_reference);
  const { email } = await getUserData(userId);
  await Order.updateOrder(orderInfo.body.external_reference, {
    mercadopagoResponse: orderInfo.body,
  } as orderData);
  await sendPaymentStatusEmail(email, orderInfo.body.status);
}

export { createPreferenceInMP, updateOrderInDb };
