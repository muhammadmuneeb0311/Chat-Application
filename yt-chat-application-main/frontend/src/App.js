import Signup from './components/Signup';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from '.';

const router = createBrowserRouter([
  { path:"/", element:<HomePage/> },
  { path:"/signup", element:<Signup/> },
  { path:"/login", element:<Login/> },
])

function App() { 
  const {authUser} = useSelector(store=>store.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    let socket;

    if(authUser){
      socket = io(`${BASE_URL}`, {
        query:{
          userId:authUser._id
        }
      });

      socket.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
    }

    return () => {
      if(socket) socket.close();
    }

  },[authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
