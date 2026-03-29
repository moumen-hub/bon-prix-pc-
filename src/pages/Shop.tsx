import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export function Shop() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const categoryFilter = searchParams.get('category');
  const sortFilter = searchParams.get('sort') || 'featured';
  const priceFilter = searchParams.get('price'); // 'under-100000', '100000-200000', 'over-200000'

  const handleFilterChange = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (priceFilter) {
      if (priceFilter === 'under-100000') result = result.filter(p => p.price < 100000);
      if (priceFilter === '100000-200000') result = result.filter(p => p.price >= 100000 && p.price <= 200000);
      if (priceFilter === 'over-200000') result = result.filter(p => p.price > 200000);
    }

    // Sorting
    if (sortFilter === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortFilter === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortFilter === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sortFilter === 'best-selling') result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));

    return result;
  }, [categoryFilter, sortFilter, priceFilter]);

  const activeCategoryName = categoryFilter 
    ? (t(categoryFilter as any) || CATEGORIES.find(c => c.id === categoryFilter)?.name)
    : t('allProducts');

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{activeCategoryName}</h1>
          <p className="mt-2 text-sm text-gray-500">{t('showingResults', { count: filteredProducts.length })}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            {t('filters')}
          </button>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 hidden sm:block">{t('sortBy')}</label>
            <select
              id="sort"
              value={sortFilter}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm border shadow-sm bg-white"
            >
              <option value="featured">{t('featured')}</option>
              <option value="best-selling">{t('bestSelling')}</option>
              <option value="newest">{t('newArrivals')}</option>
              <option value="price-low">{t('priceLowHigh')}</option>
              <option value="price-high">{t('priceHighLow')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{t('categories')}</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleFilterChange('category', null)}
                    className={cn(
                      "text-sm transition-colors",
                      !categoryFilter ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {t('allProducts')}
                  </button>
                </li>
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleFilterChange('category', category.id)}
                      className={cn(
                        "text-sm transition-colors",
                        categoryFilter === category.id ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      {t(category.id as any) || category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{t('priceRange')}</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleFilterChange('price', null)}
                    className={cn(
                      "text-sm transition-colors flex items-center gap-2",
                      !priceFilter ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    <div className={cn("w-4 h-4 rounded border flex items-center justify-center", !priceFilter ? "border-blue-600 bg-blue-600" : "border-gray-300")}>
                      {!priceFilter && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    {t('anyPrice')}
                  </button>
                </li>
                {[
                  { id: 'under-100000', label: t('under100k') },
                  { id: '100000-200000', label: t('between100k200k') },
                  { id: 'over-200000', label: t('over200k') },
                ].map((range) => (
                  <li key={range.id}>
                    <button
                      onClick={() => handleFilterChange('price', range.id)}
                      className={cn(
                        "text-sm transition-colors flex items-center gap-2",
                        priceFilter === range.id ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <div className={cn("w-4 h-4 rounded border flex items-center justify-center", priceFilter === range.id ? "border-blue-600 bg-blue-600" : "border-gray-300")}>
                        {priceFilter === range.id && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
              <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noProductsFound')}</h3>
              <p className="text-gray-500 mb-6">{t('tryAdjustingFilters')}</p>
              <button
                onClick={() => {
                  handleFilterChange('category', null);
                  handleFilterChange('price', null);
                }}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              >
                {t('clearAllFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Dialog */}
      {isMobileFiltersOpen && (
        <div className="relative z-50 md:hidden">
          <div className="fixed inset-0 bg-black/25" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 right-0 flex max-w-xs w-full bg-white shadow-xl flex-col py-6 pb-12 overflow-y-auto">
            <div className="px-4 flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">{t('filters')}</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="px-4 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{t('categories')}</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => handleFilterChange('category', null)}
                      className={cn(
                        "text-base transition-colors",
                        !categoryFilter ? "text-blue-600 font-medium" : "text-gray-600"
                      )}
                    >
                      {t('allProducts')}
                    </button>
                  </li>
                  {CATEGORIES.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleFilterChange('category', category.id)}
                        className={cn(
                          "text-base transition-colors",
                          categoryFilter === category.id ? "text-blue-600 font-medium" : "text-gray-600"
                        )}
                      >
                        {t(category.id as any) || category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{t('priceRange')}</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => handleFilterChange('price', null)}
                      className={cn(
                        "text-base transition-colors flex items-center gap-3",
                        !priceFilter ? "text-blue-600 font-medium" : "text-gray-600"
                      )}
                    >
                      <div className={cn("w-5 h-5 rounded border flex items-center justify-center", !priceFilter ? "border-blue-600 bg-blue-600" : "border-gray-300")}>
                        {!priceFilter && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                      </div>
                      {t('anyPrice')}
                    </button>
                  </li>
                  {[
                    { id: 'under-100000', label: t('under100k') },
                    { id: '100000-200000', label: t('between100k200k') },
                    { id: 'over-200000', label: t('over200k') },
                  ].map((range) => (
                    <li key={range.id}>
                      <button
                        onClick={() => handleFilterChange('price', range.id)}
                        className={cn(
                          "text-base transition-colors flex items-center gap-3",
                          priceFilter === range.id ? "text-blue-600 font-medium" : "text-gray-600"
                        )}
                      >
                        <div className={cn("w-5 h-5 rounded border flex items-center justify-center", priceFilter === range.id ? "border-blue-600 bg-blue-600" : "border-gray-300")}>
                          {priceFilter === range.id && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-auto px-4 pt-8">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-sm hover:bg-blue-700"
              >
                {t('showResults')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
