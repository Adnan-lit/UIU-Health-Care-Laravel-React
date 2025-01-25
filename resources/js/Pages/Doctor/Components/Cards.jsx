export function Cards({ cards }) {
    return (
        <section className="w-4/5">
            <div className="col-span-8 flex gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex-1 rounded-lg p-6"
                        style={{ backgroundColor: card.color }}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">{card.name}</h3>
                            <i className={`${card.icon} text-2xl`} style={{ color: card.iconColor }}></i>
                        </div>
                        <div className="mt-6">
                            <h1 className="text-4xl font-bold">{card.value}</h1>
                            <p className="text-green-600 text-sm mt-2">
                                ▲ {card.percentage}% from last week
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
