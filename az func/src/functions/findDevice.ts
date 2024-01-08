import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var iothub = require('azure-iothub');
    var connectionString = process.env.IOT_HUB_CONNECTION_STRING;
    var registry = iothub.Registry.fromConnectionString(connectionString);

    try {
        const dispositivo = await prisma.dispositivo.findMany();

        return {
            jsonBody: {
                dispositivo,
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
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: findDevice
});