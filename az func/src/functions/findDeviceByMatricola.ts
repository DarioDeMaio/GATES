import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDeviceByMatricola(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient()
    // context.log(`Http function processed request for url "${request.url}"`);

    const matricola = request.query.get('matricola');

    const dispositivo = await prisma.dispositivo.findMany({
        where:{
            matricola:matricola
        }
    });

    return { body : `${dispositivo}` };
};

app.http('findDeviceByMatricola', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: findDeviceByMatricola
});