import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const DashboardCard = ({ title, value, icon: Icon, color = 'primary', onClick }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  };

  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'card cursor-pointer transform hover:scale-105 transition-all duration-300',
          onClick && 'hover:shadow-2xl'
        )
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={twMerge(clsx('p-3 rounded-full', colorClasses[color]))}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;