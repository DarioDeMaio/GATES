import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    //prisma.dispositivo.findMany();
    let i = 0;
    for(; i < 1; i++){
        const misurazione = await prisma.misurazioniAcqua.create({
            data:{
                pH:22,
                metalli:55,
                dispId:13
            }
        });
        console.log(misurazione);
        //let str:String = misurazione.data.toLocaleString('it-IT', { timeZone: 'UTC'});
      
    }
    const getD = await prisma.misurazioniAcqua.findMany();
    for(let i = 0; i < getD.length; i++){
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var d = new Date(getD[i].data.getDate());
      var dayName = days[d.getDay()];
      let str:string = getD[i].data.getFullYear()+"-"+(getD[i].data.getMonth()+1).toString()+"-"+getD[i].data.getDate().toString();
      console.log(str,"\n");
      var d = new Date(str);
      console.log(getD[i].data.getDate());
      // console.log(getD[i],"\n\n");
      // console.log(d.getDay());
    }
    // let str:String = getD[i].data.toLocaleString('it-IT', { timeZone: 'UTC'});
    // var d = new Date(getD[i].data.getDate());
    // console.log(d.getDay());
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