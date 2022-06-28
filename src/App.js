
import { Home } from './components/Home';
import { ListProvider } from './context/list';
import { LoadProvider } from './context/load';

export function App() {

  return (
    <div className="App">
      <ListProvider>
        <LoadProvider>

          <Home />

        </LoadProvider>
      </ListProvider>
    </div>
  );
}

