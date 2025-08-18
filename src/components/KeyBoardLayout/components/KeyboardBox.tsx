import type { JSX } from "react";

interface Props {
    children: JSX.Element
}

const KeyboardBox = (props: Props) => {
    return (
        <form className="bg-neutral-700 rounded-[20px] p-8">
            {props.children}
        </form>
    )
}

export default KeyboardBox