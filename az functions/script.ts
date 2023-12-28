import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
      // const tipo = await prisma.tipologia.create({
      //   data: {
      //     tipo: "ciao",
      //   },
      // })
      // console.log(tipo)
      const tipo = await prisma.tipologia.findMany();
      console.log(tipo);
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