import { useState } from "react";
import {
  NavLink,
  useNavigate,
  useLocation,
  type NavLinkProps,
} from "react-router-dom";
import { useAuth } from "../../pages/auth/context";
import { Button } from "../button";
import { logout } from "../../pages/auth/service";

export const Header = () => {
  const { isLogged, onLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingLogout, setLoadingLogout] = useState(false);

  const handleLoginClick = () => {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  };

  const handleLogoutClick = async () => {
    try {
      setLoadingLogout(true);
      await logout();
      onLogout();
    } finally {
      setLoadingLogout(false);
    }
  };

  const getNavLinkClass: NavLinkProps["className"] = ({ isActive }) =>
    isActive
      ? "border-b-2 border-emerald-700 pb-1"
      : "pb-1 transition hover:border-b-2 hover:border-emerald-500";

  return (
    <header className="mx-auto max-w-5xl rounded-b-2xl bg-white px-6 py-4 shadow-md">
      <nav className="flex items-center justify-between">
        <NavLink
          to="/"
          className="cursor-pointer text-2xl font-bold text-emerald-700 select-none"
        >
          <img src="/logo.svg" alt="Logo Nodepop" className="h-10 px-2" />
        </NavLink>

        <ul className="flex items-center space-x-8 text-lg font-semibold text-emerald-700">
          {isLogged && (
            <li>
              <NavLink to="/adverts/new" end className={getNavLinkClass}>
                Nuevo
              </NavLink>
            </li>
          )}

          {!isLogged && (
            <li>
              <NavLink to="/signup" className={getNavLinkClass}>
                Registro
              </NavLink>
            </li>
          )}

          <li>
            {isLogged ? (
              <Button
                variant="secondary"
                onClick={handleLogoutClick}
                disabled={loadingLogout}
              >
                {loadingLogout ? "Cerrando sesión..." : "Logout"}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleLoginClick}
                disabled={location.pathname === "/login"}
              >
                Login
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
