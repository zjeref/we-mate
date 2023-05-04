import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';
import { GlobalState, initialState, reducer } from './middlewares/global-states';
import Home from './pages/Home'
import Protected from './middlewares/Protected';
import Users from './components/home/Users';
import Hero from './components/home/Hero';

function App() {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <GlobalState.Provider value={{ data: data, dispatch: dispatch }}>
        <Routes>
          <Route path="/" element={<Protected><Home /></Protected>} >
            <Route path="" element={<Users/>}/>
          </Route>
          <Route path="/verify" element={<Protected><Home /></Protected>} >
            <Route path="" element={<Hero/>}/>
          </Route>
        </Routes>

      </GlobalState.Provider>
    </BrowserRouter>
  );
}

export default App;
