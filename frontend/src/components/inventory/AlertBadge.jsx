import "./AlertBadge.css";

export function AlertBadge({ type = "info", text, icon = "📌", size = "md" }) {
  return (
    <div className={`alert-badge alert-badge--${type} alert-badge--${size}`}>
      <span className="alert-badge-icon">{icon}</span>
      <span className="alert-badge-text">{text}</span>
    </div>
  );
}

export default AlertBadge;
