export default function Actions({
  color,
  handleClick,
}: {
  color: string
  handleClick: () => void
}) {
  return (
    <button
      className="text-l mt-4 w-fit rounded-md bg-red-900 p-3  text-white"
      onClick={handleClick}
    >
      Calculate
    </button>
  )
}
