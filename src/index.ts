import * as admin from "firebase-admin";
import _ from "lodash";
import {PartialDeep} from "./custom-types";

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
/** Array Union */
export function firesArrayRemove<Element>(element: Element[]): Element[] {
  return admin.firestore.FieldValue.arrayRemove(...element) as any;
}

/** Document Reference */
export function firesDocRef<T = admin.firestore.DocumentReference>(docpath: string): T {
  return admin.firestore().doc(docpath) as any;
}

/** Collection Reference */
export function firesColRef<T = admin.firestore.CollectionReference>(colpath: string): T[] {
  return admin.firestore().collection(colpath) as any;
}

/** Fetch the document */
export async function firesdoc<Data>(docpath: string, debug?: boolean) {
  try {
    const snap = await firestore.doc(docpath).get();
    if (!snap.exists)
      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });

    if (debug) {
      console.log("firesdoc: " + JSON.stringify(snap.data(), null, 2));
    }

    return snap.data() as Data;
  } catch (err) {
    if (debug) {
      console.log({firesdoc: err});
    }

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
export async function rbdoc<Data>(docpath: string, debug?: boolean) {
  try {
    const ref = await realtime.ref(docpath).once("value");
    if (!ref.exists())
      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });

    if (debug) {
      console.log("rbdoc: " + JSON.stringify(ref.val(), null, 2));
    }

    return ref.val() as Data;
  } catch (err) {
    if (debug) {
      console.log({rbdoc: err});
    }

    return Promise.reject();
  }
}

/** Update the document (realtime database) */
export async function rbdocup<Data>(
  docpath: string,
  o:
    | {
        method: "set" | "update";
        data: Data;
      }
    | {
        method: "merge";
        data: Data;
        update: PartialDeep<Data>;
      },
  debug?: boolean,
) {
  try {
    if (o.method === "set") {
      await realtime.ref(docpath).set(o.data);
    } else if (o.method === "update") {
      await realtime.ref(docpath).update(o.data);
    } else if (o.method === "merge") {
      await realtime.ref(docpath).update(_.merge(o.data, o.update));
    }
    if (debug) {
      console.log("rbdocup: UPDATED");
    }

    return Promise.resolve();
  } catch (err) {
    if (debug) {
      console.log({rbdocup: err});
    }

    return Promise.reject();
  }
}

/** Delete the document (realtime database) */
export async function rbdocdel(docpath: string, debug?: boolean) {
  try {
    await realtime.ref(docpath).remove();

    if (debug) {
      console.log("rbdocdel: DELETED");
    }

    return Promise.resolve();
  } catch (err) {
    if (debug) {
      console.log({rbdocdel: err});
    }

    return Promise.reject();
  }
}

/** Get the collection (realtime database) */
export async function rbcol<Data>(colpath: string, debug?: boolean) {
  try {
    const refs = await realtime.ref(colpath).once("value");
    if (!refs.exists)
      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });

    if (debug) {
      console.log(
        "rbcol: KEYS_COUNT: " +
          Object.values(refs.val()).length +
          ", DATA: " +
          JSON.stringify(Object.values(refs.val()), null, 2),
      );
    }

    return Object.values(refs.val()) as Data[];
  } catch (err) {
    if (debug) {
      console.log({rbcol: err});
    }

    return Promise.reject();
  }
}

/** Update the document */
export async function firesdocup<Data>(
  docpath: string,
  update: PartialDeep<Data>,
  /** if enabled, on document don't exist it will throw an error */
  pure?: boolean,
  no_merge?: boolean,
  debug?: boolean,
) {
  try {
    if (pure) {
      await firestore.doc(docpath).update(update);
    } else {
      await firestore.doc(docpath).set(update, {merge: no_merge ? false : true});
    }

    if (debug) {
      console.log("firesdocup: " + pure ? "UPDATED" : "SET");
    }

    return Promise.resolve();
  } catch (err) {
    if (debug) {
      console.log({firesdocup: err});
    }

    return Promise.reject();
  }
}

/** Create the document */
export async function firesdocrt<Data>(docpath: string, create: Data, debug?: boolean) {
  try {
    await firestore.doc(docpath).create(create);

    if (debug) {
      console.log("firesdocrt: " + "CREATED, DATA: " + JSON.stringify(create, null, 2));
    }

    return Promise.resolve(create);
  } catch (err) {
    if (debug) {
      console.log({firesdocrt: err});
    }

    return Promise.reject();
  }
}

