import { Climate } from "@prisma/client"
import { type } from "os"

//  pwrRoom   Evp,rum   electricity consumption for room heating
//  pwrWater  Evp,vvb   electricity consumption for hot water heating
//  pwrAux    Qel       electricity consumption for auxiliary heating

type BaseType = {
  heatLossFactor: number
  buildYear: number
  area: number
  heatDist: string
  residents: number
  tempSetting: number
  systemType: string
  cop: number
  location: string
}

type InterimBase_CalcType = {
  Tout_limit: number
  Two_17c: number
  Two_neg12c: number
  Twvb: number
  QroomDim: number
  Qwvb: number
  d: { Qroom: number[]; Two: number[]; Qwvb: number[] }
}

type InterimPump_CalcType = {
  type: string
  Qnom: number
  dCOPdTb: number
  dQdTb: number
  dCOPdTwo: number
  dQdTwo: number
  Two_max: number
  d: {
    Proom: number[]
    Pwvb: number[] | null
    QvpRoom: number[]
    QvpWvb: number[] | null
    Twvb: number[] | null
    Troom: number[]
  }
}
type ResultType = {
  type: string
  d: {
    pwrRoom: [number]
    pwrWater: [number]
    pwrAux: [number]
  }
}

type ResultsType = ResultType[]

type SystemType = {
  type: string
  COP: number
  maxOutput: number
}

interface AWPumpType extends SystemType {
  keyAW: number
}

interface AAPumpType extends SystemType {
  keyAA: [number]
}

type SystemsType = (AWPumpType | AAPumpType)[]

export default function calcModelTest(base: BaseType, climate: Climate[]) {
  const date = climate.map((row) => row.date)
  const Tout = climate.map((row) => row.air_temp) as any[]
  //const Tout = [3,2,1,4,1] as any

  const ib: InterimBase_CalcType = {
    Tout_limit:
      base.tempSetting > 18 ? base.tempSetting - 4 : base.tempSetting - 1,
    Two_17c: base.heatDist === "radiators" ? 45 : 30,
    Two_neg12c: base.heatDist === "radiators" ? 55 : 35,
    Twvb: 50,
    QroomDim:
      ((26 -
        0.442 * (base.buildYear - 2000) +
        0.0139 * (base.buildYear - 2000) ** 2 -
        0.000113 * (base.buildYear - 2000) ** 3) *
        base.area) /
      1000, // !!! antager helårshus
    Qwvb: base.residents ? base.residents * 800 + 800 : 0, // !!! burde det ikke være minus 800?
    d: { Qroom: [], Two: [], Qwvb: [] },
  }

  const interim = (ib.Two_neg12c - ib.Two_17c) / 29
  for (let i = 0; i < climate.length; i++) {
    const pushTwo = 17 - Tout[i]
    ib.d.Qroom.push((ib.QroomDim / 32) * Math.max(ib.Tout_limit - Tout[i], 0))
    ib.d.Two.push(ib.Two_17c + interim * pushTwo)
  }

  const iaw: InterimPump_CalcType = {
    type: base.systemType,
    Qnom: base.area * base.heatLossFactor,
    dCOPdTb: 0,
    dQdTb: 0,
    dCOPdTwo: 0,
    dQdTwo: 0,
    Two_max: 0,
    d: {
      Proom: [],
      Pwvb: null,
      QvpRoom: [],
      QvpWvb: null,
      Twvb: null,
      Troom: [],
    },
  }

  //function will receive systems array with many types of system inside
  //calculate base calcs

  // systems.forEach(system => {
  //   if(system.type === 'AWPump'){
  //     //update base and system by running calcAWPump(base,climate,system)
  //   //else if for other systems
  //   }
  // })

  const dTwo = ib.d.Two
  const systems: SystemsType = []
  return { dTwo, ib, Tout }
}
const calcAWPump = (base: BaseType, climate: Climate, system: AWPumpType) => {
  //SystemType + AWPumpType merged
  //calcs
}

// other system specific functions
