import './App.css'

import MenuIcon from './assets/Mingcute Menu Fill.svg';

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
        </div>
      </div>
    </div>
  );

}

export default App;
