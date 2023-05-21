import { api } from "~/utils/api"

export default function ({ testValue }: { testValue: string }) {
  //   const { data, status } = api.test.add2numbers.useQuery({ n1: 7, n2: 3 })
  //   console.log(status)
  //   console.log(data)

  const result = numberAdder(7, 3)
  console.log(result)

  return (
    <div className="text-2xl font-bold text-white">
      <h1>CALCULATOR</h1>
      <h1>Test Value = {testValue}</h1>
    </div>
  )
}

async function numberAdder(add1: number, add2: number) {
  const result = api.test.add2numbers.useQuery({ n1: add1, n2: add2 })

  return result.data
}
