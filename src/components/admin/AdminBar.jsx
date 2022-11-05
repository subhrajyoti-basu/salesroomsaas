import {MdEdit, MdArrowBack} from 'react-icons/md';


function AdminBar() {
    return (
        <div>
            <div className="h-14 flex px-5 items-center border-b">
                <div className="flex items-center space-x-4">
                    <div className='p-2 hover:bg-neutral-100 rounded-full'><MdArrowBack size={23}/></div>
                    <div contentEditable className="text-xl font-semibold outline-none">Untitled name</div>
                    <div className='p-2 hover:bg-neutral-100 rounded-full'><MdEdit size={16}/></div>
                </div>
            </div>
        </div>
    );
}

export default AdminBar;