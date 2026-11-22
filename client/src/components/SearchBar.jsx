export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search"
      placeholder="Search by recipe name or ingredient..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
