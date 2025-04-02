import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Logo from "../../assets/logoUniEvangelica.png";
import Loading from "../../components/Loading/Loading";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { email, setEmail, password, setPassword, error, login, isLoading, setError } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  return (
    <div className={styles.loginContainer}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.loginCard}>
          <div className={styles.loginCard__logo}>
            <img src={Logo} alt="Logo UniEvangelica" className={styles.loginCard__logoImage} />
          </div>
          <div className={styles.loginCard__form}>
            <h2 className={styles.loginCard__title}>Login</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputGroup__label}>E-mail</label>
              <input
                type="email"
                id="email"
                className={styles.inputGroup__input}
                placeholder="E-mail (teste@example.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="login-email"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputGroup__label}>Senha</label>
              <input
                type="password"
                id="password"
                className={styles.inputGroup__input}
                placeholder="Senha (123456)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="login-password"
              />
            </div>
            {error && <p className={styles.errorMessage} data-testid="login-error-message">{error}</p>}
            <button className={styles.button} onClick={login} data-testid="login-button">
              Entrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;