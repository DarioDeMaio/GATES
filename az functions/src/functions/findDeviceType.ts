import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDeviceType(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient()
    // context.log(`Http function processed request for url "${request.url}"`);

    const tipo = await prisma.tipologia.findMany();

    return { body : `${tipo}` };
};

app.http('findDeviceType', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: findDeviceType
});