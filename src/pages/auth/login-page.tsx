import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
import { Button } from "../../components/button";
import { storage } from "../../utils/storage";
import { Link, useNavigate } from "react-router-dom";
import { Notifications } from "../../components/notifications";
import { useMessages } from "../../components/hooks/useMessage";
import { useAuth } from "./context";
import type { CredentialUser } from "./types-auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { successMessage, errorMessage, showSuccess, showError } =
    useMessages();

  const { onLogin } = useAuth();

  const [credential, setCredentials] = useState<CredentialUser>(() => {
    const saved = storage.get("auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          email: parsed.email || "",
          password: "",
          remember: true,
        };
      } catch (error) {
        showError(errorMessage);
      }
    }
    return {
      email: "",
      password: "",
      remember: false,
    };
  });

  const isLoginValid =
    credential.email.trim() !== "" && credential.password.trim() !== "";

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const token = await login(credential);
      if (credential.remember) {
        storage.set("auth", token);
      } else {
        storage.remove("auth");
      }

      onLogin();

      showSuccess("¡Login exitoso!");
      setTimeout(() => {
        navigate("/adverts", { replace: true });
      }, 1000);
    } catch (error) {
      showError("Credenciales incorrectas.");
      setCredentials((prev) => ({
        ...prev,
        email: "",
        password: "",
      }));
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "email" ? {password: ''} : '')
    }));
  }

  return (
    <div className="mx-auto max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="title mb-6 text-center text-2xl font-bold text-emerald-700">
        Login
      </h1>

      <form onSubmit={handleForm} className="space-y-5">
        <div>
          <Notifications
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-emerald-900"
          >
            Email
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-2 text-center text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={credential.email}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-emerald-900"
          >
            Password
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-2 text-center text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            required
            value={credential.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-login flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              className="form-checkbox mr-2"
              name="remember"
              type="checkbox"
              id="remember"
              checked={credential.remember}
              onChange={handleChange}
            />
            Recuérdame
          </label>
        </div>

        <Button type="submit" variant="primary" disabled={!isLoginValid}>
          Entrar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-emerald-900">
        ¿No tienes cuenta?
        <Link to="/signup" className="text-emerald-600 hover:underline">
          <span className="px-2">Regístrate</span>
        </Link>
      </p>
    </div>
  );
};
