import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient()
    // context.log(`Http function processed request for url "${request.url}"`);

    const dispositivo = await prisma.dispositivo.findMany();

    return { body : `${dispositivo}` };
};

app.http('findDevice', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: findDevice
});