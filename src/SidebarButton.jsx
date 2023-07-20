import { useSneakers } from "./SneakerContext";
import { LuSettings2 } from "react-icons/lu";
export default function SidebarButton() {
  const { isSidebarOpen, toggleIsSidebarOpen } = useSneakers();
  return (
    <div
      role="button"
      style={{ border: "none", alignItems: "center" }}
      onClick={toggleIsSidebarOpen}
      className="flex"
    >
      <span style={{ fontSize: ".9em" }}>
        {isSidebarOpen ? "Hide" : "Show"} Filters
      </span>
      <LuSettings2 />
    </div>
  );
}
