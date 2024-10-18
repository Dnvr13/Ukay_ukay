import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./SignUpForm.module.css";
import { signupBackend } from "../../backend/auth.backend";



function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const [signupForm, setSignupForm] = useState({
    username: "",
    pass: "",
    confirmPass: ""
  });

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupForm = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  }

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleToggleRetypePassword = () => {
    setShowRetypePassword(prevState => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(signupForm.pass !== signupForm.confirmPass){
      setSuccessMessage("Password does not matched!");
    }else{
      const response = await signupBackend(signupForm.username,signupForm.pass)
      if(response.success){
        navigate('/login')
      }else{
        setSuccessMessage(response.message)
      }
    }

    

  };

  return (
    <section className={styles.signUpSection}>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Sign Up</h2>
        <label htmlFor="emailUsername" className="visually-hidden"></label>
        <input
          type="text"
          id="emailUsername"
          className={styles.formInput}
          placeholder="Username"
          name="username"
          value={signupForm.username}
          onChange={handleSignupForm}
          required
        />
        <div className={styles.passwordFieldContainer}>
          <label htmlFor="password" className="visually-hidden"></label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={styles.formInput}
            placeholder="Password"
            name="pass"
            onChange={handleSignupForm}
            required
          />
          <button
            type="button"
            className={styles.togglePasswordVisibility}
            onClick={handleTogglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className={styles.passwordFieldContainer}>
          <label htmlFor="retypePassword" className="visually-hidden"></label>
          <input
            type={showRetypePassword ? "text" : "password"}
            id="retypePassword"
            name="confirmPass"
            className={styles.formInput}
            placeholder="Confirm Password"
            onChange={handleSignupForm}
            required
          />
          <button
            type="button"
            className={styles.togglePasswordVisibility}
            onClick={handleToggleRetypePassword}
          >
            {showRetypePassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>OR</span>
          <span className={styles.dividerLine}></span>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/27808748de984718ba5bfd5020a4406d6f61893255ba6c9c4498a7ad23532007?placeholderIfAbsent=true&apiKey=e6e279f9e06842139b3f7c01a7502bdc"
          alt="Social media login options"
          className={styles.socialLoginOptions}
        />
        <p className={styles.loginPrompt}>
          Have an account?{" "}
          <button
            type="button"
            className={styles.loginLink}
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </p>
      </form>
    </section>
  );
}

export default SignUpForm;
