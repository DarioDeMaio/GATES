import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function deleteDeviceType(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();
    let str_id: string= (request.query.get('id'));
    let id: number = parseInt(str_id);
    const tipo = await prisma.tipologia.delete({
        where:{
            id:id,
        },
    })
    return { body: `${tipo.tipo}`};
};

app.http('deleteDeviceType', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: deleteDeviceType
});