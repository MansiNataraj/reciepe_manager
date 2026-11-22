import { Link } from 'react-router-dom';
import RecipeImage from './RecipeImage.jsx';
import Icon from './Icon.jsx';

export default function RecipeCard({ recipe, onToggleFavourite, view = 'grid' }) {
  return (
    <article className={`card ${view === 'list' ? 'card-row' : ''}`}>
      <Link to={`/recipes/${recipe._id}`} className="card-img-link">
        <RecipeImage recipe={recipe} className="card-img" />
        <span className="tag tag-float">{recipe.category}</span>
      </Link>
      <button
        className={`fav fav-float ${recipe.favourite ? 'on' : ''}`}
        onClick={() => onToggleFavourite(recipe._id)}
        aria-label={recipe.favourite ? 'Remove from favourites' : 'Add to favourites'}
        title={recipe.favourite ? 'Remove from favourites' : 'Add to favourites'}
      >
        <Icon name="heart" size={18} filled={recipe.favourite} />
      </button>
      <div className="card-body">
        <h3><Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link></h3>
        <p className="meta">
          <span><Icon name="clock" size={15} /> {recipe.cookingTime} min</span>
          <span><Icon name="users" size={15} /> {recipe.servings}</span>
          <span><Icon name="list" size={15} /> {recipe.ingredients.length} items</span>
        </p>
      </div>
    </article>
  );
}
