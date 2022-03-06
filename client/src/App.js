import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from '../src/route/route'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes></Routes>
      </Provider>
    </div>
  );
}

export default App;
