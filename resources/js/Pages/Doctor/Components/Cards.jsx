export const Cards = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: card.color }}
                        >
                            <i
                                className={`${card.icon} text-xl`}
                                style={{ color: card.iconColor }}
                            ></i>
                        </div>
                        {card.percentage !== null && (
                            <span className={`text-sm font-medium ${
                                card.percentage > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {card.percentage > 0 ? '+' : ''}{card.percentage}%
                            </span>
                        )}
                    </div>
                    <h3 className="text-gray-500 text-sm mb-1">{card.name}</h3>
                    <p className="text-2xl font-semibold text-gray-900">
                        {typeof card.value === 'number' 
                            ? card.value.toLocaleString()
                            : card.value
                        }
                    </p>
                </div>
            ))}
        </div>
    );
};
