import { useState } from "react";
import KeyboardBox from "./components/KeyboardBox"
import KeyBoardFormsInput from "./components/KeyBoardFormsInput"

const PageLayoutKeyBoard = () => {
    const [inputValue, setInputValue] = useState('');

    const handleNumberClick = (number: number) => {
        setInputValue(inputValue + number);
    };

    const handleClear = () => {
        setInputValue('');
    };

    const handleDelete = () => {
        setInputValue(inputValue.slice(0, -1));
    };


    return (
        <div className="w-[160px] lg:w-[300px] flex lg:block justify-center">
            <div className="w-full flex justify-center lg:justify-end">
                <div className="">
                    <h1 className="text-base-content text-[20px] font-medium text-center mb-5 "></h1>
                    <KeyboardBox>
                        <div>
                            <div className="w-full flex flex-row gap-10 ">
                                {[7, 8, 9].map((number) => (
                                    <button className='text-[50px] text-white' key={number} onClick={() => handleNumberClick(number)}>
                                        {number}
                                    </button>
                                ))}
                            </div>
                            <div className="w-full flex flex-row gap-10">
                                {[4, 5, 6].map((number) => (
                                    <button className='text-[50px] text-white' key={number} onClick={() => handleNumberClick(number)}>
                                        {number}
                                    </button>
                                ))}
                            </div>
                            <div className="w-full flex flex-row gap-10">
                                {[1, 2, 3].map((number) => (
                                    <button className='text-[50px] text-white' key={number} onClick={() => handleNumberClick(number)}>
                                        {number}
                                    </button>
                                ))}
                            </div>
                            <div className="w-full flex flex-row gap-13">
                                <button className='text-[50px] text-white ' onClick={() => handleNumberClick(0)}>0</button>
                                <button className='text-[50px] text-white' onClick={handleDelete}>⌫</button>
                                <button className='text-[50px] text-white' onClick={handleClear}>C</button>
                            </div>
                        </div>

                    </KeyboardBox>
                </div>
            </div>
        </div>
    )
}

export default PageLayoutKeyBoard;