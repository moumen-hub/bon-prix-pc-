import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap, Star, CheckCircle2 } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export function Home() {
  const { t } = useLanguage();
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1600&q=80" 
            alt="Laptop Setup" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 border border-blue-500/30">
              <Star className="h-4 w-4 fill-current" />
              <span>+1000 satisfied customers</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              {t('heroTitle1')} <span className="text-blue-500">{t('heroTitle2')}</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
              >
                {t('shopNow')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/deals"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 bg-green-400 rounded-lg shadow-lg hover:bg-green-500 transition-all hover:scale-105"
              >
                {t('viewDeals')}
              </Link>
            </div>
            
            <div className="mt-10 flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span>{t('warranty')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span>{t('freeShipping')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('shopByCategory')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative h-64 overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all hover:shadow-xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{t(category.id as any) || category.name}</h3>
                <span className="inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                  {t('explore')} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-blue-600 shadow-2xl">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
            <img 
              src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&q=80" 
              alt="Promo" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative px-8 py-16 md:py-20 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                {t('upTo')} <span className="text-green-400">30%</span> {t('offOnGaming')}
              </h2>
              <p className="text-blue-100 text-lg max-w-xl">
                {t('promoDesc')}
              </p>
            </div>
            <Link
              to="/deals"
              className="shrink-0 inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-900 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all hover:scale-105"
            >
              {t('shopDealsNow')}
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('bestSellers')}</h2>
          <Link to="/shop" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
            {t('viewAll')} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">{t('whyChooseUs')}</h2>
            <p className="text-lg text-gray-600">{t('whyChooseDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('affordablePrices')}</h3>
              <p className="text-gray-600">{t('affordableDesc')}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('warrantySupport')}</h3>
              <p className="text-gray-600">{t('warrantyDesc')}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('fastDelivery')}</h3>
              <p className="text-gray-600">{t('fastDeliveryDesc')}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('trustedQuality')}</h3>
              <p className="text-gray-600">{t('trustedQualityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight text-center mb-12">{t('whatCustomersSay')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex M.",
              role: "Gamer",
              content: "The Bon Prix Stealth 15 exceeded all my expectations. It runs Cyberpunk 2077 at max settings without breaking a sweat. Incredible value.",
              rating: 5
            },
            {
              name: "Sarah T.",
              role: "Graphic Designer",
              content: "I needed a powerful laptop for rendering, but was on a tight budget. The team helped me pick the perfect setup. Delivery was super fast!",
              rating: 5
            },
            {
              name: "David L.",
              role: "Student",
              content: "Got a laptop for college and some light gaming. The build quality is fantastic and the battery lasts all day. Highly recommend Bon Prix PC.",
              rating: 4
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={cn("h-5 w-5", j < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 flex-1">"{testimonial.content}"</p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
