import { api } from "~/utils/api"
import Home from "./Home"
import System from "./System"
import Results from "./Results"
import Actions from "./Actions"
import { useState } from "react"

export type homeType = {
  heatLoss: number | null
  area: number | null
  heat_dist: string
  residents: number | null
  tempSetting: number
}
export type systemType = {
  system_type: string
  cop: number | null
}

export default function Calculator() {
  const mutation = api.test.mutateAdder.useMutation()

  const [home, setHome] = useState<homeType>({
    heatLoss: null,
    area: null,
    heat_dist: "radiators",
    residents: null,
    tempSetting: 22,
  })
  const [system, setSystem] = useState<systemType>({
    system_type: "aw_pump",
    cop: null,
  })

  const handleClick = () => {
    mutation.mutate({ n1: 9, n2: 3 })
    console.log("click")
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
        <System system={system} handleChange={handleChange} />
        <Results />
      </div>
      <Actions mutation={mutation} handleClick={handleClick} />
    </div>
  )
}
