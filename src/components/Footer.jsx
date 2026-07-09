import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaBookOpen, FaShieldAlt, FaCube } from 'react-icons/fa';

export default function Footer({ className = "bg-gray-900 py-12" }) {
  return (
    <footer className={className}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center text-white">
            <FaCube size={14} fill="currentColor" />
          </div>
          <span className="font-semibold text-gray-200">SampleVC TestFunds LLC</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><FaTwitter size={16} /> Twitter</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><FaLinkedin size={16} /> LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><FaBookOpen size={16} /> Blog</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><FaShieldAlt size={16} /> Privacy Policy</a>
        </div>
        <div className="text-gray-500 text-sm text-center md:text-right">
          &copy; 2026 SampleVC TestFunds LLC. <br className="md:hidden" />
          Rights reserved for designs to <a href="https://bracketstory.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-gray-700 underline-offset-2">bracketstory.com</a>
        </div>
      </div>
    </footer>
  );
}
