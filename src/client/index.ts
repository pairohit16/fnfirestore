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
  return firebase
    .firestore()
    .doc(docpath) as firebase.firestore.DocumentReference<Data>;
}

/** Collection Reference */
export function firesColRef<Data>(colpath: string) {
  return firebase
    .firestore()
    .collection(colpath) as firebase.firestore.CollectionReference<Data>;
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
export async function isfiresdoc<Data>(docpath: string) {
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
    const ref = await firebase.database().ref(docpath).once("value");
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
    await firebase.database().ref(docpath).set(update);

    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
}

/** Get the collection (realtime database) */
export async function rbcol<Data>(colpath: string) {
  try {
    const refs = await firebase.database().ref(colpath).once("value");
    return Object.values(refs.val()) as Data[];
  } catch (error) {
    return Promise.reject();
  }
}

// export async
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
/** Delete the document */
export async function firesdocdel(docpath: string) {
  try {
    await firestore.doc(docpath).delete();
    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
}
/** Batch firestore function */
export async function firesbatch<Data>(
  args: (
    | [
        docpath: string,
        operation: "update",
        data: PartialDeep<Data>,
        pure?: boolean
      ]
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

export interface Transaction {
  get<Data>(docpath: string): Promise<Data>;
  update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean): void;
  delete(docpath: string): void;
}

/** Transaction */
export async function firesTransaction(
  func: (transaction: Transaction) => unknown
) {
  return firestore.runTransaction(async (transaction) => {
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
          transaction.set(firebase.firestore().doc(docpath), data, {
            merge: true,
          });
        }
      },

      delete(docpath: string) {
        transaction.delete(firebase.firestore().doc(docpath));
      },
    };

    return func(trans);
  });
}
