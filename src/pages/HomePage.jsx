import { Navigate } from "react-router-dom";
import AdminBar from "../components/admin/AdminBar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function HomePage() {

    const [roomList, setroomList] = useState(null);

    useEffect(() => {
        getAllroom();
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
            setroomList(res)
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
                <div className="my-7">
                    <h3 className="font-medium mb-4">Create Room From Template</h3>
                    <div className="flex space-x-6">
                        <div onClick={createNewRoom} className="template-room-card">
                            <p className="font-medium">
                                Start Blank
                            </p>
                        </div>
                        <div className="template-room-card">
                            <p className="font-medium">
                                Agency
                            </p>
                        </div>
                        <div className="template-room-card">
                            <p className="font-medium">
                                B2B Saas
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" overflow-hidden rounded-lg shadow">
                    <table className="w-full">
                        <thead className="border-b-2">
                            <tr className="">
                                <th>No</th>
                                <th>Room Name</th>
                                <th>Status</th>
                                <th>Activity</th>
                                <th>Last Seen</th>
                                <th>Created By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomList?.map((item,i) => {
                                return <tr onClick={() => window.location = `/editor?id=${item._id}`} className="cursor-pointer" key={item._id}>
                                    <td>{i+1}</td>
                                    <td>{item.roomName}</td>
                                    <td>
                                        <span className="active__status">Published</span>
                                    </td>
                                    <td>Activity</td>
                                    <td>Last Seen</td>
                                    <td>{item.roomCreatedBy}</td>
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