import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? <Home /> : <Login onLogin={() => setIsLoggedIn(true)} />}
    </div>
  );
}

export default App;
