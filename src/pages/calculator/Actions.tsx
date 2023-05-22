export default function Actions({ mutation, handleClick }: any) {
  console.log("comp: ", mutation.data)
  return (
    <div>
      <button
        className="text-l mt-4 w-fit rounded-md bg-red-900 p-3  text-white"
        onClick={handleClick}
      >
        Calculate
      </button>
    </div>
  )
}
