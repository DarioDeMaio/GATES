import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();
    const json: any = await request.json();
    try {
        context.log('Inizio della funzione');
        const dispositivo = await prisma.dispositivo.findMany();
        context.log('Fine della query al database');
        return { body: `${dispositivo}` };
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