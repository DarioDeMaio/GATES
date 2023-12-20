// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// const express = require('express');
// const app = express();
// const path = require('path');

// app.use(express.json());

// app.get("/prova", async (req:any, res:any) =>{
//   var i:number = 250;
//   res.json({i});
// });

// app.get('/', async (req:any, res:any) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(8080, () => {
//   console.log("Server Listening on PORT:", 8080);
// });

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


// async function main() {
//     const usersWithPosts = await prisma.user.findMany({
//       include: {
//         posts: true,
//       },
//     })
//     console.dir(usersWithPosts, { depth: null })
//   }

// async function main() {
//     const user = await prisma.user.create({
//       data: {
//         name: 'Bob',
//         email: 'bob@prisma.io',
//         posts: {
//           create: {
//             title: 'Hello World',
//           },
//         },
//       },
//     })
//     console.log(user)
//   }

// async function main() {
//     const users = await prisma.user.findMany()
//     console.log(users)
// }

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//     },
//   })
//   console.log(user)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })