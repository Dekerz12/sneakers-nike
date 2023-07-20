import SneakersProvider from "./SneakerContext";
import SidebarButton from "./SidebarButton";
import Dropdown from "./Dropdown";
import ThemePicker from "./ThemePicker";
import Sidebar from "./Sidebar";
import SneakerList from "./SneakerList";
import Total from "./Total";
import Checkout from "./Checkout";
import "./App.css";

function App() {
  return (
    <SneakersProvider>
      <div className="container-fluid">
        <div className="flex headings title">
          <h1>Nike</h1>
          <div className="flex">
            <ThemePicker />
          </div>
          <Checkout />
        </div>

        <section style={{ marginTop: "5em" }}>
          <hgroup className="flex space-between button-sort">
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
      </div>
    </SneakersProvider>
  );
}

export default App;
