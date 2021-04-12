import React from "react"
import { NavLink} from "react-router-dom"
import Login from '../components/Login/Login'

const Navbar = () => {
    return (
        <nav>
      <div>
        <div>
          <div style={{backgroundColor: 'silver'}}>
            <NavLink style={{margin: '20px'}}
              to="/"
              exact
            >
              Home
            </NavLink>

            <NavLink style={{margin: '10px'}}
              to="/results_history"
              exact
            >
              Results
            </NavLink>

            <Login/>
          </div>
        </div>
      </div>
    </nav>
    )
} 

export default Navbar
