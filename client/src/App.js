import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/Auth.context'
import { Navbar} from './components/Navbar'
import { Loader} from './components/Loader'
import { Footer } from './components/Footer'
import 'materialize-css'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        <header>
          { isAuthenticated && <Navbar/>}
        </header>
        <main>
          <div className="container">
            {routes}
          </div>
        </main>
        { isAuthenticated && <Footer/>}
      </Router>
      
    </AuthContext.Provider>
  )
}

export default App
