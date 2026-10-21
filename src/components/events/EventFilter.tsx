interface EventFilterProps {
  searchText: string;
  category: string;
  categories: string[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (cat: string) => void;
}

function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={e => e.preventDefault()}>
      <label htmlFor="arama">Etkinlik ara</label>
      <input 
        type="search" 
        id="arama" 
        placeholder="Örn: atölye, kariyer" 
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      <label htmlFor="kategori-filtre">Kategori</label>
      <select 
        id="kategori-filtre"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Tümü</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </form>
  );
}

export default EventFilter;