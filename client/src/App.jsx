import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Favourites from './pages/Favourites.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import AddRecipe from './pages/AddRecipe.jsx';
import EditRecipe from './pages/EditRecipe.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recipes/new" element={<AddRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
