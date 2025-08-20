// MicroOndasPage.tsx
import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { MicroOndasContext } from "../context/MicroOndasContext"
import { Menu, MicroOndasFormsBox, MicroOndasFormsInput, PageLayoutMicroOndas } from "../components/MicroOndasLayout"
import type { MicroOndasType } from "../types/MicroOndasType"
import PageLayoutKeyBoard from "../components/KeyBoardLayout/KeyBoardLayout"
import { AquecimentoDisplay } from "../components/AquecimentoLayout"

const MicroOndasPage = () => {
    const microOndasContext = useContext(MicroOndasContext);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [activeField, setActiveField] = useState<"potencia" | "tempo" | null>(null);
    const [mostrarAquecimento, setMostrarAquecimento] = useState(false);

    const [microOndasForms, setMicroOndasForms] = useState<MicroOndasType>({
        potencia: 0,
        tempo: 1,
        execucao: true,
        status: 0
    });

    const handleKeyboardToggle = (field: "potencia" | "tempo") => {
        if (keyboardVisible && activeField === field) {
            setKeyboardVisible(false);
            setActiveField(null);
        } else {
            setKeyboardVisible(true);
            setActiveField(field);
        }
    };

    const handleKeyboardNumber = (num: number) => {
        if (!activeField) return;
        setMicroOndasForms(prev => ({
            ...prev,
            [activeField]: Number(String(prev[activeField]) + num)
        }));
    };

    const handleKeyboardDelete = () => {
        if (!activeField) return;
        setMicroOndasForms(prev => ({
            ...prev,
            [activeField]: Number(String(prev[activeField]).slice(0, -1) || "0")
        }));
    };

    const handleKeyboardClear = () => {
        if (!activeField) return;
        setMicroOndasForms(prev => ({
            ...prev,
            [activeField]: 0
        }));
    };

    const handleIniciarAquecimento = () => {
        if (microOndasForms.tempo < 1) setMicroOndasForms(prev => ({ ...prev, tempo: 1 }));
        if (microOndasForms.potencia < 1) setMicroOndasForms(prev => ({ ...prev, potencia: 10 }));
        setMostrarAquecimento(true);
    };

    return (
        <div>
            <Menu />

            <div className="flex w-full min-h-screen gap-5 p-5">
                <PageLayoutMicroOndas right={true} pageText={<p className="text-xl"></p>}>
                    <div className="w-[320px] lg:w-[384px] flex lg:block justify-center">
                        <MicroOndasFormsBox>
                            <div className="flex flex-col gap-5">
                                <MicroOndasFormsInput
                                    type="number"
                                    id="potencia"
                                    label="Potência"
                                    placeholder="Potência do micro-ondas"
                                    value={microOndasForms.potencia}
                                    handleInputValue={() => { }}
                                    imageIcon="src/assets/teclado-de-discagem.svg"
                                    onKeyboardClick={() => handleKeyboardToggle("potencia")}
                                />
                                <MicroOndasFormsInput
                                    type="number"
                                    id="tempo"
                                    label="Tempo"
                                    placeholder="Tempo do micro-ondas"
                                    value={microOndasForms.tempo}
                                    handleInputValue={() => { }}
                                    imageIcon="src/assets/teclado-de-discagem.svg"
                                    onKeyboardClick={() => handleKeyboardToggle("tempo")}
                                />
                                <button
                                    type="button"
                                    className="text-zinc-950 w-full p-[10px] bg-primary rounded-lg cursor-pointer"
                                    onClick={handleIniciarAquecimento}
                                >
                                    Enviar
                                </button>
                            </div>
                        </MicroOndasFormsBox>

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
                    </div>
                </PageLayoutMicroOndas>
                <div>
                    Microondas
                    <div className="flex- flex items-center justify-center ">
                        <div className="flex-1 flex items-center justify-center bg-base200 p-[200px] border rounded-lg shadow-md w-[300px] h-[300px]">
                            {mostrarAquecimento && (
                                <AquecimentoDisplay
                                    tempo={microOndasForms.tempo}
                                    potencia={microOndasForms.potencia || 10}
                                    onComplete={() => setMostrarAquecimento(false)}
                                />
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MicroOndasPage