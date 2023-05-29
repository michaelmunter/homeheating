import { api } from "~/utils/api"
import Base from "./Base"
import Systems from "./Systems"
import Results from "./Results"
import Actions from "./Actions"
import { useState, useEffect } from "react"

export type BaseType = {
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
export type SystemType = {
  systemType: string
  cop: string
}

export default function Calculator() {
  const [base, setBase] = useState<BaseType>({
    buildYear: "",
    heatLossFactor: "",
    area: "",
    heatDist: "radiators",
    residents: "",
    tempSetting: "22",
    systemType: "aw_pump",
    cop: "",
    location: "DK",
  })
  const [systems, setSystems] = useState<SystemType>({
    systemType: "aw_pump",
    cop: "",
  })
  const apiCalc = api.calc.calc.useMutation()

  useEffect(() => {
    apiCalc.isLoading && console.log("loading: ", apiCalc.isLoading)
    apiCalc.isSuccess && console.log("data: ", apiCalc.data)
    apiCalc.isError && console.log("error: ", apiCalc.isError)
  }, [apiCalc.isLoading, apiCalc.isSuccess, apiCalc.isError])

  const handleClick = () => {
    const parsedHome = {
      ...base,
      heatLossFactor: base.heatLossFactor
        ? parseFloat(base.heatLossFactor.replace(",", ""))
        : 0,
      area: base.area ? parseFloat(base.area.replace(",", "")) : 0,
      buildYear: base.buildYear
        ? parseFloat(base.buildYear.replace(",", ""))
        : 0,
      residents: base.residents ? parseInt(base.residents.replace(",", "")) : 0,
      tempSetting: parseFloat(base.tempSetting),
      cop: base.cop ? parseFloat(base.cop.replace(",", "")) : 0,
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
    if (Object.keys(base).includes(name)) {
      setBase((prevBase) => ({ ...prevBase, [name]: value }))
    } else if (Object.keys(systems).includes(name)) {
      setSystems((prevSystems) => ({ ...prevSystems, [name]: value }))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="flex flex-row justify-center  gap-12 px-4 py-16 ">
        <Base handleChange={handleChange} base={base} />
        <Systems />
        <Results />
      </div>
      <Actions handleClick={handleClick} />
    </div>
  )
}

//<System system={system} handleChange={handleChange} />
