import { api } from "~/utils/api"
import Home from "./Home"
import System from "./System"
import Results from "./Results"
import Actions from "./Actions"
import { useState, useEffect } from "react"

export type homeType = {
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
export type systemType = {
  systemType: string
  cop: string
}

export default function Calculator() {
  const [home, setHome] = useState<homeType>({
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
  const [system, setSystem] = useState<systemType>({
    systemType: "aw_pump",
    cop: "",
  })
  const apiCalc = api.calc.calc.useMutation()

  useEffect(() => {
    if (apiCalc.isSuccess) {
      console.log("object received: ", apiCalc.data)
    }
  }, [apiCalc.isSuccess])

  const handleClick = () => {
    const parsedHome = {
      ...home,
      heatLossFactor: home.heatLossFactor
        ? parseFloat(home.heatLossFactor.replace(",", ""))
        : 0,
      area: home.area ? parseFloat(home.area.replace(",", "")) : 0,
      buildYear: home.buildYear
        ? parseFloat(home.buildYear.replace(",", ""))
        : 0,
      residents: home.residents ? parseInt(home.residents.replace(",", "")) : 0,
      tempSetting: parseFloat(home.tempSetting),
      cop: home.cop ? parseFloat(home.cop.replace(",", "")) : 0,
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
    if (Object.keys(home).includes(name)) {
      setHome((prevHome) => ({ ...prevHome, [name]: value }))
    } else if (Object.keys(system).includes(name)) {
      setSystem((prevSystem) => ({ ...prevSystem, [name]: value }))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="flex flex-row justify-center  gap-12 px-4 py-16 ">
        <Home handleChange={handleChange} home={home} />

        <Results />
      </div>
      <Actions handleClick={handleClick} />
    </div>
  )
}

//<System system={system} handleChange={handleChange} />
