import { useState, useEffect } from 'react';
import Icon from './Icon.jsx';

export default function RecipeImage({ recipe, className = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [recipe.image]);
  if (recipe.image && !failed) {
    return (
      <div className={`img-wrap ${className}`}>
        <img src={recipe.image} alt={recipe.name} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} />
      </div>
    );
  }
  return (
    <div className={`img-wrap img-empty ${className}`} role="img" aria-label={`${recipe.name} (no photo)`}>
      <Icon name="image" size={40} />
      <span>No photo yet</span>
    </div>
  );
}
