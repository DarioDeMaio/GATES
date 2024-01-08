import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function createDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var iothub = require('azure-iothub');
    var connectionString = process.env.IOT_HUB_CONNECTION_STRING;
    var registry = iothub.Registry.fromConnectionString(connectionString);
    
    try{
        const data:any = await request.json();

        const matricola = data.matricola;
        
        const dispositivo = await prisma.dispositivo.create({
            data: {
                connectionString: "",
                matricola: matricola,
            },
        });
        
        const device = (await registry.create({
            deviceId:dispositivo.id
        })).responseBody;

        var cs =  `HostName=gates.azure-devices.net;DeviceId=${dispositivo.id};SharedAccessKey=${device.authentication.symmetricKey.primaryKey}`;
        
        const updateDevice = await prisma.dispositivo.update({
            where: {
              id: dispositivo.id,
            },
            data: {
              connectionString: cs,
            },
          })

        return {
            jsonBody: {
                updateDevice
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
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: createDevice
});