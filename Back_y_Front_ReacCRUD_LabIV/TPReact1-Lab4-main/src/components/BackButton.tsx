import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center px-4 py-2 rounded-lg shadow-md transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white ${className}`}
      aria-label="Volver atrás"
    >
      <FaArrowLeft className="mr-2" />
      <span>Volver</span>
    </button>
  );
};

export default BackButton; 