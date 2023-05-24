import { homeType } from "./Calculator"

type PropTypes = {
  home: homeType
  handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
}

export default function Home({ home, handleChange }: PropTypes) {
  return (
    <div className="w-72">
      <h1 className="pb-10 text-2xl">Home</h1>
      <div className="grid grid-cols-2 gap-2">
        <label>Building Year</label>
        <input
          name="buildYear"
          onChange={handleChange}
          value={home?.buildYear ?? ""}
        ></input>
        <label>Heat Loss</label>
        <input
          name="heatLossFactor"
          onChange={handleChange}
          value={home?.heatLossFactor ?? ""}
        ></input>
        <label>Area</label>
        <input
          name="area"
          onChange={handleChange}
          value={home?.area ?? ""}
        ></input>
        <label>Distribution</label>
        <select name="heatDist" onChange={handleChange} value={home?.heatDist}>
          <option value="radiators">Radiators</option>
          <option value="underfloor">Underfloor</option>
        </select>
        <label>Residents</label>
        <input
          name="residents"
          onChange={handleChange}
          value={home?.residents ?? ""}
        ></input>
        <label>Temp. Setting</label>
        <input
          name="tempSetting"
          onChange={handleChange}
          value={home?.tempSetting ?? ""}
        ></input>
        <label>Heat System</label>
        <select
          name="systemType"
          onChange={handleChange}
          value={home?.systemType ?? ""}
        >
          <option value="aw_pump">Air-Water Pump</option>
          <option value="aa_pump">Air-Air Pump</option>
          <option value="gw_pump">Ground-Water Pump</option>
        </select>
        <label>COP</label>
        <input
          name="cop"
          onChange={handleChange}
          value={home?.cop ?? ""}
        ></input>
        <label>Location</label>
        <input
          name="location"
          onChange={handleChange}
          value={home?.location ?? ""}
        ></input>
      </div>
    </div>
  )
}
