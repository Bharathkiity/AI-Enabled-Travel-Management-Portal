import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiCalendar, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';

const Trips = () => {
  const { user } = useAuth();
  const { get, post, put, delete: deleteTrip, loading } = useApi();
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'PLANNING'
  });

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);

  const fetchTrips = async () => {
    console.log('Fetching trips...');
    const { data, error } = await get('/trips');
    if (data) {
      console.log('Trips fetched:', data);
      setTrips(data);
    } else {
      console.error('Error fetching trips:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingTrip(null);
    setFormData({
      title: '',
      description: '',
      destination: '',
      startDate: '',
      endDate: '',
      budget: '',
      status: 'PLANNING'
    });
    setShowModal(true);
  };

  const openEditModal = (trip) => {
    setEditingTrip(trip);
    setFormData({
      title: trip.title || '',
      description: trip.description || '',
      destination: trip.destination || '',
      startDate: trip.startDate || '',
      endDate: trip.endDate || '',
      budget: trip.budget || '',
      status: trip.status || 'PLANNING'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.destination || !formData.startDate || !formData.endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    const tripData = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : null
    };

    if (editingTrip) {
      // Update trip
      const { data, error } = await put(`/trips/${editingTrip.id}`, tripData, {
        showSuccessToast: true,
        successMessage: 'Trip updated successfully!'
      });
      
      if (data) {
        setTrips(trips.map(t => t.id === data.id ? data : t));
        setShowModal(false);
      }
    } else {
      // Create trip
      const { data, error } = await post('/trips', tripData, {
        showSuccessToast: true,
        successMessage: 'Trip created successfully!'
      });
      
      if (data) {
        setTrips([...trips, data]);
        setShowModal(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      const { error } = await deleteTrip(`/trips/${id}`, {
        showSuccessToast: true,
        successMessage: 'Trip deleted successfully!'
      });
      
      if (!error) {
        setTrips(trips.filter(t => t.id !== id));
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

  if (!user) {
    return (
      <div className="text-center py-12">
        <FiAlertCircle className="mx-auto text-red-500" size={48} />
        <h3 className="text-xl font-medium text-gray-900 mt-4">Please login to view trips</h3>
        <button
          onClick={() => window.location.href = '/login'}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600 mt-2">Manage and plan your adventures</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FiPlus />
          <span>New Trip</span>
        </button>
      </div>

      {/* Trips Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : trips.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FiMapPin className="mx-auto text-gray-400" size={64} />
          <h3 className="text-2xl font-bold text-gray-900 mt-4">No trips yet</h3>
          <p className="text-gray-600 mt-2">Start planning your first adventure!</p>
          <button
            onClick={openCreateModal}
            className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 inline-flex items-center space-x-2"
          >
            <FiPlus />
            <span>Create Your First Trip</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{trip.title}</h3>
                  <p className="flex items-center text-sm mt-1">
                    <FiMapPin className="mr-1" /> {trip.destination}
                  </p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FiCalendar className="mr-2 text-blue-600" />
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <FiDollarSign className="mr-2 text-green-600" />
                  Budget: ₹{trip.budget || 0} | Spent: ₹{trip.totalExpenses || 0}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                    {trip.status}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(trip)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)} />
            
            <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingTrip ? 'Edit Trip' : 'Create New Trip'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget (₹)
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PLANNING">Planning</option>
                      <option value="ONGOING">Ongoing</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingTrip ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;