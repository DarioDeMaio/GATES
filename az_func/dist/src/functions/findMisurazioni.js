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
exports.findMisurazioni = void 0;
const functions_1 = require("@azure/functions");
const client_1 = require("@prisma/client");
function findMisurazioni(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        // let x;
        try {
            const data = yield request.json();
            const matricola = data.matricola;
            const dispositivo = yield prisma.dispositivo.findFirst({
                where: {
                    matricola: matricola
                },
                include: {
                    water: true,
                    aria: true
                }
            });
            //console.log(dispositivo.aria);
            if (dispositivo.aria !== null) {
                const aria = yield prisma.aria.findFirst({
                    where: {
                        idDispositivo: dispositivo.id
                    }
                });
                const misurazioni = yield prisma.misurazioniAria.findMany({
                    where: {
                        dispId: aria.idDispositivo
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
                console.log("acqua");
                const acqua = yield prisma.acqua.findFirst({
                    where: {
                        idDispositivo: dispositivo.id
                    }
                });
                const misurazioni = yield prisma.misurazioniAcqua.findMany({
                    where: {
                        dispId: acqua.idDispositivo
                    }
                });
                return {
                    status: 200,
                    jsonBody: {
                        "tipo": "acqua",
                        "misurazioni": misurazioni
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
exports.findMisurazioni = findMisurazioni;
;
functions_1.app.http('findMisurazioni', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: findMisurazioni
});
//# sourceMappingURL=findMisurazioni.js.map