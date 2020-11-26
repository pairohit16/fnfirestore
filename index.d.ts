import { PartialDeep } from "./custom-types";
/** Relative increment */
export declare function firesIncrementBy(number: number): number;
/** Array Union */
export declare function firesArrayUnion<Element>(element: Element[]): Element[];
/** Document Reference */
export declare function firesDocRef<Data>(docpath: string): FirebaseFirestore.DocumentReference<Data>;
/** Collection Reference */
export declare function firesColRef<Data>(colpath: string): FirebaseFirestore.CollectionReference<Data>;
/** Fetch the document */
export declare function firesdoc<Data>(docpath: string): Promise<Data>;
/** Update the document */
export declare function firesdocup<Data>(docpath: string, update: PartialDeep<Data>, 
/** if enabled, on document don't exist it will throw an error */
pure?: boolean): Promise<void>;
/** Create the document */
export declare function firesdocrt<Data>(docpath: string, create: Data): Promise<Data>;
export declare type FirescolWhere<Data> = [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", any] | [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", any] | [keyof Data, "array-contains" | "in" | "not-in" | "array-contains-any", any[]] | [keyof Data, "array-contains" | "in" | "not-in" | "array-contains-any", any[]] | ([keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", any] | [keyof Data, "<" | "<=" | "==" | ">=" | ">" | "!=", any] | [keyof Data, "array-contains" | "in" | "not-in" | "array-contains-any", any[]] | [keyof Data, "array-contains" | "in" | "not-in" | "array-contains-any", any[]])[];
/**
 * Query firestore collection
 * @param colpath firestore collection path
 * @param query querys to filter collections
 */
export declare function firescol<Data>(colpath: string, query?: {
    limit?: number;
    offset?: number;
    orderBy?: [keyof Data, "desc" | "asc"];
    where?: FirescolWhere<Data>;
}): Promise<Data[]>;
export declare type FiresbatchArgs<Data> = ([docpath: string, operation: "create", data: Data] | [docpath: string, operation: "update", data: PartialDeep<Data>, pure?: boolean] | [docpath: string, operation: "delete"])[];
/** Batch firestore function */
export declare function firesbatch<Data>(args: FiresbatchArgs<Data>): Promise<void>;
export interface Transaction {
    get<Data>(docpath: string): Promise<Data>;
    update<Data>(docpath: string, data: PartialDeep<Data>, pure?: boolean): void;
    create<Data>(docpath: string, data: Data): void;
    delete(docpath: string): void;
}
/** Transaction */
export declare function firesTransaction(func: (transaction: Transaction) => unknown): Promise<void>;
//# sourceMappingURL=index.d.ts.map