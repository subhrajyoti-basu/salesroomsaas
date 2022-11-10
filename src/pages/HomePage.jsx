import { Navigate } from "react-router-dom";
import AdminBar from "../components/admin/AdminBar";
import axios from "axios";

function HomePage() {

    const createNewRoom = async() => {
        
        try {
			const url = "http://localhost:4000/addroom";
			const { data: res } = await axios({
                method: 'post',
                url: url, 
                headers: { 
                    'authorization': localStorage.token, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {'roomName': 'untitled'}
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


    if(!localStorage.token){
		return <Navigate replace to='/login' />;
	}else return (
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
                            <tr className="" >
                                <td>1</td>
                                <td>Room Name</td>
                                <td>
                                    <span className="paused__status">paused</span>
                                    </td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>2</td>
                                <td>Room Name</td>
                                <td>
                                    <span className='active__status'>
                                        active
                                        </span></td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>3</td>
                                <td>Room Name</td>
                                <td>Status</td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>4</td>
                                <td>Room Name</td>
                                <td>Status</td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>5</td>
                                <td>Room Name</td>
                                <td>Status</td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>6</td>
                                <td>Room Name</td>
                                <td>Status</td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>7</td>
                                <td>Room Name</td>
                                <td>Status</td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>8</td>
                                <td>Room Name</td>
                                <td>Status</td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>9</td>
                                <td>Room Name</td>
                                <td>Status</td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                            <tr className="" >
                                <td>10</td>
                                <td>Room Name</td>
                                <td>Status</td>
                                <td>Activity</td>
                                <td>Last Seen</td>
                                <td>Created By</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HomePage;