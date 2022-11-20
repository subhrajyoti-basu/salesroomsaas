import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { MdEdit, MdArrowBack, MdCheck } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { brandImage, editorState, editorTitle, roomID } from '../../recoil/atom';

function AdminBar() {
    return (
        <div>
            <div className="h-14 flex px-5 items-center border-b">
                {/* {location.pathname == '/' && <HomeAdminBar />} */}
                {location.pathname == '/editor' ? <EditorAdminBar />: <HomeAdminBar />}
            </div>
        </div>
    );
}

function HomeAdminBar() {
    return (
        <div className='flex items-center justify-between w-full'>
            <h2>MarketLed</h2>
            <div className='flex items-center space-x-4'>
                <div className='relative group'>
                    <div className='w-10 h-10 rounded-full bg-black'>
                        <div className='right-0 text-neutral-500 space-y-2 divide-y py-3 group-hover:block hidden rounded-md top-10 bg-white absolute drop-shadow-md'>
                            <div onClick={() => window.location = '/profile'} className='px-4 cursor-pointer'>
                                Profile
                            </div>
                            <div className='px-4 pt-1 cursor-pointer'>
                                Subscription
                            </div>
                            <div onClick={() => {
                                localStorage.removeItem('token')
                                window.location = '/login'
                            }}
                                className='px-4 pt-1 cursor-pointer'>
                                logout
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function EditorAdminBar() {

    const [editorID, setEditorID] = useRecoilState(roomID);
    const [editorData, seteditorData] = useRecoilState(editorState);
    const titleRef = useRef(null);
    const [save, setSave] = useState(false)
    const [editTitle, seteditTitle] = useState(true)
    const [getTitle, setTitle] = useRecoilState(editorTitle);
    const [brandlogo, setbrandlogo] = useRecoilState(brandImage)

    const submitData = async() => {
        try {
            
            const url = `${import.meta.env.VITE_API_ADDRESS}/room/${editorID}`;
            const { data: res } = await axios({
                method: 'PUT',
                url:url, 
                data: {canvasData: editorData, name: titleRef.current.innerText, brandPhoto: brandlogo},
                headers: { 
                    'authorization': localStorage.token, 
                    'Content-Type': 'application/json'
                },
            });
            setSave(true)
            
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

    useEffect(() => setSave(false), [editorData,brandlogo])

    return (
        <div className="flex items-center justify-between w-full">
            <div className='flex items-center space-x-4'>
                <div onClick={() => {submitData(); window.location='/';}} className='p-2 cursor-pointer hover:bg-neutral-100 rounded-full'><MdArrowBack size={23} /></div>
                <div ref={titleRef}  className="text-xl font-semibold outline-none">{getTitle != 0 && getTitle}</div>
                <div          
                onClick={() => {
                    titleRef.current.setAttribute('contentEditable', editTitle)
                    if(editTitle){
                        // document.execCommand('selectAll',false,null)
                        titleRef.current.focus()
                        window.getSelection().selectAllChildren( titleRef.current )
                        
                    }else{
                        titleRef.current.blur()
                    }
                       
                    seteditTitle(!editTitle)                            
                }} 
                >
                    {editTitle && 
                    <div className='p-2 border hover:bg-neutral-100 rounded-full'><MdEdit  size={16} /></div>}
                    {!editTitle && 
                    <div className='p-2 border border-black hover:bg-neutral-100 rounded-full'><MdCheck  size={18}/></div>}</div>
            </div>
            <div className='space-x-4'>
                <button onClick={() => window.location = `/room?id=${editorID}`} className='btn'>View as Public</button>
                <button onClick={submitData} className={`btn ${save && 'bg-neutral-500'}`}>{!save && 'Save'}{save && 'Saved'}</button>
            </div>

        </div>
    )
}

export default AdminBar;