import { TRPCClientErrorLike } from "@trpc/client"
import { UseTRPCMutationResult } from "@trpc/react-query/shared"
import { useState, useEffect } from "react"
import { input } from "zod"
import { api } from "~/utils/api"

type MutationType = UseTRPCMutationResult<
  number,
  TRPCClientErrorLike<any>,
  { n1: number; n2: number },
  any
>

type ActionsProps = {
  mutation: MutationType
}

export default function HomeDemand({ mutation }: ActionsProps) {
  const [inputs, setInputs] = useState({
    heatLoss: "",
    area: "",
    heat_dist: "radiators",
    residents: "",
    tempSetting: "",
  })

  // Check if all inputs are filled
  const allInputsFilled = Object.values(inputs).every((input) => input !== "")

  useEffect(() => {
    if (allInputsFilled) {
      // Do X here
      console.log("All inputs are filled")
      mutation.mutate({ n1: 7, n2: 3 })
    }
  }, [inputs, allInputsFilled])

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="w-52">
      <h1 className="pb-10 text-2xl">Home</h1>
      <div className="grid grid-cols-2 gap-2">
        <label>Heat Loss</label>
        <input
          name="heatLoss"
          onChange={handleChange}
          value={inputs.heatLoss}
        ></input>
        <label>Area</label>
        <input name="area" onChange={handleChange} value={inputs.area}></input>
        <label>Distribution</label>
        <select
          name="heat_dist"
          onChange={handleChange}
          value={inputs.heat_dist}
        >
          <option value="radiators">Radiators</option>
          <option value="underfloor">Underfloor</option>
        </select>
        <label>Residents</label>
        <input
          name="residents"
          onChange={handleChange}
          value={inputs.residents}
        ></input>
        <label>Temp. Setting</label>
        <input
          name="tempSetting"
          onChange={handleChange}
          value={inputs.tempSetting}
        ></input>
      </div>
    </div>
  )
}
