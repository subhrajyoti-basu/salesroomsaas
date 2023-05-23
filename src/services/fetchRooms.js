import axios from "axios";

export const fetchRooms = async () => {
    try {
        const url = `${import.meta.env.VITE_API_ADDRESS}/allrooms`;
        const { data: res } = await axios({
            method: 'get',
            url: url,
            headers: {
                'authorization': localStorage.token,
                'Content-Type': 'application/json'
            },
        });
        return res.reverse()
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            // console.error(error.message);
           throw new Error(error.response.data.message);
        }
    }
}

export const getData = async (editorID) => {
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
        // console.log(res)
        return res;
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
