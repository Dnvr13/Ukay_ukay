import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./ResetPasswordForm.module.css";
import { toast } from "sonner";
import { useForgotPasswordCustomerBackend } from "../../backend/customer.backend";

function ResetPasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook to handle navigation
  const {response,forgotPassword} = useForgotPasswordCustomerBackend()

  const [customer,setCustomer] = useState({
    emailOrUsername:"",
    password:"",
    confirm_password:""
  })

  const handleCustomer = (e)=>{
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  }

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
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(customer.password !== customer.confirm_password){
      toast.error("Password is not matched!")
    }else{
      await forgotPassword(customer)
      
    }
        
  };

  return (
    <section className={styles.resetPasswordSection}>
      {response?navigate("/login"):""}
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
          name="emailOrUsername"
          onChange={handleCustomer}
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
            name="password"
            onChange={handleCustomer}
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
            placeholder="Confirm Password"
            name="confirm_password"
            onChange={handleCustomer}
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
            className={styles.loginLink}>
            Log In
          </button>
        </p>
      </form>
    </section>
  );
}

export default ResetPasswordForm;
