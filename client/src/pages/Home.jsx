import { useEffect, useState } from 'react';
import { getRecipes, getCategories, toggleFavourite } from '../api.js';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import RecipeList from '../components/RecipeList.jsx';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { getCategories().then(setCategories).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      getRecipes({ search, category })
        .then((data) => { setRecipes(data); setError(''); })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }, 250); // debounce search
    return () => clearTimeout(t);
  }, [search, category]);

  const handleFav = async (id) => {
    const updated = await toggleFavourite(id);
    setRecipes((rs) => rs.map((r) => (r._id === id ? updated : r)));
  };

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>What are we cooking today?</h1>
          <p>Your personal collection of recipes — search, filter and save your favourites.</p>
        </div>
      </section>
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <div className="view-toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>Cards</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>List</button>
        </div>
      </div>
      <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
      {error && <div className="error">{error}</div>}
      {loading ? <p className="muted">Loading...</p> : (
        <RecipeList recipes={recipes} onToggleFavourite={handleFav} view={view} />
      )}
    </>
  );
}
