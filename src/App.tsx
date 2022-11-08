import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { TaskDetails } from './pages/TaskDetails';
import { TasksList } from './pages/TasksList';

import './App.css';

const routes = [
  {
    path: '/tasks/:id',
    element: <TaskDetails />,
  },
  {
    path: '/',
    element: <TasksList />,
    exact: true,
  },
];

function App({ theme = createTheme() }) {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        {routes.map(({ exact, path, element }, i) => (
          <Route
            path={path}
            element={element}
            key={`route-${i}`}
          />
        ))}
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;
