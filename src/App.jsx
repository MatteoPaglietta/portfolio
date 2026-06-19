import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import PageSkeleton from './components/PageSkeleton';

const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="*"
        element={
          <Suspense fallback={<PageSkeleton />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
