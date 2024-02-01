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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDataForDashBoard = void 0;
const functions_1 = require("@azure/functions");
const client_1 = require("@prisma/client");
function findDataForDashBoard(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            const data = yield request.json();
            const tipo = data.tipo;
            const anno = data.anno;
            let misurazioni;
            if (tipo === "aria") {
                misurazioni = yield prisma.misurazioniAria.findMany({
                    where: {
                        data: {
                            lte: new Date(`${anno}-12-31T23:59:59.999Z`),
                            gte: new Date(`${anno}-01-01T00:00:00.000Z`),
                        },
                    }
                });
                return {
                    status: 200,
                    jsonBody: {
                        "tipo": "aria",
                        "misurazioni": misurazioni
                    },
                };
            }
            else {
                const misurazioniAcqua = yield prisma.misurazioniAcqua.findMany({
                    where: {
                        data: {
                            lte: new Date(`${anno}-12-31T23:59:59.999Z`),
                            gte: new Date(`${anno}-01-01T00:00:00.000Z`),
                        },
                    }
                });
                return {
                    status: 200,
                    jsonBody: {
                        "tipo": "acqua",
                        "misurazioni": misurazioniAcqua
                    },
                };
            }
        }
        catch (error) {
            console.error('Errore durante l\'elaborazione della richiesta:', error);
            return { status: 500, body: 'Errore interno del server' };
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.findDataForDashBoard = findDataForDashBoard;
;
functions_1.app.http('findDataForDashBoard', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: findDataForDashBoard
});
//# sourceMappingURL=findDataForDashBoard.js.map