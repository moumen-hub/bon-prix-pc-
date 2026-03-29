import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Search, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';
import { CATEGORIES } from '../data';

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('shopAll'), path: '/shop' },
    ...CATEGORIES.map(c => ({ name: t(c.id as any) || c.name, path: `/shop?category=${c.id}` })),
    { name: t('deals'), path: '/deals' },
  ];

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Bon Prix PC" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  document.getElementById('fallback-logo')!.style.display = 'block';
                }}
              />
              <span id="fallback-logo" className="hidden text-xl font-bold tracking-tight text-gray-900">
                Bon Prix <span className="text-blue-600">PC</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  location.pathname === link.path && !location.search && link.path !== '/' ? "text-blue-600" : "text-gray-600",
                  link.name === t('deals') && "text-green-600 font-semibold hover:text-green-700"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Language"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium uppercase">{language}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <button onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }} className={cn("block w-full text-left px-4 py-2 text-sm hover:bg-gray-100", language === 'en' && "font-bold text-blue-600")}>English</button>
                  <button onClick={() => { setLanguage('fr'); setIsLangMenuOpen(false); }} className={cn("block w-full text-left px-4 py-2 text-sm hover:bg-gray-100", language === 'fr' && "font-bold text-blue-600")}>Français</button>
                  <button onClick={() => { setLanguage('ar'); setIsLangMenuOpen(false); }} className={cn("block w-full text-left px-4 py-2 text-sm hover:bg-gray-100", language === 'ar' && "font-bold text-blue-600")}>العربية</button>
                </div>
              )}
            </div>
            <button className="hidden md:flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "block text-base font-medium transition-colors hover:text-blue-600",
                  link.name === t('deals') ? "text-green-600" : "text-gray-900"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
