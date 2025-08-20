import type { ChangeEvent } from "react"

interface Props {
    type: string
    id: string
    label: string
    placeholder: string
    value: number
    imageIcon: string
    handleInputValue: (event: ChangeEvent<HTMLInputElement>, field: string) => void
    onKeyboardClick?: () => void
}

const MicroOndasFormsInput = (props: Props) => {
    
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={props.id} className="ps-3 text-base-content">{props.label}</label>
            <div className="flex flex-row gap-2">
                <input onChange={(event) => {
                    props.handleInputValue(event, props.id)
                }} value={props.value} id={props.id} type={props.type} placeholder={props.placeholder} className="w-full appearance-none h-[50px] bg-base300 border border-neutral/31 rounded-[10px] text-[15px] text-base-content px-4 py-3" />
                <button type="button" onClick={props.onKeyboardClick}>
                    <img src={props.imageIcon} alt="" className="w-[26px]" />
                </button>
            </div>
        </div>

    )
}

export default MicroOndasFormsInput;