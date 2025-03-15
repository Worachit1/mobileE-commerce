import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/LogReg.module.css'

const BusinessRegister = () => {
  const [businessSignupForm, setBusinessSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessSignupForm({
      ...businessSignupForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitRegistrationForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (businessSignupForm.password !== businessSignupForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('./api/registerApi', { businessSignupForm });
      alert('Business Registration Complete Successfully!');
      router.push('/login');  
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
      alert(`Registration Error: ${error.response?.data?.message || 'An error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Business Registration</h2>
        <form onSubmit={submitRegistrationForm} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={businessSignupForm.firstName}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={businessSignupForm.lastName}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={businessSignupForm.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Mobile Number</label>
            <input
              type="text"
              name="mobileNo"
              value={businessSignupForm.mobileNo}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={businessSignupForm.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={businessSignupForm.confirmPassword}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Registering...' : 'Register Business'}
          </button>
        </form>
      </div>
    </div>
  );
};;


export default BusinessRegister;
