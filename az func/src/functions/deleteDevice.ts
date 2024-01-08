import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function deleteDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var iothub = require('azure-iothub');
    var connectionString = process.env.IOT_HUB_CONNECTION_STRING;
    var registry = iothub.Registry.fromConnectionString(connectionString);

    try{
        const data:any = await request.json();
        const dispositivo = await prisma.dispositivo.delete({
            where:{
                matricola:data.matricola,
            },
        });

        const device =  (await registry.delete((dispositivo.id).toString())).responseBody;

        return {
            jsonBody: {
              dispositivo
            },
          };
    }catch(error){
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: "Errore interno del server" };
    }finally{
        prisma.$disconnect();
    }
    
};

app.http('deleteDevice', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    handler: deleteDevice
});