import React from "react";
import { 
  Heart, Mail, Phone, MapPin, 
  Facebook, Twitter, Instagram, Linkedin, Github
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const theme = useTheme();
  
  return (
    <footer className={`${theme.bg.secondary} ${theme.text.secondary} mt-16`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className={`h-10 w-10 rounded-xl ${theme.bg.accent} grid place-content-center font-bold ${theme.text.primary}`}>
                PP
              </div>
              <span className={`text-xl font-bold ${theme.text.primary}`}>Placement Portal</span>
            </div>
            <p className={`${theme.text.tertiary} mb-4`}>
              Your all-in-one platform for placement preparation. Practice coding problems, attempt quizzes, and get ready for your dream job.
            </p>
            <div className={`flex items-center gap-2 ${theme.text.tertiary} text-sm`}>
              <span>Made with</span>
              <Heart size={16} className="text-rose-500" />
              <span>for students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme.text.primary}`}>Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Home</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Coding Practice</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Aptitude Tests</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Mock Interviews</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Company-wise Questions</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Resume Builder</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme.text.primary}`}>Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Blog</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Study Materials</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Interview Tips</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Placement Guides</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>FAQs</a></li>
              <li><a href="#" className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}>Support</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme.text.primary}`}>Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-indigo-400 mt-1" />
                <span className={`${theme.text.tertiary}`}>support@placementportal.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-indigo-400 mt-1" />
                <span className={`${theme.text.tertiary}`}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-400 mt-1" />
                <span className={`${theme.text.tertiary}`}>University Campus, Computer Science Department</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className={`text-sm font-semibold mb-3 ${theme.text.primary}`}>Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className={`h-10 w-10 rounded-full ${theme.bg.tertiary} flex items-center justify-center ${theme.text.secondary} ${theme.bg.buttonPrimaryHover} hover:text-white transition-colors`}>
                  <Facebook size={18} />
                </a>
                <a href="#" className={`h-10 w-10 rounded-full ${theme.bg.tertiary} flex items-center justify-center ${theme.text.secondary} ${theme.bg.buttonPrimaryHover} hover:text-white transition-colors`}>
                  <Twitter size={18} />
                </a>
                <a href="#" className={`h-10 w-10 rounded-full ${theme.bg.tertiary} flex items-center justify-center ${theme.text.secondary} ${theme.bg.buttonPrimaryHover} hover:text-white transition-colors`}>
                  <Instagram size={18} />
                </a>
                <a href="#" className={`h-10 w-10 rounded-full ${theme.bg.tertiary} flex items-center justify-center ${theme.text.secondary} ${theme.bg.buttonPrimaryHover} hover:text-white transition-colors`}>
                  <Linkedin size={18} />
                </a>
                <a href="#" className={`h-10 w-10 rounded-full ${theme.bg.tertiary} flex items-center justify-center ${theme.text.secondary} ${theme.bg.buttonPrimaryHover} hover:text-white transition-colors`}>
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className={`mt-12 pt-8 border-t ${theme.border.primary}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className={`text-lg font-semibold ${theme.text.primary}`}>Stay Updated</h3>
              <p className={`${theme.text.tertiary}`}>Subscribe to our newsletter for the latest updates and placement opportunities.</p>
            </div>
            <div className="flex flex-1 max-w-md gap-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className={`flex-1 px-4 py-2.5 rounded-lg ${theme.bg.tertiary} border ${theme.border.primary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.text.primary} placeholder-slate-500`}
              />
              <button className={`px-5 py-2.5 ${theme.bg.buttonPrimary} ${theme.text.primary} rounded-lg font-medium ${theme.bg.buttonPrimaryHover} transition-colors whitespace-nowrap`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-8 border-t ${theme.border.primary} flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className={`${theme.text.muted} text-sm`}>© {new Date().getFullYear()} Placement Participation Portal. All rights reserved.</p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className={`${theme.text.muted} hover:${theme.text.primary} transition-colors`}>Privacy Policy</a>
            <a href="#" className={`${theme.text.muted} hover:${theme.text.primary} transition-colors`}>Terms of Service</a>
            <a href="#" className={`${theme.text.muted} hover:${theme.text.primary} transition-colors`}>Cookie Policy</a>
            <a href="#" className={`${theme.text.muted} hover:${theme.text.primary} transition-colors`}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
