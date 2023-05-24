import type { UseTRPCMutationResult } from "@trpc/react-query/shared"
import type { TRPCClientErrorLike } from "@trpc/client"
import { homeType } from "./Calculator"

// type MutationType = UseTRPCMutationResult<
//   number,
//   TRPCClientErrorLike<any>,
//   homeType,
//   any
// >

type PropTypes = {
  handleClick: () => void
}

export default function Actions({ handleClick }: PropTypes) {
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
