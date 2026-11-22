import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getRecipe, deleteRecipe, toggleFavourite } from '../api.js';
import RecipeImage from '../components/RecipeImage.jsx';
import Icon from '../components/Icon.jsx';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecipe(id).then(setRecipe).catch((e) => setError(e.message));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${recipe.name}"?`)) return;
    await deleteRecipe(id);
    navigate('/');
  };

  const handleFav = async () => setRecipe(await toggleFavourite(id));

  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <p className="muted">Loading...</p>;

  return (
    <article className="detail">
      <div className="hero-img">
        <RecipeImage recipe={recipe} className="detail-img" />
        <div className="hero-overlay">
          <Link to="/" className="back-pill"><Icon name="arrowLeft" size={16} /> All recipes</Link>
          <button className={`fav fav-pill ${recipe.favourite ? 'on' : ''}`} onClick={handleFav} title="Toggle favourite">
            <Icon name="heart" size={22} filled={recipe.favourite} />
          </button>
        </div>
      </div>
      <div className="detail-content">
        <span className="tag">{recipe.category}</span>
        <h2>{recipe.name}</h2>
        <div className="stats">
          <div><strong>{recipe.cookingTime}</strong><span>minutes</span></div>
          <div><strong>{recipe.servings}</strong><span>servings</span></div>
          <div><strong>{recipe.ingredients.length}</strong><span>ingredients</span></div>
        </div>
        <div className="detail-cols">
          <section>
            <h3>Ingredients</h3>
            <ul className="ingredients">{recipe.ingredients.map((i, n) => <li key={n}>{i}</li>)}</ul>
          </section>
          <section>
            <h3>Steps</h3>
            <ol className="steps">{recipe.steps.map((s, n) => <li key={n}>{s}</li>)}</ol>
          </section>
        </div>
        <div className="actions">
          <Link to={`/recipes/${id}/edit`} className="btn">Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}
