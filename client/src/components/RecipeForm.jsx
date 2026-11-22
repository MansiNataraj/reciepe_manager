import { useEffect, useState } from 'react';
import { getCategories } from '../api.js';
import Icon from './Icon.jsx';

const empty = { name: '', category: '', ingredients: '', steps: '', cookingTime: '', servings: '', image: '' };

// Downscale to max 900px wide JPEG so the data URL stays small
function fileToDataUrl(file, maxW = 900) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
const toLines = (text) => text.split('\n').map((l) => l.trim()).filter(Boolean);

export default function RecipeForm({ initial, onSubmit, submitLabel = 'Save Recipe' }) {
  const [form, setForm] = useState(empty);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { getCategories().then(setCategories).catch(() => {}); }, []);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        category: initial.category,
        ingredients: initial.ingredients.join('\n'),
        steps: initial.steps.join('\n'),
        cookingTime: initial.cookingTime,
        servings: initial.servings,
        image: initial.image || '',
      });
    }
  }, [initial]);

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Please choose an image file.');
    try {
      setForm((f) => ({ ...f, image: '' }));
      const dataUrl = await fileToDataUrl(file);
      setForm((f) => ({ ...f, image: dataUrl }));
      setError('');
    } catch {
      setError('Could not read that image.');
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      name: form.name.trim(),
      category: form.category,
      ingredients: toLines(form.ingredients),
      steps: toLines(form.steps),
      cookingTime: Number(form.cookingTime),
      servings: Number(form.servings),
      image: form.image,
    };
    if (!payload.name || !payload.category) return setError('Name and category are required.');
    if (!payload.ingredients.length || !payload.steps.length) return setError('Add at least one ingredient and one step.');
    if (!(payload.cookingTime > 0) || !(payload.servings > 0)) return setError('Cooking time and servings must be positive numbers.');
    setSaving(true);
    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div className="image-upload">
        {form.image ? (
          <img src={form.image} alt="Preview" className="upload-preview" />
        ) : (
          <div className="upload-placeholder"><Icon name="camera" size={34} /><span>Add a photo of your dish</span></div>
        )}
        <div className="upload-actions">
          <label className="btn btn-small btn-outline file-btn">
            {form.image ? 'Change photo' : 'Upload photo'}
            <input type="file" accept="image/*" onChange={handleImage} hidden />
          </label>
          {form.image && (
            <button type="button" className="btn btn-small btn-outline" onClick={() => setForm({ ...form, image: '' })}>Remove</button>
          )}
        </div>
      </div>
      <label>Or paste an image URL
        <input
          value={form.image.startsWith('data:') ? '' : form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value.trim() })}
          placeholder="https://..."
        />
      </label>
      <label>Recipe name
        <input value={form.name} onChange={set('name')} placeholder="e.g. Veg Pulao" />
      </label>
      <label>Category
        <select value={form.category} onChange={set('category')}>
          <option value="">Select a category</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <div className="row">
        <label>Cooking time (minutes)
          <input type="number" min="1" value={form.cookingTime} onChange={set('cookingTime')} />
        </label>
        <label>Servings
          <input type="number" min="1" value={form.servings} onChange={set('servings')} />
        </label>
      </div>
      <label>Ingredients (one per line)
        <textarea rows="6" value={form.ingredients} onChange={set('ingredients')} />
      </label>
      <label>Steps (one per line)
        <textarea rows="6" value={form.steps} onChange={set('steps')} />
      </label>
      <button className="btn" disabled={saving}>{saving ? 'Saving...' : submitLabel}</button>
    </form>
  );
}
