import { api } from "~/utils/api"
import Base from "./Base"
import Systems from "./Systems"
import Results from "./Results"
import Actions from "./Actions"
import { useState, useEffect } from "react"
import type { InterimBase_CalcType } from "~/server/calculations/calcModel"
import { type NextPage } from "next"

export type HomeSpecs = {
  buildYear: string
  heatLossFactor: string
  area: string
  heatDist: string
  residents: string
  tempSetting: string
  systemType: string
  cop: string
  location: string
}
export type SystemSpecs = {
  systemType: string
  cop: string
}

const Analyze: NextPage = () => {
  const [homeSpecs, setHomeSpecs] = useState<HomeSpecs>({
    buildYear: "2006",
    heatLossFactor: "26",
    area: "120",
    heatDist: "radiators",
    residents: "4",
    tempSetting: "22",
    systemType: "aw_pump",
    cop: "3",
    location: "DK",
  })
  const [systemSpecs, setSystemSpecs] = useState<SystemSpecs>({
    systemType: "aw_pump",
    cop: "",
  })
  const [results, setResults] = useState<InterimBase_CalcType>({
    Tout_limit: 0,
    Two_17c: 0,
    Two_neg12c: 0,
    Twvb: 0,
    QroomDim: 0,
    Qwvb: 0,
    d: [{ Qroom: 0, Two: 0 }],
  })

  const apiCalc = api.calc.calc.useMutation()

  useEffect(() => {
    // apiCalc.isLoading && console.log("loading: ", apiCalc.isLoading)
    apiCalc.isSuccess && console.log("success: ", apiCalc.isSuccess)
    apiCalc.isSuccess && setResults(apiCalc.data?.ib)
    apiCalc.isError && console.log("error: ", apiCalc.isError)
    // apiCalc.data && console.log("data: ", apiCalc.data)
  }, [apiCalc.isLoading, apiCalc.isSuccess, apiCalc.isError, apiCalc.data])

  const handleClick = () => {
    const parsedHome = {
      ...homeSpecs,
      heatLossFactor: homeSpecs.heatLossFactor
        ? parseFloat(homeSpecs.heatLossFactor.replace(",", ""))
        : 0,
      area: homeSpecs.area ? parseFloat(homeSpecs.area.replace(",", "")) : 0,
      buildYear: homeSpecs.buildYear
        ? parseFloat(homeSpecs.buildYear.replace(",", ""))
        : 0,
      residents: homeSpecs.residents
        ? parseInt(homeSpecs.residents.replace(",", ""))
        : 0,
      tempSetting: parseFloat(homeSpecs.tempSetting),
      cop: homeSpecs.cop ? parseFloat(homeSpecs.cop.replace(",", "")) : 0,
    }

    for (const key in parsedHome) {
      if (
        parsedHome[key as keyof typeof parsedHome] === null ||
        parsedHome[key as keyof typeof parsedHome] === ""
      ) {
        alert(`Please fill out ${key} before submitting.`)
        return // Exit the function if a required value is missing
      }
    }

    //test
    apiCalc.mutate(parsedHome)
    console.log("object sent: ", parsedHome)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target
    if (Object.keys(homeSpecs).includes(name)) {
      setHomeSpecs((prevHomeSpecs) => ({ ...prevHomeSpecs, [name]: value }))
    } else if (Object.keys(systemSpecs).includes(name)) {
      setSystemSpecs((prevSystemSpecs) => ({
        ...prevSystemSpecs,
        [name]: value,
      }))
    }
  }

  return (
    <div className=" mt-10 flex w-full flex-col ">
      <div className="flex flex-row flex-wrap justify-center gap-8  ">
        <Base handleChange={handleChange} homeSpecs={homeSpecs} />
        <Systems />
        <Results results={results} />
      </div>

      <Actions handleClick={handleClick} />
    </div>
  )
}

export default Analyze

{
  /* <div className=" grid grid-cols-1 gap-4 bg-slate-500 sm:grid-cols-2 md:grid-cols-3 "> */
}
