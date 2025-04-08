import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ROUTES } from './constants/routes';
import Layout from './components/Layout';
import Home from './components/Home';
import EditorPage from './components/EditorPage';
import Settings from './components/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.EDITOR} element={<EditorPage />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
