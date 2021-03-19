import { PartialDeep } from "./custom-types";
/** Relative increment */
export declare function firesIncrementBy(number: number): number;
/** Array Union */
export declare function firesArrayUnion<Element>(element: Element[]): Element[];
/** Array Union */
export declare function firesArrayRemove<Element>(element: Element[]): Element[];
/** Document Reference */
export declare function firesDocRef<Data>(docpath: string): FirebaseFirestore.DocumentReference<Data>;
/** Collection Reference */
export declare function firesColRef<Data>(colpath: string): FirebaseFirestore.CollectionReference<Data>;
/** Fetch the document */
export declare function firesdoc<Data>(docpath: string, debug?: boolean): Promise<Data>;
/** check weather document exists */
export declare function isfiresdoc(docpath: string): Promise<boolean>;
/** Fetch the document (realtime database) */
export declare function rbdoc<Data>(docpath: string, debug?: boolean): Promise<Data>;
/** Update the document (realtime database) */
export declare function rbdocup<Data>(docpath: string, update: Data, debug?: boolean): Promise<void>;
/** Delete the document (realtime database) */
export declare function rbdocdel(docpath: string, debug?: boolean): Promise<void>;
/** Get the collection (realtime database) */
export declare function rbcol<Data>(colpath: string, debug?: boolean): Promise<Data[]>;
/** Update the document */
export declare function firesdocup<Data>(docpath: string, update: PartialDeep<Data>, 
/** if enabled, on document don't exist it will throw an error */
pure?: boolean, no_merge?: boolean, debug?: boolean): Promise<void>;
/** Create the document */
export declare function firesdocrt<Data>(docpath: string, create: Data, debug?: boolean): Promise<Data>;
/** Delete the document */
export declare function firesdocdel(docpath: string, debug?: boolean): Promise<void>;
export declare type FirescolWhere<Data> = [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", string | boolean | number] | [keyof Data, "array-contains" | "in" | "not-in" | "array-contains-any", (string | boolean | number)[]] | ([keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", string | boolean | number] | [keyof Data, "array-contains" | "in" | "not-in" | "array-contains-any", (string | boolean | number)[]])[];
/**
 * Query firestore collection
 * @param colpath firestore collection path
 * @param query querys to filter collections
 */
export declare function firescol<Data>(colpath: string, query?: {
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
}, debug?: boolean): Promise<Data[]>;
export declare type FiresbatchArgs<Data> = ([docpath: string, operation: "create", data: Data] | [docpath: string, operation: "update", data: PartialDeep<Data>, pure?: boolean, no_merge?: boolean] | [docpath: string, operation: "delete"])[];
/** Batch firestore function */
declare type BatchOP = {
    success: number;
    fail: number;
};
export declare function firesbatch<Data>(args: FiresbatchArgs<Data>, debug?: boolean): Promise<BatchOP>;
/** Fetch all docs at once */
export declare function firesdocall<Data>(docpaths: string[], debug?: boolean): Promise<Data[]>;
export interface Transaction {
    get<Data>(docpath: string): Promise<Data>;
    getAll<Data>(docpaths: string[]): Promise<Data[]>;
    update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean, no_merge?: boolean): void;
    create<Data>(docpath: string, data: Data): void;
    delete(docpath: string): void;
}
/** Transaction */
export declare function firesTransaction(func: (transaction: Transaction) => unknown, maxAttempts?: number, debug?: boolean): Promise<unknown>;
export {};
//# sourceMappingURL=index.d.ts.map