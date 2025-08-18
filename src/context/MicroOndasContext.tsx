import { createContext, type Dispatch, type SetStateAction } from "react"
import type { MicroOndasType } from "../types/MicroOndasType"

export type MicroOndasContextType = {
    microondas: MicroOndasType | null
    setMicroOndas: Dispatch<SetStateAction<MicroOndasType | null>>
    leaveMicroOndas: () => void
    joinMicroOndas: (microondas: MicroOndasType) => void
}

export const MicroOndasContext = createContext<MicroOndasContextType>(null!);