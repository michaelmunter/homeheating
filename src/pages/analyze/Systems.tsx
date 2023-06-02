import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form"

type FormValues = {
  system: { type: string; COP: number }[]
}
// let renderCount = 0

export default function Systems() {
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
    <div className="w-52 ">
      <form
        className="flex flex-col "
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(onSubmit)(e).catch((err) => console.log(err))
        }}
      >
        <button
          type="button"
          className="mb-2 rounded-md bg-green-700 px-4 py-1 text-green-50 opacity-80 hover:opacity-100"
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
              className="mb-4 flex flex-col gap-2 rounded-md bg-neutral-600 p-4"
            >
              <select {...register(`system.${index}.type`)}>
                <option value="">--Heat Solution--</option>
                <option value="awPump">Air-Water Heat Pump</option>
                <option value="aaPump">Air-Air Heat Pump</option>
                <option value="gwPump">Ground-Water Heat Pump</option>
              </select>
              <div className="flex items-center">
                <label className="flex-grow pr-8 text-neutral-100">COP</label>
                <input
                  className=" w-9 text-center "
                  {...register(`system.${index}.COP`)}
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
          className="rounded-md bg-orange-600 py-1 text-orange-50 opacity-80 hover:opacity-100"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
