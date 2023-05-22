import { logo } from './assets';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';

const App = () => {
  return (
    <BrowserRouter>
      <header className="flex bg-white w-full justify-between items-center px-4 sm:px-8 py-4 border-b border-b-borderGrey">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium text-white px-4 py-2 rounded-md bg-purple"
        >
          Create
        </Link>
      </header>

      <main className="px-4 sm:px-8 py-4 sm:py-8 bg-backgroundWhite min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