/** Delete the document */
export async function firesdocdel(docpath: string, debug?: boolean) {
  try {
    await firestore.doc(docpath).delete();

    if (debug) {
      console.log("firesdocdel: DELETED");
    }

    return Promise.resolve();
  } catch (err) {
    if (debug) {
      console.log({firesdocdel: err});
    }

    return Promise.reject();
  }
}

export type FirescolWhere<Data> =
  | [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", string | boolean | number]
  | [keyof Data, "array-contains" | "in" | "not-in" | "array-contains-any", (string | boolean | number)[]]
  | (
      | [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", string | boolean | number]
      | [
          keyof Data,
          "!=" | "==" | "array-contains" | "in" | "not-in" | "array-contains-any",
          (string | boolean | number)[],
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
    /**
     * Field values provider here must be same field value provided
     * in the orderBy query, otherwise firestore will throw error
     */
    startAfter?: any;
    startAt?: any;
    endAt?: any;
    endBefore?: any;
    limit?: number;
    offset?: number;
    orderBy?: [keyof Data, "desc" | "asc"] | [keyof Data];
    /** Beware if you are using startAfter or startAt or endAt or endBefore,
     * don't use where otherwise firebase will throw error!
     *
     * Also if multiple field in where clause is also not allowed !
     * You can use multiple where with single field! */
    where?: FirescolWhere<Data>;
    dontThrowOnEmpty?: boolean;
  },
  debug?: boolean,
) {
  try {
    var base: any = firestore.collection(colpath);
    if (query?.limit) base = base.limit(query.limit);
    if (query?.offset) base = base.offset(query.offset);
    if (query?.orderBy) {
      if (query.orderBy[1]) {
        base = base.orderBy(query.orderBy[0], query.orderBy[1]);
      } else {
        base = base.orderBy(query.orderBy[0]);
      }
    }

    if (query?.startAfter) base = base.startAfter(query.startAfter);
    if (query?.startAt) base = base.startAt(query.startAt);
    if (query?.endBefore) base = base.endBefore(query.endBefore);
    if (query?.endAt) base = base.endAt(query.endAt);

    if (query?.where) {
      if (Array.isArray(query.where[0])) {
        query.where.forEach((_where: any) => {
          if (!_where[0]) return;
          base = base.where(_where[0], _where[1], _where[2]);
        });
      } else {
        base = base.where(query.where[0], query.where[1], query.where[2]);
      }
    }

    const querySnap = (await base.get()) as admin.firestore.QuerySnapshot<Data>;
    if (querySnap.empty) {
      if (query.dontThrowOnEmpty) return [];

      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });
    }

    if (debug) {
      console.log(
        "firescol: LENGTH: " +
          querySnap.docs.map((doc) => doc.data()).length +
          ", DATA: " +
          JSON.stringify(
            querySnap.docs.map((doc) => doc.data()),
            null,
            2,
          ),
      );
    }

    return querySnap.docs.map((doc) => doc.data());
  } catch (err) {
    if (debug) {
      console.log({firescol: err});
    }

    return Promise.reject();
  }
}

