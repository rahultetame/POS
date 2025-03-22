import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { securedRoutesMap, unsecureRoutes } from './Routers';
// import useLocalStorage from '../utils/hooks/useLocalStorage';
import Layout from '../layouts/Layout';
import LoginLayout from '../layouts/Layout';
import { PageNotFound } from './LazyPath';

const PageRoute = () => {
  // const { isTokenValid } = useLocalStorage();
  const isTokenValid = true;
  const routes = useMemo(() => {
    if (isTokenValid) {
      return (
        <Routes>
          <Route path='/' element={<Layout />}>
            {securedRoutesMap?.map(
              ({ path, Component }: any, index: number) => (
                <Route
                  key={`${path}-${index}`}
                  index={index === 0}
                  path={path}
                  element={<Component />}
                />
              )
            )}
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      );
    }
    return (
      <Routes>
        <Route path='/' element={<LoginLayout />}>
          {unsecureRoutes?.map(({ path, Component }: any, index: number) => (
            <Route
              key={`${path}-${index}`}
              path={path}
              element={<Component />}
            />
          ))}
        </Route>
        <Route path='*' element={<LoginLayout />} />
      </Routes>
    );
  }, [isTokenValid]);

  return <>{routes}</>;
};

export default PageRoute;
