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
exports.findDeviceByMatricola = void 0;
const functions_1 = require("@azure/functions");
const client_1 = require("@prisma/client");
function findDeviceByMatricola(request, context) {
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
            return {
                status: 200,
                jsonBody: {
                    dispositivo
                },
            };
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
exports.findDeviceByMatricola = findDeviceByMatricola;
;
functions_1.app.http('findDeviceByMatricola', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: findDeviceByMatricola
});
//# sourceMappingURL=findDeviceByMatricola.js.map