import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function createDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var iothub = require('azure-iothub');
    var connectionString = process.env.IOT_HUB_CONNECTION_STRING;
    var registry = iothub.Registry.fromConnectionString(connectionString);
    
    try{
        const data:any = await request.json();
        const connectionString = data.connectionString;
        const t = data.t;
        const matricola = data.matricola;
        
        const tipo = await prisma.tipologia.findFirst({
            where:{
                tipo: t
            }
        });
        
        if (!tipo) {
            return { status: 400, body: 'Tipo non trovato' };
        }
    
        const dispositivo = await prisma.dispositivo.create({
            data: {
                connectionString: connectionString,
                matricola: matricola,
                tipo: {
                    connect: {
                        id: tipo.id,
                    },
                },
            },
        });
        
        registry.create({
            deviceId:dispositivo.id
        });

        return {
            jsonBody: {
              dispositivo
            },
          };
    } catch (error) {
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: error.message };
    } finally {
        await prisma.$disconnect();
    }

};

app.http('createDevice', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: createDevice
});