import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./ResetPasswordForm.module.css";

function ResetPasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook to handle navigation

  // Event handler for navigating to the login page
  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the LoginPage
  };

  // Toggle visibility for New Password
  const handleToggleNewPassword = () => {
    setShowNewPassword(prevState => !prevState);
  };

  // Toggle visibility for Retype Password
  const handleToggleRetypePassword = () => {
    setShowRetypePassword(prevState => !prevState);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Here you would normally handle form submission to the backend
    // For now, we simulate a successful password reset
    setSuccessMessage("Your password has been successfully reset!");

    // Optionally, redirect to another page after a delay
    setTimeout(() => {
      navigate('/login'); // Redirect to the login page after a successful reset
    }, 2000);
  };

  return (
    <section className={styles.resetPasswordSection}>
      <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Reset Your Password</h2>
        <p className={styles.formDescription}>
          Enter your new password to reset it for your account. We'll ask for
          this password whenever you log in.
        </p>
        <label htmlFor="emailUsername" className="visually-hidden">
        </label>
        <input
          id="emailUsername"
          type="text"
          className={styles.formInput}
          placeholder="Email/Username"
          required
        />
        <div className={styles.passwordFieldContainer}>
          <label htmlFor="newPassword" className="visually-hidden">
          </label>
          <input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            className={styles.formInput}
            placeholder="New Password"
            required
          />
          <button
            type="button"
            className={styles.togglePasswordVisibility}
            onClick={handleToggleNewPassword}
          >
            {showNewPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className={styles.passwordFieldContainer}>
          <label htmlFor="retypePassword" className="visually-hidden">
          </label>
          <input
            id="retypePassword"
            type={showRetypePassword ? "text" : "password"}
            className={styles.formInput}
            placeholder="Retype Password"
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
        <button type="submit" className={styles.submitButton}>
          Reset Password
        </button>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>OR</span>
          <span className={styles.dividerLine}></span>
        </div>
        {/* Optional social login image */}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/27808748de984718ba5bfd5020a4406d6f61893255ba6c9c4498a7ad23532007?placeholderIfAbsent=true&apiKey=e6e279f9e06842139b3f7c01a7502bdc"
          alt="Social media login options"
          className={styles.socialLoginOptions}
        />
        <p className={styles.loginPrompt}>
          Know your password?{" "}
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

export default ResetPasswordForm;
