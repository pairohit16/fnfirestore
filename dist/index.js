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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.firescol = exports.firesdocup = exports.firesdoc = void 0;
var admin = __importStar(require("firebase-admin"));
var firestore = admin.firestore();
/**
 * Fetch the document
 */
function firesdoc(params, 
/** Triggers when document doesn't exists */
onFail) {
    return __awaiter(this, void 0, void 0, function () {
        var snap, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firestore.doc(params.docpath).get()];
                case 1:
                    snap = _a.sent();
                    if (!snap.exists)
                        onFail && onFail();
                    return [2 /*return*/, snap.data()];
                case 2:
                    err_1 = _a.sent();
                    onFail && onFail();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firesdoc = firesdoc;
/**
 * Update the document
 */
function firesdocup(params, 
/** Triggers when document doesn't exists */
onFail) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!params.forceCreate) return [3 /*break*/, 2];
                    return [4 /*yield*/, firestore.doc(params.docpath).set(params.update, { merge: !!params.merge ? params.merge : true })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, firestore.doc(params.docpath).update(params.update)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    !!onFail && onFail();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.firesdocup = firesdocup;
/**
 * Firestore collection
 */
function firescol(params, 
/** Triggers when collection doesn't exists */
onFail) {
    return __awaiter(this, void 0, void 0, function () {
        var colpath, query, base, querySnap, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    colpath = params.colpath, query = params.query;
                    base = firestore.collection(colpath);
                    if (query === null || query === void 0 ? void 0 : query.limit)
                        base = base.limit(query.limit);
                    if (query === null || query === void 0 ? void 0 : query.offset)
                        base = base.offset(query.offset);
                    if (query === null || query === void 0 ? void 0 : query.orderBy)
                        base = base.orderBy(query.orderBy[0], query.orderBy[1]);
                    if (query === null || query === void 0 ? void 0 : query.where)
                        base = base.where(query.where[0], query.where[1], query.where[2]);
                    return [4 /*yield*/, base.get()];
                case 1:
                    querySnap = (_a.sent());
                    if (querySnap.empty)
                        onFail && onFail();
                    return [2 /*return*/, querySnap.docs.map(function (doc) { return doc.data(); })];
                case 2:
                    err_3 = _a.sent();
                    onFail && onFail();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.firescol = firescol;
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
//# sourceMappingURL=index.js.map