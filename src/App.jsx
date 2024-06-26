import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);  // important remember
   const dispatch = useDispatch();

  useEffect(() => {
        authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
          console.log(userData)
        }
        else {
          dispatch(logout());
        }
      })
      //The callback to execute when the Promise is settled (fulfilled or rejected).
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>

        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
   )
  : null
}

export default App;
