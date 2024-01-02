import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function deleteDeviceType(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();
    // let str_id: string= (request.query.get('id'));
    // let id: number = parseInt(str_id);
    try{
        const data:any = await request.json();
        const id: number = parseInt(data.id);

        const tipo = await prisma.tipologia.delete({
        where:{
            id:id,
        },
    })
        return { body: `${tipo.tipo}`};
    }catch(error){
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: 'Errore interno del server' };
    }finally{
        prisma.$disconnect();
    }
    
};

app.http('deleteDeviceType', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: deleteDeviceType
});