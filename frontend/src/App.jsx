import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
// admin
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/Jobs'




const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/jobs",
    element: <Jobs/>
  },
  {
    path: "/description/:id",
    element: <JobDescription/>
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // now we user path here for admin side
  {
    path : "/admin/companies",
    element : <Companies />
  },
  {
    path : "/admin/companies/create",
    element : <CompanyCreate />
  },
  {
    path : "/admin/companies/:id",
    element : <CompanySetup />
  },
  // admin jobs
  {
    path : "/admin/jobs",
    element : <AdminJobs />
  }
])


function App() {
 

  return (
    <>
    <RouterProvider router={appRoute}/>
      
    </>
  )
}

export default App
