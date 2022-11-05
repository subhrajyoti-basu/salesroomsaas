import { useState } from "react";
import { BsPlus } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useRecoilState } from "recoil";
import { editorShow, editorState } from "../recoil/atom";
import Popup from "./element/Popup";



function Sidebar() {
    const [show, setshow] = useState(false);
    const [showadd, setshowadd] = useState(false);
    const [index, setindex] = useState();

    // Recoil States

    // takes the index number of sidebar for showing right side content
    const [contentShow, setContentShow] = useRecoilState(editorShow);
    
    // send full page data to global state
    const [sidebar, setsidebar] = useRecoilState(editorState);
    
    const [active, setactive] = useState(false)

    const handleChange = (event) => {
        var clone = sidebar.slice(0)       
        clone[index] = { title: event.target.value }
        setsidebar([...clone])


    }
    const addSection = (event) => {
        var clone = sidebar.slice(0)
        clone[index] = { title: event.target.value }
        setsidebar([...clone])
    }

    
    
    return (
        <div className='w-[270px] md:block hidden px-2 pt-5 space-y-2 h-full text-gray-500 bg-neutral-100'>
            {sidebar.map((item, i) => {
                return <li key={i} 
                onClick={() => {
                    setContentShow(i)
                }} 
                className={`${contentShow == i && 'bg-neutral-300 text-gray-800'} relative flex flex-nowrap items-center group  justify-between list-none rounded-md font-medium capitalize py-[1px] px-4 cursor-pointer hover:bg-neutral-200`}>
                    <p className="truncate w-full">{item.title}</p>
                    <FiMoreHorizontal onClick={() => {
                        setshow(!show)
                        setindex(i)
                        setshowadd(false)
                    }} className=" text-black group-hover:block" />
                    {show && index == i &&
                        <Popup >
                            <form onSubmit={(e) => {
                            e.preventDefault();
                            setshow(false);
                            if (sidebar[sidebar.length - 1] == '') {
                                sidebar.pop();
                            }
                        }}>
                            <input autoFocus className="outline-none px-3 w-full border rounded border-neutral-300" defaultValue={sidebar[index].title} onChange={handleChange} ></input>
                            <input type="submit" hidden />
                            </form>
                        </Popup>}

                </li>
            })}
            <li onClick={() => {
                setshowadd(!showadd);
                setshow(false)
                if (showadd == false) {
                    setsidebar([...sidebar, ''])
                }
                if (sidebar[sidebar.length - 1] == '') {
                    setsidebar(sidebar.slice(0,-1))
                }
                setindex(sidebar.length)
                
            }} className="relative flex items-center list-none rounded-md font-medium capitalize py-[1px] pl-10 cursor-pointer hover:bg-neutral-200"><BsPlus size={20} />
                Add new section
                {showadd &&
                    <Popup >
                        <form onSubmit={(e) => {
                            if (sidebar[sidebar.length - 1] == '') {
                                setsidebar(sidebar.slice(0,-1))
                            }
                            e.preventDefault();
                            setshowadd(false);
                        }}>
                            <input autoFocus className="outline-none px-3 w-full border rounded border-neutral-300" placeholder="Enter the section name" onChange={addSection} ></input>
                            <input type="submit" hidden />
                        </form>
                    </Popup>}
            </li>
            
        </div>
    );
}

export default Sidebar;