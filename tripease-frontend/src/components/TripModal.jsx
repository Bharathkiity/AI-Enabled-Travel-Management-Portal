import { useEffect, useState } from 'react';
import { FiAlertCircle, FiCalendar, FiDollarSign, FiEdit2, FiMapPin, FiPlus, FiTrash2 } from 'react-icons/fi';
import Loader from '../components/Loader';
import TripModal from '../components/TripModal';
import { useApi } from '../hooks/useApi';

const Trips = () => {
  const { get, post, put, delete: deleteTrip, loading } = useApi();
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setError(null);
    console.log('Fetching trips...');
    const { data, error } = await get('/trips');
    if (data) {
      console.log('Trips fetched:', data);
      setTrips(data);
    } else if (error) {
      setError(error);
      console.error('Error fetching trips:', error);
    }
  };

  const handleCreateTrip = async (tripData) => {
    console.log('Creating trip with data:', tripData);
    const { data, error } = await post('/trips', tripData, {
      showSuccessToast: true,
      successMessage: 'Trip created successfully!'
    });
    
    if (data) {
      console.log('Trip created:', data);
      setTrips([...trips, data]);
      setIsModalOpen(false);
    } else {
      console.error('Error creating trip:', error);
    }
  };

  const handleUpdateTrip = async (tripData) => {
    console.log('Updating trip:', selectedTrip.id, 'with data:', tripData);
    const { data, error } = await put(`/trips/${selectedTrip.id}`, tripData, {
      showSuccessToast: true,
      successMessage: 'Trip updated successfully!'
    });
    
    if (data) {
      console.log('Trip updated:', data);
      setTrips(trips.map(t => t.id === data.id ? data : t));
      setIsModalOpen(false);
      setSelectedTrip(null);
    } else {
      console.error('Error updating trip:', error);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      console.log('Deleting trip:', tripId);
      const { error } = await deleteTrip(`/trips/${tripId}`, {
        showSuccessToast: true,
        successMessage: 'Trip deleted successfully!'
      });
      
      if (!error) {
        setTrips(trips.filter(t => t.id !== tripId));
      } else {
        console.error('Error deleting trip:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PLANNING: 'bg-yellow-100 text-yellow-800',
      ONGOING: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <div className="text-center py-12">
        <FiAlertCircle className="mx-auto text-red-500" size={48} />
        <h3 className="text-xl font-medium text-gray-900 mt-4">Please login to view trips</h3>
        <button
          onClick={() => window.location.href = '/login'}
          className="mt-4 btn-primary"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading && !trips.length) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
          <p className="text-gray-600">Manage and plan your upcoming adventures</p>
        </div>
        <button
          onClick={() => {
            setSelectedTrip(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <FiPlus size={20} />
          <span>New Trip</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error loading trips:</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={fetchTrips}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {trips.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="text-gray-400 mb-4">
            <FiMapPin className="mx-auto" size={64} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No trips yet</h3>
          <p className="text-gray-600 mb-8">Start planning your first adventure!</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <FiPlus size={20} />
            <span>Create Your First Trip</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{trip.title}</h3>
                  <p className="text-sm flex items-center">
                    <FiMapPin className="mr-1" /> {trip.destination}
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <FiCalendar className="mr-2 text-blue-600" />
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <FiDollarSign className="mr-2 text-green-600" />
                  Budget: ${trip.budget?.toFixed(2) || '0.00'} | Spent: ${trip.totalExpenses?.toFixed(2) || '0.00'}
                </div>

                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                    {trip.status}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTrip(trip);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <TripModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTrip(null);
        }}
        onSubmit={selectedTrip ? handleUpdateTrip : handleCreateTrip}
        trip={selectedTrip}
      />
    </div>
  );
};

export default Trips;