import React from 'react';
import './styles.css';

const Signup = ({handleToggle}) => {
  function handleSignup(event) {
    event.preventDefault();

    if (event.target.name.value.trim().length>0) {
      if (event.target.password.value == event.target.conformpassword.value) {
        if (event.target.terms.checked==true) {
              let user = {}

              user.email = event.target.email.value
              user.name = event.target.name.value
              user.username = event.target.username.value
              user.password = event.target.password.value
              user.conformpassword = event.target.conformpassword.value
              user.terms = event.target.terms.checked

              console.log(user)
              localStorage.setItem("user",JSON.stringify(user))

        } else {
          alert("Agree terms and condition")
        }
      }else {
        alert("Password Didn't match")
      }
    }else {
      alert("Name should be atleast one character")
    }



      
    
    
 
    









  }
  return (
    <div className="container">
      <div className="main-content single-column">
        <div className="form-column">
          <div className="form-card">
            <h1 className="instagram-logo">Instagram</h1>
            <p className="signup-text">Sign up to see photos and videos from your friends.</p>
            
            <button type="button" className="primary-button fb-signup">
              Log in with Facebook
            </button>
            
            <div className="divider">
              <div className="line"></div>
              <div className="or-text">OR</div>
              <div className="line"></div>
            </div>
            
            <form className="auth-form" onSubmit={handleSignup}>
              <input 
                type="text" 
                placeholder="Mobile Number or Email" 
                className="input-field"
                name="email"
                required
              />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="input-field"
                name="name"
                required
              />
              <input 
                type="text" 
                placeholder="Username" 
                className="input-field"
                name="username"
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="input-field"
                name="password"
                required
                minLength={8}
              />
              <input 
                type="password" 
                placeholder="Conform Password" 
                className="input-field"
                name="conformpassword"
                required
                minLength={8}
              />

              <label className='terms-text'>
                 <input 
                type="checkbox"
                name="terms"
              />
              <span> By signing up, you agree to our <a href="https://help.instagram.com/581066165581870" >Terms</a>, <a href="https://help.instagram.com/2635536099905516">Privacy Policy</a> and <a href="#">Cookies Policy</a>.</span>


              </label>
              
              
              <button type="submit" className="primary-button">Sign up</button>
            </form>
          </div>
          
          <div className="toggle-card">
            <p>Have an account? <button onClick={handleToggle}>Log in</button></p>
          </div>
          
          <div className="get-app">
            <p>Get the app.</p>
            <div className="app-links">
              <img src="/Img/appstore.png" alt="App Store" />
              <img src="Img/Playstore.png" alt="Google Play"/>
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

export default Signup;