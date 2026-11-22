import RecipeCard from './RecipeCard.jsx';

export default function RecipeList({ recipes, onToggleFavourite, view, emptyText }) {
  if (recipes.length === 0) return <p className="muted empty">{emptyText || 'No recipes found.'}</p>;
  return (
    <div className={view === 'list' ? 'list' : 'grid'}>
      {recipes.map((r) => (
        <RecipeCard key={r._id} recipe={r} onToggleFavourite={onToggleFavourite} view={view} />
      ))}
    </div>
  );
}
