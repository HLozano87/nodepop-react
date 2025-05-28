import { AdvertsPage } from "./pages/adverts/adverts-page";
import { CreateAdvertPage } from "./pages/adverts/created-advert-page";
import { LoginPage } from "./pages/auth/login-page";
import { SignUpPage } from "./pages/signup-page";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/adverts" element={<AdvertsPage />} />
      <Route path="/created-adverts" element={<CreateAdvertPage />} />
    </Routes>
  );
}

export default App;
