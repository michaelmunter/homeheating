import { api } from "~/utils/api"
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form"
import { useEffect } from "react"
import { type NextPage } from "next"
import Results from "./Results"

type FormValues = {
  buildYear: number
  heatLossFactor: number
  area: number
  heatDist: string
  residents: number
  tempSetting: number
  location: string
  systems: { type: string; COP: number }[]
}

const Analyze: NextPage = () => {
  const apiCalc = api.calc.calc.useMutation()
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState,
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      buildYear: 2006,
      heatLossFactor: 26,
      area: 120,
      heatDist: "radiators",
      residents: 4,
      tempSetting: 22,
      location: "DK",
      systems: [
        {
          type: "awPump",
          COP: 3,
        },
        {
          type: "awPump",
          COP: 2,
        },
      ],
    },
  })
  const { errors } = formState
  const { fields, prepend, remove } = useFieldArray({
    name: "systems",
    control,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    apiCalc.mutate(data)
    console.log(data)
  }

  useEffect(() => {
    apiCalc.isSuccess && console.log("success: ", apiCalc.isSuccess)
    apiCalc.isError && console.log("error: ", apiCalc.isError)
  }, [apiCalc.isLoading, apiCalc.isSuccess, apiCalc.isError, apiCalc.data])

  //TODO: form validation messages and styling (when typing in input field, error message should disappear)
  return (
    <div className="mt-10 flex w-full flex-col ">
      <div className="flex flex-row flex-wrap justify-center gap-8">
        <form
          className="flex flex-row flex-wrap justify-center gap-8 "
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)(e).catch((err) => console.log(err))
          }}
        >
          <div className=" grid h-fit w-60 grid-cols-2 items-center gap-y-2 rounded-md bg-neutral-300 px-4 py-2">
            <label>Building Year</label>
            <input
              type="number"
              {...register("buildYear", {
                valueAsNumber: true,
                required: { value: true, message: "required" },
                min: 1900,
                max: 2050,
              })}
            />
            <p className=" col-span-2 text-sm text-red-400">
              {errors.buildYear?.message}
            </p>
            <label>Heat Loss</label>
            <input
              type="number"
              {...register("heatLossFactor", {
                valueAsNumber: true,
                required: { value: true, message: "required" },
                min: 0,
                max: 10000,
              })}
            />
            <label>Area</label>
            <input
              type="number"
              {...register("area", {
                valueAsNumber: true,
                required: { value: true, message: "required" },
                min: 10,
                max: 1000,
              })}
            />
            <label>Heat Distribution</label>
            <select
              {...register("heatDist", {
                required: { value: true, message: "required" },
              })}
            >
              <option value="radiators">Radiators</option>
              <option value="floor">Floor</option>
            </select>
            <label>Residents</label>
            <input
              type="number"
              {...register("residents", {
                valueAsNumber: true,
                required: { value: true, message: "required" },
                min: 0,
                max: 1000,
              })}
            />
            <label>Temperature Setting</label>
            <input
              type="number"
              {...register("tempSetting", {
                valueAsNumber: true,
                required: { value: true, message: "required" },
                min: 0,
                max: 40,
              })}
            />
          </div>
          <div className="flex w-60 flex-col">
            <button
              type="button"
              className="mb-2 rounded-md bg-green-700 px-4 py-2 text-green-50 opacity-80 hover:opacity-100"
              onClick={() => {
                prepend({ type: "", COP: 0 })
              }}
            >
              Add System
            </button>
            {fields.map((field, index) => {
              return (
                <section
                  key={field.id}
                  className="mb-4 flex flex-col gap-2 rounded-md  bg-neutral-300 p-4"
                >
                  <select
                    {...register(`systems.${index}.type`, {
                      required: { value: true, message: "required" },
                    })}
                  >
                    <option value="">--Heat Solution--</option>
                    <option value="awPump">Air-Water Heat Pump</option>
                    <option value="aaPump">Air-Air Heat Pump</option>
                    <option value="gwPump">Ground-Water Heat Pump</option>
                  </select>
                  <div className="flex items-center">
                    <label className="flex-grow pl-4 ">COP</label>
                    <input
                      className=" w-9 text-center "
                      {...register(`systems.${index}.COP`, {
                        valueAsNumber: true,
                        required: { value: true, message: "required" },
                        min: 0,
                        max: 9,
                      })}
                    />
                  </div>
                  <button
                    type="button"
                    className=" ml-auto w-fit rounded-md bg-red-600 px-2 py-1 text-sm text-red-50 opacity-80 hover:opacity-100"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </section>
              )
            })}
            <button
              type="submit"
              className="rounded-md bg-orange-700 py-2 text-orange-50 opacity-80 hover:opacity-100"
            >
              Analyze
            </button>
          </div>
        </form>
        <div className="w-[30em]">
          <Results results={apiCalc.data?.b} />
        </div>
      </div>
    </div>
  )
}

export default Analyze
