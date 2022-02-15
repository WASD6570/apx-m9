type data = {
  email: string;
  id: string;
  code: number;
  created: Date;
  expires: Date;
  token: string;
};

class ModelCommonClass {
  data: any = {};
  collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  ref: FirebaseFirestore.DocumentReference;

  constructor() {}

  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push() {
    const setResult = await this.ref.set({ ...this.data }, { merge: true });
    return setResult;
  }
  setData(data: {}): void {
    this.data = { ...this.data, ...data };
    return;
  }

  getData() {
    return this.data;
  }
}

export { ModelCommonClass };
export type { data };
