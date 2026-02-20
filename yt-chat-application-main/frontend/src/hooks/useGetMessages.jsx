import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token

        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token
            },
            withCredentials: true, // If backend uses cookies
          }
        );

        dispatch(setMessages(res.data));
      } catch (error) {
        console.error("AxiosError", error.response?.data || error.message);
      }
    };

    fetchMessages();
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
