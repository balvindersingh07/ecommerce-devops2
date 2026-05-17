import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { GlassCard } from "../components/ui/GlassCard";
import { useProducts } from "../hooks/useProducts";
import "./Admin.css";

const salesTrend = [
  { month: "Jun", sales: 124 },
  { month: "Jul", sales: 156 },
  { month: "Aug", sales: 198 },
  { month: "Sep", sales: 214 },
  { month: "Oct", sales: 242 },
  { month: "Nov", sales: 289 }
];

const funnel = [
  { stage: "Views", value: 820 },
  { stage: "Cart", value: 340 },
  { stage: "Checkout", value: 210 },
  { stage: "Paid", value: 164 }
];

export function Admin() {
  const { products } = useProducts();
  const revenue = salesTrend.reduce((s, r) => s + r.sales, 0) * 1200;
  const activeUsers = 1842;
  const avgOrder = Math.round(revenue / 560);

  return (
    <div className="admin container">
      <header className="admin__head">
        <div>
          <h1 className="admin__title">Operations dashboard</h1>
          <p className="admin__subtitle">
            Live-ish analytics — demo metrics for capstone narrative.
          </p>
        </div>
      </header>

      <div className="admin__kpis">
        <GlassCard className="admin-kpi">
          <span className="admin-kpi__label">Net revenue (demo)</span>
          <strong className="admin-kpi__value">
            ₹{(revenue / 100000).toFixed(2)}L
          </strong>
          <span className="admin-kpi__delta">+18.4% vs last cycle</span>
        </GlassCard>
        <GlassCard className="admin-kpi">
          <span className="admin-kpi__label">Active users</span>
          <strong className="admin-kpi__value">{activeUsers.toLocaleString()}</strong>
          <span className="admin-kpi__delta">Sessions rolling 7d</span>
        </GlassCard>
        <GlassCard className="admin-kpi">
          <span className="admin-kpi__label">Avg order value</span>
          <strong className="admin-kpi__value">₹{avgOrder.toLocaleString()}</strong>
          <span className="admin-kpi__delta">Blended AOV</span>
        </GlassCard>
      </div>

      <div className="admin__charts">
        <GlassCard className="admin-chart">
          <h2>Sales trend</h2>
          <div className="admin-chart__body">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={salesTrend}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(7, 11, 26, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#a855f7"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="admin-chart">
          <h2>Conversion funnel</h2>
          <div className="admin-chart__body">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={funnel} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(7, 11, 26, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                />
                <Bar dataKey="value" fill="url(#barGrad)" radius={[0, 8, 8, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="admin-table-card">
        <div className="admin-table-head">
          <h2>Product catalog</h2>
          <span>{products.length} SKUs</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price (INR)</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>
                    <span className="admin-pill">{p.category}</span>
                  </td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>★ {p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
