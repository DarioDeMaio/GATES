import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
//   const device = await prisma.dispositivo.create({
//     data:{
//         connectionString:"145",
//         matricola:"1213"
//     }
//   });

//   const aria = await prisma.aria.create({
//     data:{
//         idDispositivo:device.id
//     }
//   });

//   const devices = await prisma.dispositivo.findMany({
//     include:{
//         aria:true,
//         water:true
//     }
//   });

//   console.dir(devices, { depth: null })
const device = await prisma.dispositivo.delete({
    where:{
        id:4
    }
});
const devices = await prisma.dispositivo.findMany({
        include:{
            aria:true,
            water:true
        }
      });
    
      console.dir(devices, { depth: null });
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