import { type } from "os"
import type { HomeSpecs } from "."
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form"

type PropTypes = {
  homeSpecs: HomeSpecs
  handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
}

type FormValues = {
  buildYear: number
  heatLossFactor: number
  area: number
  heatDist: string
  residents: number
  tempSetting: number
  systemType: string
  cop: number
  location: string
}

export default function Base({ homeSpecs, handleChange }: PropTypes) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      buildYear: 2006,
      heatLossFactor: 26,
      area: 120,
      heatDist: "radiators",
      residents: 4,
      tempSetting: 22,
      systemType: "aw_pump",
      cop: 3,
      location: "DK",
    },
  })

  return (
    <div className=" w-60">
      <div className="grid grid-cols-2 items-center gap-2">
        <label>Building Year</label>
        <input
          name="buildYear"
          onChange={handleChange}
          value={homeSpecs?.buildYear ?? ""}
        ></input>
        <label>Heat Loss</label>
        <input
          name="heatLossFactor"
          onChange={handleChange}
          value={homeSpecs?.heatLossFactor ?? ""}
        ></input>
        <label>Area</label>
        <input
          name="area"
          onChange={handleChange}
          value={homeSpecs?.area ?? ""}
        ></input>
        <label>Distribution</label>
        <select
          name="heatDist"
          onChange={handleChange}
          value={homeSpecs?.heatDist}
        >
          <option value="radiators">Radiators</option>
          <option value="underfloor">Underfloor</option>
        </select>
        <label>Residents</label>
        <input
          name="residents"
          onChange={handleChange}
          value={homeSpecs?.residents ?? ""}
        ></input>
        <label>Temp. Setting</label>
        <input
          name="tempSetting"
          onChange={handleChange}
          value={homeSpecs?.tempSetting ?? ""}
        ></input>
        <label>Heat System</label>
        <select
          name="systemType"
          onChange={handleChange}
          value={homeSpecs?.systemType ?? ""}
        >
          <option value="aw_pump">Air-Water Pump</option>
          <option value="aa_pump">Air-Air Pump</option>
          <option value="gw_pump">Ground-Water Pump</option>
        </select>
        <label>COP</label>
        <input
          name="cop"
          onChange={handleChange}
          value={homeSpecs?.cop ?? ""}
        ></input>
        <label>Location</label>
        <input
          name="location"
          onChange={handleChange}
          value={homeSpecs?.location ?? ""}
        ></input>
      </div>
    </div>
  )
}
