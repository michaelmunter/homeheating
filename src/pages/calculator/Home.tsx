import { TRPCClientErrorLike } from "@trpc/client"
import { UseTRPCMutationResult } from "@trpc/react-query/shared"
import { useState, useEffect } from "react"
import { input } from "zod"
import { api } from "~/utils/api"
import { homeType } from "./Calculator"

// type MutationType = UseTRPCMutationResult<
//   number,
//   TRPCClientErrorLike<any>,
//   { n1: number; n2: number },
//   any
// >

type PropTypes = {
  home: homeType
  handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
}

export default function HomeDemand({ home, handleChange }: PropTypes) {
  const [inputs, setInputs] = useState({
    heatLoss: "",
    area: "",
    heat_dist: "radiators",
    residents: "",
    tempSetting: "",
  })

  return (
    <div className="w-52">
      <h1 className="pb-10 text-2xl">Home</h1>
      <div className="grid grid-cols-2 gap-2">
        <label>Heat Loss</label>
        <input
          name="heatLossFactor"
          onChange={handleChange}
          value={home.heatLossFactor ?? ""}
        ></input>
        <label>Area</label>
        <input
          name="area"
          onChange={handleChange}
          value={home.area ?? ""}
        ></input>
        <label>Distribution</label>
        <select name="heat_dist" onChange={handleChange} value={home.heat_dist}>
          <option value="radiators">Radiators</option>
          <option value="underfloor">Underfloor</option>
        </select>
        <label>Residents</label>
        <input
          name="residents"
          onChange={handleChange}
          value={home.residents ?? ""}
        ></input>
        <label>Temp. Setting</label>
        <input
          name="tempSetting"
          onChange={handleChange}
          value={home.tempSetting ?? ""}
        ></input>
      </div>
    </div>
  )
}
