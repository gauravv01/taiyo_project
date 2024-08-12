import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to the COVID-19 Dashboard</h1>
      <p className="text-xl">
        This dashboard provides information about COVID-19 cases worldwide. 
        Use the sidebar to navigate between different views.
      </p>
    </div>
  );
};

export default Home;