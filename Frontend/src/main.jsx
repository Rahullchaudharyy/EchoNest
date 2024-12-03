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
import Profile from './components/Profile.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'auth',
        element:<Auth/>
      },
      {
        path:'home',
        element:<Home/>
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
        path:'profile/:profileId',
        element:<Profile/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
