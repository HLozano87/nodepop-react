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
    <header className="w-full bg-white px-4 py-4 shadow-md sm:px-6 md:px-8">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex cursor-pointer items-center gap-2 select-none"
        >
          <img src="/logo.svg" alt="Logo Nodepop" className="h-10" />
          <span className="sr-only">Nodepop</span>
        </NavLink>

        <ul className="flex flex-wrap items-center gap-4 text-base font-medium text-emerald-700 sm:gap-6 md:gap-8 md:text-lg">
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
