import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Contacts from './pages/Contacts';
import ChartsAndMaps from './pages/ChartsAndMaps';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link to="/" className="flex-shrink-0 flex items-center">
                      <span className="text-xl font-bold">Contact Manager</span>
                    </Link>
                    <div className="ml-6 flex space-x-8">
                      <Link to="/" className="text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium">
                        Contacts
                      </Link>
                      <Link to="/charts-maps" className="text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium">
                        Charts & Maps
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Contacts />} />
                <Route path="/charts-maps" element={<ChartsAndMaps />} />
              </Routes>
            </main>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;