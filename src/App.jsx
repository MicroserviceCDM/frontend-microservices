import { useState, useEffect, Suspense } from 'react'
import {customerRole, managerRole, publicRoutes, staffRole} from './routes'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="spinner"></div>
    <style>{`
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  ); 

  const updateTheme = () => {
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

useEffect(() => {
    // Add event listener for 'storage' events
    window.addEventListener('storage', updateTheme);

    // Initial theme application
    updateTheme();

    // Clean up the event listener when the component unmounts
    return () => {
        window.removeEventListener('storage', updateTheme);
    };
}, []);

  return (
    <Router>
      <ThemeProvider>
        <Suspense fallback={<LoadingSpinner />}>
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
                  <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
          </div>
        </Suspense>
      </ThemeProvider>
    </Router>
  )
}


export default App
