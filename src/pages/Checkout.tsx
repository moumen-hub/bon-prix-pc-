import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, CreditCard, Lock, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { cn, formatPrice } from '../lib/utils';

export function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    clearCart();
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('yourCartIsEmpty')}</h2>
        <Link to="/shop" className="text-blue-600 hover:text-blue-700 font-medium">{t('returnToShop')}</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{t('orderConfirmed')}</h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('thankYouPurchase')} #BP-{Math.floor(Math.random() * 1000000)}
        </p>
        <Link
          to="/"
          className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          {t('returnToHome')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8 flex items-center gap-4 text-sm font-medium text-gray-500">
              <Link to="/shop" className="hover:text-gray-900 flex items-center gap-1">
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> {t('backToShop')}
              </Link>
              <span className="text-gray-300">|</span>
              <span className={cn(step >= 1 ? "text-blue-600" : "")}>{t('shipping')}</span>
              <span className="text-gray-300 rtl:rotate-180">&gt;</span>
              <span className={cn(step >= 2 ? "text-blue-600" : "")}>{t('payment')}</span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {step === 1 && (
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Truck className="h-6 w-6 text-blue-600" />
                    {t('shippingInfo')}
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">{t('firstName')}</label>
                        <input required type="text" id="firstName" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">{t('lastName')}</label>
                        <input required type="text" id="lastName" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">{t('address')}</label>
                      <input required type="text" id="address" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">{t('city')}</label>
                        <input required type="text" id="city" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">{t('zipCode')}</label>
                        <input required type="text" id="zip" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors mt-8"
                    >
                      {t('continueToPayment')}
                    </button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    {t('paymentDetails')}
                  </h2>
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                    <Lock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      {t('securePayment')}
                    </p>
                  </div>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">{t('nameOnCard')}</label>
                      <input required type="text" id="cardName" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                    </div>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">{t('cardNumber')}</label>
                      <input required type="text" id="cardNumber" placeholder="0000 0000 0000 0000" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="exp" className="block text-sm font-medium text-gray-700 mb-1">{t('expirationDate')}</label>
                        <input required type="text" id="exp" placeholder="MM/YY" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">{t('cvc')}</label>
                        <input required type="text" id="cvc" placeholder="123" className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2.5" />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 flex items-center justify-center rounded-xl bg-white border border-gray-300 px-8 py-4 text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                      >
                        {t('back')}
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
                      >
                        {t('payAmount', { amount: formatPrice(cartTotal) })}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('orderSummary')}</h2>
              
              <ul className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-500">{t('qty')}: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 flex items-center">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>{t('subtotal')}</p>
                  <p className="font-medium text-gray-900">{formatPrice(cartTotal)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>{t('shipping')}</p>
                  <p className="font-medium text-green-600">{t('free')}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>{t('taxes')}</p>
                  <p className="font-medium text-gray-900">{formatPrice(0)}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <p className="text-lg font-bold text-gray-900">{t('total')}</p>
                  <p className="text-lg font-bold text-blue-600">{formatPrice(cartTotal)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
