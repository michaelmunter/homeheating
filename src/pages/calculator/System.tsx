import { type } from "os"
import { systemType } from "./Calculator"

type PropTypes = {
  system: systemType
  handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
}

export default function HeatSystem({ system, handleChange }: PropTypes) {
  return (
    <div className="w-52">
      <h1 className="pb-10 text-2xl">Heat Source</h1>
      <div className="grid grid-cols-2">
        <label>Heat System</label>
        <select
          name="system_type"
          onChange={handleChange}
          value={system.system_type ?? ""}
        >
          <option value="aw_pump">Air-Water Heat Pump</option>
          <option value="aa_pump">Air-Air Heat Pump</option>
          <option value="gw_pump">Ground-Water Heat Pump</option>
        </select>
        <label>COP</label>
        <input
          onChange={handleChange}
          name="cop"
          value={system.cop ?? ""}
        ></input>
      </div>
    </div>
  )
}
