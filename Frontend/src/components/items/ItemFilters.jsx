const ItemFilters = ({filters,onFilterChange,onApplyFilters,onResetFilters}) => 
{
  return (
    <div className="bg-white p-5 rounded-xl shadow-md mb-6">
      <div className="flex flex-wrap gap-4 items-end">

        <div className="w-full sm:w-40">
          <label className="block text-amber-900 font-medium mb-1">
            Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={onFilterChange}
            className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Tous</option>
            <option value="lost">Perdu</option>
            <option value="found">Trouvé</option>
          </select>
        </div>

        <div className="flex-1 min-w-55">
          <label className="block text-amber-900 font-medium mb-1">
            Lieu
          </label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={onFilterChange}
            placeholder="Rechercher par lieu..."
            className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onApplyFilters}
            className="bg-amber-900 text-white px-5 py-2 rounded-lg hover:bg-amber-800 transition font-medium"
          >
            Filtrer
          </button>

          <button
            onClick={onResetFilters}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Réinitialiser
          </button>
        </div>

      </div>
    </div>
  );
};

export default ItemFilters;