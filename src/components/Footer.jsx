import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const footerLinks = {
    product: [
      { name: 'Docs', href: 'https://docs.plurality.network/', external: true },
      { name: 'Memory Studio', href: 'https://app.plurality.network/', external: true },
      { name: 'AI Context Flow', href: '/ai-context-flow', external: false },
      { name: 'Smart Profiles', href: '/smart-profiles', external: false },
      { name: 'Developer Dashboard', href: 'https://developer.plurality.network/', external: true },
    ],
    company: [
      { name: 'Privacy Policy', href: 'https://plurality.network/privacy-policy/' },
      { name: 'User Terms of Service', href: 'https://plurality.network/user-terms-of-service/' },
      { name: 'Data Delete Instructions', href: 'https://plurality.network/data-delete-instructions/' },
      { name: 'Developer Terms of Service', href: 'https://plurality.network/developer-terms-of-service/' },
    ],
    socials: [
      { name: 'X', href: 'https://x.com/PluralityWeb3', external: true },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/pluralitynetwork/', external: true },
      { name: 'Email', href: 'mailto:contact@plurality.network', external: true },
      { name: 'Blog', href: '/blogs', external: false },
      { name: 'Discord', href: 'https://discord.com/invite/Mb6ZDgGjcP', external: true },
    ],
  };

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0F0A1F]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white mb-4">Newsletter</h3>
            <p className="text-[#94A3B8] mb-6">Subscribe now and stay up-to-date.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1333] border border-[#8B5CF6]/20 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-[#8B5CF6]/30 transition-all"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-[#94A3B8]">We don't spam your inbox.</p>
            </form>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wider">PRODUCT</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wider">COMPANY</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wider">SOCIALS</h3>
            <ul className="space-y-3">
              {footerLinks.socials.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#8B5CF6]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold font-['Space_Grotesk'] text-white">Plurality</span>
            </Link>

            {/* Copyright */}
            <p className="text-sm text-[#94A3B8]">
              © 2024 Plurality Technologies Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
