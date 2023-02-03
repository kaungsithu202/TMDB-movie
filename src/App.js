import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import InitialLoading from './components/InitialLoading';

import SearchBar from './components/SearchBar';
// pages
const HomeScreen = React.lazy(() => import('./pages/HomeScreen'));
const MovieInformationScreen = React.lazy(() => import('./pages/MovieInformationScreen'));
const ProfileScreen = React.lazy(() => import('./pages/ProfileScreen'));
const SearchFeed = React.lazy(() => import('./pages/SearchFeed'));
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          background: 'linear-gradient(90deg, #b6b6b6ff 0%, #7a7afcff 51%)',
          width: '100vw',
          height: '100vh',
        }}
      >
        <InitialLoading />
      </div>
    );
  }
  return (
    <div>
      <Suspense fallback={<p className='text-blue-300 text-5xl text-center'>Loading ...</p>}>
        <SearchBar />
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/movies/:id' element={<MovieInformationScreen />} />
          <Route path='/profile/:id' element={<ProfileScreen />} />
          <Route path='/search/:searchTerm' element={<SearchFeed />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
