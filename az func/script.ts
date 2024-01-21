import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    //prisma.dispositivo.findMany();
    for(let i = 0; i < 5; i++){
        const misurazione = await prisma.misurazioniAcqua.create({
            data:{
                pH:22,
                metalli:55,
                dispId:13
            }
        });
    
  console.log(misurazione);
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })