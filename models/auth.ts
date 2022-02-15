import { firestore } from "lib/firebase";
import { ModelCommonClass } from "./modelCommonClass";
import { User } from "./user";
import addMinutes from "date-fns/addMinutes";
import isAfter from "date-fns/isAfter";
import gen from "random-seed";
import { sendEmail } from "lib/sendgrid";
import { createToken } from "lib/jwt";
import type { data } from "models/modelCommonClass";

class Auth extends ModelCommonClass {
  data: data;
  static collection = firestore.collection("auth");

  constructor(id: string) {
    super();
    this.ref = Auth.collection.doc(id);
  }

  private static codeGenerator(): number {
    const random = new gen();
    const code: number = random.intBetween(10000, 99999);
    return code;
  }

  private static pairDatesGenerator(): { now: Date; twentyMinutesLater: Date } {
    const now = new Date();
    const twentyMinutesLater = addMinutes(now, 20);
    return { now, twentyMinutesLater };
  }

  static async createAuthToken(
    email: string,
    code: number
  ): Promise<string | null> {
    try {
      const result = await Auth.collection.where("email", "==", email).get();
      const first = result.docs[0];
      const newAuth = new Auth(first.id);
      newAuth.setData({ ...(first.data() as data) });
      const data = newAuth.getData();

      if (
        data.email === email &&
        data.code === code &&
        !isAfter(new Date(), data.expires)
      ) {
        const token = createToken(first.id);
        newAuth.setData({ ...(first.data() as data), token });
        await newAuth.push();
        return token;
      }
      if (
        data.email === email &&
        data.code === code &&
        isAfter(new Date(), data.expires)
      ) {
        return "code expired";
      }
      if (data.email !== email || data.code !== code) {
        return "email or code not valid";
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  static async findOrCreateAuth(email: string): Promise<data> {
    const result = await Auth.collection.where("email", "==", email).get();

    if (
      result.docs.length > 0 &&
      !isAfter(new Date(), result.docs[0].data().expires.toDate())
    ) {
      console.log("entre al primer if");

      const first = result.docs[0];
      const newAuth = new Auth(first.id);
      newAuth.setData({ ...(first.data() as data) });
      const data = newAuth.getData();
      sendEmail({ email: data.email, code: data.code });
      return data;
    }
    if (
      result.docs.length > 0 &&
      isAfter(new Date(), result.docs[0].data().expires.toDate())
    ) {
      console.log("entre al segundo if");

      const first = result.docs[0];
      const newAuth = new Auth(first.id);
      const { now, twentyMinutesLater } = Auth.pairDatesGenerator();
      newAuth.setData({
        ...(first.data() as data),
        code: Auth.codeGenerator(),
        created: now,
        expires: twentyMinutesLater,
      });
      const data = newAuth.getData();
      await newAuth.push();
      sendEmail({ email: data.email, code: data.code });
      return data;
    }
    if (result.docs.length === 0) {
      console.log("entre al tercer if");

      const newUserId = await User.build(email);
      const newAuth = new Auth(newUserId);
      const { now, twentyMinutesLater } = Auth.pairDatesGenerator();
      const code = Auth.codeGenerator();

      newAuth.setData({
        email: email,
        id: newUserId,
        code,
        created: now,
        expires: twentyMinutesLater,
        token: null,
      });
      const data = newAuth.getData();
      await newAuth.push();
      sendEmail({ email: data.email, code: data.code });
      return data;
    }
  }
}

export { Auth };
