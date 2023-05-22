import { type NextPage } from "next"

import Calculator from "./calculator/Calculator"

const Home: NextPage = () => {
  //const { data, isLoading: postsLoading } = api.climate.getAll.useQuery()
  //console.log(data)

  // const result = api.test.add2numbers.useQuery({ n1: 7, n2: 3 })
  // console.log(result.data)

  return (
    <div className="flex  flex-col ">
      <div className=" ">
        <Calculator />
      </div>
    </div>
  )
}

export default Home
