import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { formatCurrency, formatNumber } from "../../utils/formatters";
import "./StatsCard.css";

const StatsCard = ({
    title,
    value,
    change,
    trend,
    icon: Icon,
    type = "currency",
}) => {
    const isPositive = trend === "up";
    const formattedValue =
        type === "currency" ? formatCurrency(value) : formatNumber(value);

    // Determinar color basado en el tipo de métrica
    const getColorClass = (type) => {
        switch (type) {
            case "revenue":
                return "stats-card--revenue";
            case "sales":
                return "stats-card--sales";
            case "stock":
                return "stats-card--stock";
            case "transactions":
                return "stats-card--transactions";
            default:
                return "stats-card--default";
        }
    };

    return (
        <div className={`stats-card ${getColorClass(type)}`}>
            {/* Fondo decorativo */}
            <div className="stats-card__background"></div>

            {/* Contenido */}
            <div className="stats-card__content">
                {/* Header */}
                <div className="stats-card__header">
                    <h3 className="stats-card__title">{title}</h3>
                    {Icon && (
                        <div className="stats-card__icon">
                            <Icon size={24} />
                        </div>
                    )}
                </div>

                {/* Value */}
                <div className="stats-card__value-section">
                    <p className="stats-card__value">{formattedValue}</p>
                </div>

                {/* Change indicator */}
                <div className="stats-card__footer">
                    <div
                        className={`stats-card__change ${isPositive ? "stats-card__change--positive" : "stats-card__change--negative"}`}
                    >
                        {isPositive ? (
                            <FiTrendingUp size={18} />
                        ) : (
                            <FiTrendingDown size={18} />
                        )}
                        <span className="stats-card__change-value">
                            {Math.abs(change)}%
                        </span>
                    </div>
                    <span className="stats-card__period">vs. período anterior</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
