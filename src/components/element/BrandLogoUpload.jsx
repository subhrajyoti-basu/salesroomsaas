import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { AiOutlineCloudUpload, AiOutlineLink } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { brandImage } from "../../recoil/atom";
import Popup from "./Popup";





function BrandLogoUpload() {

    const [state, setState] = useRecoilState(brandImage);
    const [show, setShow] = useState(false)

    function handleChange(e) {
        setState(e.target.value)
    }

    useEffect(() => {

        if (show) {
            window.addEventListener('click', () => {
                setShow(false);
            })
        }
        

    }, [show])

    return (
        <div className="relative mb-10">
            <div className={`relative overflow-hidden h-[100px] w-[100px] border group rounded-full ${state != '' ? 'bg-white': 'bg-neutral-300'}`}>
                <div className="h-full w-full ">
                    {state &&
                    <img src={state} className="h-full w-full object-cover object-center" />}
                </div>
                <button className="w-full group-hover:bg-black/30 absolute top-0 left-0 h-full flex justify-center items-center" onClick={(e)=>{
                     e.stopPropagation()
                    setShow(true);
                }}>
                    <AiOutlineCloudUpload className={`${state != '' ? 'text-transparent': 'text-neutral-400'}  group-hover:text-neutral-200`} size={40} />
                </button>
            </div>
            {show && 
            <Popup>
                <form onSubmit={()=> {
                    setShow(false);
                }} className="w-[250px]">
                   <AiOutlineLink className="absolute top-[7px] left-3" size={20} /> <input type='link' onChange={handleChange} className="pr-2 pl-7 outline-none border w-full"></input>
                </form>
            </Popup>}
        </div>
    );
}

export default BrandLogoUpload;