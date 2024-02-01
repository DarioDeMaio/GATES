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
exports.findDevice = void 0;
const functions_1 = require("@azure/functions");
const client_1 = require("@prisma/client");
function findDevice(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        // var iothub = require('azure-iothub');
        // var connectionString = process.env.IOT_HUB_CONNECTION_STRING;
        // var registry = iothub.Registry.fromConnectionString(connectionString);
        // let x;
        try {
            const dispositivo = yield prisma.dispositivo.findMany({
                include: {
                    aria: true,
                    water: true
                }
            });
            return {
                status: 200,
                jsonBody: {
                    dispositivo,
                },
            };
        }
        catch (error) {
            context.log(error);
            return { status: 500, body: 'Errore interno del server' };
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.findDevice = findDevice;
;
functions_1.app.http('findDevice', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: findDevice
});
//# sourceMappingURL=findDevice.js.map