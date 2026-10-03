// Footer.tsx
import React from 'react';
import clsx from 'clsx';

const Footer: React.FC = () => {
  return (
    <footer className={clsx(
      'bg-gray-800 text-white py-4 px-6 text-center',
      'border-t border-gray-700'
    )}>
      <div className="max-w-2xl mx-auto">
        <p>&copy; {new Date().getFullYear()} AtellixUI. All rights reserved.</p>
        <nav className={clsx(
          'mt-4 flex justify-center',
          'text-sm font-medium'
        )}>
          <a
            href="https://example.com"
            className={clsx(
              'mr-6 hover:text-orange-500 transition duration-300 ease-in-out'
            )}
          >
            About
          </a>
          <a
            href="https://example.com"
            className={clsx(
              'hover:text-orange-500 transition duration-300 ease-in-out'
            )}
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;