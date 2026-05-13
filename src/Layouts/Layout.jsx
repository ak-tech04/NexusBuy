import { Outlet } from "react-router";
import { useTheme } from "@/contexts/ThemeContext";

function Layout() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div className={isDark ? "dark" : "light"}>
      <Outlet />
    </div>
  );
}

export default Layout;
