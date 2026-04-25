import React from 'react';
import './styles.css';

const Login = () => {
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
            
            <form className="auth-form">
              <input 
                type="text" 
                placeholder="Phone number, username, or email" 
                className="input-field"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="input-field"
              />
              <button type="button" className="primary-button">Log in</button>
              
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
            <p>Don't have an account? <a href="#">Sign up</a></p>
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