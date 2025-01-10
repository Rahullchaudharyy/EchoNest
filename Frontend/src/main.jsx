import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import Blogs from './components/Blogs.jsx'
import Auth from './components/Auth.jsx'
import SpecificBlog from './components/SpecificBlog.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import CreateBlog from './components/CreateBlog.jsx'
import EditProfile from './components/EditProfile.jsx'
import MyProfile from './components/MyProfile.jsx'
import Profile from './components/Profile.jsx'
import EditBlog from './components/EditBlog.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'auth',
        element:<Auth/>
      },
      {
        path:"blogs",
        element:<Blogs/>
      },
      {
        path:'blog/:blogid',
        element:<SpecificBlog/>
      },
      {
        path:'myProfile',  // Show the popup when user is loggedout / Not regieterd
        element:<MyProfile/>
      },
      {
        path:'createblog', // Show the popup when user is loggedout / Not regieterd
        element:<CreateBlog/>
      },
      {
        path:'editprofile', // Show the popup when user is loggedout / Not regieterd
        element:<EditProfile/>
      },
      {
        path:'profile/:profileId',
        element:<Profile/>
      },
      {
        path:'post/edit/:id',
        element:<EditBlog/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store} >
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Provider>
   
)
