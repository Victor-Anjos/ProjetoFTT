import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseLoginResult {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
}

const useLogin = (): UseLoginResult => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    if (!email || !password) {
      setError("Insira os dados nos campos de e-mail e senha");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (email === "teste@example.com" && password === "123456") {
        const token = "fake-jwt-token";
        const expiresIn = 15 * 60 * 1000;
        const expirationTime = Date.now() + expiresIn;

        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expirationTime.toString());

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("tokenExpiration", expirationTime.toString());

        setIsLoading(false);
        navigate("/dashboard");
      } else {
        setError("Credenciais incorretas");
        setIsLoading(false);
      }
    }, 3000);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    isLoading,
    setIsLoading,
    login,
  };
};

export default useLogin;