import { api } from "~/utils/api"
import Home from "./Home"
import HeatSource from "./HeatSource"
import Results from "./Results"
import Actions from "./Actions"

export default function Calculator({ testValue }: { testValue: string }) {
  const mutation = api.test.mutateAdder.useMutation()

  const handleClick = () => {
    mutation.mutate({ n1: 7, n2: 3 })
  }
  console.log(mutation.status)

  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="flex flex-row justify-center  gap-12 px-4 py-16 ">
        <Home color="red" />
        <HeatSource color="green" />
        <Results color="blue" />
      </div>
      <Actions color="yellow" handleClick={handleClick} />
    </div>
  )
}
