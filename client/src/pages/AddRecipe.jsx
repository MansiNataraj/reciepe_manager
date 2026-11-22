import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm.jsx';
import { createRecipe } from '../api.js';

export default function AddRecipe() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Add a Recipe</h2>
      <RecipeForm
        submitLabel="Add Recipe"
        onSubmit={async (data) => {
          const created = await createRecipe(data);
          navigate(`/recipes/${created._id}`);
        }}
      />
    </>
  );
}
