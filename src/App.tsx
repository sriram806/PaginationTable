import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import ServerPaginationTable from './components/ServerPaginationTable';

function App() {
  return (
    <div className="App">
      <ServerPaginationTable />
    </div>
  );
}

export default App;
