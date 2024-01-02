import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDeviceByMatricola(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient()
    // context.log(`Http function processed request for url "${request.url}"`);

    //const matricola = request.query.get('matricola');
    try {
        const data:any = await request.json();
        const matricola = data.matricola;
        //console.log(matricola, "\n\n");
        const dispositivo = await prisma.dispositivo.findFirst({
            where:{
                matricola:matricola
            }
        });

        return { body : `${dispositivo}` };
    } catch (error) {
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: 'Errore interno del server' };
    }finally{
        prisma.$disconnect();
    } 
    
    
};

app.http('findDeviceByMatricola', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: findDeviceByMatricola
});