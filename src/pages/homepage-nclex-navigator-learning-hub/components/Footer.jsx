import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Study Guide', path: '/complete-study-guide-nclex-mastery-center' },
        { name: 'Practice Tests', path: '/practice-tests-adaptive-testing-arena' },
        { name: 'Study Plans', path: '/study-plans-personalized-preparation-pathways' },
        { name: 'Resource Library', path: '/resource-library-comprehensive-study-materials-hub' },
        { name: 'Progress Dashboard', path: '/success-dashboard-personal-progress-analytics' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '#' },
        { name: 'Contact Us', path: '#' },
        { name: 'Live Chat', path: '#' },
        { name: 'Community Forum', path: '#' },
        { name: 'Technical Support', path: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'NCLEX Study Tips', path: '#' },
        { name: 'Nursing Career Guide', path: '#' },
        { name: 'Test-Taking Strategies', path: '#' },
        { name: 'Success Stories', path: '#' },
        { name: 'Blog & Articles', path: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '#' },
        { name: 'Our Mission', path: '#' },
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
        { name: 'Careers', path: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: 'Instagram', url: '#', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: 'Youtube', url: '#', color: 'hover:text-red-600' }
  ];

  const certifications = [
    { name: 'NCLEX Approved', icon: 'Award' },
    { name: 'Nursing Board Certified', icon: 'Shield' },
    { name: 'Educational Excellence', icon: 'Star' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container-medical py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <Link to="/homepage-nclex-navigator-learning-hub" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Icon name="Stethoscope" size={28} color="white" strokeWidth={2} />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">NCLEX Navigator</h3>
                <p className="text-slate-400 text-sm font-medium">Your Path to Success</p>
              </div>
            </Link>

            {/* Mission Statement */}
            <p className="text-slate-300 leading-relaxed max-w-md">
              Empowering nursing students with comprehensive NCLEX preparation tools, expert-led content, and personalized study plans to achieve their dreams of becoming licensed nurses.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">94%</div>
                <div className="text-slate-400 text-xs">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">50K+</div>
                <div className="text-slate-400 text-xs">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">4.9</div>
                <div className="text-slate-400 text-xs">Rating</div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-200">Certifications & Approvals</h4>
              <div className="flex flex-wrap gap-3">
                {certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                    <Icon name={cert?.icon} size={14} className="text-emerald-400" />
                    <span className="text-slate-300 text-xs">{cert?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-white text-lg">{section?.title}</h4>
              <ul className="space-y-3">
                {section?.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link?.path}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-sm hover:underline"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
              <p className="text-slate-400">
                Get the latest NCLEX prep tips, study strategies, and success stories delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-600 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container-medical py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-slate-400 text-sm">
              © {currentYear} NCLEX Navigator. All rights reserved. | Empowering future nurses since 2020.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-slate-500 text-sm">Follow us:</span>
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  className={`w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 ${social?.color} transition-all duration-200 hover:scale-110`}
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={16} />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-full">
                <Icon name="Shield" size={14} className="text-emerald-400" />
                <span className="text-slate-300 text-xs">Secure & Trusted</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-full">
                <Icon name="Lock" size={14} className="text-blue-400" />
                <span className="text-slate-300 text-xs">Privacy Protected</span>
              </div>
            </div>
          </div>

          {/* Additional Legal Links */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <Link to="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">Accessibility</Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">DMCA</Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;