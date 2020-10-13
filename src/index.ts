import * as admin from "firebase-admin";
import { QuerySnapshot } from "@google-cloud/firestore";
const firestore = admin.firestore();


/**
 * Fetch the document
 */
export async function firesdoc<Data>(params: {
  /** Document Path */
  docpath: string;
}, 
/** Triggers when document doesn't exists */
onFail?: Function) {
  try {
    const snap = await firestore.doc(params.docpath).get();
    if (!snap.exists) onFail && onFail();
    return snap.data() as Data;
  } catch (err) {
    onFail && onFail();
  }
}


/**
 * Update the document
 */
export async function firesdocup<Data>(params: {
  /** Document path */
  docpath: string, 
  /** Update field */
  update: Partial<Data>, 
  /** If true document will be created even it doesn't exist */
  forceCreate?: boolean, 
  /** Only applicable if forceCreate is true */
  merge?: boolean}, 
  /** Triggers when document doesn't exists */
  onFail?: Function) {
  try {
    if(params.forceCreate) {
      await firestore.doc(params.docpath).set(params.update, {merge: !!params.merge ? params.merge : true});
    }else {
      await firestore.doc(params.docpath).update(params.update);
    }
  } catch (err) {
    !!onFail && onFail()
  }
}

/**
 * Firestore collection operation
 */
export async function firescol<Data>(
  params: {
    /** Collection path */
    colpath: string,
    /** Optional Query */
    query?: {
      /**Limit the number of document inside the collection*/
      limit?: number;
      /** Offset the document count inside the collection */
      offset?: number;
      orderBy?: [keyof Data, "desc" | "asc"];
      where?:
        | [keyof Data, "<" | "<=" | "==" | ">=" | ">", any]
        | [keyof Data, "array-contains" | "in" | "array-contains-any", any[]];
    },
  },
    /** Triggers when collection doesn't exists */
  onFail?: Function
) {
  try {
    const {colpath, query} = params;
  
    var base: any = firestore.collection(colpath);
    if (query?.limit) base = base.limit(query.limit);
    if (query?.offset) base = base.offset(query.offset);
    if (query?.orderBy) base = base.orderBy(query.orderBy[0], query.orderBy[1]);
    if (query?.where) base = base.where(query.where[0], query.where[1], query.where[2]);
  
    const querySnap = (await base.get()) as QuerySnapshot<Data>;
    if (querySnap.empty) onFail && onFail();
  
    return querySnap.docs.map((doc) => doc.data());
  } catch (err) {
    onFail && onFail()
  }
}

// export async function firesbatch<T>(
//   args: (
//     | [docpath: string, operation: "create", data: T]
//     | [docpath: string, operation: "update", data: Partial<T>]
//     | [docpath: string, operation: "set", data: T]
//     | [docpath: string, operation: "delete"]
//   )[]
// ) {}

// firesbatch<{ id: string; name: string }>([
//   ["v1/user", "update", { id: "100", name: "Pai" }],
//   ["v1/collection", "set", { id: "", name: "" }],
// ]);
