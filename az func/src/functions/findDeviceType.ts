import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDeviceType(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient()
    // context.log(`Http function processed request for url "${request.url}"`);
    try{
        const tipo = await prisma.tipologia.findMany();
        return { body : `${tipo.forEach}` };
    }catch(error){
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: 'Errore interno del server' };
    }
    
};

app.http('findDeviceType', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: findDeviceType
});