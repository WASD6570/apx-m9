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

  async pull(): Promise<void> {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push(): Promise<void> {
    await this.ref.set({ ...this.data }, { merge: true });
  }
  setData(data: {}): void {
    this.data = { ...this.data, ...data };
    return;
  }

  getData(): data {
    return this.data;
  }
}

export { ModelCommonClass };
export type { data };
