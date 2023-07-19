import SneakersProvider from "./SneakerContext";
import SidebarButton from "./SidebarButton";
import Dropdown from "./Dropdown";
import ThemePicker from "./ThemePicker";
import Sidebar from "./Sidebar";
import SneakerList from "./SneakerList";
import Total from "./Total";
import "./App.css";

function App() {
  return (
    <div className="container-fluid">
      <div className="flex headings title">
        <h1>Nike</h1>
        <ThemePicker />
      </div>

      <SneakersProvider>
        <section style={{ marginTop: "5em" }}>
          <hgroup className="flex space-between">
            <Total />
            <div className="flex buttons">
              <SidebarButton />
              <Dropdown />
            </div>
          </hgroup>
        </section>

        <section className="flex content">
          <Sidebar />
          <SneakerList />
        </section>
      </SneakersProvider>
    </div>
  );
}

export default App;
