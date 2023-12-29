import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'
//http://localhost:7071/api/createDevice?connectionString=test&tipo=acqua&matricola=1234
export async function deleteDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var matricola = request.query.get('matricola');

    const dispositivo = await prisma.dispositivo.delete({
        where:{
            matricola:matricola,
        },
    })
    return { body: `${dispositivo.matricola}`};
};

app.http('deleteDevice', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: deleteDevice
});