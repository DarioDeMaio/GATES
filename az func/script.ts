import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  let i = 0;
  const d = await prisma.dispositivo.create({
    data: {
      matricola: "125878489654894769adada",
      connectionString: "cs",
    },
  });

  const a = await prisma.aria.create({
    data: {
      idDispositivo: d.id,
    },
  });

  // Genera almeno 10 misurazioni per ogni mese
  for (let month = 1; month <= 12; month++) {
    for (let j = 0; j < 10; j++) {
      // Imposta la data correttamente
      const data = new Date(`2024-${month.toString().padStart(2, '0')}-${(j + 1).toString().padStart(2, '0')}T18:25:26.216Z`);

      const misurazione = await prisma.misurazioniAria.create({
        data: {
          cov: 22,
          gas: 55,
          dispId: 14,
          data: data,
        },
      });
      console.log(misurazione);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
