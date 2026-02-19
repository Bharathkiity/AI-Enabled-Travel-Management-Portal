import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCalendar, FiDollarSign, FiFilter, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';

const Expenses = () => {
  const { user } = useAuth();
  const { get, post, delete: deleteExpense, loading } = useApi();
  const [expenses, setExpenses] = useState([]);
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    expenseDate: new Date().toISOString().split('T')[0],
    category: '',
    tripId: ''
  });

  const categories = [
    'Accommodation',
    'Transportation',
    'Food',
    'Activities',
    'Shopping',
    'Other'
  ];

  useEffect(() => {
    if (user) {
      fetchTrips();
      fetchAllExpenses();
    }
  }, [user]);

  const fetchTrips = async () => {
    const { data } = await get('/trips');
    if (data) {
      setTrips(data);
    }
  };

  const fetchAllExpenses = async () => {
    const { data: tripsData } = await get('/trips');
    if (!tripsData) return;

    let allExpenses = [];
    for (const trip of tripsData) {
      const { data } = await get(`/expenses/trip/${trip.id}`);
      if (data) {
        allExpenses = [...allExpenses, ...data.map(e => ({ ...e, tripTitle: trip.title }))];
      }
    }
    setExpenses(allExpenses);
  };

  const fetchExpensesByTrip = async (tripId) => {
    if (!tripId) {
      fetchAllExpenses();
      return;
    }
    
    const { data } = await get(`/expenses/trip/${tripId}`);
    if (data) {
      const trip = trips.find(t => t.id === parseInt(tripId));
      setExpenses(data.map(e => ({ ...e, tripTitle: trip?.title })));
    }
  };

  const handleTripFilter = (e) => {
    const tripId = e.target.value;
    setSelectedTrip(tripId);
    fetchExpensesByTrip(tripId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount || !formData.category || !formData.tripId) {
      toast.error('Please fill all required fields');
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    const { data, error } = await post(`/expenses/trip/${formData.tripId}`, expenseData, {
      showSuccessToast: true,
      successMessage: 'Expense added successfully!'
    });

    if (data) {
      const trip = trips.find(t => t.id === parseInt(formData.tripId));
      setExpenses([...expenses, { ...data, tripTitle: trip?.title }]);
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        amount: '',
        expenseDate: new Date().toISOString().split('T')[0],
        category: '',
        tripId: ''
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const { error } = await deleteExpense(`/expenses/${id}`, {
        showSuccessToast: true,
        successMessage: 'Expense deleted successfully!'
      });
      
      if (!error) {
        setExpenses(expenses.filter(e => e.id !== id));
      }
    }
  };

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (!user) {
    return (
      <div className="text-center py-12">
        <FiDollarSign className="mx-auto text-red-500" size={48} />
        <h3 className="text-xl font-medium text-gray-900 mt-4">Please login to view expenses</h3>
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
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-2">Track your travel expenses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FiPlus />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 mb-1">Total Expenses</p>
            <p className="text-4xl font-bold">₹{totalAmount.toFixed(2)}</p>
          </div>
          <FiDollarSign size={48} className="text-white opacity-50" />
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
        <FiFilter className="text-gray-400" />
        <select
          value={selectedTrip}
          onChange={handleTripFilter}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Trips</option>
          {trips.map(trip => (
            <option key={trip.id} value={trip.id}>
              {trip.title} - {trip.destination}
            </option>
          ))}
        </select>
      </div>

      {/* Expenses List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : expenses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FiDollarSign className="mx-auto text-gray-400" size={64} />
          <h3 className="text-2xl font-bold text-gray-900 mt-4">No expenses yet</h3>
          <p className="text-gray-600 mt-2">Start tracking your expenses</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 inline-flex items-center space-x-2"
          >
            <FiPlus />
            <span>Add Your First Expense</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map(expense => (
            <div key={expense.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{expense.title}</h3>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{expense.amount.toFixed(2)}
                    </span>
                  </div>
                  
                  {expense.description && (
                    <p className="text-sm text-gray-600 mb-2">{expense.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">
                      Trip: {expense.tripTitle}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                      {expense.category}
                    </span>
                    <span className="flex items-center text-gray-500">
                      <FiCalendar className="mr-1" />
                      {new Date(expense.expenseDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 size={20} />
                </button>
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
            
            <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
              <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip *
                  </label>
                  <select
                    name="tripId"
                    value={formData.tripId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a trip</option>
                    {trips.map(trip => (
                      <option key={trip.id} value={trip.id}>
                        {trip.title} - {trip.destination}
                      </option>
                    ))}
                  </select>
                </div>
                
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
                    rows="2"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₹) *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="expenseDate"
                      value={formData.expenseDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
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
                    Add Expense
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

export default Expenses;