import React, { ReactNode } from 'react';
interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <main className="container">{children}</main>
    </React.Fragment>
  );
};

export default BaseLayout;
