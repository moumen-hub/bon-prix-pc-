import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, ShieldCheck, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { cn, formatPrice } from '../lib/utils';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  const product = PRODUCTS.find(p => p.id === id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('productNotFound')}</h2>
        <Link to="/shop" className="text-blue-600 hover:text-blue-700 font-medium">{t('returnToShop')}</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex text-sm font-medium text-gray-500">
            <Link to="/" className="hover:text-gray-900">{t('home')}</Link>
            <ChevronRight className="mx-2 h-5 w-5 shrink-0 text-gray-400 rtl:rotate-180" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-gray-900 capitalize">
              {t(product.category as any) || product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="mx-2 h-5 w-5 shrink-0 text-gray-400 rtl:rotate-180" />
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Product Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 mb-8 lg:mb-0">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 border-2 transition-all",
                    activeImage === idx ? "border-blue-600 ring-2 ring-blue-600/20" : "border-transparent hover:border-gray-300"
                  )}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="aspect-[4/3] lg:aspect-auto lg:h-[600px] flex-1 overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-900">{product.rating}</span>
                  <span className="ml-1 text-sm text-blue-600 hover:underline cursor-pointer">({t('reviewsCount', { count: product.reviews })})</span>
                </div>
                <div className="h-4 w-px bg-gray-300" />
                {product.stock > 0 ? (
                  <span className="inline-flex items-center text-sm font-medium text-green-600">
                    <CheckCircle2 className="mr-1.5 h-4 w-4" />
                    {product.stock > 5 ? t('inStock') : t('onlyLeft', { count: product.stock })}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-sm font-medium text-red-600">
                    <AlertCircle className="mr-1.5 h-4 w-4" />
                    {t('outOfStock')}
                  </span>
                )}
              </div>

              <div className="flex items-end gap-3 mb-6">
                <p className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</p>
                {product.originalPrice && (
                  <>
                    <p className="text-xl text-gray-500 line-through mb-1">{formatPrice(product.originalPrice)}</p>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-800 mb-1.5">
                      {t('saveAmount', { amount: formatPrice(product.originalPrice - product.price) })}
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-base text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specs Table */}
            <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t('keySpecs')}</h3>
              </div>
              <dl className="divide-y divide-gray-200">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 capitalize">{t(key as any) || key}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-4">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ShoppingCart className="h-6 w-6" />
                {product.stock === 0 ? t('outOfStock') : t('addToCart')}
              </button>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-5 w-5 text-blue-500 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: t('freeDelivery') }} />
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: t('warrantyIncluded') }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">{t('youMightAlsoLike')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
