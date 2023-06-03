import { type Climate } from "@prisma/client"

export type BaseData = {
  heatLossFactor: number
  buildYear: number
  area: number
  heatDist: string
  residents: number
  tempSetting: number
  location: string
  Tout_limit?: number | null
  Two_17c?: number | null
  Two_neg12c?: number | null
  Twvb?: number | null
  QroomDim?: number | null
  Qwvb?: number | null
  d: { Qroom: number | null; Two: number | null }[]
}
export type SystemData = {
  type: string
  COP: number
  Qnom?: number | null
  dCOPdTb?: number | null
  dQdTb?: number | null
  dCOPdTwo?: number | null
  dQdTwo?: number | null
  Two_max?: number | null
  d?: {
    Proom: number | null
    Pwvb: number | null
    QvpRoom: number | null
    QvpWvb: number | null
    Twvb: number | null
    Troom: number | null
    EvpRoom: number | null
    EvpWvb: number | null
    Qel: number | null
  }[]
}

type UserSpecs = {
  heatLossFactor: number
  buildYear: number
  area: number
  heatDist: string
  residents: number
  tempSetting: number
  location: string
  systems: {
    type: string
    COP: number
  }[]
}

export type Base = {
  Tout_limit: number
  Two_17c: number
  Two_neg12c: number
  Twvb: number
  QroomDim: number
  Qwvb: number
  d: { Qroom: number; Two: number }[]
}

// interface awPump extends SystemData {}
// interface aaPump extends SystemData {}
// interface gwPump extends SystemData {}
// type SystemsType = (awPump | aaPump | gwPump)[]

export default function analyzer(u: UserSpecs, climate: Climate[]) {
  //CALCULATE BASE DATA
  const b: Base = {
    Tout_limit: u.tempSetting > 18 ? u.tempSetting - 4 : u.tempSetting - 1,
    Two_17c: u.heatDist === "radiators" ? 45 : 30,
    Two_neg12c: u.heatDist === "radiators" ? 55 : 35,
    Twvb: 50,
    QroomDim:
      ((26 -
        0.442 * (u.buildYear - 2000) +
        0.0139 * (u.buildYear - 2000) ** 2 -
        0.000113 * (u.buildYear - 2000) ** 3) *
        u.area) /
      1000, // !!! antager helårshus
    Qwvb: u.residents ? (u.residents * 800 + 800) / (365 * 24) : 0, // !!! burde det ikke være minus 800?
    d: [{ Qroom: 0, Two: 0 }],
  }
  const preCalc = (b.Two_neg12c - b.Two_17c) / 29

  climate.forEach((row) => {
    b.d.push({
      Qroom: (b.QroomDim / 32) * Math.max(b.Tout_limit - row.air_temp, 0),
      Two: b.Two_17c + preCalc * (17 - row.air_temp),
    })
  })
  b.d.shift() //remove dummy element required for initialization = {Qroom: 0, Two: 0}

  return { b, climate }
}
