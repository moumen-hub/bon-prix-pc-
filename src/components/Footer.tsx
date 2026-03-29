import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Bon Prix PC" 
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  document.getElementById('fallback-logo-footer')!.style.display = 'block';
                }}
              />
              <span id="fallback-logo-footer" className="hidden text-xl font-bold tracking-tight text-white">
                Bon Prix <span className="text-blue-500">PC</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              {t('heroSubtitle')}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-sm hover:text-blue-500 transition-colors">{t('shopAll')}</Link></li>
              <li><Link to="/shop?category=gaming-laptops" className="text-sm hover:text-blue-500 transition-colors">{t('gaming-laptops')}</Link></li>
              <li><Link to="/shop?category=business-laptops" className="text-sm hover:text-blue-500 transition-colors">{t('business-laptops')}</Link></li>
              <li><Link to="/shop?category=student-laptops" className="text-sm hover:text-blue-500 transition-colors">{t('student-laptops')}</Link></li>
              <li><Link to="/deals" className="text-sm hover:text-green-500 transition-colors">{t('deals')}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('customerService')}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-blue-500 transition-colors">{t('aboutUs')}</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-blue-500 transition-colors">{t('contactUs')}</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-blue-500 transition-colors">{t('faq')}</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-blue-500 transition-colors">{t('shippingReturns')}</Link></li>
              <li><Link to="/warranty" className="text-sm hover:text-blue-500 transition-colors">{t('warrantyInfo')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                <span className="text-sm">cité chikh mokrani, Msila, Msila 28000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <span className="text-sm">+213556443206</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <span className="text-sm">support@bonprixpc.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Bon Prix PC. {t('allRightsReserved')}
          </p>
          <div className="flex gap-4">
            {/* Payment method placeholders */}
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-gray-400">VISA</div>
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-gray-400">MC</div>
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-gray-400">AMEX</div>
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-gray-400">PAYPAL</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
