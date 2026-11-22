const BASE = '/api/recipes';

async function request(url, options) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const getRecipes = ({ search = '', category = 'All', favourite = false } = {}) => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category && category !== 'All') params.set('category', category);
  if (favourite) params.set('favourite', 'true');
  return request(`${BASE}?${params}`);
};
export const getRecipe = (id) => request(`${BASE}/${id}`);
export const createRecipe = (body) => request(BASE, { method: 'POST', body: JSON.stringify(body) });
export const updateRecipe = (id, body) => request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const deleteRecipe = (id) => request(`${BASE}/${id}`, { method: 'DELETE' });
export const toggleFavourite = (id) => request(`${BASE}/${id}/favourite`, { method: 'PATCH' });
export const getCategories = () => request('/api/categories');
