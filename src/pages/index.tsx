import { type NextPage } from "next"

import Calculator from "./calculator/Calculator"

const Home: NextPage = () => {
  return (
    <div className="flex  flex-col ">
      <div className=" ">
        <Calculator />
      </div>
    </div>
  )
}

export default Home
