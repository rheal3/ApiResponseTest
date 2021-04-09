import logo from './logo.svg'
import './RunningLogo.css';

// returns the spinning react logo
function RunningLogo() {
    return(
        <div>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    )
}

export default RunningLogo