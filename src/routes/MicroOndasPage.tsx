import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { MicroOndasContext } from "../context/MicroOndasContext"
import { MicroOndasFormsBox, MicroOndasFormsInput, PageLayoutMicroOndas } from "../components/MicroOndasLayout"
import type { MicroOndasType } from "../types/MicroOndasType"

const MicroOndasPage = () => {
    const microOndasContext = useContext(MicroOndasContext)
    const [microOndasForms, setMicroOndasForms] = useState<MicroOndasType>({
        potencia: 0,
        tempo: 0
    });

    function handleInputValue(event: ChangeEvent<HTMLInputElement>, fieldId: string) {
        setMicroOndasForms((prev) => ({
            ...prev,
            [fieldId]: event.target.value
        }))
    }

    const [potenciaValue,setPotenciaValue] = useState(
        {
            fieldId:"potencia",
            fieldLabel:"Potencia",
            fieldPlaceholder:"Potencia do micro-ondas",
            fieldType:"potencia",
        }
    )

    const [tempoValue,setTempoValue] = useState(
        {
            fieldId:"tempo",
            fieldLabel:"Tempo",
            fieldPlaceholder:"Tempo do micro-ondas",
            fieldType:"tempo",

        }
    )

     useEffect(()=>{
        console.log(microOndasForms)
    },[microOndasForms])


    return (
        <PageLayoutMicroOndas right={true} pageText={<p className="text-xl lg:w-[300px] xl:w-auto 2xl:w-auto text-end"> </p>}>
            <div className="w-[320px] lg:w-[384px] flex lg:block justify-center">
                <div className="w-full flex justify-center lg:justify-end">
                    <div className="w-full">
                        <h1 className="text-base-content text-[20px] font-medium text-center mb-5"></h1>
                        <MicroOndasFormsBox>
                             <div className="w-full flex flex-col gap-5">
                                <MicroOndasFormsInput type={potenciaValue.fieldType} id={potenciaValue.fieldId} label={potenciaValue.fieldLabel} placeholder={potenciaValue.fieldPlaceholder} value={microOndasForms.potencia} handleInputValue={handleInputValue}></MicroOndasFormsInput>
                                <MicroOndasFormsInput type={tempoValue.fieldType} id={tempoValue.fieldId} label={tempoValue.fieldLabel} placeholder={tempoValue.fieldPlaceholder} value={microOndasForms.tempo} handleInputValue={handleInputValue}></MicroOndasFormsInput>
                                <button className="text-zinc-950 w-full p-[10px] bg-primary rounded-lg cursor-pointer">Enviar</button>
                                
                            </div>
                        </MicroOndasFormsBox>
                    </div>
                </div>
            </div>
        </PageLayoutMicroOndas>
    )
}

export default MicroOndasPage;