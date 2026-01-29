import { useItems } from '../context/ItemContext';

import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ItemCard from '../components/items/ItemCard';

const ItemsList = () => {
  const { items, filters, updateFilters, applyFilters, resetFilters } = useItems();

  const handleFilterChange = ({ target }) => {
    updateFilters({
      ...filters,
      [target.name]: target.value
    });
  };

  const totalItems = items.length;
  const resolvedItems = items.filter(
    item => item.status === 'resolved'
  ).length;

  return (
    <div className="min-h-screen bg-amber-50">

      <HeroSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
      />

      <StatsSection
        totalItems={totalItems}
        resolvedItems={resolvedItems}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <section>
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">
            Objets récemment déclarés
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ItemsList;