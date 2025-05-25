import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "../components/button";
import { createUser } from "../api/client";

export const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
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
    try {
      const data = await createUser(formData);
      if (data) {
        console.log("Usuario creado con éxito:", data);
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" onChange={handleChange} />

      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" onChange={handleChange} />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleChange}
      />

      <Button type="submit">Create</Button>
    </form>
  );
};
