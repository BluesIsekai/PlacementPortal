import React from "react";
import { 
  Heart, Mail, Phone, MapPin, 
  Facebook, Twitter, Instagram, Linkedin, Github
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 grid place-content-center font-bold text-white">
                PP
              </div>
              <span className="text-xl font-bold">Placement Portal</span>
            </div>
            <p className="text-slate-400 mb-4">
              Your all-in-one platform for placement preparation. Practice coding problems, attempt quizzes, and get ready for your dream job.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-rose-500" />
              <span>for students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Coding Practice</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Aptitude Tests</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Mock Interviews</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Company-wise Questions</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Resume Builder</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Study Materials</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Interview Tips</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Placement Guides</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-indigo-400 mt-1" />
                <span className="text-slate-400">support@placementportal.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-indigo-400 mt-1" />
                <span className="text-slate-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-400 mt-1" />
                <span className="text-slate-400">University Campus, Computer Science Department</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
              <p className="text-slate-400">Subscribe to our newsletter for the latest updates and placement opportunities.</p>
            </div>
            <div className="flex flex-1 max-w-md gap-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500"
              />
              <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Placement Participation Portal. All rights reserved.</p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
