"use client"

import React, { useState, useMemo, useEffect } from "react"
import { 
  Trophy, Crown, Medal, Award, Star, ChevronUp, ChevronDown, 
  Search, Moon, Sun, MapPin, Phone, Briefcase, Target, 
  Zap, Activity, BarChart3,
  Pen
} from "lucide-react"
import { Link } from "react-router-dom"

/* ─── DATA ─── */
const USERS = [
  { id: "U-001", name: "Rahul Sharma", role: "Senior Agent", city: "Noida", phone: "+91 98100 12345", score: 9850, deals: 47, trend: "up", avatar: "RS", rankChange: 2 },
  { id: "U-002", name: "Priya Verma", role: "Team Lead", city: "Delhi", phone: "+91 91234 56789", score: 9420, deals: 43, trend: "up", avatar: "PV", rankChange: 1 },
  { id: "U-003", name: "Amit Singh", role: "Agent", city: "Gurugram", phone: "+91 99887 65432", score: 9100, deals: 41, trend: "down", avatar: "AS", rankChange: -1 },
  { id: "U-004", name: "Sneha Gupta", role: "Senior Agent", city: "Greater Noida", phone: "+91 87654 32100", score: 8750, deals: 38, trend: "up", avatar: "SG", rankChange: 3 },
  { id: "U-005", name: "Mohit Jain", role: "Agent", city: "Noida Extension", phone: "+91 78900 12345", score: 8320, deals: 35, trend: "same", avatar: "MJ", rankChange: 0 },
  { id: "U-006", name: "Kavita Patel", role: "Manager", city: "Faridabad", phone: "+91 98765 43210", score: 8100, deals: 34, trend: "down", avatar: "KP", rankChange: -2 },
  { id: "U-007", name: "Ravi Kumar", role: "Agent", city: "Ghaziabad", phone: "+91 93456 78901", score: 7950, deals: 32, trend: "up", avatar: "RK", rankChange: 1 },
  { id: "U-008", name: "Ananya Reddy", role: "Senior Agent", city: "Noida", phone: "+91 90123 45678", score: 7680, deals: 30, trend: "up", avatar: "AR", rankChange: 4 },
  { id: "U-009", name: "Vikram Rao", role: "Agent", city: "Delhi", phone: "+91 88776 65544", score: 7420, deals: 28, trend: "down", avatar: "VR", rankChange: -1 },
  { id: "U-010", name: "Neha Kapoor", role: "Team Lead", city: "Gurugram", phone: "+91 96543 21098", score: 7100, deals: 26, trend: "same", avatar: "NK", rankChange: 0 },
  { id: "U-011", name: "Aditya Jain", role: "Agent", city: "Faridabad", phone: "+91 87654 09876", score: 6850, deals: 24, trend: "up", avatar: "AJ", rankChange: 2 },
  { id: "U-012", name: "Pooja Sharma", role: "Agent", city: "Ghaziabad", phone: "+91 91234 87654", score: 6520, deals: 22, trend: "down", avatar: "PS", rankChange: -3 },
]

