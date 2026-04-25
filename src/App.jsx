import { useState } from 'react'
import Login from '../Pages/login'
import Signup from '../Pages/signup'
import Dashboard from '../Pages/Dashboard'





function App() {
  const [toggleAuth, setToggleAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleToggle() {
    setToggleAuth(!toggleAuth);
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

  return <Dashboard />;
}

export default App
