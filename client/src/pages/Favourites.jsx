import { useEffect, useState } from 'react';
import { getRecipes, toggleFavourite } from '../api.js';
import RecipeList from '../components/RecipeList.jsx';

export default function Favourites() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecipes({ favourite: true })
      .then(setRecipes)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleFav = async (id) => {
    await toggleFavourite(id);
    setRecipes((rs) => rs.filter((r) => r._id !== id));
  };

  return (
    <>
      <h2>Favourite Recipes</h2>
      {error && <div className="error">{error}</div>}
      {loading ? <p className="muted">Loading...</p> : (
        <RecipeList recipes={recipes} onToggleFavourite={handleFav} emptyText="No favourites yet. Tap the heart on a recipe to add it." />
      )}
    </>
  );
}
