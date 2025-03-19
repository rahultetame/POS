import { Suspense } from 'react';
import Layout from './layouts/Layout';
import PageRoute from './routes/PageRoute';
import LazyLoader from './components/LazyLoader';

const App = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <PageRoute />
    </Suspense>
  );
};

export default App;