export type FiresbatchArgs<Data> = (
  | [docpath: string, operation: "create", data: Data]
  | [docpath: string, operation: "update", data: PartialDeep<Data>, pure?: boolean, no_merge?: boolean]
  | [docpath: string, operation: "delete"]
)[];
/** Batch firestore function */
type BatchOP = {
  success: number;
  fail: number;
};
export async function firesbatch<Data>(args: FiresbatchArgs<Data>, debug?: boolean): Promise<BatchOP> {
  try {
    const op: BatchOP = {
      success: 0,
      fail: 0,
    };
    const perBatch = async (arg: FiresbatchArgs<Data>, onOperationDone?: (result: boolean) => any) => {
      const batch = firestore.batch();

      arg.forEach((arg) => {
        switch (arg[1]) {
          case "create":
            if (debug) {
              console.log("firesbatch: CREATE, DATA: " + JSON.stringify(arg[2], null, 2));
            }

            batch.create(firestore.doc(arg[0]), arg[2]);
            break;
          case "update":
            if (arg[3]) {
              if (debug) {
                console.log("firesbatch: UPDATED");
              }

              batch.update(firestore.doc(arg[0]), arg[2]);
            } else {
              if (debug) {
                console.log("firesbatch: SET");
              }

              batch.set(firestore.doc(arg[0]), arg[2], {merge: arg[4] ? false : true});
            }
            break;
          case "delete":
            if (debug) {
              console.log("firesbatch: DELETE");
            }

            batch.delete(firestore.doc(arg[0]));
            break;
        }
      });
      try {
        if (debug) {
          console.log("firesbatch: COMMITED");
        }

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

          if (debug) {
            console.log("firesbatch: RESULT" + JSON.stringify(op, null, 2));
          }

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

      if (debug) {
        console.log("firesbatch: " + args.length + "is split into " + loops);
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
              if (debug) {
                console.log("firesbatch: RESULT" + JSON.stringify(op, null, 2));
              }

              resolve(op);
            }
          });
        });
      });
    }
  } catch (err) {
    if (debug) {
      console.log({firesbatch: err});
    }

    return Promise.reject();
  }
}
/** Fetch all docs at once */
export async function firesdocall<Data>(docpaths: string[], debug?: boolean) {
  try {
    const docs = await firestore.getAll(...(docpaths.map(firesDocRef) as any));
    if (docs.length <= 0) {
      if (debug) {
        console.log("firesbatch: NO_DOC");
      }

      return Promise.reject({
        code: 404,
        message: "Not Found!",
        nonexistent: true,
      });
    }

    return docs.map((d) => d.data()) as Data[];
  } catch (err) {
    if (debug) {
      console.log({firesdocall: err});
    }

    return Promise.reject();
  }
}

export async function rbTransaction<Data>(
  docpath: string,
  value: (d: Data, merge: (d: Data, update: PartialDeep<Data>) => Data) => Data | void | null,
  onComplete?: (props: {error: any; committed: boolean; value: Data}) => Promise<any>,
) {
  return new Promise((resolve) => {
    realtime.ref(docpath).transaction(
      (_v) => {
        return value(_v, _.merge);
      },
      (error, committed, sp) => {
        if (onComplete) {
          onComplete({error, committed, value: sp.val()}).finally(() => {
            resolve(true);
          });
        } else resolve(true);
      },
    );
  });
}

export interface Transaction {
  get<Data>(docpath: string): Promise<Data>;
  getAll<Data>(docpaths: string[]): Promise<Data[]>;
  update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean, no_merge?: boolean): void;
  create<Data>(docpath: string, data: Data): void;
  delete(docpath: string): void;
}
/** Transaction */
export async function firesTransaction(
  func: (transaction: Transaction) => unknown,
  maxAttempts = 3,
  debug?: boolean,
) {
  return firestore.runTransaction(
    async (transaction) => {
      // my custom transaction
      const trans: Transaction = {
        async get<Data>(docpath: string) {
          const snap = await transaction.get(firesDocRef(docpath));
          // @ts-ignore
          if (!snap.exists)
            return Promise.reject({
              code: 404,
              message: "Not Found!",
              nonexistent: true,
            });

          if (debug) {
            // @ts-ignore
            console.log("firesTransaction: GET, DATA: " + JSON.stringify(snap.data(), null, 2));
          }

          // @ts-ignore
          return snap.data() as Data;
        },

        async getAll<Data>(docpaths: string[]) {
          const docs = await transaction.getAll(...docpaths.map((doc) => firesDocRef(doc)));

          if (docs.length <= 0) {
            if (debug) {
              console.log("firesTransaction: NO_DOC");
            }

            return Promise.reject({
              code: 404,
              message: "Not Found!",
              nonexistent: true,
            });
          }
          return docs.map((d) => d.data()) as Data[];
        },

        update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean, no_merge?: boolean) {
          if (pure) {
            if (debug) {
              console.log("firesTransaction: UPDATED");
            }

            transaction.update(firesDocRef(docpath), data);
          } else {
            if (debug) {
              console.log("firesTransaction: SET");
            }

            transaction.set(firesDocRef(docpath), data, {
              merge: no_merge ? false : true,
            });
          }
        },

        create<Data>(docpath: string, data: Data) {
          if (debug) {
            console.log("firesTransaction: CREATE, DATA: " + JSON.stringify(data, null, 2));
          }

          transaction.create(firesDocRef(docpath), data);
        },

        delete(docpath: string) {
          if (debug) {
            console.log("firesTransaction: DELETE");
          }

          transaction.delete(firesDocRef(docpath));
        },
      };

      return func(trans);
    },
    {maxAttempts},
  );
}
