import React from 'react';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>

          {/* Left Side - Branding */}
          <div className={styles.leftSide}>
            {/* Instagram Logo - Replace src with your own logo */}
            <img 
              src="/logo.png" 
              alt="Instagram Logo" 
              className={styles.logo}
            />

            {/* Tagline */}
            <div className={styles.tagline}>
              <p>
                See everyday moments from your{' '}
                <span className={styles.highlight}>close friends.</span>
              </p>
            </div>

            {/* Image Mockup - Replace src with your own mockup image */}
            <img 
              src="/friends.png" 
              alt="Instagram Mockup" 
              className={styles.mockupImage}
            />
          </div>

          {/* Right Side - Login Form */}
          <div className={styles.rightSide}>
            <div className={styles.formContainer}>

              {/* Login Box */}
              <div className={styles.loginBox}>
                <h1 className={styles.title}>Log in to Instagram</h1>

                <form className={styles.form}>
                  <input
                    type="text"
                    placeholder="Mobile number, username or email address"
                    className={styles.input}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                  />

                  <button type="submit" className={styles.loginButton}>
                    Log in
                  </button>
                </form>

                <div className={styles.forgotPassword}>
                  <a href="#">Forgotten password?</a>
                </div>
              </div>

              {/* OR Divider */}
              <div className={styles.divider}>
                <div className={styles.line}></div>
                <span className={styles.orText}>OR</span>
                <div className={styles.line}></div>
              </div>

              {/* Facebook Login */}
              <div className={styles.buttonContainer}>
                <button className={styles.facebookButton}>
                  <svg className={styles.facebookIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Log in with Facebook</span>
                </button>
              </div>

              {/* Create Account */}
              <div className={styles.buttonContainer}>
                <button className={styles.createButton}>
                  Create new account
                </button>
              </div>

              {/* Meta Copyright */}
              <div className={styles.copyright}>© Meta</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">Meta</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Jobs</a>
          <a href="#">Help</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Locations</a>
          <a href="#">Instagram Lite</a>
          <a href="#">Threads</a>
          <a href="#">Contact uploading and non-users</a>
          <a href="#">Meta Verified</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
