import { Climate } from "@prisma/client"
import { type } from "os"
import { homeType, systemType } from "~/pages/calculator/Calculator"

type CalcHomeType = {
  heatLossFactor: number
  area: number
  heatDist: string
  residents: number
  tempSetting: number
  systemType: string
  cop: number
  location: string
}

export default function calcModel(home: CalcHomeType, climateData: Climate[]) {
  console.log("climateData: ", climateData)

  return { home, climateData }
}

// const calcBase = (home: calcHomeType) => {
//   const Ti_set = home.tempSetting

//   return {
//     Area: home.area,
//     Residents: home.residents,
//     Ti_Set: Ti_set,
//     SystemType: home.systemType,
//     COP: home.cop,
//     To_limit: Ti_set > 18 ? Ti_set - 4 : Ti_set - 1,
//     HeatLoss: home.heatLossFactor,
//   }
// }
