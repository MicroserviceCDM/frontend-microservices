import { useState } from 'react'
import './components/DashboardItem/DashboardItem.css'
import {customerRole, managerRole, publicRoutes, staffRole} from './routes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  ); 

  return (
    <>
      <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                          const Page = route.component;
                          let Layout = route.layout;
                          return (<Route key={index} path={route.path} element = {<Layout><Page/></Layout>}/>)
                      }
                    )}
                    {(userData.role === "CUSTOMER") && customerRole.map((route, index) => {
                          const Page = route.component;
                          let Layout = route.layout;
                          return (<Route key={index} path={route.path} element = {<Layout><Page/></Layout>}/>)
                      }
                    )}
                    {(userData.role === "STAFF") && staffRole.map((route, index) => {
                          const Page = route.component;
                          let Layout = route.layout;
                          return (<Route key={index} path={route.path} element = {<Layout><Page/></Layout>}/>)
                      }
                    )}
                    {(userData.role === "MANAGER") && managerRole.map((route, index) => {
                          const Page = route.component;
                          let Layout = route.layout;
                          return (<Route key={index} path={route.path} element = {<Layout><Page/></Layout>}/>)
                      }
                    )}
                </Routes>
            </div>
        </Router>
    </>
  )
}


export default App
