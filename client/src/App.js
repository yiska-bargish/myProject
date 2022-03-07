import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from '../src/route/route'
// Configure JSS
// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// // Custom Material-UI class name generator.
// const generateClassName = createGenerateClassName();

// function RTL(props) {
//   return (
//     <JssProvider jss={jss} generateClassName={generateClassName}>
//       {props.children}
//     </JssProvider>
//   );
// }

// export default RTL;
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
