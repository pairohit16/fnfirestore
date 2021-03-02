import * as admin from "firebase-admin";
import { PartialDeep } from "./custom-types";
const firestore = admin.firestore();
const realtime = admin.database();

/** Relative increment */
export function firesIncrementBy(number: number): number {
  return admin.firestore.FieldValue.increment(number) as any;
}

/** Array Union */
export function firesArrayUnion<Element>(element: Element[]): Element[] {
  return admin.firestore.FieldValue.arrayUnion(...element) as any;
}

/** Document Reference */
export function firesDocRef<Data>(docpath: string) {
  return admin
    .firestore()
    .doc(docpath) as admin.firestore.DocumentReference<Data>;
}

/** Collection Reference */
export function firesColRef<Data>(colpath: string) {
  return admin
    .firestore()
    .collection(colpath) as admin.firestore.CollectionReference<Data>;
}

/** Fetch the document */
export async function firesdoc<Data>(docpath: string) {
  try {
    const snap = await firestore.doc(docpath).get();
    if (!snap.exists)
      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });
    return snap.data() as Data;
  } catch (err) {
    return Promise.reject();
  }
}

/** check weather document exists */
export async function isfiresdoc(docpath: string) {
  try {
    const snap = await firestore.doc(docpath).get();
    return snap.exists;
  } catch {
    return false;
  }
}

/** Fetch the document (realtime database) */
export async function rbdoc<Data>(docpath: string) {
  try {
    const ref = await realtime.ref(docpath).once("value");
    if (!ref.exists())
      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });

    return ref.val() as Data;
  } catch (err) {
    return Promise.reject();
  }
}

/** Update the document (realtime database) */
export async function rbdocup<Data>(docpath: string, update: Data) {
  try {
    await realtime.ref(docpath).set(update);

    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
}

/** Delete the document (realtime database) */
export async function rbdocdel(docpath: string) {
  try {
    await realtime.ref(docpath).remove();

    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
}

/** Get the collection (realtime database) */
export async function rbcol<Data>(colpath: string) {
  try {
    const refs = await realtime.ref(colpath).once("value");
    return Object.values(refs.val()) as Data[];
  } catch (error) {
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
    await firestore.doc(docpath).create(create);
    return Promise.resolve(create);
  } catch (err) {
    return Promise.reject();
  }
}

/** Delete the document */
export async function firesdocdel(docpath: string) {
  try {
    await firestore.doc(docpath).delete();
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
}

export type FirescolWhere<Data> =
  | [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", any]
  | [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", any]
  | [
      keyof Data,
      "array-contains" | "in" | "not-in" | "array-contains-any",
      any[]
    ]
  | [
      keyof Data,
      "array-contains" | "in" | "not-in" | "array-contains-any",
      any[]
    ]
  | (
      | [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", any]
      | [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", any]
      | [
          keyof Data,
          "array-contains" | "in" | "not-in" | "array-contains-any",
          any[]
        ]
      | [
          keyof Data,
          "array-contains" | "in" | "not-in" | "array-contains-any",
          any[]
        ]
    )[];
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
    where?: FirescolWhere<Data>;
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

    const querySnap = (await base.get()) as admin.firestore.QuerySnapshot<Data>;
    if (querySnap.empty)
      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });

    return querySnap.docs.map((doc) => doc.data());
  } catch (err) {
    return Promise.reject();
  }
}

export type FiresbatchArgs<Data> = (
  | [docpath: string, operation: "create", data: Data]
  | [
      docpath: string,
      operation: "update",
      data: PartialDeep<Data>,
      pure?: boolean
    ]
  | [docpath: string, operation: "delete"]
)[];
/** Batch firestore function */
type BatchOP = {
  success: number;
  fail: number;
};
export async function firesbatch<Data>(
  args: FiresbatchArgs<Data>
): Promise<BatchOP> {
  try {
    const op: BatchOP = {
      success: 0,
      fail: 0,
    };
    const perBatch = async (
      arg: FiresbatchArgs<Data>,
      onOperationDone?: (result: boolean) => any
    ) => {
      const batch = firestore.batch();

      arg.forEach((arg) => {
        switch (arg[1]) {
          case "create":
            batch.create(firestore.doc(arg[0]), arg[2]);
            break;
          case "update":
            if (arg[3]) {
              batch.update(firestore.doc(arg[0]), arg[2]);
            } else {
              batch.set(firestore.doc(arg[0]), arg[2], { merge: true });
            }
            break;
          case "delete":
            batch.delete(firestore.doc(arg[0]));
            break;
        }
      });
      try {
        await batch.commit();
        onOperationDone && onOperationDone(true);
      } catch {
        onOperationDone && onOperationDone(false);
      }
    };
    const FIRBASE_MAX_BATCH_DOC_COUNT = 500;

    if (args.length <= FIRBASE_MAX_BATCH_DOC_COUNT) {
      // max doc per batch is 500
      return new Promise(async (resolve) => {
        await perBatch(args, (result) => {
          result ? (op.success += args.length) : (op.fail += args.length);
          resolve(op);
        });
      });
    } else {
      // if docs are more than 500 then split them into arrays of 500 each and batch them
      const args500: FiresbatchArgs<Data>[] = [];
      const into = FIRBASE_MAX_BATCH_DOC_COUNT;

      let loops = Math.ceil(args.length / into);
      for (let i = 0; i < loops; i++) {
        args500.push(args.slice(i * into, i * into + into));
      }

      return await new Promise((resolve) => {
        let promises = args500.length;

        args500.forEach(async (arg) => {
          const docs = arg.length;

          await perBatch(arg, (result) => {
            result ? (op.success += docs) : (op.fail += docs);

            // all promises has been resolved
            promises--;
            if (promises === 0) {
              resolve(op);
            }
          });
        });
      });
    }
  } catch (err) {
    return Promise.reject();
  }
}
/** Fetch all docs at once */
export async function firesdocall<Data>(docpaths: string[]) {
  try {
    const docs = await firestore.getAll(...(docpaths.map(firesDocRef) as any));
    if (docs.length <= 0) {
      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });
    }

    return docs.map((d) => d.data()) as Data[];
  } catch (err) {
    return Promise.reject();
  }
}

export interface Transaction {
  get<Data>(docpath: string): Promise<Data>;
  update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean): void;
  create<Data>(docpath: string, data: Data): void;
  delete(docpath: string): void;
}
/** Transaction */
export async function firesTransaction(
  func: (transaction: Transaction) => unknown,
  maxAttempts = 3
) {
  return firestore.runTransaction(
    async (transaction) => {
      // my custom transaction
      const trans: Transaction = {
        async get<Data>(docpath: string) {
          const snap = await transaction.get(admin.firestore().doc(docpath));
          return snap.data() as Data;
        },

        update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean) {
          if (pure) {
            transaction.update(admin.firestore().doc(docpath), data);
          } else {
            transaction.set(admin.firestore().doc(docpath), data, {
              merge: true,
            });
          }
        },

        create<Data>(docpath: string, data: Data) {
          transaction.create(admin.firestore().doc(docpath), data);
        },

        delete(docpath: string) {
          transaction.delete(admin.firestore().doc(docpath));
        },
      };

      return func(trans);
    },
    { maxAttempts }
  );
}
