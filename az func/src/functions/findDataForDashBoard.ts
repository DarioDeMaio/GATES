import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client';

export async function findDataForDashBoard(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    try {
        const data: any = await request.json();
        const tipo = data.tipo;
        const anno = data.anno;


        let misurazioni;

if (tipo === "aria") {
    // Filtra le misurazioni aria per l'anno specificato
    misurazioni = await prisma.misurazioniAria.findMany({
        where: {
            data: {
                lte: new Date(`${anno}-12-31T23:59:59.999Z`),
                gte: new Date(`${anno}-01-01T00:00:00.000Z`),
            },
        }
    });
    return {
        status: 200,
        jsonBody: {
            "tipo": "aria",
            "misurazioni": misurazioni
        },
    };
} else {
    // Filtra le misurazioni acqua per l'anno specificato
    const misurazioniAcqua = await prisma.misurazioniAcqua.findMany({
        where: {
            data: {
                lte: new Date(`${anno}-12-31T23:59:59.999Z`),
                gte: new Date(`${anno}-01-01T00:00:00.000Z`),
            },
        }
    });
    return {
        status: 200,
        jsonBody: {
            "tipo": "acqua",
            "misurazioni": misurazioniAcqua
        },
    };
}

    } catch (error) {
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: 'Errore interno del server' };
    } finally {
        prisma.$disconnect();
    }
};

app.http('findDataForDashBoard', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: findDataForDashBoard
});
