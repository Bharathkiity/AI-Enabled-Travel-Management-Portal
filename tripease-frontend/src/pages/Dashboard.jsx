import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiMap, 
  FiDollarSign, 
  FiCalendar, 
  FiPieChart,
  FiTrendingUp
} from 'react-icons/fi';
import DashboardCard from '../components/DashboardCard';
import Loader from '../components/Loader';
import { useApi } from '../hooks/useApi';

const Dashboard = () => {
  const navigate = useNavigate();
  const { get, loading } = useApi();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const { data } = await get('/dashboard');
    if (data) {
      setDashboardData(data);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your travel overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Trips"
          value={dashboardData?.totalTrips || 0}
          icon={FiMap}
          color="primary"
          onClick={() => navigate('/trips')}
        />
        <DashboardCard
          title="Total Expenses"
          value={`$${dashboardData?.totalExpenses?.toFixed(2) || '0.00'}`}
          icon={FiDollarSign}
          color="green"
          onClick={() => navigate('/expenses')}
        />
        <DashboardCard
          title="Upcoming Trips"
          value={dashboardData?.upcomingTrips?.length || 0}
          icon={FiCalendar}
          color="blue"
          onClick={() => navigate('/trips')}
        />
        <DashboardCard
          title="Budget Usage"
          value={`${dashboardData?.budgetSummary?.percentageUsed?.toFixed(1) || 0}%`}
          icon={FiPieChart}
          color="purple"
        />
      </div>

      {/* Budget Summary */}
      {dashboardData?.budgetSummary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FiTrendingUp className="mr-2 text-primary-600" />
              Budget Overview
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dashboardData.budgetSummary.totalBudget.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">
                  ${dashboardData.budgetSummary.totalSpent.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  ${dashboardData.budgetSummary.remainingBudget.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="card md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Budget Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Used</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dashboardData.budgetSummary.percentageUsed.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(dashboardData.budgetSummary.percentageUsed, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Trips */}
      {dashboardData?.upcomingTrips?.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Upcoming Trips</h3>
          <div className="space-y-4">
            {dashboardData.upcomingTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(`/trips`)}
              >
                <div>
                  <h4 className="font-semibold text-gray-900">{trip.title}</h4>
                  <p className="text-sm text-gray-600">{trip.destination}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-600">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">Budget: ${trip.budget}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;