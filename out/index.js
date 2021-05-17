"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firesTransaction = exports.rbTransaction = exports.firesdocall = exports.firesbatch = exports.firescol = exports.firesdocdel = exports.firesdocrt = exports.firesdocup = exports.rbcol = exports.rbdocdel = exports.rbdocup = exports.rbdoc = exports.isfiresdoc = exports.firesdoc = exports.firesColRef = exports.firesDocRef = exports.firesArrayRemove = exports.firesArrayUnion = exports.firesIncrementBy = void 0;
var admin = __importStar(require("firebase-admin"));
var lodash_1 = __importDefault(require("lodash"));
var firestore = admin.firestore();
var realtime = admin.database();
/** Relative increment */
function firesIncrementBy(number) {
    return admin.firestore.FieldValue.increment(number);
}
exports.firesIncrementBy = firesIncrementBy;
/** Array Union */
function firesArrayUnion(element) {
    var _a;
    return (_a = admin.firestore.FieldValue).arrayUnion.apply(_a, element);
}
exports.firesArrayUnion = firesArrayUnion;
/** Array Union */
function firesArrayRemove(element) {
    var _a;
    return (_a = admin.firestore.FieldValue).arrayRemove.apply(_a, element);
}
exports.firesArrayRemove = firesArrayRemove;
/** Document Reference */
function firesDocRef(docpath) {
    return admin.firestore().doc(docpath);
}
exports.firesDocRef = firesDocRef;
/** Collection Reference */
function firesColRef(colpath) {
    return admin.firestore().collection(colpath);
}
exports.firesColRef = firesColRef;
/** Fetch the document */
function firesdoc(docpath, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var snap, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firestore.doc(docpath).get()];
                case 1:
                    snap = _a.sent();
                    if (!snap.exists)
                        return [2 /*return*/, Promise.reject({
                                code: 404,
                                message: "Not Found!",
                                nonexistent: true,
                            })];
                    if (debug) {
                        console.log("firesdoc: " + JSON.stringify(snap.data(), null, 2));
                    }
                    return [2 /*return*/, snap.data()];
                case 2:
                    err_1 = _a.sent();
                    if (debug) {
                        console.log({ firesdoc: err_1 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firesdoc = firesdoc;
/** check weather document exists */
function isfiresdoc(docpath) {
    return __awaiter(this, void 0, void 0, function () {
        var snap, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firestore.doc(docpath).get()];
                case 1:
                    snap = _b.sent();
                    return [2 /*return*/, snap.exists];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.isfiresdoc = isfiresdoc;
/** Fetch the document (realtime database) */
function rbdoc(docpath, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var ref, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, realtime.ref(docpath).once("value")];
                case 1:
                    ref = _a.sent();
                    if (!ref.exists())
                        return [2 /*return*/, Promise.reject({
                                code: 404,
                                message: "Not Found!",
                                nonexistent: true,
                            })];
                    if (debug) {
                        console.log("rbdoc: " + JSON.stringify(ref.val(), null, 2));
                    }
                    return [2 /*return*/, ref.val()];
                case 2:
                    err_2 = _a.sent();
                    if (debug) {
                        console.log({ rbdoc: err_2 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.rbdoc = rbdoc;
/** Update the document (realtime database) */
function rbdocup(docpath, o, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    if (!(o.method === "set")) return [3 /*break*/, 2];
                    return [4 /*yield*/, realtime.ref(docpath).set(o.data)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!(o.method === "update")) return [3 /*break*/, 4];
                    return [4 /*yield*/, realtime.ref(docpath).update(o.data)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    if (!(o.method === "merge")) return [3 /*break*/, 6];
                    return [4 /*yield*/, realtime.ref(docpath).update(lodash_1.default.merge(o.data, o.update))];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (debug) {
                        console.log("rbdocup: UPDATED");
                    }
                    return [2 /*return*/, Promise.resolve()];
                case 7:
                    err_3 = _a.sent();
                    if (debug) {
                        console.log({ rbdocup: err_3 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.rbdocup = rbdocup;
/** Delete the document (realtime database) */
function rbdocdel(docpath, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, realtime.ref(docpath).remove()];
                case 1:
                    _a.sent();
                    if (debug) {
                        console.log("rbdocdel: DELETED");
                    }
                    return [2 /*return*/, Promise.resolve()];
                case 2:
                    err_4 = _a.sent();
                    if (debug) {
                        console.log({ rbdocdel: err_4 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.rbdocdel = rbdocdel;
/** Get the collection (realtime database) */
function rbcol(colpath, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var refs, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, realtime.ref(colpath).once("value")];
                case 1:
                    refs = _a.sent();
                    if (!refs.exists)
                        return [2 /*return*/, Promise.reject({
                                code: 404,
                                message: "Not Found!",
                                nonexistent: true,
                            })];
                    if (debug) {
                        console.log("rbcol: KEYS_COUNT: " +
                            Object.values(refs.val()).length +
                            ", DATA: " +
                            JSON.stringify(Object.values(refs.val()), null, 2));
                    }
                    return [2 /*return*/, Object.values(refs.val())];
                case 2:
                    err_5 = _a.sent();
                    if (debug) {
                        console.log({ rbcol: err_5 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.rbcol = rbcol;
/** Update the document */
function firesdocup(docpath, update, 
/** if enabled, on document don't exist it will throw an error */
pure, no_merge, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!pure) return [3 /*break*/, 2];
                    return [4 /*yield*/, firestore.doc(docpath).update(update)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, firestore.doc(docpath).set(update, { merge: no_merge ? false : true })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (debug) {
                        console.log("firesdocup: " + pure ? "UPDATED" : "SET");
                    }
                    return [2 /*return*/, Promise.resolve()];
                case 5:
                    err_6 = _a.sent();
                    if (debug) {
                        console.log({ firesdocup: err_6 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.firesdocup = firesdocup;
/** Create the document */
function firesdocrt(docpath, create, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firestore.doc(docpath).create(create)];
                case 1:
                    _a.sent();
                    if (debug) {
                        console.log("firesdocrt: " + "CREATED, DATA: " + JSON.stringify(create, null, 2));
                    }
                    return [2 /*return*/, Promise.resolve(create)];
                case 2:
                    err_7 = _a.sent();
                    if (debug) {
                        console.log({ firesdocrt: err_7 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firesdocrt = firesdocrt;
/** Delete the document */
function firesdocdel(docpath, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firestore.doc(docpath).delete()];
                case 1:
                    _a.sent();
                    if (debug) {
                        console.log("firesdocdel: DELETED");
                    }
                    return [2 /*return*/, Promise.resolve()];
                case 2:
                    err_8 = _a.sent();
                    if (debug) {
                        console.log({ firesdocdel: err_8 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firesdocdel = firesdocdel;
/**
 * Query firestore collection
 * @param colpath firestore collection path
 * @param query querys to filter collections
 */
function firescol(colpath, query, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var base, querySnap, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    base = firestore.collection(colpath);
                    if (query === null || query === void 0 ? void 0 : query.limit)
                        base = base.limit(query.limit);
                    if (query === null || query === void 0 ? void 0 : query.offset)
                        base = base.offset(query.offset);
                    if (query === null || query === void 0 ? void 0 : query.orderBy) {
                        if (query.orderBy[1]) {
                            base = base.orderBy(query.orderBy[0], query.orderBy[1]);
                        }
                        else {
                            base = base.orderBy(query.orderBy[0]);
                        }
                    }
                    if (query === null || query === void 0 ? void 0 : query.startAfter)
                        base = base.startAfter(query.startAfter);
                    if (query === null || query === void 0 ? void 0 : query.startAt)
                        base = base.startAt(query.startAt);
                    if (query === null || query === void 0 ? void 0 : query.endBefore)
                        base = base.endBefore(query.endBefore);
                    if (query === null || query === void 0 ? void 0 : query.endAt)
                        base = base.endAt(query.endAt);
                    if (query === null || query === void 0 ? void 0 : query.where) {
                        if (Array.isArray(query.where[0])) {
                            query.where.forEach(function (_where) {
                                if (!_where[0])
                                    return;
                                base = base.where(_where[0], _where[1], _where[2]);
                            });
                        }
                        else {
                            base = base.where(query.where[0], query.where[1], query.where[2]);
                        }
                    }
                    return [4 /*yield*/, base.get()];
                case 1:
                    querySnap = (_a.sent());
                    if (querySnap.empty) {
                        if (query.dontThrowOnEmpty)
                            return [2 /*return*/, []];
                        return [2 /*return*/, Promise.reject({
                                code: 404,
                                message: "Not Found!",
                                nonexistent: true,
                            })];
                    }
                    if (debug) {
                        console.log("firescol: LENGTH: " +
                            querySnap.docs.map(function (doc) { return doc.data(); }).length +
                            ", DATA: " +
                            JSON.stringify(querySnap.docs.map(function (doc) { return doc.data(); }), null, 2));
                    }
                    return [2 /*return*/, querySnap.docs.map(function (doc) { return doc.data(); })];
                case 2:
                    err_9 = _a.sent();
                    if (debug) {
                        console.log({ firescol: err_9 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firescol = firescol;
function firesbatch(args, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var op_1, perBatch_1, FIRBASE_MAX_BATCH_DOC_COUNT, args500_1, into, loops, i, err_10;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    op_1 = {
                        success: 0,
                        fail: 0,
                    };
                    perBatch_1 = function (arg, onOperationDone) { return __awaiter(_this, void 0, void 0, function () {
                        var batch, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    batch = firestore.batch();
                                    arg.forEach(function (arg) {
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
                                                }
                                                else {
                                                    if (debug) {
                                                        console.log("firesbatch: SET");
                                                    }
                                                    batch.set(firestore.doc(arg[0]), arg[2], { merge: arg[4] ? false : true });
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
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    if (debug) {
                                        console.log("firesbatch: COMMITED");
                                    }
                                    return [4 /*yield*/, batch.commit()];
                                case 2:
                                    _b.sent();
                                    onOperationDone && onOperationDone(true);
                                    return [3 /*break*/, 4];
                                case 3:
                                    _a = _b.sent();
                                    onOperationDone && onOperationDone(false);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); };
                    FIRBASE_MAX_BATCH_DOC_COUNT = 500;
                    if (!(args.length <= FIRBASE_MAX_BATCH_DOC_COUNT)) return [3 /*break*/, 1];
                    // max doc per batch is 500
                    return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, perBatch_1(args, function (result) {
                                            result ? (op_1.success += args.length) : (op_1.fail += args.length);
                                            if (debug) {
                                                console.log("firesbatch: RESULT" + JSON.stringify(op_1, null, 2));
                                            }
                                            resolve(op_1);
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    args500_1 = [];
                    into = FIRBASE_MAX_BATCH_DOC_COUNT;
                    loops = Math.ceil(args.length / into);
                    for (i = 0; i < loops; i++) {
                        args500_1.push(args.slice(i * into, i * into + into));
                    }
                    if (debug) {
                        console.log("firesbatch: " + args.length + "is split into " + loops);
                    }
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var promises = args500_1.length;
                            args500_1.forEach(function (arg) { return __awaiter(_this, void 0, void 0, function () {
                                var docs;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            docs = arg.length;
                                            return [4 /*yield*/, perBatch_1(arg, function (result) {
                                                    result ? (op_1.success += docs) : (op_1.fail += docs);
                                                    // all promises has been resolved
                                                    promises--;
                                                    if (promises === 0) {
                                                        if (debug) {
                                                            console.log("firesbatch: RESULT" + JSON.stringify(op_1, null, 2));
                                                        }
                                                        resolve(op_1);
                                                    }
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_10 = _a.sent();
                    if (debug) {
                        console.log({ firesbatch: err_10 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.firesbatch = firesbatch;
/** Fetch all docs at once */
function firesdocall(docpaths, debug) {
    return __awaiter(this, void 0, void 0, function () {
        var docs, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firestore.getAll.apply(firestore, docpaths.map(firesDocRef))];
                case 1:
                    docs = _a.sent();
                    if (docs.length <= 0) {
                        if (debug) {
                            console.log("firesbatch: NO_DOC");
                        }
                        return [2 /*return*/, Promise.reject({
                                code: 404,
                                message: "Not Found!",
                                nonexistent: true,
                            })];
                    }
                    return [2 /*return*/, docs.map(function (d) { return d.data(); })];
                case 2:
                    err_11 = _a.sent();
                    if (debug) {
                        console.log({ firesdocall: err_11 });
                    }
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firesdocall = firesdocall;
function rbTransaction(docpath, value, onComplete) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    realtime.ref(docpath).transaction(function (_v) {
                        return value(_v, lodash_1.default.merge);
                    }, function (error, committed, sp) {
                        if (onComplete) {
                            onComplete({ error: error, committed: committed, value: sp.val() }).finally(function () {
                                resolve(true);
                            });
                        }
                        else
                            resolve(true);
                    });
                })];
        });
    });
}
exports.rbTransaction = rbTransaction;
/** Transaction */
function firesTransaction(func, maxAttempts, debug) {
    if (maxAttempts === void 0) { maxAttempts = 3; }
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, firestore.runTransaction(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                    var trans;
                    return __generator(this, function (_a) {
                        trans = {
                            get: function (docpath) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var snap;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, transaction.get(firesDocRef(docpath))];
                                            case 1:
                                                snap = _a.sent();
                                                // @ts-ignore
                                                if (!snap.exists)
                                                    return [2 /*return*/, Promise.reject({
                                                            code: 404,
                                                            message: "Not Found!",
                                                            nonexistent: true,
                                                        })];
                                                if (debug) {
                                                    // @ts-ignore
                                                    console.log("firesTransaction: GET, DATA: " + JSON.stringify(snap.data(), null, 2));
                                                }
                                                // @ts-ignore
                                                return [2 /*return*/, snap.data()];
                                        }
                                    });
                                });
                            },
                            getAll: function (docpaths) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var docs;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, transaction.getAll.apply(transaction, docpaths.map(function (doc) { return firesDocRef(doc); }))];
                                            case 1:
                                                docs = _a.sent();
                                                if (docs.length <= 0) {
                                                    if (debug) {
                                                        console.log("firesTransaction: NO_DOC");
                                                    }
                                                    return [2 /*return*/, Promise.reject({
                                                            code: 404,
                                                            message: "Not Found!",
                                                            nonexistent: true,
                                                        })];
                                                }
                                                return [2 /*return*/, docs.map(function (d) { return d.data(); })];
                                        }
                                    });
                                });
                            },
                            update: function (docpath, data, pure, no_merge) {
                                if (pure) {
                                    if (debug) {
                                        console.log("firesTransaction: UPDATED");
                                    }
                                    transaction.update(firesDocRef(docpath), data);
                                }
                                else {
                                    if (debug) {
                                        console.log("firesTransaction: SET");
                                    }
                                    transaction.set(firesDocRef(docpath), data, {
                                        merge: no_merge ? false : true,
                                    });
                                }
                            },
                            create: function (docpath, data) {
                                if (debug) {
                                    console.log("firesTransaction: CREATE, DATA: " + JSON.stringify(data, null, 2));
                                }
                                transaction.create(firesDocRef(docpath), data);
                            },
                            delete: function (docpath) {
                                if (debug) {
                                    console.log("firesTransaction: DELETE");
                                }
                                transaction.delete(firesDocRef(docpath));
                            },
                        };
                        return [2 /*return*/, func(trans)];
                    });
                }); }, { maxAttempts: maxAttempts })];
        });
    });
}
exports.firesTransaction = firesTransaction;
//# sourceMappingURL=index.js.map