import React from 'react';
import Router from './utils/Router';
import Notification from './components/Notification';

/**
 * Main Component
 */
function App() {
  return (
    <div>
      <Notification />
      <Router/>
    </div>
  );
}

export default App;
