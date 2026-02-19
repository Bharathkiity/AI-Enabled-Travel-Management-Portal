import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Trips from './pages/Trips';
import Expenses from './pages/Expenses';
import AIRecommendations from './pages/AIRecommendations';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="trips" element={
            <PrivateRoute>
              <Trips />
            </PrivateRoute>
          } />
          <Route path="expenses" element={
            <PrivateRoute>
              <Expenses />
            </PrivateRoute>
          } />
          <Route path="ai-recommendations" element={
            <PrivateRoute>
              <AIRecommendations />
            </PrivateRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;