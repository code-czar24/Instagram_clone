import { useState } from 'react'
import Login from '../Pages/login'
import Signup from '../Pages/signup'
import Dashboard from '../Pages/Dashboard'




function App() {
  const [toggleAuth, setToggleAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem("user");
    const loggedIn = localStorage.getItem("loggedIn");
    return !!(user && loggedIn === "true");
  });

  function handleToggle() {
    setToggleAuth(!toggleAuth);
  }

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return (
      <div>
        {toggleAuth ? 
        (
          <Login 
            handleToggle={handleToggle} 
            setIsAuthenticated={setIsAuthenticated}
          />
        ) : 
        (
          <Signup handleToggle={handleToggle} />
        )}
      </div>
    );
  }

  return <Dashboard onLogout={handleLogout} />;
}

export default App
