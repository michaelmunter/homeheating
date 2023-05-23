import type { UseTRPCMutationResult } from "@trpc/react-query/shared"
import type { TRPCClientErrorLike } from "@trpc/client"

type MutationType = UseTRPCMutationResult<
  number,
  TRPCClientErrorLike<any>,
  { n1: number; n2: number },
  any
>

type ActionsProps = {
  mutation: MutationType
  handleClick: () => void
}

export default function Actions({ mutation, handleClick }: ActionsProps) {
  console.log("type: ", mutation)
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
