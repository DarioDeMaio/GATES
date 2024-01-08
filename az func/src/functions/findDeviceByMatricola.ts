import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findDeviceByMatricola(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    try {
        const data:any = await request.json();
        const matricola = data.matricola;
        
        const dispositivo = await prisma.dispositivo.findFirst({
            where:{
                matricola:matricola
            }
        });
       
        return {
            jsonBody: {
              dispositivo
            },
          };
    } catch (error) {
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: 'Errore interno del server' };
    }finally{
        prisma.$disconnect();
    } 
    
    
};

app.http('findDeviceByMatricola', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: findDeviceByMatricola
});