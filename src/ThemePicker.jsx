import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import useToggle from "./customhooks/useToggle";
const html = document.documentElement;
function changeTheme(e, toggleTheme, theme) {
  e.preventDefault();
  toggleTheme();
  html.setAttribute("data-theme", theme ? "light" : "dark");
}
export default function ThemePicker() {
  const [theme, toggleTheme] = useToggle(false);
  return (
    <div
      style={{
        cursor: "pointer",
        fontSize: "1.5em",
        position: "absolute",
        right: "120px",
      }}
      onClick={(e) => changeTheme(e, toggleTheme, theme)}
    >
      {theme ? <BsFillBrightnessHighFill /> : <BsFillMoonStarsFill />}
    </div>
  );
}
