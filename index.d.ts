/** Fetch the document */
export declare function firesdoc<Data>(docpath: string): Promise<Data>;
/** Update the document */
export declare function firesdocup<Data>(docpath: string, update: Partial<Data>, 
/** if enabled, on document don't exist it will throw an error */
pure?: boolean): Promise<void>;
/** Create the document */
export declare function firesdocrt<Data>(docpath: string, create: Data): Promise<Data>;
/**
 * Query firestore collection
 * @param colpath firestore collection path
 * @param query querys to filter collections
 */
export declare function firescol<Data>(colpath: string, query?: {
    limit?: number;
    offset?: number;
    orderBy?: [keyof Data, "desc" | "asc"];
    where?: [keyof Data, "<" | "<=" | "==" | ">=" | ">", any] | [keyof Data, "array-contains" | "in" | "array-contains-any", any[]];
}): Promise<Data[]>;
/** Batch firestore function */
export declare function firesbatch<Data>(args: ([docpath: string, operation: "create", data: Data] | [docpath: string, operation: "update", data: Partial<Data>] | [docpath: string, operation: "set", data: Data] | [docpath: string, operation: "delete"])[]): Promise<void>;
//# sourceMappingURL=index.d.ts.map