import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from "./components/index"
import Login from './components/Login.jsx'
import { Home, AddPost, AllPost, EditPost, Post, SignupPage } from './Pages/index.js'


//const router = crerateBrowserRouter([]) 
// **1st -- Browser Router bnaya 
// ****** Main cheez authentication h--- see in authLayout
const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },

      {
        path: "/signup",
        element:
          (
            <AuthLayout authentication={false}>
              <SignupPage />
            </AuthLayout>
          )
      },
      {
        path: "/all-posts",
        element:
          (
            <AuthLayout authentication>
              {" "}
              <AllPost />
            </AuthLayout>
          )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />

      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
