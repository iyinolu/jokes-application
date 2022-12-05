import React from 'react';
import BaseLayout from '../components/Layout';
import Header from '../components/Header';

function SPA() {
  return (
    <BaseLayout>
      <React.Fragment>
        <Header />
      </React.Fragment>
    </BaseLayout>
  );
}

export default SPA;
