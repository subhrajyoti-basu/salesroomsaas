import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { FiCheck, FiCheckCircle, FiCheckSquare, FiEdit, FiFile, FiShare2 } from 'react-icons/fi';
import { MdEdit, MdArrowBack, MdCheck } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { brandImage, editorState, editorTitle, roomID } from '../../recoil/atom';

function AdminBar() {
    return (
        <div className='relative w-full'>

            {/* {location.pathname == '/' && <HomeAdminBar />} */}
            {location.pathname == '/editor' ? <EditorAdminBar /> : <HomeAdminBar />}

        </div>
    );
}

function HomeAdminBar() {
    return (
        <div className="h-14 flex px-5 items-center border-b">
            <div className='flex items-center justify-between w-full'>
                <img src='/logo.png' width='128px' />
                <div className='flex items-center space-x-4'>
                    <div className='relative group'>
                        <div className='w-10 h-10 rounded-full bg-black'>
                            <div className='right-0 border z-10 text-neutral-500 space-y-2 divide-y py-3 group-hover:block hidden rounded-md top-10 bg-white absolute drop-shadow-md'>
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

    const submitData = async () => {
        try {

            const url = `${import.meta.env.VITE_API_ADDRESS}/room/${editorID}`;
            const { data: res } = await axios({
                method: 'PUT',
                url: url,
                data: {
                    canvasData: editorData,
                    name: titleRef.current.innerText,
                    brandPhoto: brandlogo
                },
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

    useEffect(() => setSave(false), [editorData, brandlogo])

    return (
        <div className="h-14 flex pl-2 pr-5 items-center bg-transparent absolute w-full">
            <div className="flex items-center justify-between w-full pr-3">
                <div className='flex items-center space-x-1'>
                    <div onClick={() => { submitData(); window.location = '/'; }} className='p-2 cursor-pointer hover:bg-neutral-200 transition rounded-lg'><MdArrowBack size={23} /></div>
                    <div
                        onClick={() => {
                            titleRef.current.setAttribute('contentEditable', editTitle)
                            if (editTitle) {
                                // document.execCommand('selectAll',false,null)
                                titleRef.current.focus()
                                window.getSelection().selectAllChildren(titleRef.current)

                            } else {
                                titleRef.current.blur()
                            }

                            seteditTitle(!editTitle)
                        }}
                    >
                        {editTitle &&
                            <div className='p-2 cursor-pointer hover:bg-neutral-200 transition rounded-lg'><FiEdit size={20} /></div>}
                        {!editTitle &&
                            <div className='p-2 cursor-pointer hover:bg-neutral-200 transition rounded-lg'><FiCheckSquare size={20} /></div>}
                    </div>
                    <div>
                        <div ref={titleRef}
                            onKeyDown={(e) => {
                                if (e.keyCode == 13) {
                                    e.preventDefault();
                                    seteditTitle(true);
                                    titleRef.current.blur()
                                    titleRef.current.setAttribute('contentEditable', false)
                                }
                            }}
                            className="text-xl font-semibold outline-none">{getTitle != 0 && getTitle}</div>
                    </div>
                </div>
                <div className='space-x-8 flex'>
                    <button onClick={() => window.location = `/room?id=${editorID}`} className='icn'>
                        <FiShare2 />
                        Share</button>
                    <button onClick={submitData} className={`${save && 'text-neutral-400 cursor-default'} icn`}>
                        <FiCheck />
                        {!save && 'Save'}{save && 'Saved'}
                        </button>
                </div>

            </div>
        </div>
    )
}

export default AdminBar;