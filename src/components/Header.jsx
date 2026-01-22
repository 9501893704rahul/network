import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0A1F]/80 backdrop-blur-xl border-b border-[#8B5CF6]/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold font-['Space_Grotesk'] text-white">Plurality</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-[#8B5CF6]' : 'text-[#E2E8F0] hover:text-[#8B5CF6]'}`}>
              HOME
            </Link>
            <div className="relative group">
              <button 
                className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6] transition-colors flex items-center gap-1"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                PRODUCTS
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-[#1A1333] rounded-xl border border-[#8B5CF6]/20 shadow-xl py-2"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <Link to="/ai-context-flow" className="block px-4 py-2 text-sm text-[#E2E8F0] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]">
                    AI Context Flow
                  </Link>
                  <Link to="/smart-profiles" className="block px-4 py-2 text-sm text-[#E2E8F0] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]">
                    Smart Profiles
                  </Link>
                  <Link to="/extension" className="block px-4 py-2 text-sm text-[#E2E8F0] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]">
                    Chrome Extension
                  </Link>
                  <Link to="/context-manager" className="block px-4 py-2 text-sm text-[#E2E8F0] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]">
                    Context Manager
                  </Link>
                  <a href="https://app.plurality.network/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-[#E2E8F0] hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]">
                    Memory Studio ↗
                  </a>
                </div>
              )}
            </div>
            <Link to="/blogs" className={`text-sm font-medium transition-colors ${isActive('/blogs') || location.pathname.startsWith('/blogs/') ? 'text-[#8B5CF6]' : 'text-[#E2E8F0] hover:text-[#8B5CF6]'}`}>
              BLOGS
            </Link>
            <a href="/#support" className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6] transition-colors">
              SUPPORT
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://discord.com/invite/Mb6ZDgGjcP" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-[#E2E8F0] border border-[#8B5CF6]/30 rounded-full hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-all"
            >
              JOIN DISCORD
            </a>
            <a 
              href="https://docs.plurality.network/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-[#0F0A1F] bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B] rounded-full hover:shadow-lg hover:shadow-[#8B5CF6]/30 transition-all"
            >
              DOCS
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#E2E8F0] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#8B5CF6]/10 pt-4">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6]" onClick={() => setIsMenuOpen(false)}>HOME</Link>
              <Link to="/ai-context-flow" className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6]" onClick={() => setIsMenuOpen(false)}>AI Context Flow</Link>
              <Link to="/smart-profiles" className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6]" onClick={() => setIsMenuOpen(false)}>Smart Profiles</Link>
              <Link to="/extension" className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6]" onClick={() => setIsMenuOpen(false)}>Chrome Extension</Link>
              <Link to="/context-manager" className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6]" onClick={() => setIsMenuOpen(false)}>Context Manager</Link>
              <Link to="/blogs" className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6]" onClick={() => setIsMenuOpen(false)}>BLOGS</Link>
              <a href="/#support" className="text-sm font-medium text-[#E2E8F0] hover:text-[#8B5CF6]" onClick={() => setIsMenuOpen(false)}>SUPPORT</a>
              <div className="flex gap-4 mt-4">
                <a href="https://discord.com/invite/Mb6ZDgGjcP" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-[#E2E8F0] border border-[#8B5CF6]/30 rounded-full">
                  JOIN DISCORD
                </a>
                <a href="https://docs.plurality.network/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-[#0F0A1F] bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B] rounded-full">
                  DOCS
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
