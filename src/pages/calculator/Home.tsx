import { homeType } from "./Calculator"

type PropTypes = {
  home: homeType
  handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
}

export default function Home({ home, handleChange }: PropTypes) {
  console.log(home)
  //if (!home) return null
  return (
    <div className="w-52">
      <h1 className="pb-10 text-2xl">Home</h1>
      <div className="grid grid-cols-2 gap-2">
        <label>Heat Loss</label>
        <input
          name="heatLoss"
          onChange={handleChange}
          value={home.heatLoss ?? ""}
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