/* ─── STYLES (Tailwind + Custom CSS) ─── */
const styles = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
@keyframes glow { 0%, 100% { box-shadow: 0 0 20px var(--accent-glow); } 50% { box-shadow: 0 0 40px var(--accent-glow), 0 0 60px var(--accent-glow); } }
@keyframes barGrow { from { height: 0; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes rankBadge { 0% { transform: scale(0) rotate(-180deg); } 70% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0deg); } }
@keyframes iconPop { 0% { transform: scale(0); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }

.animate-fadeIn { animation: fadeIn 0.6s ease forwards; }
.animate-slideUp { animation: slideUp 0.5s ease forwards; opacity: 0; }
.animate-scaleIn { animation: scaleIn 0.4s ease forwards; opacity: 0; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-glow { animation: glow 2s ease-in-out infinite; }
.animate-barGrow { animation: barGrow 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.animate-rankBadge { animation: rankBadge 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.animate-iconPop { animation: iconPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

.d1 { animation-delay: 0.1s; }
.d2 { animation-delay: 0.2s; }
.d3 { animation-delay: 0.3s; }
.d4 { animation-delay: 0.4s; }
.d5 { animation-delay: 0.5s; }

.graph-container {
  position: relative;
  width: 100%;
  height: 380px;
  border-radius: 20px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  overflow: hidden;
  transition: all 0.3s ease;
}
.graph-container:hover {
  border-color: hsl(var(--primary) / 0.3);
  box-shadow: 0 0 40px hsl(var(--primary) / 0.1);
}
.graph-grid-line {
  stroke: hsl(var(--border));
  stroke-width: 1;
  stroke-dasharray: 4 4;
}
.graph-axis-text {
  fill: hsl(var(--muted-foreground));
  font-size: 11px;
}
.graph-bar { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; }
.graph-bar:hover { filter: brightness(1.2); }
.graph-tooltip {
  position: absolute;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  padding: 12px 16px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  z-index: 100;
}

.list-item {
  background: hsl(var(--card) / 0.6);
  border: 1px solid hsl(var(--border));
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 12px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.list-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: hsl(var(--primary));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0 4px 4px 0;
}
.list-item:hover {
  transform: translateX(8px) scale(1.01);
  border-color: hsl(var(--primary) / 0.3);
  box-shadow: 0 8px 32px hsl(var(--primary) / 0.1);
}
.list-item:hover::before { opacity: 1; }
.list-item.expanded {
  background: hsl(var(--card));
  border-color: hsl(var(--primary));
  box-shadow: 0 4px 24px hsl(var(--primary) / 0.1);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  position: relative;
  transition: all 0.3s ease;
}
.avatar.gold { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #fff; box-shadow: 0 4px 20px rgba(251,191,36,0.4); }
.avatar.silver { background: linear-gradient(135deg, #e2e8f0, #94a3b8); color: #1e293b; }
.avatar.bronze { background: linear-gradient(135deg, #fb923c, #ea580c); color: #fff; }
.avatar.normal { background: #ea580c; }

.rank-badge {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
  transition: all 0.3s ease;
}
.rank-badge.gold { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #fff; }
.rank-badge.silver { background: linear-gradient(135deg, #cbd5e1, #64748b); color: #fff; }
.rank-badge.bronze { background: linear-gradient(135deg, #fb923c, #c2410c); color: #fff; }
.rank-badge.normal { background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); border: 1px solid hsl(var(--border)); }

.score-bar-bg {
  height: 6px;
  border-radius: 3px;
  background: hsl(var(--border));
  overflow: hidden;
  position: relative;
}
.score-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, hsl(var(--primary)), #818cf8);
  transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}
.score-bar-fill::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  
}

.trend-up { color: #22c55e; }
.trend-down { color: #ef4444; }
.trend-same { color: hsl(var(--muted-foreground)); }

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid hsl(var(--border));
}
.detail-card {
  background: hsl(var(--card) / 0.5);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
}
.detail-card:hover {
  background: hsl(var(--card));
  transform: translateY(-2px);
}
.detail-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: hsl(var(--primary) / 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary));
}

.search-box {
  background: hsl(var(--card) / 0.5);
  border: 1px solid hsl(var(--border));
  border-radius: 14px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}
.search-box:focus-within {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 20px hsl(var(--primary) / 0.1);
}
.search-box input {
  background: transparent;
  border: none;
  outline: none;
  color: hsl(var(--foreground));
  font-size: 14px;
  width: 100%;
}
.search-box input::placeholder { color: hsl(var(--muted-foreground)); }

.theme-toggle {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: hsl(var(--card) / 0.5);
  border: 1px solid hsl(var(--border));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: hsl(var(--muted-foreground));
}
.theme-toggle:hover {
  background: hsl(var(--card));
  border-color: hsl(var(--primary));
  color: hsl(var(--primary));
  transform: rotate(15deg) scale(1.1);
}

.filter-pill {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card) / 0.5);
  color: hsl(var(--muted-foreground));
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.filter-pill:hover, .filter-pill.active {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary));
  box-shadow: 0 4px 16px hsl(var(--primary) / 0.2);
}

@media (max-width: 768px) {
  .graph-container { height: 300px; }
  .list-item { padding: 14px; }
  .avatar { width: 40px; height: 40px; font-size: 12px; }
  .details-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .graph-container { height: 260px; border-radius: 16px; }
  .details-grid { grid-template-columns: 1fr; }
}
`

/* ─── SUB-COMPONENTS ─── */

function ThemeToggle({ theme, setTheme }) {
  return (
    <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

function RankBadge({ rank }) {
  const cls = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : 'normal'
  const icon = rank === 1 ? <Crown size={14} /> : rank === 2 ? <Medal size={14} /> : rank === 3 ? <Award size={14} /> : null
  return (
    <div className={`rank-badge ${cls} animate-rankBadge`} style={{ animationDelay: `${rank * 0.05}s` }}>
      {icon || rank}
    </div>
  )
}

function Avatar({ user, rank }) {
  const cls = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : 'normal'
  return (
    <div className={`avatar ${cls}`}>
      {user.avatar}
      {rank <= 3 && (
        <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] rounded-[6px] flex items-center justify-center shadow-lg"
          style={{ background: rank === 1 ? '#fbbf24' : rank === 2 ? '#94a3b8' : '#fb923c' }}>
          <Star size={10} color="#fff" fill="#fff" />
        </div>
      )}
    </div>
  )
}

function TrendIndicator({ trend, change }) {
  if (trend === 'up') return (
    <span className="trend-up flex items-center gap-0.5 text-xs font-semibold">
      <ChevronUp size={14} />+{change}
    </span>
  )
  if (trend === 'down') return (
    <span className="trend-down flex items-center gap-0.5 text-xs font-semibold">
      <ChevronDown size={14} />{change}
    </span>
  )
  return <span className="trend-same text-xs font-semibold">—</span>
}

function ScoreBar({ score, maxScore }) {
  const pct = (score / maxScore) * 100
  return (
    <div className="score-bar-bg w-full max-w-[160px]">
      <div className="score-bar-fill bg-primary" style={{ width: `${pct}%` }} />
    </div>
  )
}

/* ─── INTERACTIVE BAR GRAPH ─── */
function BarGraph({ data, onBarClick }) {
  const [hovered, setHovered] = useState(null)
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, user: null, rank: 0 })
  
  const sorted = useMemo(() => [...data].sort((a, b) => b.score - a.score).slice(0, 10), [data])
  const maxScore = Math.max(...sorted.map(d => d.score)) * 1.1
  
  const width = 800
  const height = 320
  const padding = { top: 40, right: 30, bottom: 80, left: 60 }
  const graphWidth = width - padding.left - padding.right
  const graphHeight = height - padding.top - padding.bottom
  
  const barWidth = (graphWidth / sorted.length) * 0.6
  const barGap = graphWidth / sorted.length
  
  const getBarColor = (rank) => {
    if (rank === 0) return ['#fbbf24', '#f59e0b']
    if (rank === 1) return ['#e2e8f0', '#94a3b8']
    if (rank === 2) return ['#fb923c', '#ea580c']
    return ['hsl(var(--primary))', '#6366f1']
  }

  const handleMouseMove = (e, user, rank) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      show: true,
      x: e.clientX - rect.left - 10,
      y: e.clientY - rect.top - 50,
      user,
      rank: rank + 1
    })
    setHovered(rank)
  }

  return (
    <div className="graph-container animate-scaleIn d1">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          {sorted.map((_, i) => {
            const [c1, c2] = getBarColor(i)
            return (
              <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c1} />
                <stop offset="100%" stopColor={c2} />
              </linearGradient>
            )
          })}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid lines */}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const y = padding.top + (graphHeight / 5) * i
          const val = Math.round(maxScore - (maxScore / 5) * i)
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} className="graph-grid-line" />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" className="graph-axis-text">{val.toLocaleString()}</text>
            </g>
          )
        })}
        
        {/* Bars */}
        {sorted.map((user, i) => {
          const barHeight = (user.score / maxScore) * graphHeight
          const x = padding.left + i * barGap + (barGap - barWidth) / 2
          const y = padding.top + graphHeight - barHeight
          const isHovered = hovered === i
          
          return (
            <g key={user.id} className="graph-bar" 
               onMouseMove={(e) => handleMouseMove(e, user, i)}
               onMouseLeave={() => { setHovered(null); setTooltip(t => ({ ...t, show: false })) }}
               onClick={() => onBarClick(user.id)}
               style={{ transformOrigin: `${x + barWidth/2}px ${padding.top + graphHeight}px` }}>
              {/* Bar shadow */}
              <rect x={x + 3} y={y + 3} width={barWidth} height={barHeight} rx={8} fill="rgba(0,0,0,0.2)" />
              {/* Bar */}
              <rect x={x} y={y} width={barWidth} height={barHeight} rx={8} 
                    fill={`url(#barGrad${i})`} opacity={isHovered ? 1 : 0.85}
                    filter={isHovered ? 'url(#glow)' : 'none'}
                    className="animate-barGrow" style={{ animationDelay: `${i * 0.08}s` }} />
              {/* Score label */}
              <text x={x + barWidth/2} y={y - 10} textAnchor="middle" 
                    fill={isHovered ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'}
                    fontSize="11" fontWeight="700" opacity={isHovered ? 1 : 0.7}
                    className="animate-fadeIn" style={{ animationDelay: `${0.5 + i * 0.05}s` }}>
                {user.score.toLocaleString()}
              </text>
              {/* Rank indicator */}
              {i < 3 && (
                <g transform={`translate(${x + barWidth/2}, ${y - 30})`} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                  <circle r="10" fill={i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#fb923c'} opacity="0.9" />
                  <text y="4" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">{i + 1}</text>
                </g>
              )}
              {/* Name label */}
              <text x={x + barWidth/2} y={padding.top + graphHeight + 20} textAnchor="middle" 
                    fill="hsl(var(--muted-foreground))" fontSize="10" fontWeight="600">
                {user.name.split(' ')[0]}
              </text>
            </g>
          )
        })}
      </svg>
      
      {/* Tooltip */}
      {tooltip.show && tooltip.user && (
        <div className="graph-tooltip" style={{ 
          left: tooltip.x, top: tooltip.y, opacity: 1,
          transform: 'translate(-50%, -100%)'
        }}>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white font-bold text-xs"
              style={{
                background: tooltip.rank === 1 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 
                           tooltip.rank === 2 ? 'linear-gradient(135deg, #e2e8f0, #94a3b8)' :
                           tooltip.rank === 3 ? 'linear-gradient(135deg, #fb923c, #ea580c)' : 'hsl(var(--primary))'
              }}>{tooltip.user.avatar}</div>
            <div>
              <div className="font-bold text-sm text-foreground">{tooltip.user.name}</div>
              <div className="text-xs text-muted-foreground">Rank #{tooltip.rank}</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</div>
              <div className="text-base font-extrabold text-primary">{tooltip.user.score.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Deals</div>
              <div className="text-base font-extrabold text-foreground">{tooltip.user.deals}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── LIST ITEM ─── */
function UserListItem({ user, rank, isExpanded, onToggle, maxScore }) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), rank * 60)
    return () => clearTimeout(timer)
  }, [rank])

  if (!isVisible) return null

  return (
    <div className={`list-item ${isExpanded ? 'expanded' : ''} animate-slideUp`} style={{ animationDelay: `${rank * 0.06}s` }}
         onClick={() => onToggle(user.id)}>
      <div className="flex items-center gap-4 flex-wrap">
        <RankBadge rank={rank + 1} />
        <Avatar user={user} rank={rank + 1} />
        
        <div className="flex-1 min-w-[140px]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[15px] text-foreground">{user.name}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-semibold">{user.role}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin size={11} /> {user.city}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Phone size={11} /> {user.phone}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-5 flex-wrap">
          <div className="min-w-[120px]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Score</span>
              <span className="text-[13px] font-extrabold text-primary">{user.score.toLocaleString()}</span>
            </div>
            <ScoreBar score={user.score} maxScore={maxScore} />
          </div>
          
          <div className="text-center min-w-[50px]">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Deals</div>
            <div className="text-lg font-extrabold text-foreground">{user.deals}</div>
          </div>
          
          <div className="text-center min-w-[50px]">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Trend</div>
            <TrendIndicator trend={user.trend} change={user.rankChange} />
          </div>
          
          <div className="animate-iconPop" style={{ animationDelay: `${0.3 + rank * 0.05}s` }}>
            {isExpanded ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-muted-foreground" />}
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="animate-slideUp d1">
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon"><Briefcase size={16} /></div>
              <div>
                <div className="text-[10px] text-muted-foreground">Role</div>
                <div className="text-[13px] font-bold text-foreground">{user.role}</div>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon"><MapPin size={16} /></div>
              <div>
                <div className="text-[10px] text-muted-foreground">City</div>
                <div className="text-[13px] font-bold text-foreground">{user.city}</div>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon"><Phone size={16} /></div>
              <div>
                <div className="text-[10px] text-muted-foreground">Phone</div>
                <div className="text-[13px] font-bold text-foreground">{user.phone}</div>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon"><Target size={16} /></div>
              <div>
                <div className="text-[10px] text-muted-foreground">Success Rate</div>
                <div className="text-[13px] font-bold text-green-500">{Math.round((user.deals / 50) * 100)}%</div>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon"><Zap size={16} /></div>
              <div>
                <div className="text-[10px] text-muted-foreground">Avg Score</div>
                <div className="text-[13px] font-bold text-foreground">{Math.round(user.score / user.deals)}</div>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon"><Activity size={16} /></div>
              <div>
                <div className="text-[10px] text-muted-foreground">Status</div>
                <div className={`text-[13px] font-bold ${user.trend === 'up' ? 'text-green-500' : user.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {user.trend === 'up' ? 'Rising Star' : user.trend === 'down' ? 'Needs Attention' : 'Stable'}
                </div>
              </div>
            </div>

<div className="detail-card">
              <div className="detail-icon"><Pen size={16} /></div>
              <div>
                <div className="text-[10px] text-muted-foreground">Status</div>
                <Link to={`/users/${user.id}`} className="text-[13px] font-bold text-primary">
                  View & Update
                </Link>
              </div>
            </div>



          </div>
        </div>
      )}
    </div>
  )
}

/* ─── MAIN COMPONENT ─── */
export default function LeaderboardPage() {
  const [theme, setTheme] = useState('dark')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = useMemo(() => {
    let result = [...USERS]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.city.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      )
    }
    if (filter === 'top') result = result.slice(0, 5)
    if (filter === 'rising') result = result.filter(u => u.trend === 'up')
    if (filter === 'falling') result = result.filter(u => u.trend === 'down')
    return result.sort((a, b) => b.score - a.score)
  }, [search, filter])

  const maxScore = Math.max(...USERS.map(u => u.score))
  const topThree = [...USERS].sort((a, b) => b.score - a.score).slice(0, 3)

  return (
    <div className="max-w-full mx-auto px-4 py-6">
      <style>{styles}</style>
      
      {/* Header */}
      <div className="animate-slideUp flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[14px] bg-primary flex items-center justify-center shadow-lg animate-iconPop">
            <Trophy size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-[26px] font-extrabold tracking-tight text-foreground">Leaderboard</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Top performers ranked by score and deals closed</p>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {topThree.map((user, i) => (
          <div key={user.id} className="animate-slideUp" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <div className={`relative overflow-hidden rounded-[20px] p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${i === 0 ? 'animate-glow' : ''}`}
              style={{
                background: 'hsl(var(--card) / 0.8)',
                border: `1px solid ${i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#fb923c'}`,
                boxShadow: i === 0 ? '0 0 30px rgba(251,191,36,0.2)' : 'none'
              }}>
              <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full opacity-20 blur-2xl"
                style={{ background: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#fb923c' }} />
              
              <div className="relative flex items-center gap-3">
                <Avatar user={user} rank={i + 1} />
                <div className="flex-1">
                  <div className="font-bold text-[15px] text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.role}</div>
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm"
                  style={{
                    background: i === 0 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 
                               i === 1 ? 'linear-gradient(135deg, #e2e8f0, #94a3b8)' :
                               'linear-gradient(135deg, #fb923c, #ea580c)'
                  }}>{i + 1}</div>
              </div>
              
              <div className="relative flex gap-4 mt-4">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</div>
                  <div className={`text-xl font-extrabold ${i === 0 ? 'text-amber-500' : 'text-foreground'}`}>{user.score.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Deals</div>
                  <div className="text-xl font-extrabold text-foreground">{user.deals}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Trend</div>
                  <TrendIndicator trend={user.trend} change={user.rankChange} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graph */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={18} className="text-primary" />
          <h2 className="text-base font-bold text-foreground">Top 10 Performance Graph</h2>
        </div>
        <BarGraph data={USERS} onBarClick={(id) => setExpandedId(expandedId === id ? null : id)} />
      </div>

      {/* Filters & Search */}
      <div className="animate-slideUp d2 flex items-center gap-3 mb-5 flex-wrap">
        <div className="search-box flex-1 min-w-[200px]">
          <Search size={16} className="text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search users, cities, roles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'all', label: 'All Users' },
            { key: 'top', label: 'Top 5' },
            { key: 'rising', label: 'Rising' },
            { key: 'falling', label: 'Falling' }
          ].map(f => (
            <button 
              key={f.key}
              className={`filter-pill ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >{f.label}</button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="animate-fadeIn d3 mb-3 text-xs text-muted-foreground font-semibold">
        {filtered.length} user{filtered.length !== 1 ? 's' : ''} found
      </div>

      {/* List */}
      <div>
        {filtered.map((user, i) => (
          <UserListItem 
            key={user.id}
            user={user}
            rank={i}
            isExpanded={expandedId === user.id}
            onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
            maxScore={maxScore}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <div className="text-base font-semibold">No users found</div>
            <div className="text-sm mt-1">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  )
}