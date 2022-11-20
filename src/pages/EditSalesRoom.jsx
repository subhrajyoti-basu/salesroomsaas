import { useLocation } from "react-router-dom";
import AdminBar from "../components/admin/AdminBar";
import RoomEditor from "../components/editor/RoomEditor";
import { useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { brandImage, dataLoaded, editorState, editorTitle, load1, roomID } from "../recoil/atom";
import axios from "axios";

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

  const ID = query.get('id')

  const getData = async () => {
    try {
      if (editorID != 0) {
        const url = `${import.meta.env.VITE_API_ADDRESS}/room/${editorID}`;
        const { data: res } = await axios({
          method: 'GET',
          url: url,
          headers: {
            'authorization': localStorage.token,
            'Content-Type': 'application/json'
          },
        });

          setTitle(res.roomName)
          seteditorData(res.roomData)
          setbrandlogo(res.brandPhoto)
          setLoader(true)
      }

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
    setEditorID(ID)
    getData()
  }, [editorID])


  return (
    <div className='h-screen flex flex-col'>
      <AdminBar />
      <RoomEditor />
    </div>
  );
}

export default EditSalesRoom;