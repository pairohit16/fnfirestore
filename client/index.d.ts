import firebase from "firebase";
import { PartialDeep } from "../custom-types";
/** Relative increment */
export declare function firesIncrementBy(number: number): number;
/** Array Union */
export declare function firesArrayUnion<Element>(element: Element[]): Element[];
/** Document Reference */
export declare function firesDocRef<Data>(docpath: string): firebase.firestore.DocumentReference<Data>;
/** Collection Reference */
export declare function firesColRef<Data>(colpath: string): firebase.firestore.CollectionReference<Data>;
/** Fetch the document */
export declare function firesdoc<Data>(docpath: string): Promise<Data>;
/** check weather document exists */
export declare function isfiresdoc<Data>(docpath: string): Promise<boolean>;
/** Fetch the document (realtime database) */
export declare function rbdoc<Data>(docpath: string): Promise<Data>;
/** Update the document (realtime database) */
export declare function rbdocup<Data>(docpath: string, update: Data): Promise<void>;
/** Get the collection (realtime database) */
export declare function rbcol<Data>(colpath: string): Promise<Data[]>;
/** Update the document */
export declare function firesdocup<Data>(docpath: string, update: PartialDeep<Data>, 
/** if enabled, on document don't exist it will throw an error */
pure?: boolean): Promise<void>;
/** Create the document */
export declare function firesdocrt<Data>(docpath: string, create: Data): Promise<Data>;
/** Delete the document */
export declare function firesdocdel(docpath: string): Promise<void>;
/** Batch firestore function */
export declare function firesbatch<Data>(args: ([
    docpath: string,
    operation: "update",
    data: PartialDeep<Data>,
    pure?: boolean
] | [docpath: string, operation: "delete"])[]): Promise<void>;
export interface Transaction {
    get<Data>(docpath: string): Promise<Data>;
    update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean): void;
    delete(docpath: string): void;
}
/** Transaction */
export declare function firesTransaction(func: (transaction: Transaction) => unknown): Promise<unknown>;
//# sourceMappingURL=index.d.ts.map