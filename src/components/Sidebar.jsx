import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsPlus } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useRecoilState } from "recoil";
import { dataLoaded, editorShow, editorState, load1 } from "../recoil/atom";
import Popup from "./element/Popup";



function Sidebar() {
    const [show, setshow] = useState(false);
    const [showadd, setshowadd] = useState(false);
    const [index, setindex] = useState();
    const [load, setLoad] = useRecoilState(dataLoaded)
    const [shouldload, setshouldload] = useRecoilState(load1);
    const clickOutside = useRef(null);
    // Recoil States

    // takes the index number of sidebar for showing right side content
    const [contentShow, setContentShow] = useRecoilState(editorShow);

    // send full page data to global state
    const [sidebar, setsidebar] = useRecoilState(editorState);

    function replaceItemAtIndex(arr, index, newValue) { return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]; }

    function removeItemAtIndex(arr, index) { return [...arr.slice(0, index), ...arr.slice(index + 1)]; }

    const handleChange = (event) => {
        const newValue = { ...sidebar[contentShow], title: event.target.value }
        setsidebar(replaceItemAtIndex(sidebar, contentShow, newValue))
        // setshouldload(true)
    }

    const removeSection = (i) => {
        setsidebar(removeItemAtIndex(sidebar,i))
    }

    const addSection = (event) => {
        var clone = sidebar.slice(0)
        clone[index] = {
            title: event.target.value,
            content: {
                "time": Date.now(),
                "blocks": [
                    { 'type': 'paragraph', 'data': { "text": "Press TAB for more menu" } }
                ],
                "version": "2.25.0"
            }
        }
        setsidebar([...clone])
    }

    function handleRename(e) {
        e.preventDefault();
        setshow(false);
        setshouldload(!shouldload);
        if (sidebar[sidebar.length - 1] == '') {
            sidebar.pop();
        }
        
    }

    useEffect(() => {

        if (show) {
            window.addEventListener('click', () => {
                setshow(false);
                setshouldload(!shouldload);
                if (sidebar[sidebar.length - 1] == '') {
                    sidebar.pop();
                }
            })
        }
        

    }, [show])



    return (
        <div className='w-[270px] pt-[80px] px-2 space-y-2 h-full text-gray-500 bg-neutral-100'>
            {load && sidebar.map((item, i) => {
                return <li key={i}
                    onClick={() => {
                        setContentShow(i)
                    }}
                    className={`${contentShow == i && 'bg-neutral-300 text-gray-800'} relative space-x-2 flex flex-nowrap items-center group  justify-between list-none rounded-md font-medium capitalize py-[1px] px-4 cursor-pointer hover:bg-neutral-200`}>
                    <p className="truncate w-full">{item.title}</p>
                    <FiMoreHorizontal onClick={(e) => {
                        e.stopPropagation()
                        setContentShow(i)
                        setshow(!show)
                        setindex(i)
                        setshowadd(false)
                    }} className=" text-black hidden group-hover:block" />
                    {sidebar.length > 1 &&
                    <AiOutlineDelete onClick={() => {
                        removeSection(i)
                    }} className=" text-black hidden group-hover:block" />}
                    {show && index == i &&
                        <Popup >
                            <form onSubmit={handleRename}>
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
                    setsidebar(sidebar.slice(0, -1))
                }
                setindex(sidebar.length)

            }} className="relative flex items-center list-none rounded-md font-medium capitalize py-[1px] pl-10 cursor-pointer hover:bg-neutral-200"><BsPlus size={20} />
                Add new section
                {showadd &&
                    <Popup >
                        <form onSubmit={(e) => {
                            if (sidebar[sidebar.length - 1] == '') {
                                setsidebar(sidebar.slice(0, -1))
                            }
                            e.preventDefault();
                            setshowadd(false);
                            setshouldload(!shouldload);
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