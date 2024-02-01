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
exports.createDevice = void 0;
const functions_1 = require("@azure/functions");
const client_1 = require("@prisma/client");
function createDevice(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        var iothub = require('azure-iothub');
        var connectionString = process.env.IOT_HUB_CONNECTION_STRING;
        var registry = iothub.Registry.fromConnectionString(connectionString);
        try {
            const data = yield request.json();
            const matricola = data.matricola;
            const tipo = data.tipo;
            //console.log(tipo,"\n");
            if (tipo !== "acqua" && tipo !== "aria") {
                return { body: "il tipo non è disponibile!" };
            }
            const dispositivo = yield prisma.dispositivo.create({
                data: {
                    connectionString: "",
                    matricola: matricola,
                },
            });
            const device = (yield registry.create({
                deviceId: dispositivo.id
            })).responseBody;
            var cs = `HostName=gates.azure-devices.net;DeviceId=${dispositivo.id};SharedAccessKey=${device.authentication.symmetricKey.primaryKey}`;
            console.log(cs + "\n\n\n\n\n");
            console.log("prova");
            const updateDevice = yield prisma.dispositivo.update({
                where: {
                    id: dispositivo.id,
                },
                data: {
                    connectionString: cs,
                },
            });
            if (tipo === "acqua") {
                const acqua = yield prisma.acqua.create({
                    data: {
                        idDispositivo: updateDevice.id
                    }
                });
            }
            else {
                const aria = yield prisma.aria.create({
                    data: {
                        idDispositivo: updateDevice.id
                    }
                });
            }
            return { status: 200,
                jsonBody: {
                    //dispositivo
                    updateDevice
                },
            };
        }
        catch (error) {
            console.error('Errore durante l\'elaborazione della richiesta:', error);
            return { status: 500, body: error.message };
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.createDevice = createDevice;
;
functions_1.app.http('createDevice', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: createDevice
});
//# sourceMappingURL=createDevice.js.map