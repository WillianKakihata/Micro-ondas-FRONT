// MicroOndasPage.tsx
import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { MicroOndasContext } from "../context/MicroOndasContext"
import { MicroOndasFormsBox, MicroOndasFormsInput, PageLayoutMicroOndas } from "../components/MicroOndasLayout"
import type { MicroOndasType } from "../types/MicroOndasType"
import PageLayoutKeyBoard from "../components/KeyBoardLayout/KeyBoardLayout"

const MicroOndasPage = () => {
    const microOndasContext = useContext(MicroOndasContext)

    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [activeField, setActiveField] = useState<"potencia" | "tempo" | null>(null)

    const [microOndasForms, setMicroOndasForms] = useState<MicroOndasType>({
        potencia: 0,
        tempo: 0,
        execucao: true,
        status: 0
    });

    const handleKeyboardToggle = (field: "potencia" | "tempo") => {
        if (keyboardVisible && activeField === field) {
            setKeyboardVisible(false)
            setActiveField(null)
        } else {
            setKeyboardVisible(true)
            setActiveField(field)
        }
    }

    const handleKeyboardNumber = (num: number) => {
        if (!activeField) return;
        setMicroOndasForms(prev => ({
            ...prev,
            [activeField]: Number(String(prev[activeField]) + num)
        }))
    }

    const handleKeyboardDelete = () => {
        if (!activeField) return;
        setMicroOndasForms(prev => ({
            ...prev,
            [activeField]: Number(String(prev[activeField]).slice(0, -1) || "0")
        }))
    }

    const handleKeyboardClear = () => {
        if (!activeField) return;
        setMicroOndasForms(prev => ({
            ...prev,
            [activeField]: 0
        }))
    }

    useEffect(() => {
        console.log(microOndasForms)
    }, [microOndasForms])

    return (
        <PageLayoutMicroOndas right={true} pageText={<p className="text-xl"> </p>}>
            <>
            <div className="w-[320px] lg:w-[384px] flex lg:block justify-center">
                <MicroOndasFormsBox>
                    <div className="flex flex-col gap-5">
                        <MicroOndasFormsInput
                            type="number"
                            id="potencia"
                            label="Potência"
                            placeholder="Potência do micro-ondas"
                            value={microOndasForms.potencia}
                            handleInputValue={() => {}}
                            imageIcon="src/assets/teclado-de-discagem.svg"
                            onKeyboardClick={() => handleKeyboardToggle("potencia")}
                        />

                        <MicroOndasFormsInput
                            type="number"
                            id="tempo"
                            label="Tempo"
                            placeholder="Tempo do micro-ondas"
                            value={microOndasForms.tempo}
                            handleInputValue={() => {}}
                            imageIcon="src/assets/teclado-de-discagem.svg"
                            onKeyboardClick={() => handleKeyboardToggle("tempo")}
                        />

                        <button className="text-zinc-950 w-full p-[10px] bg-primary rounded-lg cursor-pointer">
                            Enviar
                        </button>
                    </div>
                </MicroOndasFormsBox>
            </div>

            {keyboardVisible && activeField && (
                <PageLayoutKeyBoard
                    onNumberClick={handleKeyboardNumber}
                    onDelete={handleKeyboardDelete}
                    onClear={handleKeyboardClear}
                    onClose={() => {
                        setKeyboardVisible(false)
                        setActiveField(null)
                    }}
                />
            )}
            </>
        </PageLayoutMicroOndas>
    )
}

export default MicroOndasPage