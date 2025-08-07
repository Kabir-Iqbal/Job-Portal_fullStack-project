import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
// admin
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/adminjobs"
// import AdminJobsTable from './components/admin/adminjobsTable'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectiveRoute from './components/admin/protectiveRoute'






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
    element: <Jobs />
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
    element : <ProtectiveRoute> <Companies /></ProtectiveRoute>
  },
  {
    path : "/admin/companies/create",
    element : <ProtectiveRoute> <CompanyCreate /> </ProtectiveRoute>
  },
  {
    path : "/admin/companies/:id",
    element : <ProtectiveRoute> <CompanySetup /> </ProtectiveRoute>
  },
  // admin jobs
  {
    path : "/admin/jobs",
    element : <ProtectiveRoute> <AdminJobs /> </ProtectiveRoute>
  },
  {
    path : "/admin/jobs/create",
    element : <ProtectiveRoute> <PostJob /> </ProtectiveRoute>
  },
  {
    path : "/admin/jobs/:id/applicants",
    element : <ProtectiveRoute> <Applicants /> </ProtectiveRoute>
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
