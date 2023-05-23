import { Navigate, useLocation } from "react-router-dom";
import AdminBar from "../components/admin/AdminBar";
import RoomEditor from "../components/editor/RoomEditor";
import { useEffect, useMemo } from "react";
import { useRecoilState} from "recoil";
import { brandImage, dataLoaded, editorState, editorTitle, load1, loadingAnimation, roomID } from "../recoil/atom";
import axios from "axios";
import { getData } from "../services/fetchRooms";
import FullscreenLoader from "../components/loading/FullscreenLoader";

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search, [search]))
}

function EditSalesRoom() {
  const query = useQuery();
  const [editorID, setEditorID] = useRecoilState(roomID);
  const [editorData, seteditorData] = useRecoilState(editorState);
  const [loader, setLoader] = useRecoilState(dataLoaded);

  const [getTitle, setTitle] = useRecoilState(editorTitle);
  const [brandlogo, setbrandlogo] = useRecoilState(brandImage);
  const [activeLoader, setactiveLoader] = useRecoilState(loadingAnimation)


  const ID = query.get('id')

  
  useEffect(() => {
    setEditorID(ID)
    getData(editorID).then(a => {
      setTitle(a.roomName)
      seteditorData(a.roomData)
      setLoader(true)
    })
  }, [editorID])

  if (!localStorage.token) {
    return <Navigate replace to='/login' />;
  } else return (
    <div>
      {activeLoader && <FullscreenLoader/>}
    
      <div className='h-screen flex flex-col'>
        <AdminBar />
        <RoomEditor />
      </div>
      </div>
    );
}

export default EditSalesRoom;