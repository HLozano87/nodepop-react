import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { Button } from "../components/button";
import { createUser } from "../api/client";
import { useNavigate } from "react-router";

export const CreateUserPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //TODO Reutilizations effect to show notifications
  //TODO Component form
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    try {
      const { confirmPassword, ...dataSend } = formData;
      await createUser(dataSend);
      setSuccessMessage("Usuario creado con éxito");

      setTimeout(() => {
        navigate(`/login`, { replace: true });
      }, 2000);
    } catch (error) {
      setErrorMessage("Error al crear el usuario.");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-emerald-700">
        Registro
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-emerald-900"
          >
            Nombre
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-2 text-center text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="name"
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

        {errorMessage && (
          <div className="mb-4 rounded-xl bg-red-100 px-4 py-2 text-center text-sm text-red-700">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 rounded-xl bg-green-100 px-4 py-2 text-center text-sm text-green-700">
            {successMessage}
          </div>
        )}

        <Button type="submit" variant="primary">
          Crear
        </Button>
      </form>
    </div>
  );
};
