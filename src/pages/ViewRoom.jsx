import axios from "axios";
import { useState } from "react";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Output from 'editorjs-react-renderer';

const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search, [search]))
}


function ViewRoom() {
    const [data, setData] = useState();
    const query = useQuery();
    const ID = query.get('id')

    const getData = async () => {
        try {

            const url = `http://localhost:4000/room/${ID}`;
            const { data: res } = await axios({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setData(res.roomData);


        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.error(error.response.data.message);
            }
        }
    }


    useEffect(() => {
        getData()
    }, [ID])

    return (
        <div className="flex h-screen">
            <div className="w-[270px] md:block hidden px-2 pt-5 shadow z-10 space-y-2 h-full text-gray-500 bg-neutral-100">
                {data?.map((item, i) => {
                    return <div
                        className="sidebar__element"
                        key={i} >
                        <a href={`#${item.title}`}>
                            {item.title}
                        </a>
                    </div>
                })}
            </div>
            <div className="w-full overflow-y-auto">
                <div className="max-w-[750px] mx-auto my-48 space-y-24 ">
                    {data?.map((item, i) => {
                        return (
                            <div id={item.title} key={i}>
                                <h1 className="display1 capitalize mb-10">{item.title}</h1>
                                <Output data={item.content} />
                            </div>
                        )
                    })}
                    
                </div>
                <div className="text-center py-10 bg-neutral-100">Build with Salesroom</div>
            </div>
            
        </div>
    );
}

export default ViewRoom;