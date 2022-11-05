import CanvasEditor from "../Canvas/CanvasEditor";
import Sidebar from "../Sidebar";

function RoomEditor() {
    return ( 
        <div className='flex h-full overflow-y-hidden'>
          <Sidebar />
          <CanvasEditor />
        </div>
     );
}

export default RoomEditor;