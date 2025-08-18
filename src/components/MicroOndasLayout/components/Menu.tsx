import LogoSm from "../../../assets/images/logo_sm.png";

const Menu = () => {
    return (<div className="flex items-center justify-center py-[15px] px-5 lg:px-[80px] 2xl:px-[150px] text-base-content absolute w-full">
        <div className="flex items-center justify-around gap-[10px]">
        </div>
        <div className="hidden lg:flex gap-[25px]">
            <a href="" target="_blank" rel="noopener noreferrer">Micro-ondas</a>
           <a href="" target="_blank" rel="noopener noreferrer">Cadastrar item</a>
        </div>
    </div>);
}

export default Menu;