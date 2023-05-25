import { Climate, PrismaClient } from "@prisma/client"
import { create } from "domain"
import { readFileSync } from "fs"

const prisma = new PrismaClient()

const climateRows = readFileSync("prisma/seed_data/climate.csv", "utf-8")
  .split("\r\n")
  .slice(1)
const climateObjects = climateRows.map((row, index) => {
  const columns = row.split(",")
  return {
    id: index + 1,
    location: "dk",
    date: new Date(columns[0] as string),
    air_temp: parseFloat(columns[1] as string),
    gnd_temp: parseFloat(columns[2] as string),
  }
})

async function main() {
  await prisma.climate.deleteMany({ where: { location: "dk" } })
  await prisma.climate.createMany({ data: climateObjects })
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
