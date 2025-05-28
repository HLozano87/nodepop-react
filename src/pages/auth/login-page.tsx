import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
import { Button } from "../../components/button";
import { storage } from "../../utils/storage";
import { useNavigate } from "react-router";
import { Notifications } from "../../components/notifications";
import { useMessages } from "../../components/hooks/useMessage";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { successMessage, errorMessage, showSuccess, showError } =
    useMessages();

  const [credential, setCredentials] = useState(() => {
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

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const token = await login(credential);
      if (credential.remember) {
        storage.set("auth", token);
      } else {
        storage.remove("auth");
      }
      showSuccess("¡Login exitoso!");
      setTimeout(() => {
        navigate("/adverts");
      }, 2000);
    } catch (error) {
      showError("Credenciales incorrectas.");
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="title mb-6 text-center text-2xl font-bold text-emerald-700">
        Login
      </h2>

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
            value={credential.email}
            placeholder="Email"
            required
            onChange={handleChange}
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
            value={credential.password}
            placeholder="Password"
            required
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
            Recordarme.
          </label>
        </div>

        <Button type="submit" variant="primary">
          Entrar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-emerald-900">
        ¿No tienes cuenta?
        <a href="/signup" className="text-emerald-600 hover:underline">
          <span className="px-2">Crear cuenta</span>
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
