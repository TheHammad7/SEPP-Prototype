import './App.css'

import MenuIcon from './assets/menu-icon.svg';
import SSHLogo from './assets/ssh-logo.svg';

function App() {

  const handleMenuClick = (event) => {
    event.currentTarget.blur(); // Removes focus from the button
  };

  return (

    <div className="MacbookAir1">
      <div className="PageHeader"> 
        <div className='Banner'>
        <button className="Menu" onClick={handleMenuClick}>
          <img src={MenuIcon} alt="Menu" className="Menu-icon" />
        </button>
        <img src={SSHLogo} alt="SSH Logo" className="SSHLogo" />
        </div>
      </div>
    </div>
  );

}

export default App;
