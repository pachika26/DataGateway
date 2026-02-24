/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider } from './AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discovery from './pages/Discovery';
import PipelineBuilder from './pages/PipelineBuilder';
import Governance from './pages/Governance';
import { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'discovery' | 'pipelines' | 'governance'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'discovery': return <Discovery />;
      case 'pipelines': return <PipelineBuilder />;
      case 'governance': return <Governance />;
      default: return <Home />;
    }
  };

  return (
    <AppProvider>
      <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
        {renderPage()}
      </Layout>
    </AppProvider>
  );
}

