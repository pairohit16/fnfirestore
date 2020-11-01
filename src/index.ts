import * as admin from "firebase-admin";
const firestore = admin.firestore();

/** Relative increment */
export function firesIncrementBy(number: number): number {
  return admin.firestore.FieldValue.increment(number) as any;
}

/** Fetch the document */
export async function firesdoc<Data>(docpath: string) {
  try {
    const snap = await firestore.doc(docpath).get();
    if (!snap.exists)
      return Promise.reject({ code: 404, message: "Not Found!", nonexistent: true });
    return snap.data() as Data;
  } catch (err) {
    return Promise.reject();
  }
}

/** Update the document */
export async function firesdocup<Data>(
  docpath: string,
  update: Partial<Data>,
  /** if enabled, on document don't exist it will throw an error */
  pure = false
) {
  try {
    if (pure) {
      await firestore.doc(docpath).update(update);
    } else {
      await firestore.doc(docpath).set(update, { merge: true });
    }
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
}

/** Create the document */
export async function firesdocrt<Data>(docpath: string, create: Data) {
  try {
    await firestore.doc(docpath).create(create);
    return Promise.resolve(create);
  } catch (err) {
    return Promise.reject();
  }
}

/**
 * Query firestore collection
 * @param colpath firestore collection path
 * @param query querys to filter collections
 */
export async function firescol<Data>(
  colpath: string,
  query?: {
    limit?: number;
    offset?: number;
    orderBy?: [keyof Data, "desc" | "asc"];
    where?:
      | [keyof Data, "<" | "<=" | "==" | ">=" | ">", any]
      | [keyof Data, "array-contains" | "in" | "array-contains-any", any[]];
  }
) {
  try {
    var base: any = firestore.collection(colpath);
    if (query?.limit) base = base.limit(query.limit);
    if (query?.offset) base = base.offset(query.offset);
    if (query?.orderBy) base = base.orderBy(query.orderBy[0], query.orderBy[1]);
    if (query?.where) base = base.where(query.where[0], query.where[1], query.where[2]);

    const querySnap = (await base.get()) as admin.firestore.QuerySnapshot<Data>;
    if (querySnap.empty)
      return Promise.reject({ code: 404, message: "Not Found!", nonexistent: true });

    return querySnap.docs.map((doc) => doc.data());
  } catch (err) {
    return Promise.reject();
  }
}

/** Batch firestore function */
export async function firesbatch<Data>(
  args: (
    | [docpath: string, operation: "create", data: Data]
    | [docpath: string, operation: "update", data: Partial<Data>]
    | [docpath: string, operation: "set", data: Data]
    | [docpath: string, operation: "delete"]
  )[]
) {
  try {
    const batch = firestore.batch();
    args.forEach((arg) => {
      switch (arg[1]) {
        case "create":
          batch.create(firestore.doc(arg[0]), arg[2]);
          break;
        case "set":
          batch.set(firestore.doc(arg[0]), arg[2]);
          break;
        case "update":
          batch.update(firestore.doc(arg[0]), arg[2]);
          break;
        case "delete":
          batch.delete(firestore.doc(arg[0]));
          break;
      }
    });

    await batch.commit();
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
}

export function firesTransaction(func: (transaction: admin.firestore.Transaction) => unknown) {
  firestore.runTransaction(
    async (transaction) => {
      func(transaction);
    },
    { maxAttempts: 3 }
  );
}
