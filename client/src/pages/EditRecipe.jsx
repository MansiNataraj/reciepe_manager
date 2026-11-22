import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm.jsx';
import { getRecipe, updateRecipe } from '../api.js';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecipe(id).then(setRecipe).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <p className="muted">Loading...</p>;

  return (
    <>
      <h2>Edit Recipe</h2>
      <RecipeForm
        initial={recipe}
        submitLabel="Update Recipe"
        onSubmit={async (data) => {
          await updateRecipe(id, data);
          navigate(`/recipes/${id}`);
        }}
      />
    </>
  );
}
