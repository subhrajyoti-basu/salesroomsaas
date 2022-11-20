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
    const [brandLogo, setbrandlogo] = useState();
    const query = useQuery();
    const ID = query.get('id')

    const getData = async () => {
        try {
            const url = `${import.meta.env.VITE_API_ADDRESS}/room/${ID}`;
            const { data: res } = await axios({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setData(res.roomData);
            setbrandlogo(res.brandPhoto);


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
                    return (
                        <div key={i}>
                            <a href={`#${item.title}`}>
                                <div
                                    className="sidebar__element"
                                >
                                    {item.title}
                                </div>
                            </a>
                        </div>)

                })}
            </div>
            <div className="w-full overflow-y-auto">
                <div className="text-right max-w-[750px] px-4 mx-auto py-10">
                    Build with <a className="underline font-bold" href="https://marketled.online/"> MarketLed </a>
                </div>
                <div className="max-w-[750px] mx-auto my-10 md:my-48 space-y-9 ">
                    {brandLogo &&
                        <div className="px-4">
                            <div className={`relative overflow-hidden h-[100px] w-[100px] border group rounded-full bg-neutral-300`}>
                                <div className="h-full w-full ">
                                    <img src={brandLogo} className="h-full w-full object-cover object-center" />
                                </div>
                            </div>
                        </div>}
                    {data?.map((item, i) => {
                        return (
                            <div className="px-4" id={item.title} key={i}>
                                <h1 className="display1 capitalize mb-10">{item.title}</h1>
                                <Output data={item.content} />
                            </div>
                        )
                    })}

                </div>
                <div className="text-center py-10 bg-neutral-100">Build with <a className="underline font-bold" href="https://marketled.online/"> MarketLed </a></div>
            </div>

        </div>
    );
}

export default ViewRoom;