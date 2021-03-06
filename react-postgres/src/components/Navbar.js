import React from "react"
import { NavLink} from "react-router-dom"
import Login from '../components/Login/Login'

const Navbar = () => {
    return (
        <nav>
      <div>
        <div>
          <div style={{backgroundColor: 'silver', display: "flex"}}>
            <NavLink style={{margin: 'auto 20px'}}
              to="/"
              exact
            >
              Tests
            </NavLink>

            <NavLink style={{margin: 'auto 20px'}}
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
