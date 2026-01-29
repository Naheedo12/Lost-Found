const StatsSection = ({ totalItems, resolvedItems }) => {
  const inProgressItems = totalItems - resolvedItems;
  
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">
          Notre impact
        </h2>
        
        <div className="grid grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <div className="bg-amber-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-amber-900 mb-2">
              {totalItems}
            </div>
            <div className="text-amber-700">
              Objets déclarés
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-green-700 mb-2">
              {resolvedItems}
            </div>
            <div className="text-green-600">
              Objets retrouvés
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-yellow-700 mb-2">
              {inProgressItems}
            </div>
            <div className="text-yellow-600">
              En recherche
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;