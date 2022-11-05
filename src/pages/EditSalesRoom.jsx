import AdminBar from "../components/admin/AdminBar";
import RoomEditor from "../components/editor/RoomEditor";

function EditSalesRoom() {
    return ( 
        <div className='h-screen flex flex-col'>
          <AdminBar />
          <RoomEditor />
        </div>
     );
}

export default EditSalesRoom;