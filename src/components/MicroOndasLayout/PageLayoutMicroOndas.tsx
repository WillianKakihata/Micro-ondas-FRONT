import type { JSX } from "react"
import Menu from "./components/Menu"

interface Props {
    pageText: JSX.Element
    children: JSX.Element
    right: boolean
}

const PageLayoutMicroOndas = (props: Props) => {
    return (
        <div className={`flex ${props.right ? 'flex-row' : 'flex-row-reverse'} bg-base200 min-h-screen w-full font-poppins overflow-x-hidden`}>
            <Menu />
            <div className={`w-full flex lg:block justify-center lg:w-1/2 xl:w-1/2 2xl:w-2/5 h-full pt-[100px] pb-20 ${props.right ? 'ps-0 lg:ps-[80px] 2xl:ps-[150px]' : 'pe-0 lg:pe-[80px] 2xl:pe-[150px]'}`}>
                {props.children}
            </div>
            <div className={`hidden lg:flex flex-col gap-[30px] lg:w-1/2 xl:w-1/2 2xl:w-3/5 bg-cover text-white pt-[150px] ${props.right ? 'pe-0 items-end lg:pe-[80px] 2xl:pe-[150px]' : 'ps-0 bg-right items-start lg:ps-[80px] 2xl:ps-[150px]'}`}>
                <div className="flex justify-center xl:mt-10 items-end gap-[10px] text-wrap">
                    {props.pageText}
                </div>
            </div>
        </div>
    )
}

export default PageLayoutMicroOndas;
