import React from 'react';
import BackButton from './BackButton';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  showBackButton = true 
}) => {
  return (
    <div className="pt-20 px-4 md:px-8 pb-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {showBackButton && (
              <BackButton className="mr-4" />
            )}
            {title && (
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 