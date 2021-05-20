import React, {Suspense} from "react";
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import {LayoutSplashScreen} from '../template/layout/core/MetronicSplashScreen';
import {MaterialThemeProvider} from '../template/layout/core/MaterialThemeProvider';

function App() {
  return (
    <div className="App h-100">
      <BrowserRouter>
        <Suspense fallback={<LayoutSplashScreen />}>
          <MaterialThemeProvider>
            <Routes></Routes>
          </MaterialThemeProvider>
        </Suspense>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
