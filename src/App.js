
import { Home } from './components/Home';
import { ListProvider } from './context/list';


export function App() {



  return (
    <div className="App">
      <ListProvider>

        <Home />

      </ListProvider>
    </div>
  );
}

