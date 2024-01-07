import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'
//http://localhost:7071/api/createDevice?connectionString=test&tipo=acqua&matricola=1234
export async function deleteDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    //var matricola = request.query.get('matricola');
    try{
        const data:any = await request.json();
        
        const dispositivo = await prisma.dispositivo.delete({
            where:{
                matricola:data.matricola,
            },
        })
        return {
            jsonBody: {
              dispositivo
            },
          };
    }catch(error){
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: 'Errore interno del server' };
    }finally{
        prisma.$disconnect();
    }
    
};

app.http('deleteDevice', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: deleteDevice
});