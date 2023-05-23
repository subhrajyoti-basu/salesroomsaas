import { Navigate } from "react-router-dom";
import AdminBar from "../components/admin/AdminBar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FiBarChart2, FiCalendar, FiCheck, FiClock, FiCopy, FiEdit, FiEdit2, FiFile, FiLink, FiList, FiPlus, FiSmile, FiTarget, FiTrash, FiX } from 'react-icons/fi';
import Check from "../components/element/Check";
import { fetchRooms, getData } from "../services/fetchRooms";
import FullscreenLoader from "../components/loading/FullscreenLoader";

function HomePage() {

    const [roomList, setroomList] = useState(null);
    const [show, setShow] = useState(false)
    const [limit, setLimit] = useState('');
    const [activeloader, setactiveLoader] = useState(false)
    const [selection, setSelection] = useState([]);
    const [copy, setcopy] = useState(true)

    const copyLink = (id) => {
        navigator.clipboard.writeText(`https://${document.location.host}/room?id=${id}`)
    }

    const duplicateRoom = (index) => {
        setactiveLoader(true)
        getData(roomList[index]._id).then(async a => {
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
                        'roomName': roomList[index].roomName + ' - copy',
                        'roomData': a.roomData,
                    }
                });

                // console.log(res)
                
                fetchRooms().then((a) => {
                    setroomList(a)
                    setactiveLoader(false)
                })
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    console.error(error.message);
                    setLimit(error.response.data.message)
                }
            }
        })

    }

    const deleteRoom = async () => {
        setactiveLoader(true)
        try {
            const url = `${import.meta.env.VITE_API_ADDRESS}/delroom`;

            const { data: res } = await axios({
                method: 'delete',
                url: url + `/${selection.toString()}`,
                headers: {
                    'authorization': localStorage.token,
                    'Content-Type': 'application/json'
                },
            });
            
            fetchRooms().then(a => {
                setroomList(a)
                setactiveLoader(false)
            })
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

    useEffect(() => {
        setactiveLoader(true)
        fetchRooms()
        .catch(e => setLimit(e.message))
        .then(a => {
            setroomList(a)
            setactiveLoader(false)
        })
        document.addEventListener('click', () => setShow(false))
    }, [])

    const openEditor = (id) => window.location = `/editor?id=${id}`


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
            window.location = `/editor?id=${res.roomId}`;
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.error(error.message);
                setLimit(error.response.data.message)
            }
        }
    }


    if (!localStorage.token) {
        return <Navigate replace to='/login' />;
    } else return (
        <div>
            {activeloader && <FullscreenLoader />}
        <div className='h-screen flex flex-col relative'>
            {limit == 'inactive user' &&
                <div className="bg-neutral-400/60 w-full h-full absolute z-30">
                    <div className="bg-white max-w-[350px] absolute left-1/2 p-2 top-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-md">
                        <div className="space-y-5 px-4 py-4">

                            <h2>Sorry 🙇‍♂️ <br />your account is not active yet</h2>
                            <div className="space-y-2">
                                <p>I'm approving the accounts manually. If you just signed up, please have patience.</p>
                                <p>For any query and review, you can connect to me over twitter <a href="https://twitter.com/_lunatic_lord_" className="text-sky-400"> @_lunatic_lord_ </a></p>
                            </div>
                        </div>

                    </div>
                </div>}
            {limit == 'Cannot make more rooms!' &&
                <div className="bg-neutral-400/60 w-full h-full absolute z-30">
                    <div className="bg-white max-w-[350px] absolute left-1/2 p-2 top-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-md">
                        <div className="text-right">
                            <button onClick={() => setLimit('')}>
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className="space-y-5 px-4 pb-4">

                            <h2>Sorry 🙇‍♂️ <br />room limit reached</h2>
                            <div className="">
                                <p>Currently, on beta access only 5 rooms are available.</p>
                                <p>In case you are in need of more rooms, you can connect to me over twitter <a href="https://twitter.com/_lunatic_lord_" className="text-sky-400"> @_lunatic_lord_ </a></p>
                            </div>
                        </div>

                    </div>
                </div>}

            <AdminBar />
            <div className="px-5">
                <div className="my-6">
                    <div className="flex justify-between">
                        <div className="flex  space-x-3">
                            <button
                                className={`icn ${selection.length == 0 ? 'cursor-default pointer-events-none text-neutral-400' : 'cursor-pointer'}`}
                                onClick={deleteRoom}
                            >
                                <FiTrash />
                                Delete
                            </button>
                            <button className="icn cursor-default text-neutral-400">
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
                                return <tr className="group cursor-pointer hover:bg-neutral-50" key={item._id}>
                                    <td>
                                        <Check id={item._id} list={setSelection} />
                                    </td>
                                    <td>
                                        <div className="flex items-center font-medium">
                                            <div className="flex items-center">
                                                <FiFile className="mr-2" size={20} />
                                                <div className="truncate max-w-[300px]">{item.roomName}</div>
                                            </div>
                                            <div className="ml-5 space-x-1 hidden group-hover:flex">
                                                <button onClick={() => openEditor(item._id)} className="flex hover:bg-neutral-200 py-[2px] px-2 rounded-md items-center text-xs">
                                                    <FiEdit2 className="mr-2" size={15} />
                                                    Edit
                                                </button>
                                                <button onClick={() => duplicateRoom(i)} className="flex hover:bg-neutral-200 py-[2px] px-2 rounded-md items-center text-xs">
                                                    <FiCopy className="mr-2" size={15} />
                                                    Duplicate
                                                </button>
                                                {/* <button className="flex items-center text-xs">
                                                    <FiBarChart2 className="mr-2" size={15} />
                                                    Details
                                                </button> */}
                                                <button
                                                onMouseLeave={() => setcopy(true)}
                                                onClick={
                                                    () => {
                                                        copyLink(item._id)
                                                        setcopy(false)

                                                    }} 
                                                    className="flex group copy relative hover:bg-neutral-200 py-[2px] px-2 rounded-md items-center text-xs">
                                                    <FiLink className="mr-2" size={15} />
                                                    Copy link

                                                    <div className="bg-green-300 hidden group-[.copy]:group-hover:block py-[3px] px-3 rounded-md left-1/2 -translate-x-1/2 absolute top-6">
                                                        {copy ? 'Copy' : 'Copied!'}
                                                    </div>
                                                </button>

                                            </div>
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
        </div>
    );
}

export default HomePage;