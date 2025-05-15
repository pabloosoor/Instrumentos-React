import React from 'react';
import './Spinner.css';

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-[30vh]">
    <span className="loader"></span>
  </div>
);

export default Spinner; 