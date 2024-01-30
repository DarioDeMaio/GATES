import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PrismaClient } from '@prisma/client'

export async function findMisurazioni(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const prisma = new PrismaClient();

    try {
        const data:any = await request.json();
        const matricola = data.matricola;
        
        const dispositivo = await prisma.dispositivo.findFirst({
            where:{
                matricola:matricola
            },
            include:{
                water:true,
                aria:true
            }
        });
        //console.log(dispositivo.aria);
        if(dispositivo.aria !== null){
            const aria = await prisma.aria.findFirst({
                where:{
                    idDispositivo:dispositivo.id
                }
            });
            const misurazioni = await prisma.misurazioniAria.findMany({
                where:{
                    dispId: aria.idDispositivo
                }
            });
            return {
                status:200,
                jsonBody: {
                    "tipo":"aria",
                    "misurazioni":misurazioni
                },
              };
        }else{
            console.log("acqua");
            const acqua = await prisma.acqua.findFirst({
                where:{
                    idDispositivo:dispositivo.id
                }
            });
            const misurazioni = await prisma.misurazioniAcqua.findMany({
                where:{
                    dispId:acqua.idDispositivo
                }
            });
            return {
                status:200,
                jsonBody: {
                    "tipo":"acqua",
                    "misurazioni":misurazioni
                },
              };
        }


        
    } catch (error) {
        console.error('Errore durante l\'elaborazione della richiesta:', error);
        return { status: 500, body: 'Errore interno del server' };
    }finally{
        prisma.$disconnect();
    } 
    
    
};

app.http('findMisurazioni', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: findMisurazioni
});