import React from 'react';

const Card = ({ title, children, className }) => {
  return (
    <div className={`p-4 bg-white rounded shadow ${className}`}>
      {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;