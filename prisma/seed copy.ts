import { PrismaClient } from "@prisma/client"
import { create } from "domain"
import { readFileSync } from "fs"

const prisma = new PrismaClient()

const jsonString = readFileSync("prisma/seed_data/climate.json", "utf-8")
const jsonData = JSON.parse(jsonString)
const climateItems = jsonData.map((item: any, index: number) => {
  return { ...item, id: index + 1, date: new Date(item.date) }
})

async function main() {
  const newClimate = await prisma.climate.createMany({ data: climateItems })
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// const csvData = readFileSync("./seed_data/dk.csv", "utf-8")

// const climateData = csvData.split("\n").map((row) => {
//   const columns = row.split(",")
//   const id = []
//   for (let i = 0; i < columns.length; i++) {
//     id.push(i + 1000)
//   }

//   return {
//     id: id,
//     date: columns[0],
//     location: columns[1],
//     air_temp: columns[2],
//     gnd_temp: columns[3],
//   }
// })

// const climateCreateManyInputs = climateData.map((climate) => ({data: {
//     id: climate.id,
//     date: climate.date,
//     location: climate.location,
//     air_temp: climate.air_temp,
//     gnd_temp: climate.gnd_temp,}
//   }));

// prisma.climate.createMany(climateCreateManyInputs)
