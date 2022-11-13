import CanvasEditor from "../Canvas/CanvasEditor";
import Sidebar from "../Sidebar";
import { useLocation } from 'react-router-dom';
import React from "react";





function RoomEditor() {

  
    return ( 
        <div className='flex h-full overflow-y-hidden'>
          <Sidebar />
          <CanvasEditor />
        </div>
     );
}

export default RoomEditor;