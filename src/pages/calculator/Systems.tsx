import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"

type FormValues = {
  system: { type: string; COP: number }[]
}
// let renderCount = 0

export default function Systems() {
  // console.log("renderCount: ", renderCount++)
  // renderCount++

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      system: [
        { type: "awPump", COP: 0 },
        { type: "aaPump", COP: 3 },
      ],
    },
  })

  const { fields, prepend, remove } = useFieldArray({
    name: "system",
    control,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <div className="w-52">
      <h1 className=" pb-8 text-2xl">Systems</h1>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <button
          type="button"
          className="mb-2 bg-green-400"
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
              className="mb-4 flex flex-col gap-2 bg-gray-300 p-4"
            >
              <select {...register(`system.${index}.type`)}>
                <option value="">--Heat Solution--</option>
                <option value="awPump">Air-Water Heat Pump</option>
                <option value="aaPump">Air-Air Heat Pump</option>
                <option value="gwPump">Ground-Water Heat Pump</option>
              </select>
              <div className="flex">
                <label className="flex-grow pr-8">COP</label>
                <input
                  className=" w-9 text-center "
                  {...register(`system.${index}.COP`)}
                />
              </div>
              <button
                type="button"
                className="bg-red-400"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </section>
          )
        })}

        <button type="submit" className="bg-blue-400">
          Submit
        </button>
      </form>
    </div>
  )
}
