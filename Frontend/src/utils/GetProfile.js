import axios from "axios"
import { useDispatch } from "react-redux"

const getProfile  = async (id) => {
    try {
      const response = await axios.get(`/api/profile/view/${id}`,{
        withCredentials:true
      })
      const user = response.data;

      if (response.status == 200) {
        return user
      }
    } catch (error) {
      console.log(error)
    }
  }

  export {getProfile}