import React from 'react';
import './styles.css';



const Login = ({handleToggle, setIsAuthenticated}) => {
  function handleLogin(event) {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"))

    if (user.email == event.target.email.value && user.password == event.target.password.value) {
      localStorage.setItem("loggedIn", "true")
      setIsAuthenticated(true)
    }else {
    console.log("Invalid credentials or user not found");
  }


  }
  return (
    <div className="container">
      <div className="main-content">
        <div className="phone-preview">
          <img 
            src="Img/log.png" 
            alt="Instagram App Preview" 
          />
        </div>
        
        <div className="form-column">
          <div className="form-card">
            <h1 className="instagram-logo">Instagram</h1>
            
            <form className="auth-form" onSubmit={handleLogin}>
              <input 
                type="text" 
                placeholder="email" 
                className="input-field"
                name="email"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="input-field"
                name="password"

              />
              <button type="submit" className="primary-button">Log in</button>
              
              <div className="divider">
                <div className="line"></div>
                <div className="or-text">OR</div>
                <div className="line"></div>
              </div>
              
              <button type="button" className="facebook-button">
                <span className="fb-icon"></span>
                Log in with Facebook
              </button>
              
              <a href="#" className="forgot-password">Forgot password?</a>
            </form>
          </div>
          
          <div className="toggle-card">
            <p>Don't have an account? <button onClick={handleToggle}>Sign up</button></p>
          </div>
          
          <div className="get-app">
            <p>Get the app.</p>
            <div className="app-links">
              <img src="/Img/appstore.png" alt="App Store" />
              <img src="Img/Playstore.png" alt="Google Play" />
            </div>
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-links">
          <span>Meta</span>
          <span>About</span>
          <span>Blog</span>
          <span>Jobs</span>
          <span>Help</span>
          <span>API</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Locations</span>
          <span>Instagram Lite</span>
          <span>Threads</span>
          <span>Contact Uploading & Non-Users</span>
          <span>Meta Verified</span>
        </div>
        <div className="footer-copyright">
          © 2024 Instagram from Meta
        </div>
      </footer>
    </div>
  );
};

export default Login;