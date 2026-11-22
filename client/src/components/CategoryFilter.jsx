export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="chips">
      {['All', ...categories].map((c) => (
        <button
          key={c}
          className={`chip ${selected === c ? 'active' : ''}`}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
