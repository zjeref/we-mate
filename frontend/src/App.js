import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalState, initialState, reducer } from './middlewares/global-states';
import Home from './pages/Home'
import { useReducer } from 'react';

function App() {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <GlobalState.Provider value={{ data: data, dispatch: dispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

      </GlobalState.Provider>
    </BrowserRouter>
  );
}

export default App;
