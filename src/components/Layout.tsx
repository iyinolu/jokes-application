import React, { ReactNode } from 'react';
interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="container">{children}</div>
    </React.Fragment>
  );
};

export default BaseLayout;
