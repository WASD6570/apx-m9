import { firestore } from "lib/firebase";
import { ModelCommonClass } from "./modelCommonClass";

type userData = {
  email: string;
  adress: string[];
};

class User extends ModelCommonClass {
  private static collection = firestore.collection("user");
  data: userData = {
    email: null,
    adress: [],
  };

  constructor(id: string) {
    super();
    this.ref = User.collection.doc(id);
  }

  static async build(email: string): Promise<string> {
    const result = await User.collection.where("email", "==", email).get();
    if (result.docs.length > 0) {
      const firstId = result.docs[0].id;
      return firstId;
    } else {
      const ref = await User.collection.add({ email });
      const user = await ref.get();

      return user.id;
    }
  }

  static async getUserData(id: string): Promise<userData> {
    const user = new User(id);
    await user.pull();
    return user.getData() as userData;
  }

  static async updateUser(id: string, data: userData): Promise<userData> {
    const user = new User(id);
    await user.pull();
    user.setData(data);
    await user.push();
    return user.getData() as userData;
  }
}

export { User };
export type { userData };
