import { api } from "~/utils/api"
import HomeDemand from "./HomeDemand"
import HeatSource from "./HeatSource"
import Results from "./Results"
import Actions from "./Actions"

export default function Calculator() {
  const mutation = api.test.mutateAdder.useMutation()

  const handleClick = () => {
    mutation.mutate({ n1: 9, n2: 3 })
    console.log("click")
  }
  console.log("parent: ", mutation.data)

  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="flex flex-row justify-center  gap-12 px-4 py-16 ">
        <HomeDemand mutate={mutation.mutate} />
        <HeatSource />
        <Results />
      </div>
      <Actions mutation={mutation} handleClick={handleClick} />
    </div>
  )
}
