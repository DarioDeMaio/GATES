import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function createDeviceType(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    //const name = request.query.get('name') /*|| await request.text() || 'world'*/;
    try{
        const data:any = await request.json();
        const tipo = await prisma.tipologia.create({
            data: {
              tipo: data.name,
            },
        });
        return {
            jsonBody: {
              tipo
            },
          };
    }catch(error){
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: 'Errore interno del server' };
    }finally{
        prisma.$disconnect();
    }

    
};

app.http('createDeviceType', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: createDeviceType
});
