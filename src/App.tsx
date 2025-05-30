import { Layout } from "./components/layout/layout";
import { AdvertPage } from "./pages/adverts/advert-detail-page";
import { AdvertsPage } from "./pages/adverts/adverts-page";
import { NewAdvertPage } from "./pages/adverts/new-advert-page";
import { LoginPage } from "./pages/auth/login-page";
import { AuthRoute } from "./pages/auth/require-auth";
import NotFoundPage from "./pages/not-found";
import { SignUpPage } from "./pages/signup/signup-page";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Página principal */}
        <Route index element={<AdvertsPage />} />
        <Route path="/adverts" element={<Navigate to="/" replace />} />
        <Route path="/adverts/:id" element={<AdvertPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/adverts/new"
          element={
            <AuthRoute requireAuth={true}>
              <NewAdvertPage />
            </AuthRoute>
          }
        />

        {/* Errores */}
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
