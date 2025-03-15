import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/LogReg.module.css'

interface LoginResponse {
  token: string;
  businessId: string;
}

const BusinessLogin = () => {
  const [businessLoginForm, setBusinessLoginForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessLoginForm({
      ...businessLoginForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Login Form Data:', businessLoginForm);

      const response = await axios.post<LoginResponse>('/api/loginApi', { businessLoginForm });

      console.log('Response from API:', response.data);

      const token = response.data.token;
      const businessId = response.data.businessId;

      if (token && businessId) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('businessId', businessId);
      }

      alert('Login successful!');
      router.push(`/HomeScreen`);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
      alert(`Login Error: ${error.response?.data?.message || 'An error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Business Login</h2>
        <form onSubmit={submitLoginForm} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={businessLoginForm.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={businessLoginForm.password}
              onChange={handleChange}
              required
              className={styles.inputPassword}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};


export default BusinessLogin;
