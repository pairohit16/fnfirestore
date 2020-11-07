import firebase from "firebase";
import { PartialDeep } from "../custom-types";
const firestore = firebase.firestore();

/** Relative increment */
export function firesIncrementBy(number: number): number {
  return firebase.firestore.FieldValue.increment(number) as any;
}

/** Array Union */
export function firesArrayUnion<Element>(element: Element[]): Element[] {
  return firebase.firestore.FieldValue.arrayUnion(...element) as any;
}

/** Document Reference */
export function firesDocRef<Data>(docpath: string) {
  return firebase.firestore().doc(docpath) as firebase.firestore.DocumentReference<Data>;
}

/** Collection Reference */
export function firesColRef<Data>(colpath: string) {
  return firebase.firestore().collection(colpath) as firebase.firestore.CollectionReference<Data>;
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
  update: PartialDeep<Data>,
  /** if enabled, on document don't exist it will throw an error */
  pure?: boolean
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
    const snap = await firestore.doc(docpath).get();
    if (snap.exists) throw "";

    await firestore.doc(docpath).set(create);
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
      | [keyof Data, "<" | "<=" | "==" | ">=" | ">", any]
      | [keyof Data, "array-contains" | "in" | "array-contains-any", any[]]
      | [keyof Data, "array-contains" | "in" | "array-contains-any", any[]]
      | (
          | [keyof Data, "<" | "<=" | "==" | ">=" | ">", any]
          | [keyof Data, "<" | "<=" | "==" | ">=" | ">", any]
          | [keyof Data, "array-contains" | "in" | "array-contains-any", any[]]
          | [keyof Data, "array-contains" | "in" | "array-contains-any", any[]]
        )[];
  }
) {
  try {
    var base: any = firestore.collection(colpath);
    if (query?.limit) base = base.limit(query.limit);
    if (query?.offset) base = base.offset(query.offset);
    if (query?.orderBy) base = base.orderBy(query.orderBy[0], query.orderBy[1]);
    if (query?.where) {
      if (Array.isArray(query.where[0])) {
        query.where.forEach((_where) => {
          if (!_where[0]) return;
          base = base.where(_where[0], _where[1], _where[2]);
        });
      } else {
        base = base.where(query.where[0], query.where[1], query.where[2]);
      }
    }

    const querySnap = (await base.get()) as firebase.firestore.QuerySnapshot<Data>;
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
    | [docpath: string, operation: "update", data: PartialDeep<Data>, pure?: boolean]
    | [docpath: string, operation: "delete"]
  )[]
) {
  try {
    const batch = firestore.batch();
    args.forEach((arg) => {
      switch (arg[1]) {
        case "update":
          if (arg[3]) {
            batch.update(firestore.doc(arg[0]), arg[2]);
          } else {
            batch.set(firestore.doc(arg[0]), arg[2]);
          }
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

interface Transaction {
  get<Data>(docpath: string): Promise<Data>;
  update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean): void;
  delete(docpath: string): void;
}

/** Transaction */
export async function firesTransaction(func: (transaction: Transaction) => unknown) {
  try {
    await firestore.runTransaction(async (transaction) => {
      // my custom transaction
      const trans: Transaction = {
        async get<Data>(docpath: string) {
          const snap = await transaction.get(firebase.firestore().doc(docpath));
          return snap.data() as Data;
        },

        update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean) {
          if (pure) {
            transaction.update(firebase.firestore().doc(docpath), data);
          } else {
            transaction.set(firebase.firestore().doc(docpath), data, { merge: true });
          }
        },

        delete(docpath: string) {
          transaction.delete(firebase.firestore().doc(docpath));
        },
      };

      return func(trans);
    });
  } catch (err) {
    throw { code: 404, message: "Failed, Please try again!" };
  }
}
