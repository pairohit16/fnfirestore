/**
 * Fetch the document
 */
export declare function firesdoc<Data>(params: {
    /** Document Path */
    docpath: string;
}, 
/** Triggers when document doesn't exists */
onFail?: Function): Promise<Data | undefined>;
/**
 * Update the document
 */
export declare function firesdocup<Data>(params: {
    /** Document path */
    docpath: string;
    /** Update field */
    update: Partial<Data>;
    /** If true document will be created even it doesn't exist */
    forceCreate?: boolean;
    /** Only applicable if forceCreate is true */
    merge?: boolean;
}, 
/** Triggers when document doesn't exists */
onFail?: Function): Promise<void>;
/**
 * Firestore collection
 */
export declare function firescol<Data>(params: {
    /** Collection path */
    colpath: string;
    /** Optional Query */
    query?: {
        /**Limit the number of document inside the collection*/
        limit?: number;
        /** Offset the document count inside the collection */
        offset?: number;
        orderBy?: [keyof Data, "desc" | "asc"];
        where?: [keyof Data, "<" | "<=" | "==" | ">=" | ">", any] | [keyof Data, "array-contains" | "in" | "array-contains-any", any[]];
    };
}, 
/** Triggers when collection doesn't exists */
onFail?: Function): Promise<Data[] | undefined>;
//# sourceMappingURL=index.d.ts.map