import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var iothub = require('azure-iothub');
    var connectionString = process.env.IOT_HUB_CONNECTION_STRING;
    var registry = iothub.Registry.fromConnectionString(connectionString);

    try {
        const dispositivo = await prisma.dispositivo.findMany();
        // const device = registry.get("7");

        // context.log(`Dispositivo ottenuto con successo: ${JSON.stringify(device)}`);

        // const deviceKeys = await registry.getTwin(device.deviceId);
        // const deviceConnectionString = `HostName=${registry._config.host};DeviceId=${device.deviceId};SharedAccessKey=${deviceKeys[0].value}`;



        return {
            jsonBody: {
              dispositivo,
              //deviceConnectionString
            },
          };
    } catch (error) {
        context.log(error);
        return { status: 500, body: 'Errore interno del server' };
    } finally {
        await prisma.$disconnect();
    }
};

app.http('findDevice', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: findDevice
});