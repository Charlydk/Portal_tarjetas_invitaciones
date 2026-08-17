import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Split per route. The landing used to ship the wizard's nine step components
// and every template alongside itself, which is why the first paint waited on
// code no visitor to the home page ever runs.
const HomePage = lazy(() => import('./pages/HomePage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const PreviewPage = lazy(() => import('./pages/PreviewPage'));
const InvitationPage = lazy(() => import('./pages/InvitationPage'));

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

/** Neutral hold while a route chunk arrives — never a spinner on first paint. */
function RouteFallback() {
  return <div style={{ minHeight: '60vh' }} />;
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* La tarjeta entregada de un cliente: una fila en la base, no un
            deploy aparte. Fuera de MainLayout, como la muestra: un invitado no
            tiene que ver la barra ni el pie del portal. */}
        <Route path="/i/:slug" element={<InvitationPage />} />
        {/* Lo que abre el cliente para ver su tarjeta antes de publicarla. */}
        <Route path="/borrador/:token" element={<InvitationPage modoBorrador />} />

        <Route path="/preview/:themeId" element={<PreviewPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo/:templateId" element={<DemoPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
