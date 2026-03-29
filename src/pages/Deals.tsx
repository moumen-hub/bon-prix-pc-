import React from 'react';
import { Tag, Clock } from 'lucide-react';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';

export function Deals() {
  const deals = PRODUCTS.filter(p => p.originalPrice);
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-6">
          <Tag className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
          <span dangerouslySetInnerHTML={{ __html: t('currentDeals') }} />
        </h1>
        <p className="text-xl text-gray-600">
          {t('dealsDesc')}
        </p>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-900">{t('flashSale')}</h3>
            <p className="text-red-700">{t('flashSaleDesc')} <strong>FLASH5</strong></p>
          </div>
        </div>
        <div className="flex gap-4 text-center">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-red-100 min-w-[4rem]">
            <span className="block text-2xl font-bold text-red-600">12</span>
            <span className="text-xs text-red-500 uppercase font-semibold">{t('hours')}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-red-100 min-w-[4rem]">
            <span className="block text-2xl font-bold text-red-600">45</span>
            <span className="text-xs text-red-500 uppercase font-semibold">{t('mins')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
