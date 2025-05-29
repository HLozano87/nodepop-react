import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "../../components/button";
import { createdUser } from "./service";
import { useNavigate } from "react-router";
import { useMessages } from "../../components/hooks/useMessage";
import { Notifications } from "../../components/notifications";
import { REGEXP } from "../../utils/constants";

export const SignUpPage = () => {
  const { successMessage, errorMessage, showSuccess, showError } =
    useMessages();

  //TODO Component form
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (name === "email") {
      if (!REGEXP.email.test(value)) {
        showError("El email no es válido.");
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError("Las contraseñas no coinciden.");
      return;
    }

    if (!formData.name || formData.username || formData.email) {
      showError("Por favor rellene todos los campos.");
    }
    try {
      const { confirmPassword, ...dataSend } = formData;
      await createdUser(dataSend);
      showSuccess("Usuario creado con éxito");

      setTimeout(() => {
        navigate(`/adverts`, { replace: true });
      }, 2000);
    } catch (error) {
      showError("Error al crear el usuario.");
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-emerald-700">
        Registrarse
      </h2>

      <Notifications
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-emerald-900"
          >
            Nombre <span className="text-red-600">*</span>
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-2 text-center text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-emerald-900"
          >
            Nombre de usuario <span className="text-red-600">*</span>
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-2 text-center text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-emerald-900"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-2 text-center text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-emerald-900"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-2 text-center text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            minLength={6}
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-emerald-900"
          >
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-2 text-center text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            type="password"
            id="password-confirm"
            name="confirmPassword"
            placeholder="Confirm password"
            minLength={6}
            required
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="primary">
          Registrar
        </Button>
      </form>
    </div>
  );
};
