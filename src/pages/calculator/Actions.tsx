import type { UseTRPCMutationResult } from "@trpc/react-query/shared"
import { TRPCClientErrorLike } from "@trpc/client"

type MutationType = UseTRPCMutationResult<
  number,
  TRPCClientErrorLike<any>,
  any,
  any
>

type ActionsProps = {
  mutation: MutationType
  handleClick: () => void
}

export default function Actions({ mutation, handleClick }: ActionsProps) {
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
