import type { BaseType } from "."

type PropTypes = {
  base: BaseType
  handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
}

export default function Base({ base, handleChange }: PropTypes) {
  return (
    <div className="w-52">
      <div className="grid grid-cols-2 gap-2">
        <label>Building Year</label>
        <input
          name="buildYear"
          onChange={handleChange}
          value={base?.buildYear ?? ""}
        ></input>
        <label>Heat Loss</label>
        <input
          name="heatLossFactor"
          onChange={handleChange}
          value={base?.heatLossFactor ?? ""}
        ></input>
        <label>Area</label>
        <input
          name="area"
          onChange={handleChange}
          value={base?.area ?? ""}
        ></input>
        <label>Distribution</label>
        <select name="heatDist" onChange={handleChange} value={base?.heatDist}>
          <option value="radiators">Radiators</option>
          <option value="underfloor">Underfloor</option>
        </select>
        <label>Residents</label>
        <input
          name="residents"
          onChange={handleChange}
          value={base?.residents ?? ""}
        ></input>
        <label>Temp. Setting</label>
        <input
          name="tempSetting"
          onChange={handleChange}
          value={base?.tempSetting ?? ""}
        ></input>
        <label>Heat System</label>
        <select
          name="systemType"
          onChange={handleChange}
          value={base?.systemType ?? ""}
        >
          <option value="aw_pump">Air-Water Pump</option>
          <option value="aa_pump">Air-Air Pump</option>
          <option value="gw_pump">Ground-Water Pump</option>
        </select>
        <label>COP</label>
        <input
          name="cop"
          onChange={handleChange}
          value={base?.cop ?? ""}
        ></input>
        <label>Location</label>
        <input
          name="location"
          onChange={handleChange}
          value={base?.location ?? ""}
        ></input>
      </div>
    </div>
  )
}
