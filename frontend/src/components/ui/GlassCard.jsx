import "./GlassCard.css";

export function GlassCard({ children, className = "", elevated }) {
  return (
    <div
      className={`glass-card ${elevated ? "glass-card--elevated" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
