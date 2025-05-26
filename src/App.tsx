import LoginPage from "./pages/auth/login";
import { CreateUserPage } from "./pages/signup";
import { Routes, Route } from "react-router";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateUserPage />} />

      </Routes>

  );
}

export default App;
