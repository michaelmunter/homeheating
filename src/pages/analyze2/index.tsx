import { api } from "~/utils/api"
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form"

import { useState, useEffect } from "react"

import { type NextPage } from "next"

type FormValues = {
  buildYear: number
  heatLossFactor: number
  area: number
  heatDist: string
  residents: number
  tempSetting: number
  systemType: string
  cop: number
  location: string
}

const Analyze2: NextPage = () => {
  const apiCalc = api.calc.calc.useMutation()

  const { register, handleSubmit, control, formState, reset, watch } =
    useForm<FormValues>({
      defaultValues: {
        buildYear: 2006,
        heatLossFactor: 26,
        area: 120,
        heatDist: "radiators",
        residents: 4,
        tempSetting: 22,
        systemType: "aw_pump",
        cop: 3,
        location: "DK",
      },
    })
  const { errors } = formState

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    apiCalc.mutate(data)
    //console.log(data)
  }

  useEffect(() => {
    apiCalc.isSuccess && console.log("success: ", apiCalc.isSuccess)
    apiCalc.isError && console.log("error: ", apiCalc.isError)
    apiCalc.data && console.log("data: ", apiCalc.data)
  }, [apiCalc.isLoading, apiCalc.isSuccess, apiCalc.isError, apiCalc.data])

  //TODO: form validation messages and styling (when typing in input field, error message should disappear)

  return (
    <div className="mt-10 flex w-full flex-col ">
      <div className="flex flex-row flex-wrap justify-center gap-8">
        <form
          className="flex flex-col "
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)(e).catch((err) => console.log(err))
          }}
        >
          <div className=" grid w-60 grid-cols-2 items-center gap-y-2">
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
            <select {...register("heatDist")}>
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
            <label>System Type</label>
            <select {...register("systemType")}>
              <option value="aw_pump">Air to Water Heat Pump</option>
              <option value="ww_pump">Water to Water Heat Pump</option>
              <option value="gw_pump">Geothermal Heat Pump</option>
              <option value="gas">Gas Boiler</option>
              <option value="oil">Oil Boiler</option>
              <option value="electric">Electric Boiler</option>
              <option value="district">Central Heating</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-md bg-orange-700 py-2 text-orange-50 opacity-80 hover:opacity-100"
          >
            Analyze
          </button>
        </form>
      </div>
    </div>
  )
}

export default Analyze2
