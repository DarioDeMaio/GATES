import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var iothub = require('azure-iothub');
    var connectionString = "HostName=gates.azure-devices.net;SharedAccessKeyName=registryRead;SharedAccessKey=jV6DeHSOYKXyX//D+c9C90L0m7vrM+RzsAIoTP9XGB8=";
    var registry = iothub.Registry.fromConnectionString(connectionString);

    try {
        const dispositivo = await prisma.dispositivo.findMany();
       
        //const device = (await registry.list()).responseBody;

        return {
            jsonBody: {
                dispositivo,
                //deviceList: device,
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