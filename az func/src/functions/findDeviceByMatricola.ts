import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'
import { Registry } from "azure-iothub";
import { register } from "module";

export async function findDeviceByMatricola(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var iothub = require('azure-iothub');
    var connectionString = process.env.IOT_HUB_CONNECTION_STRING;
    var registry = iothub.Registry.fromConnectionString(connectionString);

    try {
        const data:any = await request.json();
        const matricola = data.matricola;
        //console.log(matricola, "\n\n");
        const dispositivo = await prisma.dispositivo.findFirst({
            where:{
                matricola:matricola
            }
        });
        //const device = registry.getTwin(dispositivo.id);
        const deviceKeys = await registry.getTwin(dispositivo.id);
        const deviceConnectionString = `HostName=${registry._config.host};DeviceId=${dispositivo.id};SharedAccessKey=${deviceKeys[0].value}`;

        return {
            jsonBody: {
              dispositivo,
              deviceConnectionString
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
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: findDeviceByMatricola
});