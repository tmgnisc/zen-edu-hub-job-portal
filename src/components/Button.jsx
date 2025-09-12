import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  className = '',
  variant = 'primary', // 'primary', 'secondary', or 'ghost'
  to, // for react-router-dom Link
  ...props
}) => {
  const paddingStyles = 'py-[9px] px-[20px]';
  const fontStyles = 'font-semibold';

  // Define complete styles for each variant to avoid conflicts
  const buttonStyles = {
    primary: 'bg-[#283588] text-white hover:bg-[#3c4b9e] border-2 border-black rounded-[10px] shadow-[1px_2px_0px_1px_#000]',
    secondary: 'bg-white text-black hover:bg-gray-100 border-2 border-black rounded-[10px] shadow-[1px_2px_0px_1px_#000]',
    ghost: 'border-2 border-transparent shadow-none hover:bg-gray-200 text-gray-700 rounded-[10px]',
  };

  const selectedStyles = buttonStyles[variant] || buttonStyles.primary;
  const classes = `${selectedStyles} ${paddingStyles} ${fontStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button; 