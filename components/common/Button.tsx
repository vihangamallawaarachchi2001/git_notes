'use client'
import React, { ReactNode, MouseEvent } from 'react';

// Type declaration for props
export type CommonButtonProps = {
  type: 'icon-button' | 'text-button' | 'icon-text-button';
  icons?: ReactNode;
  text?: string;
  buttonClassName?: string;
  containerClassName?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<CommonButtonProps> = ({
  type,
  icons,
  text,
  buttonClassName = '',
  containerClassName = '',
  onClick,
}) => {
  // Render the button based on the type
  const renderButtonContent = () => {
    switch (type) {
      case 'icon-button':
        return <button className={buttonClassName} onClick={onClick}>{icons}</button>;

      case 'text-button':
        return <button className={buttonClassName} onClick={onClick}>{text}</button>;

      case 'icon-text-button':
        return (
          <button className={buttonClassName} onClick={onClick}>
            {icons} {text}
          </button>
        );

      default:
        return null;
    }
  };

  return <div className={containerClassName}>{renderButtonContent()}</div>;
};

export default Button;
