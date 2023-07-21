import SneakersProvider from './Context/SneakerContext';
import Dropdown from './Dropdown';
import SidebarToggleButton from './SidebarToggleButton';
import ThemePicker from './ThemePicker';
import Cart from './Cart';
import Sneakers from './Sneakers';
import Total from './Total';

import './App.css';

function App() {
  return (
    <SneakersProvider>
      <div className='container-fluid relative'>
        <Cart />
        <Navigation />
        <Header />
        <Sneakers />
      </div>
    </SneakersProvider>
  );
}

function Navigation() {
  return (
    <div className='flex space-between header align headings'>
      <h3>Nike</h3>
      <ThemePicker />
    </div>
  );
}

function Header() {
  return (
    <section className='flex space-between'>
      <Total />
      <div className='flex' style={{ gap: '.5em', width: '25%' }}>
        <SidebarToggleButton />
        <Dropdown />
      </div>
    </section>
  );
}

export default App;
