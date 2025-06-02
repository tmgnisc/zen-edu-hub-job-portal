import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  className = '',
  variant = 'primary', // 'primary', 'secondary', or 'ghost'
  to, // for react-router-dom Link
  ...props
}) => {
  const baseStyles = 'inline-block border-2 border-black rounded-[10px] shadow-[1px_2px_0px_1px_#000] font-semibold text-center transition-colors';
  const paddingStyles = 'py-[9px] px-[20px]';
  const fontStyles = 'font-semibold'; // Assuming Sora is set globally

  const primaryStyles = 'bg-[#283588] text-white hover:bg-[#3c4b9e]'; // Added a simple hover state
  const secondaryStyles = 'bg-white text-black hover:bg-gray-100'; // Added a simple hover state
  const ghostStyles = 'border-transparent shadow-none hover:bg-gray-200'; // Ghost style: no border, no shadow, hover background

  let variantStyles;
  switch (variant) {
    case 'secondary':
      variantStyles = secondaryStyles;
      break;
    case 'ghost':
      variantStyles = ghostStyles;
      // Adjust baseStyles for ghost to remove border/shadow that are overridden
      // Or define ghostStyles to override them explicitly if baseStyles are not flexible enough
      // Let's update ghostStyles to be explicit
      variantStyles = 'border-2 border-transparent shadow-none hover:bg-gray-200 text-gray-700'; // Ghost style with text color
      break;
    case 'primary':
    default:
      variantStyles = primaryStyles;
      break;
  }
  // Re-evaluate baseStyles and variantStyles interaction
  // It's better to define full styles per variant to avoid conflicts
  const buttonStyles = {
    primary: 'bg-[#283588] text-white hover:bg-[#3c4b9e] border-2 border-black rounded-[10px] shadow-[1px_2px_0px_1px_#000]',
    secondary: 'bg-white text-black hover:bg-gray-100 border-2 border-black rounded-[10px] shadow-[1px_2px_0px_1px_#000]',
    ghost: 'border-2 border-transparent shadow-none hover:bg-gray-200 text-gray-700 rounded-[10px]', // Ghost with rounded style
  };

  const selectedStyles = buttonStyles[variant] || buttonStyles.primary; // Default to primary if variant is unknown

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