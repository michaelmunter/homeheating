import { api } from "~/utils/api"

export default function ({ testValue }: { testValue: string }) {
  const { data, status } = api.test.add2numbers.useQuery({ n1: 7, n2: 3 })
  console.log(status)
  console.log(data)

  return (
    <div className="text-2xl font-bold text-white">
      <h1>CALCULATOR</h1>
      <h1>Test Value = {testValue}</h1>
    </div>
  )
}
