import { MdEdit, MdArrowBack } from 'react-icons/md';
import { useLocation } from 'react-router-dom'

function AdminBar() {
    return (
        <div>
            <div className="h-14 flex px-5 items-center border-b">
                {location.pathname == '/' && <HomeAdminBar />}
                {location.pathname == '/editor' && <EditorAdminBar />}
            </div>
        </div>
    );
}

function HomeAdminBar() {
    return (
        <div className='flex items-center justify-between w-full'>
            <h2>SalesRoom</h2>
            <div className='flex items-center space-x-4'>
                <div className='relative group'>
                    <div className='w-10 h-10 rounded-full bg-black'>
                        <div className='right-0 group-hover:block hidden rounded-md top-10 bg-white absolute drop-shadow-md'>
                            <div onClick={() => {
                                localStorage.removeItem('token')
                                window.location = '/login'
                            }}
                                className='py-2 px-4 cursor-pointer'>
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
    return (
        <div className="flex items-center justify-between w-full">
            <div className='flex items-center space-x-4'>
                <div className='p-2 hover:bg-neutral-100 rounded-full'><MdArrowBack size={23} /></div>
                <div className="text-xl font-semibold outline-none">Untitled name</div>
                <div className='p-2 hover:bg-neutral-100 rounded-full'><MdEdit size={16} /></div>
            </div>
            <div className='space-x-4'>
            <button className='btn'>View as Public</button>
            <button className='btn'>Save</button>            
            </div>
            
        </div>
    )
}

export default AdminBar;