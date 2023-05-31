import { logo } from './assets';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';

const App = () => {
  return (
    <BrowserRouter>
      <header className="flex w-full items-center justify-between border-b border-b-borderGrey bg-white px-4 py-4 sm:px-8">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link
          to="/create-post"
          className="rounded-md bg-purple px-4 py-2 font-inter font-medium text-white"
        >
          Create
        </Link>
      </header>

      <main className="min-h-[calc(100vh-73px)] bg-backgroundWhite px-4 py-4 sm:px-8 sm:py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
