"use strict";
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
exports.firesTransaction = exports.firesbatch = exports.firesdocdel = exports.firesdocrt = exports.firesdocup = exports.rbcol = exports.rbdocdel = exports.rbdocup = exports.rbdoc = exports.isfiresdoc = exports.firesdoc = exports.firesColRef = exports.firesDocRef = exports.firesArrayUnion = exports.firesIncrementBy = void 0;
var firebase_1 = __importDefault(require("firebase"));
var firestore = firebase_1.default.firestore();
var realtime = firebase_1.default.database();
/** Relative increment */
function firesIncrementBy(number) {
    return firebase_1.default.firestore.FieldValue.increment(number);
}
exports.firesIncrementBy = firesIncrementBy;
/** Array Union */
function firesArrayUnion(element) {
    var _a;
    return (_a = firebase_1.default.firestore.FieldValue).arrayUnion.apply(_a, element);
}
exports.firesArrayUnion = firesArrayUnion;
/** Document Reference */
function firesDocRef(docpath) {
    return firebase_1.default
        .firestore()
        .doc(docpath);
}
exports.firesDocRef = firesDocRef;
/** Collection Reference */
function firesColRef(colpath) {
    return firebase_1.default
        .firestore()
        .collection(colpath);
}
exports.firesColRef = firesColRef;
/** Fetch the document */
function firesdoc(docpath) {
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
                    return [2 /*return*/, snap.data()];
                case 2:
                    err_1 = _a.sent();
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
function rbdoc(docpath) {
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
                    return [2 /*return*/, ref.val()];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.rbdoc = rbdoc;
/** Update the document (realtime database) */
function rbdocup(docpath, update) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, realtime.ref(docpath).set(update)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, rbdoc(docpath)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, Promise.resolve(result)];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.rbdocup = rbdocup;
/** Delete the document (realtime database) */
function rbdocdel(docpath) {
    return __awaiter(this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, realtime.ref(docpath).remove()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 2:
                    err_4 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.rbdocdel = rbdocdel;
/** Get the collection (realtime database) */
function rbcol(colpath) {
    return __awaiter(this, void 0, void 0, function () {
        var refs, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, realtime.ref(colpath).once("value")];
                case 1:
                    refs = _a.sent();
                    return [2 /*return*/, Object.values(refs.val())];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.rbcol = rbcol;
// export async
/** Update the document */
function firesdocup(docpath, update, 
/** if enabled, on document don't exist it will throw an error */
pure) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!pure) return [3 /*break*/, 2];
                    return [4 /*yield*/, firestore.doc(docpath).update(update)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, firestore.doc(docpath).set(update, { merge: true })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, firesdoc(docpath)];
                case 5:
                    result = _a.sent();
                    return [2 /*return*/, Promise.resolve(result)];
                case 6:
                    err_5 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.firesdocup = firesdocup;
/** Create the document */
function firesdocrt(docpath, create) {
    return __awaiter(this, void 0, void 0, function () {
        var snap, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, firestore.doc(docpath).get()];
                case 1:
                    snap = _a.sent();
                    if (snap.exists)
                        throw "";
                    return [4 /*yield*/, firestore.doc(docpath).set(create)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve(create)];
                case 3:
                    err_6 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.firesdocrt = firesdocrt;
/** Delete the document */
function firesdocdel(docpath) {
    return __awaiter(this, void 0, void 0, function () {
        var err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firestore.doc(docpath).delete()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 2:
                    err_7 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firesdocdel = firesdocdel;
/** Batch firestore function */
function firesbatch(args) {
    return __awaiter(this, void 0, void 0, function () {
        var batch_1, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    batch_1 = firestore.batch();
                    args.forEach(function (arg) {
                        switch (arg[1]) {
                            case "update":
                                if (arg[3]) {
                                    batch_1.update(firestore.doc(arg[0]), arg[2]);
                                }
                                else {
                                    batch_1.set(firestore.doc(arg[0]), arg[2]);
                                }
                                break;
                            case "delete":
                                batch_1.delete(firestore.doc(arg[0]));
                                break;
                        }
                    });
                    return [4 /*yield*/, batch_1.commit()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 2:
                    err_8 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firesbatch = firesbatch;
/** Transaction */
function firesTransaction(func) {
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
                                            case 0: return [4 /*yield*/, transaction.get(firebase_1.default.firestore().doc(docpath))];
                                            case 1:
                                                snap = _a.sent();
                                                return [2 /*return*/, snap.data()];
                                        }
                                    });
                                });
                            },
                            update: function (docpath, data, pure) {
                                if (pure) {
                                    transaction.update(firebase_1.default.firestore().doc(docpath), data);
                                }
                                else {
                                    transaction.set(firebase_1.default.firestore().doc(docpath), data, {
                                        merge: true,
                                    });
                                }
                            },
                            delete: function (docpath) {
                                transaction.delete(firebase_1.default.firestore().doc(docpath));
                            },
                        };
                        return [2 /*return*/, func(trans)];
                    });
                }); })];
        });
    });
}
exports.firesTransaction = firesTransaction;
//# sourceMappingURL=index.js.map