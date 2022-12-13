import { Navigate } from "react-router-dom";
import AdminBar from "../components/admin/AdminBar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FiCalendar, FiCheck, FiClock, FiCopy, FiFile, FiList, FiPlus, FiSmile, FiTarget, FiTrash } from 'react-icons/fi';
import Check from "../components/element/Check";

function HomePage() {

    const [roomList, setroomList] = useState(null);
    const [show, setShow] = useState(false)
    
    const [selection, setSelection] = useState([]);


    useEffect(() => {
        getAllroom();
        document.addEventListener('click', () => setShow(false))
    }, [])


    const getAllroom = async () => {
        try {
            const url = `${import.meta.env.VITE_API_ADDRESS}/allrooms`;
            const { data: res } = await axios({
                method: 'get',
                url: url,
                headers: {
                    'authorization': localStorage.token,
                    'Content-Type': 'application/json'
                },
            });
            setroomList(res.reverse())
            console.log(res)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.error(error.message);
            }
        }
    }

    const createNewRoom = async () => {

        try {
            const url = `${import.meta.env.VITE_API_ADDRESS}/addroom`;
            const { data: res } = await axios({
                method: 'post',
                url: url,
                headers: {
                    'authorization': localStorage.token,
                    'Content-Type': 'application/json'
                },
                data: {
                    'roomName': 'untitled',
                    'roomData': [{
                        'title': 'Welcome',
                        'content': {
                            "time": Date.now(),
                            "blocks": [
                                { 'type': 'paragraph', 'data': { "text": "Start Writing" } }
                            ],
                            "version": "2.25.0"
                        }
                    }]
                }
            });
            // console.log(res)
            window.location = `/editor?id=${res._id}`;
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.error(error.message);
            }
        }
    }


    if (!localStorage.token) {
        return <Navigate replace to='/login' />;
    } else return (
        <div className='h-screen flex flex-col'>
            <AdminBar />
            <div className="px-5">
                <div className="my-6">
                    <div className="flex justify-between">
                        <div className="flex text-neutral-400 space-x-3">
                            <button className="icn cursor-default">
                                <FiTrash />
                                Delete
                            </button>
                            <button className="icn cursor-default">
                                <FiCopy />
                                Duplicate
                            </button>
                        </div>
                        <div className="relative">
                            <button onClick={(e) => {
                                e.stopPropagation();
                                setShow(!show)
                            }} className="btn_1 icn">
                                <FiPlus className="" />
                                Create room
                            </button>
                            {show && <div onClick={(e) => e.stopPropagation()} className="absolute bg-white w-[216px] top-11 border shadow-md p-[16px] pb-[30px] rounded-lg right-0">
                                <button onClick={createNewRoom} className="icn font-medium underline underline-offset-4">
                                    <FiFile className="mr-2" />
                                    Start from blank
                                </button>
                                <button className="icn cursor-default text-neutral-300 font-medium underline underline-offset-4">
                                    <FiFile className="mr-2" />
                                    Agency template
                                </button>
                                <button className="icn cursor-default text-neutral-300 font-medium underline underline-offset-4">
                                    <FiFile className="mr-2" />
                                    Product template
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="">
                    <table className="w-full">
                        <thead className="">
                            <tr className="">
                                <th width='30px'>
                                    {/* <Check /> */}
                                </th>
                                <th width=''>
                                    <div className="th">
                                        <FiList />
                                        Name
                                    </div>

                                </th>
                                <th width='100px'>
                                    <div className="th justify-center">
                                        <FiTarget />
                                        Status
                                    </div>
                                </th>
                                <th width='200px'><div className="th justify-end">
                                    <FiSmile />
                                    Created by
                                </div></th>
                                <th width='230px'>
                                    <div className="th justify-end">
                                        <FiCalendar />
                                        Created on
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <td colSpan='100%'>
                                    <hr className="h-2 mt-1" />
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {roomList?.map((item, i) => {
                                return <tr className="cursor-pointer hover:bg-neutral-50" key={item._id}>
                                    <td>
                                        <Check id={item._id} list={setSelection} />
                                        {console.log(selection)}
                                    </td>
                                    <td onClick={() => window.location = `/editor?id=${item._id}`}>
                                        <div className="flex items-center font-medium hover:underline underline-offset-4">
                                            <FiFile className="mr-2" size={20} />
                                            {item.roomName}
                                        </div>

                                    </td>
                                    <td className="text-center">
                                        <span className="active__status">Published</span>
                                    </td>
                                    <td className="text-right font-medium">@{item.roomCreatedBy}</td>
                                    <td className="date font-medium">
                                        <div className="flex items-center justify-end">
                                            @{new Date(item.create_Date).toLocaleString("en-US",
                                                {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            <FiClock className="ml-1" size={20} />
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HomePage;