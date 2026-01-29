import ItemFilters from './items/ItemFilters';

const HeroSection = ({filters,onFilterChange,onApplyFilters,onResetFilters}) => {
  return (
    <div className="bg-linear-to-br from-amber-100 to-amber-200 py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-amber-900 mb-11">
            Lost & Found
          </h1>

          <p className="text-xl text-amber-800 mb-12 max-w-2xl mx-auto leading-relaxed">
            Retrouvez vos objets perdus ou aidez quelqu&apos;un à récupérer les siens.
            <br />
            Une communauté solidaire pour ne plus rien perdre.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-12 text-center">
            Rechercher dans les objets déclarés
          </h2>

          <ItemFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onApplyFilters={onApplyFilters}
            onResetFilters={onResetFilters}
          />
        </div>

      </div>
    </div>
  );
};

export default HeroSection;