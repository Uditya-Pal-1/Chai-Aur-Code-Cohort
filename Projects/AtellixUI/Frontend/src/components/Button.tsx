// Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className={clsx(
        'bg-gray-800 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;