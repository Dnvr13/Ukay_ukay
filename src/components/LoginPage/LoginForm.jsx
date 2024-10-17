import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import SocialIcons from './SocialIcons';
import {loginBackend} from '../../backend/auth.backend';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    emailOrUsername:"",
    password:""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginBackend(loginForm.emailOrUsername, loginForm.password);

    if (response.success) {
      console.log("login success");
      navigate("/")
    } else {
      console.error(response.message)
    }
  };

  const handleLoginForm =(e)=>{
    setLoginForm({...loginForm,[e.target.name]:e.target.value})
  }

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <>
      <form className={styles.loginContainer} onSubmit={handleSubmit}>
        <h1 className={styles.loginTitle}>Log In</h1>
        <input
          id="emailOrUsername"
          className={styles.inputField}
          placeholder="Email/Username"
          aria-label="Email or Username"
          type="text"
          name='emailOrUsername'
          value={loginForm.emailOrUsername}
          onChange={handleLoginForm}
          required
        />
        <div className={styles.passwordFieldContainer}>
          <input
            id="password"
            className={styles.inputField}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            aria-label="Password"
            value={loginForm.password}
            name='password'
            onChange={handleLoginForm}
            required
          />
          <button
            type="button"
            className={styles.togglePasswordVisibility}
            onClick={handleTogglePassword}
            aria-label={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className={styles.loginButton}>Log In</button>
        <button
          type="button"
          className={styles.forgotPassword}
          onClick={handleForgotPasswordClick}
          aria-label="Forgot Password"
        >
          Forget Password
        </button>
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>OR</span>
          <div className={styles.dividerLine} />
        </div>
        <SocialIcons />
        <div className={styles.signUpPrompt}>
          <span className={styles.newUserText}>New to Ukay-Ukay?</span>
          <button
            type="button"
            className={styles.signUpLink}
            onClick={handleSignUpClick}
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
