
const Card = ({ title, subtitle, linkText, color }) => {
    return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className={`font-bold text-lg text-${color}-600`}>{title}</h2>
      <p className="text-gray-500 text-sm">{subtitle}</p>
      <a href="#" className={`text-${color}-600 mt-4 block font-medium flex items-center`}>
        {linkText} <i className="fa-solid fa-chevron-right ml-1"></i>
      </a>
    </div>
  );
};

export default Card;