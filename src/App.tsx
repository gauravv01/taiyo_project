// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Sidebar';
import Home from './pages/Home'
import Contacts from './pages/Contacts';
import Charts from './pages/Charts';
import Maps from './pages/Maps';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
              <main className="p-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/maps" element={<Maps />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;