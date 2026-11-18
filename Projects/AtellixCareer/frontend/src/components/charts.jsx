import { skills } from "@/lib/data";
/* ---------- Radar / spider chart of mastery by category ---------- */
export function SkillRadar({ size = 260 }) {
    const categories = [...new Set(skills.map((s) => s.category))];
    const n = categories.length;
    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.36;
    const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
    const point = (i, r) => ({
        x: cx + r * Math.cos(angle(i)),
        y: cy + r * Math.sin(angle(i)),
    });
    const rings = [0.25, 0.5, 0.75, 1];
    const values = categories.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        return catSkills.reduce((a, s) => a + s.current, 0) / catSkills.length / 100;
    });
    const targets = categories.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        return catSkills.reduce((a, s) => a + s.target, 0) / catSkills.length / 100;
    });
    const poly = (vals) => vals.map((v, i) => `${point(i, R * v).x},${point(i, R * v).y}`).join(" ");
    return (<svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[280px]">
      {rings.map((r) => (<polygon key={r} points={categories.map((_, i) => `${point(i, R * r).x},${point(i, R * r).y}`).join(" ")} fill="none" stroke="#eceef6" strokeWidth="1"/>))}
      {categories.map((_, i) => {
            const p = point(i, R);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#eceef6" strokeWidth="1"/>;
        })}
      {/* target polygon (dashed) */}
      <polygon points={poly(targets)} fill="none" stroke="#a3a5fb" strokeWidth="1.5" strokeDasharray="4 3"/>
      {/* current polygon */}
      <polygon points={poly(values)} fill="rgba(106,92,240,0.18)" stroke="#6a5cf0" strokeWidth="2" strokeLinejoin="round"/>
      {values.map((v, i) => {
            const p = point(i, R * v);
            return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#6a5cf0" stroke="white" strokeWidth="1.5"/>;
        })}
      {categories.map((cat, i) => {
            const p = point(i, R * 1.18);
            return (<text key={cat} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="fill-ink-500" fontSize="9" fontWeight="600">
            {cat.length > 12 ? cat.slice(0, 11) + "…" : cat}
          </text>);
        })}
    </svg>);
}
/* ---------- GitHub-style activity heatmap (deterministic) ---------- */
function seeded(i, j) {
    const x = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
    return x - Math.floor(x);
}
export function ActivityHeatmap({ weeks = 18 }) {
    const days = ["Mon", "", "Wed", "", "Fri", "", ""];
    const cells = [];
    for (let w = 0; w < weeks; w++) {
        const col = [];
        for (let d = 0; d < 7; d++) {
            const r = seeded(w, d);
            // bias toward recent weeks being active
            const recency = w / weeks;
            const active = r < 0.25 + recency * 0.45;
            const level = active ? (r > 0.75 ? 1 : r > 0.6 ? 2 : r > 0.5 ? 3 : r > 0.45 ? 4 : 1) : 0;
            col.push({ level: Math.min(level, 4), label: `${level * 20 + 10}m focused` });
        }
        cells.push(col);
    }
    const colors = ["#eceef6", "#c6caff", "#a3a5fb", "#837df7", "#6a5cf0"];
    return (<div>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {cells.map((col, wi) => (<div key={wi} className="flex flex-col gap-[3px]">
            {col.map((cell, di) => (<div key={di} title={`Week ${wi + 1} · ${days[di] || `Day ${di + 1}`} — ${cell.label}`} className="h-[11px] w-[11px] rounded-[3px] transition hover:ring-1 hover:ring-ink-400" style={{ backgroundColor: colors[cell.level] }}/>))}
          </div>))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-ink-400">
        <span>{weeks} weeks ago</span>
        <span className="flex items-center gap-1">
          Less
          {colors.map((c) => (<span key={c} className="h-[9px] w-[9px] rounded-[2px]" style={{ backgroundColor: c }}/>))}
          More
        </span>
      </div>
    </div>);
}
/* ---------- Donut chart for skill status distribution ---------- */
export function StatusDonut() {
    const counts = { strong: 0, developing: 0, gap: 0 };
    skills.forEach((s) => counts[s.status]++);
    const total = skills.length;
    const palette = { strong: "#10b981", developing: "#f59e0b", gap: "#fb7185" };
    const R = 34;
    const C = 2 * Math.PI * R;
    let acc = 0;
    return (<div className="flex items-center gap-5">
      <svg viewBox="0 0 90 90" className="h-28 w-28 -rotate-90">
        <circle cx="45" cy="45" r={R} fill="none" stroke="#eceef6" strokeWidth="11"/>
        {Object.entries(counts).map(([k, v]) => {
            const frac = v / total;
            const dash = `${frac * C} ${C}`;
            const offset = -acc * C;
            acc += frac;
            return (<circle key={k} cx="45" cy="45" r={R} fill="none" stroke={palette[k]} strokeWidth="11" strokeDasharray={dash} strokeDashoffset={offset} strokeLinecap="butt"/>);
        })}
      </svg>
      <ul className="space-y-1.5 text-xs">
        {["strong", "developing", "gap"].map((k) => (<li key={k} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: palette[k] }}/>
            <span className="capitalize text-ink-600">{k}</span>
            <span className="ml-auto pl-4 font-bold text-ink-900">{counts[k]}</span>
          </li>))}
      </ul>
    </div>);
}
