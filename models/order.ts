import { ModelCommonClass } from "./modelCommonClass";
import { firestore } from "lib/firebase";

export type orderData = {
  items: any[];
  back_urls: {
    success: string;
    pending: string;
    failure: string;
  };
  external_reference: string;
  notification_url: string;
  mercadopagoResponse: any;
};

class Order extends ModelCommonClass {
  private static collection = firestore.collection("orders");
  data: orderData = {
    items: [],
    back_urls: {
      success: `https://apx-m10.vercel.app/payment`,
      pending: `https://apx-m10.vercel.app/payment`,
      failure: `https://apx-m10.vercel.app/payment`,
    },
    external_reference: "",
    notification_url: `${process.env.BASE_URL}/api/ipn/mercadopago`,
    mercadopagoResponse: {},
  };
  constructor(id: string) {
    super();
    this.ref = Order.collection.doc(id);
  }

  static async createNewOrder(id: string, items): Promise<orderData> {
    const ref = await Order.collection.add({ buyer: id });
    const newOrder = await ref.get();
    const order = new Order(newOrder.id);
    order.data.items.push(items);
    order.setData({
      ...order.data,
      external_reference: newOrder.id,
      mercadopagoResponse: { status: "pending" },
    });
    await order.push();
    return order.getData();
  }

  static async updateOrder<mp_preference extends orderData>(
    id: string,
    update: mp_preference
  ): Promise<void> {
    const order = new Order(id);
    await order.pull();
    order.setData(update);
    await order.push();
  }

  static async getBuyer(id: string): Promise<string> {
    const order = new Order(id);
    await order.pull();
    return order.getData().buyer;
  }

  static async getOrderData(orderId: string): Promise<orderData> {
    const order = new Order(orderId);
    await order.pull();
    return order.getData();
  }
}

export { Order };
