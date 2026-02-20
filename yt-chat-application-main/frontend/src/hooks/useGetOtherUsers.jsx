import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { BASE_URL } from "..";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("AxiosError", error.response?.data || error.message);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
