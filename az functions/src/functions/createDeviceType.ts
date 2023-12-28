import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function createDeviceType(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    const name = request.query.get('name') /*|| await request.text() || 'world'*/;

    const tipo = await prisma.tipologia.create({
        data: {
          tipo: name,
        },
    });

    return { body: `Dispositivo di tipo , ${name}, creato!` };

    
};

app.http('createDeviceType', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: createDeviceType
});
