import { useContext, useState, useEffect } from "react";
import { MicroOndasContext } from "../context/MicroOndasContext";
import { Menu, MicroOndasFormsBox, MicroOndasFormsInput, PageLayoutMicroOndas } from "../components/MicroOndasLayout";
import { AquecimentoDisplay } from "../components/AquecimentoLayout";
import PageLayoutKeyBoard from "../components/KeyBoardLayout/KeyBoardLayout";
import { MicroOndasValidator } from "../utils/validator";
import { useApi } from "../hooks/UseApi";
import type { MicroOndasType } from "../types/MicroOndasType";
import Timer from "../components/Timer/LayoutTimer";

const validator = new MicroOndasValidator();

const MicroOndasPage = () => {
    const microOndasContext = useContext(MicroOndasContext);
    const api = useApi();

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [activeField, setActiveField] = useState<"potencia" | "tempo" | null>(null);
    const [mostrarAquecimento, setMostrarAquecimento] = useState(false);
    const [microOndasForms, setMicroOndasForms] = useState<MicroOndasType>({ potencia: 0, tempo: 0, execucao: true, status: 0 });
    const [tempoRestante, setTempoRestante] = useState(0);
    const [errors, setErrors] = useState<{ potencia?: string; tempo?: string }>({});

    const handleKeyboardToggle = (field: "potencia" | "tempo") => {
        setKeyboardVisible(prev => !(prev && activeField === field));
        setActiveField(field);
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

    const handleInputValue = (field: "potencia" | "tempo", value: string) => {
        const num = Number(value);
        setMicroOndasForms(prev => ({ ...prev, [field]: num }));
        setErrors(prev => ({
            ...prev,
            [field]: field === "tempo"
                ? validator.validarTempo(num) ? undefined : "Tempo inválido (1 a 120 segundos)"
                : validator.validarPotencia(num) ? undefined : "Potência inválida (1 a 10)"
        }));
    };

    const handleIniciarAquecimento = async () => {
        const tempoFinal = microOndasForms.tempo;
        const potenciaFinal = microOndasForms.potencia || validator.potenciaPadrao();

        const tempoValido = validator.validarTempo(tempoFinal);
        const potenciaValida = validator.validarPotencia(potenciaFinal);

        setErrors({
            tempo: tempoValido ? undefined : "Tempo inválido (1 a 120 segundos)",
            potencia: potenciaValida ? undefined : "Potência inválida (1 a 10)"
        });

        if (!tempoValido || !potenciaValida) return;

        try {
            const response = await api.iniciarAquecimento(potenciaFinal, tempoFinal);

            setMicroOndasForms(prev => ({
                ...prev,
                tempo: response.tempo ?? prev.tempo,
                potencia: response.potencia ?? prev.potencia,
                execucao: response.execucao ?? prev.execucao,
                status: response.status ?? prev.status
            }));

            setTempoRestante(response.tempo ?? tempoFinal);
            setMostrarAquecimento(true);

        } catch (error) {
            console.error("Erro ao iniciar aquecimento:", error);
        }
    };

    const handlePausarDesligar = async () => {
        try {
            console.log({
                potencia: microOndasForms.potencia,
                tempo: tempoRestante,
                execucao: microOndasForms.execucao,
                status: microOndasForms.status
            });
            const response = await api.pausar_desligar(
                microOndasForms.potencia,
                tempoRestante,
                microOndasForms.execucao,
                microOndasForms.status
            );

            setMicroOndasForms(prev => ({
                ...prev,
                tempo: response.tempo ?? prev.tempo,
                potencia: response.potencia ?? prev.potencia,
                execucao: response.execucao ?? prev.execucao,
                status: response.status ?? prev.status
            }));

            if (response.status === 0 || response.status === 1) {
                setMostrarAquecimento(true);
            } else if (response.status === 2) {
                setMostrarAquecimento(false);
                setTempoRestante(0);
            }
        } catch (error) {
            console.error("Erro ao pausar/desligar:", error);
        }
    };

    const handleAcrescentarTempo = async () => {
        try {
            const response = await api.acrescentarTempo(
                microOndasForms.potencia,
                microOndasForms.tempo,
                microOndasForms.execucao,
                microOndasForms.status
            );

            setTempoRestante(response.tempo);
            setMicroOndasForms(prev => ({
                ...prev,
                potencia: response.potencia ?? prev.potencia,
                tempo: response.tempo ?? prev.tempo,
                execucao: response.execucao ?? prev.execucao,
                status: response.status ?? prev.status
            }));
        } catch (error) {
            console.error("Erro ao acrescentar tempo:", error);
        }
    };;

    const handleIniciarRapido = async () => {
        try {
            const response = await api.iniciorapido();
            const tempo = response.data?.tempo ?? 10;
            const potencia = response.data?.potencia ?? 10;
            const execucao = response.data?.execucao ?? true;
            const status = response.data?.status ?? 0;

            setMicroOndasForms({
                potencia,
                tempo,
                execucao,
                status
            });

            setTempoRestante(tempo);
            setMostrarAquecimento(true);

            await api.iniciarAquecimento(potencia, tempo);

            console.log("Início rápido:", { tempo, potencia });
        } catch (error) {
            console.error("Erro ao iniciar rápido:", error);
        }
    };
    return (
        <div>
            <Menu />
            <div className="flex w-full min-h-screen gap-5 p-5">

                <PageLayoutMicroOndas right={true} pageText={<p className="text-xl"></p>}>
                    <div className="w-[320px] lg:w-[384px] flex lg:block justify-center">
                        {mostrarAquecimento && (
                            <div className="mb-4 text-center text-2xl font-bold">
                                <Timer
                                    tempoInicial={tempoRestante}
                                    ativo={tempoRestante>0}
                                    onComplete={() => setMostrarAquecimento(true)}
                                />
                            </div>
                        )}
                        <MicroOndasFormsBox>
                            <div className="flex flex-col gap-5">
                                <MicroOndasFormsInput
                                    type="number"
                                    id="potencia"
                                    label="Potência"
                                    placeholder="Potência do micro-ondas"
                                    value={microOndasForms.potencia}
                                    handleInputValue={(e) => handleInputValue("potencia", e.target.value)}
                                    imageIcon="src/assets/teclado-de-discagem.svg"
                                    onKeyboardClick={() => handleKeyboardToggle("potencia")}
                                />
                                {errors.potencia && <p className="text-red-500 text-sm mt-1">{errors.potencia}</p>}

                                <MicroOndasFormsInput
                                    type="number"
                                    id="tempo"
                                    label="Tempo"
                                    placeholder="Tempo do micro-ondas"
                                    value={microOndasForms.tempo}
                                    handleInputValue={(e) => handleInputValue("tempo", e.target.value)}
                                    imageIcon="src/assets/teclado-de-discagem.svg"
                                    onKeyboardClick={() => handleKeyboardToggle("tempo")}
                                />
                                {errors.tempo && <p className="text-red-500 text-sm mt-1">{errors.tempo}</p>}

                                <button
                                    type="button"
                                    className="text-zinc-950 w-full p-[10px] bg-primary rounded-lg cursor-pointer"
                                    onClick={handleIniciarAquecimento}
                                >
                                    Iniciar
                                </button>

                                <button
                                    type="button"
                                    className="text-zinc-950 w-full p-[10px] bg-secondary rounded-lg cursor-pointer"
                                    onClick={handlePausarDesligar}
                                >
                                    Pausar/Desligar
                                </button>

                                <button
                                    type="button"
                                    className="text-zinc-950 w-full p-[10px] bg-tertiary rounded-lg cursor-pointer"
                                    onClick={() => handleAcrescentarTempo()}
                                >
                                    +30s
                                </button>

                                <button
                                    type="button"
                                    className="text-zinc-950 w-full p-[10px] bg-primary rounded-lg cursor-pointer"
                                    onClick={handleIniciarRapido}
                                >
                                    Iniciar Rápido
                                </button>
                            </div>
                        </MicroOndasFormsBox>

                        {keyboardVisible && activeField && (
                            <PageLayoutKeyBoard
                                onNumberClick={handleKeyboardNumber}
                                onDelete={handleKeyboardDelete}
                                onClear={handleKeyboardClear}
                                onClose={() => { setKeyboardVisible(false); setActiveField(null); }}
                            />
                        )}
                    </div>
                </PageLayoutMicroOndas>

                <div className="flex-1 flex items-center justify-center">
                    {mostrarAquecimento && (
                        <AquecimentoDisplay
                            tempo={tempoRestante}
                            potencia={microOndasForms.potencia || 10}
                            onComplete={() => setMostrarAquecimento(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MicroOndasPage;
