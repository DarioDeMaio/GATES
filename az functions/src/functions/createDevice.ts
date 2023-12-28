import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'
//http://localhost:7071/api/createDevice?connectionString=test&tipo=acqua&matricola=1234
export async function createDevice(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    var connectionString = request.query.get('connectionString');
    var t = request.query.get('tipo');
    var matricola = request.query.get('matricola');

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

    return {body:`${dispositivo}`};
};

app.http('createDevice', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: createDevice
});