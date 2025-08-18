import type { JSX } from "react";

interface Props {
    children: JSX.Element
}

const MicroOndasFormsBox = (props: Props) => {
    return (
        <form className="border rounded-[20px] p-8">
            {props.children}
        </form>
    )
}

export default MicroOndasFormsBox