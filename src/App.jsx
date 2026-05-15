import { useState, useEffect, useMemo } from "react";

// ─── THEME & GLOBAL STYLES ────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #0a0c10;
      --bg2:       #10141c;
      --bg3:       #161b26;
      --surface:   #1c2130;
      --surface2:  #222840;
      --border:    rgba(180,140,60,0.18);
      --border2:   rgba(180,140,60,0.38);
      --gold:      #c9a84c;
      --gold2:     #e8c96a;
      --gold3:     #f5dfa0;
      --red:       #c94c4c;
      --red2:      #e86a6a;
      --green:     #4cad6f;
      --green2:    #6ecca0;
      --blue:      #4c7fc9;
      --blue2:     #6aaae8;
      --purple:    #8c5cc9;
      --muted:     #6b7a99;
      --text:      #d4cfc0;
      --text2:     #a09880;
      --white:     #f0ead8;
      --radius:    10px;
      --radius2:   16px;
      --shadow:    0 4px 24px rgba(0,0,0,0.6);
      --glow:      0 0 24px rgba(201,168,76,0.15);
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Crimson Pro', Georgia, serif;
      font-size: 16px;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Arcane background pattern */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.07) 0%, transparent 70%),
        radial-gradient(ellipse 40% 40% at 80% 80%, rgba(140,92,201,0.05) 0%, transparent 60%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.025'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    #root { position: relative; z-index: 1; }

    h1, h2, h3, h4 { font-family: 'Cinzel', serif; font-weight: 600; color: var(--white); letter-spacing: 0.04em; }

    .btn {
      font-family: 'Cinzel', serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      border: 1px solid var(--border2);
      background: transparent;
      color: var(--gold);
      padding: 8px 18px;
      border-radius: var(--radius);
      cursor: pointer;
      transition: all 0.2s;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .btn:hover { background: rgba(201,168,76,0.1); border-color: var(--gold); color: var(--gold2); }
    .btn.primary {
      background: linear-gradient(135deg, #b8942a, #c9a84c);
      border-color: var(--gold2);
      color: #0a0c10;
    }
    .btn.primary:hover { background: linear-gradient(135deg, #c9a84c, #e8c96a); }
    .btn.danger { border-color: rgba(201,76,76,0.4); color: var(--red2); }
    .btn.danger:hover { background: rgba(201,76,76,0.1); border-color: var(--red2); }
    .btn.sm { font-size: 10px; padding: 5px 12px; }

    input, select, textarea {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      font-family: 'Crimson Pro', serif;
      font-size: 15px;
      padding: 10px 14px;
      width: 100%;
      transition: border-color 0.2s;
      outline: none;
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
    }
    input::placeholder, textarea::placeholder { color: var(--muted); }
    select option { background: var(--bg2); }

    label { font-size: 12px; font-family: 'Cinzel', serif; letter-spacing: 0.06em; color: var(--gold2); text-transform: uppercase; display: block; margin-bottom: 6px; }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius2);
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      opacity: 0.4;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.06em;
      padding: 3px 10px;
      border-radius: 20px;
      text-transform: uppercase;
    }
    .badge.win  { background: rgba(76,173,111,0.15); color: var(--green2); border: 1px solid rgba(76,173,111,0.3); }
    .badge.loss { background: rgba(201,76,76,0.15);  color: var(--red2);   border: 1px solid rgba(201,76,76,0.3); }
    .badge.draw { background: rgba(107,122,153,0.15); color: var(--muted); border: 1px solid rgba(107,122,153,0.3); }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border2), transparent);
      margin: 20px 0;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
    .fade-in { animation: fadeIn 0.35s ease both; }
  `}</style>
);

// ─── MANA SYMBOL COMPONENT ────────────────────────────────────────────────────
const ManaSymbol = ({ color, size = 16 }) => {
  const colors = {
    W: { bg: "#f9f6e8", fg: "#8a7a40", label: "W" },
    U: { bg: "#1a3a6e", fg: "#a0c0f0", label: "U" },
    B: { bg: "#1a1a2e", fg: "#c0a0d0", label: "B" },
    R: { bg: "#8b1a1a", fg: "#f0a060", label: "R" },
    G: { bg: "#1a4a2e", fg: "#80c060", label: "G" },
  };
  const c = colors[color] || { bg: "#333", fg: "#aaa", label: color };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: size, height: size, borderRadius: "50%",
      background: c.bg, color: c.fg,
      fontSize: size * 0.55, fontFamily: "'Cinzel', serif", fontWeight: 700,
      border: `1px solid rgba(255,255,255,0.2)`,
      flexShrink: 0,
    }}>{c.label}</span>
  );
};

const ManaRow = ({ colors = "" }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {colors.split("").map((c, i) => <ManaSymbol key={i} color={c} size={14} />)}
  </div>
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, accent = "gold" }) => {
  const accentColor = { gold: "var(--gold)", green: "var(--green2)", red: "var(--red2)", blue: "var(--blue2)" }[accent];
  return (
    <div className="card" style={{ textAlign: "center", padding: "18px 14px" }}>
      <div style={{ fontSize: 28, fontFamily: "'Cinzel', serif", fontWeight: 700, color: accentColor, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
      {sub && <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const INITIAL_DECKS = [
  { id: "d1", name: "Murktide Regent", archetype: "Murktide", format: "Modern", colors: "UR", isOwn: true },
  { id: "d2", name: "Living End", archetype: "Living End", format: "Modern", colors: "BGU", isOwn: true },
  { id: "d3", name: "Amulet Titan", archetype: "Amulet", format: "Modern", colors: "GU", isOwn: false },
  { id: "d4", name: "Hammer Time", archetype: "Hammer Time", format: "Modern", colors: "WU", isOwn: false },
  { id: "d5", name: "Yawgmoth", archetype: "Yawgmoth", format: "Modern", colors: "BG", isOwn: false },
  { id: "d6", name: "Burn", archetype: "Burn", format: "Modern", colors: "RWU", isOwn: false },
  { id: "d7", name: "4/5c Omnath", archetype: "Omnath", format: "Modern", colors: "WURG", isOwn: false },
  { id: "d8", name: "Cascade Crashers", archetype: "Crashers", format: "Modern", colors: "RGU", isOwn: true },
];

const INITIAL_MATCHES = [
  { id: "m1", myDeckId: "d1", oppDeckId: "d3", result: "W", eventName: "FNM GPSP", round: "R1", playedAt: "2025-05-10", notes: "Game 3 apertado, acertei a linha certa", tags: ["bo3"] },
  { id: "m2", myDeckId: "d1", oppDeckId: "d4", result: "L", eventName: "FNM GPSP", round: "R2", playedAt: "2025-05-10", notes: "Sem respostas no game 1", tags: ["punted"] },
  { id: "m3", myDeckId: "d2", oppDeckId: "d6", result: "W", eventName: "Regional", round: "R3", playedAt: "2025-05-08", notes: "", tags: ["bo3"] },
  { id: "m4", myDeckId: "d1", oppDeckId: "d5", result: "W", eventName: "Regional", round: "R1", playedAt: "2025-05-08", notes: "Opp mulliganed para 5", tags: [] },
  { id: "m5", myDeckId: "d8", oppDeckId: "d7", result: "L", eventName: "Regional", round: "R2", playedAt: "2025-05-08", notes: "Took wrong line g2", tags: ["punted"] },
  { id: "m6", myDeckId: "d2", oppDeckId: "d3", result: "W", eventName: "FNM GPSP", round: "R1", playedAt: "2025-05-03", notes: "", tags: [] },
  { id: "m7", myDeckId: "d1", oppDeckId: "d3", result: "W", eventName: "FNM GPSP", round: "R3", playedAt: "2025-05-03", notes: "", tags: [] },
  { id: "m8", myDeckId: "d8", oppDeckId: "d4", result: "W", eventName: "FNM GPSP", round: "R2", playedAt: "2025-05-03", notes: "", tags: ["on the draw"] },
];

// ─── HEADER ───────────────────────────────────────────────────────────────────
const Header = ({ page, setPage }) => (
  <header style={{
    borderBottom: "1px solid var(--border)",
    background: "rgba(10,12,16,0.95)",
    backdropFilter: "blur(12px)",
    position: "sticky", top: 0, zIndex: 100,
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
      {/* Logo row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="36" height="36" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
            <defs>
              <radialGradient id="lg" cx="50%" cy="30%">
                <stop offset="0%" stopColor="#f5dfa0"/>
                <stop offset="100%" stopColor="#8a5a1a"/>
              </radialGradient>
            </defs>
            <circle cx="18" cy="18" r="17" fill="url(#lg)" stroke="rgba(201,168,76,0.5)" strokeWidth="1"/>
            <text x="18" y="25" textAnchor="middle" fontSize="18" fontFamily="serif" fill="#0a0c10">⚡</text>
          </svg>
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 900, color: "var(--gold2)", letterSpacing: "0.1em", lineHeight: 1 }}>TEAM GRAPESHOT</div>
            <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Match Tracker</div>
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <nav style={{ display: "flex", gap: 2 }}>
        {[
          { key: "dashboard", label: "⚡ Dashboard" },
          { key: "matches", label: "📜 Partidas" },
          { key: "new", label: "+ Registrar" },
          { key: "matchups", label: "⚔️ Matchups" },
          { key: "decks", label: "🃏 Decks" },
        ].map(tab => (
          <button key={tab.key} onClick={() => setPage(tab.key)} style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.07em",
            background: "none", border: "none", cursor: "pointer",
            color: page === tab.key ? "var(--gold2)" : "var(--muted)",
            padding: "8px 16px",
            borderBottom: page === tab.key ? "2px solid var(--gold)" : "2px solid transparent",
            transition: "all 0.2s",
          }}>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  </header>
);

// ─── FILTER PILL ──────────────────────────────────────────────────────────────
const FilterPill = ({ label, active, onClick, onClear }) => (
  <button onClick={onClick} style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase",
    padding: "6px 14px", borderRadius: 20, cursor: "pointer",
    border: active ? "1px solid var(--gold)" : "1px solid var(--border)",
    background: active ? "rgba(201,168,76,0.12)" : "var(--surface)",
    color: active ? "var(--gold2)" : "var(--muted)",
    transition: "all 0.18s", whiteSpace: "nowrap",
  }}>
    {label}
    {active && (
      <span onClick={e => { e.stopPropagation(); onClear(); }} style={{
        marginLeft: 2, width: 14, height: 14, borderRadius: "50%",
        background: "rgba(201,168,76,0.25)", display: "inline-flex",
        alignItems: "center", justifyContent: "center", fontSize: 9,
        color: "var(--gold)", lineHeight: 1,
      }}>✕</span>
    )}
  </button>
);

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
const Dashboard = ({ matches, decks }) => {
  const [filterDeck, setFilterDeck]     = useState("");
  const [filterFormat, setFilterFormat] = useState("");
  const [filterEvent, setFilterEvent]   = useState("");

  // Build option lists from all matches
  const ownDecks   = useMemo(() => decks.filter(d => d.isOwn), [decks]);
  const allFormats  = useMemo(() => [...new Set(decks.map(d => d.format).filter(Boolean))].sort(), [decks]);
  const allEvents   = useMemo(() => [...new Set(matches.map(m => m.eventName).filter(Boolean))].sort(), [matches]);

  const filtered = useMemo(() => {
    return matches.filter(m => {
      const myDeck = decks.find(d => d.id === m.myDeckId);
      if (filterDeck   && m.myDeckId !== filterDeck) return false;
      if (filterFormat && myDeck?.format !== filterFormat) return false;
      if (filterEvent  && m.eventName !== filterEvent) return false;
      return true;
    });
  }, [matches, decks, filterDeck, filterFormat, filterEvent]);

  const hasFilter = filterDeck || filterFormat || filterEvent;

  const wins    = filtered.filter(m => m.result === "W").length;
  const losses  = filtered.filter(m => m.result === "L").length;
  const winRate = filtered.length ? Math.round((wins / filtered.length) * 100) : 0;

  const recent = [...filtered].sort((a, b) => b.playedAt.localeCompare(a.playedAt)).slice(0, 5);

  const matchupMap = {};
  filtered.forEach(m => {
    const opp = decks.find(d => d.id === m.oppDeckId);
    if (!opp) return;
    const key = opp.archetype;
    if (!matchupMap[key]) matchupMap[key] = { wins: 0, total: 0 };
    matchupMap[key].total++;
    if (m.result === "W") matchupMap[key].wins++;
  });
  const matchups = Object.entries(matchupMap)
    .map(([arch, v]) => ({ arch, ...v, wr: Math.round(v.wins / v.total * 100) }))
    .sort((a, b) => b.total - a.total);

  // label helpers
  const deckLabel   = ownDecks.find(d => d.id === filterDeck)?.name;
  const formatLabel = filterFormat;
  const eventLabel  = filterEvent;

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── FILTER BAR ── */}
      <div className="card" style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase", flexShrink: 0 }}>
            Filtrar por
          </span>

          {/* Deck */}
          <div style={{ position: "relative" }}>
            <select
              value={filterDeck}
              onChange={e => setFilterDeck(e.target.value)}
              style={{
                appearance: "none", paddingRight: 28,
                fontFamily: "'Cinzel', serif", fontSize: 11,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "6px 28px 6px 14px", borderRadius: 20,
                border: filterDeck ? "1px solid var(--gold)" : "1px solid var(--border)",
                background: filterDeck ? "rgba(201,168,76,0.12)" : "var(--surface)",
                color: filterDeck ? "var(--gold2)" : "var(--muted)",
                cursor: "pointer", width: "auto",
              }}
            >
              <option value="">🃏 Deck</option>
              {ownDecks.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            {filterDeck && (
              <span onClick={() => setFilterDeck("")} style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                cursor: "pointer", color: "var(--gold)", fontSize: 10, lineHeight: 1,
              }}>✕</span>
            )}
          </div>

          {/* Formato */}
          <div style={{ position: "relative" }}>
            <select
              value={filterFormat}
              onChange={e => setFilterFormat(e.target.value)}
              style={{
                appearance: "none",
                fontFamily: "'Cinzel', serif", fontSize: 11,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "6px 28px 6px 14px", borderRadius: 20,
                border: filterFormat ? "1px solid var(--gold)" : "1px solid var(--border)",
                background: filterFormat ? "rgba(201,168,76,0.12)" : "var(--surface)",
                color: filterFormat ? "var(--gold2)" : "var(--muted)",
                cursor: "pointer", width: "auto",
              }}
            >
              <option value="">📖 Formato</option>
              {allFormats.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            {filterFormat && (
              <span onClick={() => setFilterFormat("")} style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                cursor: "pointer", color: "var(--gold)", fontSize: 10, lineHeight: 1,
              }}>✕</span>
            )}
          </div>

          {/* Evento */}
          <div style={{ position: "relative" }}>
            <select
              value={filterEvent}
              onChange={e => setFilterEvent(e.target.value)}
              style={{
                appearance: "none",
                fontFamily: "'Cinzel', serif", fontSize: 11,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "6px 28px 6px 14px", borderRadius: 20,
                border: filterEvent ? "1px solid var(--gold)" : "1px solid var(--border)",
                background: filterEvent ? "rgba(201,168,76,0.12)" : "var(--surface)",
                color: filterEvent ? "var(--gold2)" : "var(--muted)",
                cursor: "pointer", width: "auto",
              }}
            >
              <option value="">⚔️ Evento</option>
              {allEvents.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            {filterEvent && (
              <span onClick={() => setFilterEvent("")} style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                cursor: "pointer", color: "var(--gold)", fontSize: 10, lineHeight: 1,
              }}>✕</span>
            )}
          </div>

          {/* Clear all */}
          {hasFilter && (
            <button className="btn sm danger" onClick={() => { setFilterDeck(""); setFilterFormat(""); setFilterEvent(""); }}>
              Limpar filtros
            </button>
          )}

          {/* Active filter summary */}
          {hasFilter && (
            <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: "auto" }}>
              {filtered.length} partida{filtered.length !== 1 ? "s" : ""}
              {deckLabel   && <> · <span style={{ color: "var(--gold2)" }}>{deckLabel}</span></>}
              {formatLabel && <> · <span style={{ color: "var(--gold2)" }}>{formatLabel}</span></>}
              {eventLabel  && <> · <span style={{ color: "var(--gold2)" }}>{eventLabel}</span></>}
            </span>
          )}
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <div style={{
        background: "linear-gradient(135deg, var(--surface) 0%, #1a1428 100%)",
        border: "1px solid var(--border)",
        borderRadius: var_radius2,
        padding: "28px 32px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.04, fontFamily: "serif", lineHeight: 1 }}>⚡</div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", opacity: 0.3 }} />
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 8 }}>
          {hasFilter ? "Performance Filtrada" : "Performance Geral"}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 52, fontWeight: 900, color: winRate >= 50 ? "var(--green2)" : "var(--red2)", lineHeight: 1 }}>
            {filtered.length ? winRate : "—"}<span style={{ fontSize: 22, color: "var(--muted)" }}>{filtered.length ? "%" : ""}</span>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 4 }}>Win Rate</div>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ color: "var(--green2)", fontFamily: "'Cinzel', serif", fontSize: 13 }}>✓ {wins}W</span>
              <span style={{ color: "var(--red2)", fontFamily: "'Cinzel', serif", fontSize: 13 }}>✗ {losses}L</span>
              <span style={{ color: "var(--muted)", fontFamily: "'Cinzel', serif", fontSize: 13 }}>{filtered.length} total</span>
            </div>
          </div>
        </div>

        {recent.length > 0 && (
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: "'Cinzel', serif", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Forma recente:</span>
            {recent.map((m, i) => (
              <span key={i} style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 700,
                background: m.result === "W" ? "rgba(76,173,111,0.2)" : m.result === "L" ? "rgba(201,76,76,0.2)" : "rgba(107,122,153,0.2)",
                color: m.result === "W" ? "var(--green2)" : m.result === "L" ? "var(--red2)" : "var(--muted)",
                border: `1px solid ${m.result === "W" ? "rgba(76,173,111,0.4)" : m.result === "L" ? "rgba(201,76,76,0.4)" : "rgba(107,122,153,0.4)"}`,
              }}>{m.result}</span>
            ))}
          </div>
        )}
      </div>

      {/* ── STATS GRID ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
        <StatCard label="Partidas" value={filtered.length} accent="gold" />
        <StatCard label="Vitórias" value={wins} accent="green" />
        <StatCard label="Derrotas" value={losses} accent="red" />
        <StatCard label="Eventos" value={[...new Set(filtered.map(m => m.eventName))].length} accent="blue" />
      </div>

      {/* ── MATCHUPS ── */}
      {matchups.length > 0 && (
        <div className="card">
          <h3 style={{ fontSize: 14, marginBottom: 16, color: "var(--gold)" }}>Matchups Frequentes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {matchups.slice(0, 6).map(mu => (
              <div key={mu.arch} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, fontSize: 15 }}>{mu.arch}</div>
                <div style={{ fontSize: 13, color: "var(--text2)", minWidth: 60, textAlign: "right" }}>{mu.wins}/{mu.total}</div>
                <div style={{ width: 100, height: 6, borderRadius: 3, background: "var(--bg2)", overflow: "hidden" }}>
                  <div style={{ width: `${mu.wr}%`, height: "100%", borderRadius: 3, background: mu.wr >= 50 ? "var(--green)" : "var(--red)" }} />
                </div>
                <div style={{ fontSize: 13, fontFamily: "'Cinzel', serif", fontWeight: 600, color: mu.wr >= 50 ? "var(--green2)" : "var(--red2)", minWidth: 40, textAlign: "right" }}>{mu.wr}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RECENT MATCHES ── */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔮</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13 }}>Nenhuma partida encontrada com esses filtros</div>
        </div>
      ) : recent.length > 0 && (
        <div className="card">
          <h3 style={{ fontSize: 14, marginBottom: 16, color: "var(--gold)" }}>Últimas Partidas</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recent.map(m => {
              const myDeck  = decks.find(d => d.id === m.myDeckId);
              const oppDeck = decks.find(d => d.id === m.oppDeckId);
              return (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span className={`badge ${m.result === "W" ? "win" : m.result === "L" ? "loss" : "draw"}`}>
                    {m.result === "W" ? "Vitória" : m.result === "L" ? "Derrota" : "Empate"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: "var(--white)" }}>
                      {myDeck?.name} <span style={{ color: "var(--muted)" }}>vs</span> {oppDeck?.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{m.eventName} · {m.round}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{m.playedAt}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MATCHES LIST PAGE ────────────────────────────────────────────────────────
const MatchesList = ({ matches, decks, onDelete }) => {
  const [search, setSearch] = useState("");
  const [filterResult, setFilterResult] = useState("all");

  const filtered = useMemo(() => {
    let list = [...matches];
    if (filterResult !== "all") list = list.filter(m => m.result === filterResult);
    if (search) list = list.filter(m => {
      const opp = decks.find(d => d.id === m.oppDeckId);
      const my = decks.find(d => d.id === m.myDeckId);
      return [m.eventName, m.notes, opp?.name, my?.name].join(" ").toLowerCase().includes(search.toLowerCase());
    });
    return [...list].sort((a, b) => b.playedAt.localeCompare(a.playedAt));
  }, [matches, decks, filterResult, search]);

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input placeholder="Buscar partida, deck, evento…" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
        {["all", "W", "L", "D"].map(r => (
          <button key={r} className="btn sm" onClick={() => setFilterResult(r)}
            style={filterResult === r ? { background: "rgba(201,168,76,0.15)", borderColor: "var(--gold)" } : {}}>
            {r === "all" ? "Todos" : r === "W" ? "Vitórias" : r === "L" ? "Derrotas" : "Empates"}
          </button>
        ))}
      </div>

      <div style={{ color: "var(--muted)", fontSize: 13 }}>{filtered.length} partida{filtered.length !== 1 ? "s" : ""}</div>

      {filtered.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📜</div>
          <div>Nenhuma partida encontrada</div>
        </div>
      )}

      {filtered.map(m => {
        const myDeck = decks.find(d => d.id === m.myDeckId);
        const oppDeck = decks.find(d => d.id === m.oppDeckId);
        return (
          <div key={m.id} className="card fade-in" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <span className={`badge ${m.result === "W" ? "win" : m.result === "L" ? "loss" : "draw"}`} style={{ minWidth: 64, justifyContent: "center" }}>
              {m.result === "W" ? "✓ Win" : m.result === "L" ? "✗ Loss" : "— Draw"}
            </span>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 15, color: "var(--white)", fontWeight: 600 }}>{myDeck?.name}</span>
                <span style={{ color: "var(--muted)", fontSize: 12 }}>vs</span>
                <span style={{ fontSize: 15, color: "var(--text)" }}>{oppDeck?.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{m.eventName}</span>
                <span style={{ color: "var(--border2)" }}>·</span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{m.round}</span>
                {myDeck?.colors && <ManaRow colors={myDeck.colors} />}
              </div>
              {m.notes && <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 6, fontStyle: "italic" }}>"{m.notes}"</div>}
              {m.tags?.length > 0 && (
                <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                  {m.tags.map(t => (
                    <span key={t} style={{ fontSize: 10, fontFamily: "'Cinzel', serif", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 7px", color: "var(--muted)" }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{m.playedAt}</div>
              <button className="btn sm danger" onClick={() => onDelete(m.id)}>Deletar</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── INLINE NEW DECK MINI-FORM ────────────────────────────────────────────────
const EMPTY_DECK_FORM = { name: "", archetype: "", format: "Modern", colors: "", isOwn: true };

const InlineDeckForm = ({ isOwn, onSave, onCancel }) => {
  const [df, setDf] = useState({ ...EMPTY_DECK_FORM, isOwn });
  const handle = () => {
    if (!df.name.trim()) return alert("Nome do deck obrigatório!");
    onSave({ ...df, id: `d${Date.now()}`, name: df.name.trim(), archetype: df.archetype.trim() || df.name.trim() });
  };
  return (
    <div style={{
      marginTop: 8, padding: "14px 16px", borderRadius: "var(--radius)",
      background: "var(--bg2)", border: "1px solid var(--border2)",
      display: "flex", flexDirection: "column", gap: 10,
      animation: "fadeIn 0.2s ease",
    }}>
      <div style={{ fontSize: 11, fontFamily: "'Cinzel', serif", color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        ✦ Novo {isOwn ? "deck próprio" : "deck do meta"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label>Nome *</label>
          <input value={df.name} onChange={e => setDf(f => ({ ...f, name: e.target.value }))} placeholder="Murktide Regent" autoFocus />
        </div>
        <div>
          <label>Archetype</label>
          <input value={df.archetype} onChange={e => setDf(f => ({ ...f, archetype: e.target.value }))} placeholder="Murktide (opcional)" />
        </div>
        <div>
          <label>Formato</label>
          <select value={df.format} onChange={e => setDf(f => ({ ...f, format: e.target.value }))}>
            {["Modern","Legacy","Pioneer","Standard","Vintage","Limited"].map(x => <option key={x}>{x}</option>)}
          </select>
        </div>
        <div>
          <label>Cores (ex: UBR)</label>
          <input value={df.colors} onChange={e => setDf(f => ({ ...f, colors: e.target.value.toUpperCase().replace(/[^WUBRG]/g,"") }))} placeholder="WUBRG" maxLength={5} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
        <button className="btn primary sm" onClick={handle}>✓ Salvar deck</button>
        <button className="btn sm" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

// ─── DECK SELECT WITH INLINE CREATE ──────────────────────────────────────────
const DeckSelect = ({ label, value, onChange, deckList, isOwn, onCreateDeck, placeholder }) => {
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (newDeck) => {
    onCreateDeck(newDeck);
    onChange(newDeck.id);
    setShowForm(false);
  };

  const handleSelectChange = (e) => {
    if (e.target.value === "__new__") {
      setShowForm(true);
      e.target.value = value; // revert visual selection
    } else {
      setShowForm(false);
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={handleSelectChange}>
        <option value="">{placeholder}</option>
        {deckList.map(d => (
          <option key={d.id} value={d.id}>{d.name}{d.format ? ` (${d.format})` : ""}</option>
        ))}
        <option value="__new__" style={{ color: "#c9a84c", fontStyle: "italic" }}>＋ Cadastrar novo deck…</option>
      </select>
      {showForm && (
        <InlineDeckForm isOwn={isOwn} onSave={handleCreate} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
};

// ─── NEW MATCH PAGE ───────────────────────────────────────────────────────────
const NewMatch = ({ decks, setDecks, onSave }) => {
  const [form, setForm] = useState({
    myDeckId: "", oppDeckId: "", result: "W",
    eventName: "", round: "R1", playedAt: new Date().toISOString().split("T")[0],
    notes: "", tags: "",
  });
  const [saved, setSaved] = useState(false);

  const ownDecks = decks.filter(d => d.isOwn);
  const oppDecks = decks.filter(d => !d.isOwn);
  const allOppDecks = [...oppDecks, ...ownDecks];

  const handleCreateDeck = (newDeck) => {
    setDecks(prev => [...prev, newDeck]);
  };

  const handleSave = () => {
    if (!form.myDeckId || !form.oppDeckId || !form.eventName) return alert("Preencha deck próprio, deck oponente e evento!");
    onSave({
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setForm(f => ({ ...f, myDeckId: "", oppDeckId: "", result: "W", notes: "", tags: "" }));
  };

  const field = (label, children) => (
    <div>
      <label>{label}</label>
      {children}
    </div>
  );

  return (
    <div className="fade-in" style={{ maxWidth: 640, margin: "0 auto" }}>
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ fontSize: 28 }}>⚡</div>
          <div>
            <h2 style={{ fontSize: 18 }}>Registrar Partida</h2>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Adicione o resultado ao grimório</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {field("Resultado",
            <select value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value }))}>
              <option value="W">✓ Vitória</option>
              <option value="L">✗ Derrota</option>
              <option value="D">— Empate</option>
            </select>
          )}

          <DeckSelect
            label="Meu Deck"
            value={form.myDeckId}
            onChange={v => setForm(f => ({ ...f, myDeckId: v }))}
            deckList={ownDecks}
            isOwn={true}
            onCreateDeck={handleCreateDeck}
            placeholder="Selecione seu deck…"
          />

          <DeckSelect
            label="Deck do Oponente"
            value={form.oppDeckId}
            onChange={v => setForm(f => ({ ...f, oppDeckId: v }))}
            deckList={allOppDecks}
            isOwn={false}
            onCreateDeck={handleCreateDeck}
            placeholder="Selecione o deck do oponente…"
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {field("Evento",
              <input value={form.eventName} onChange={e => setForm(f => ({ ...f, eventName: e.target.value }))} placeholder="Ex: FNM GPSP" />
            )}
            {field("Round",
              <input value={form.round} onChange={e => setForm(f => ({ ...f, round: e.target.value }))} placeholder="R1" />
            )}
            {field("Data",
              <input type="date" value={form.playedAt} onChange={e => setForm(f => ({ ...f, playedAt: e.target.value }))} />
            )}
          </div>

          {field("Anotações",
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Linhas jogadas, pontos chave da partida…" rows={3} style={{ resize: "vertical" }} />
          )}

          {field("Tags (separadas por vírgula)",
            <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              placeholder="bo3, punted, mana flood, on the draw…" />
          )}

          <div className="divider" style={{ margin: "4px 0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn primary" onClick={handleSave} style={{ fontSize: 13, padding: "11px 28px" }}>
              ⚡ Registrar Partida
            </button>
            {saved && (
              <span style={{ color: "var(--green2)", fontFamily: "'Cinzel', serif", fontSize: 13, animation: "fadeIn 0.3s ease" }}>
                ✓ Partida registrada!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MATCHUP ANALYSIS PAGE ────────────────────────────────────────────────────
const MatchupAnalysis = ({ matches, decks }) => {
  const filtered = matches;

  const rows = useMemo(() => {
    const map = {};
    filtered.forEach(m => {
      const my = decks.find(d => d.id === m.myDeckId);
      const opp = decks.find(d => d.id === m.oppDeckId);
      if (!my || !opp) return;
      const key = `${my.archetype}|||${opp.archetype}`;
      if (!map[key]) map[key] = { myDeck: my.name, myArch: my.archetype, myColors: my.colors, oppDeck: opp.name, oppArch: opp.archetype, oppColors: opp.colors, wins: 0, losses: 0, draws: 0 };
      if (m.result === "W") map[key].wins++;
      else if (m.result === "L") map[key].losses++;
      else map[key].draws++;
    });
    return Object.values(map).map(r => ({
      ...r, total: r.wins + r.losses + r.draws,
      wr: Math.round(r.wins / (r.wins + r.losses + r.draws) * 100)
    })).sort((a, b) => b.total - a.total);
  }, [filtered, decks]);

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card" style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: 13 }}>
          <span style={{ fontSize: 18 }}>⚔️</span>
          <span>Análise de matchups — clique numa linha para ver as partidas desse confronto</span>
        </div>
      </div>

      {rows.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚔️</div>
          <div>Nenhum matchup registrado ainda</div>
        </div>
      )}

      {/* Table */}
      {rows.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border2)", background: "var(--surface2)" }}>
                {["Meu Deck", "vs", "Deck Oponente", "W", "L", "Total", "Win Rate", ""].map((h, i) => (
                  <th key={i} style={{
                    padding: "12px 16px", textAlign: i >= 3 ? "center" : "left",
                    fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.08em",
                    color: "var(--gold)", textTransform: "uppercase", fontWeight: 600,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <ManaRow colors={r.myColors} />
                      <span style={{ fontSize: 14, color: "var(--white)" }}>{r.myDeck}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "center", color: "var(--muted)", fontSize: 12 }}>⚔️</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <ManaRow colors={r.oppColors} />
                      <span style={{ fontSize: 14, color: "var(--text)" }}>{r.oppDeck}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center", color: "var(--green2)", fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{r.wins}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center", color: "var(--red2)", fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{r.losses}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center", color: "var(--muted)" }}>{r.total}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 14, color: r.wr >= 50 ? "var(--green2)" : "var(--red2)" }}>{r.wr}%</span>
                      <div style={{ width: 60, height: 4, borderRadius: 2, background: "var(--bg)", overflow: "hidden" }}>
                        <div style={{ width: `${r.wr}%`, height: "100%", background: r.wr >= 50 ? "var(--green)" : "var(--red)", borderRadius: 2 }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── PARSE DECKLIST TEXT ──────────────────────────────────────────────────────
// Accepts MTGO/Arena format: "4 Lightning Bolt" or "4x Lightning Bolt"
function parseDecklistText(text) {
  return text.split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const m = line.match(/^(\d+)[xX]?\s+(.+)$/);
      if (!m) return null;
      return { qty: parseInt(m[1], 10), name: m[2].trim() };
    })
    .filter(Boolean);
}

// ─── CARD ROW ─────────────────────────────────────────────────────────────────
const CardRow = ({ card, onQtyChange, onRemove }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "5px 0", borderBottom: "1px solid var(--border)",
  }}>
    <input
      type="number" min={1} max={99} value={card.qty}
      onChange={e => onQtyChange(Math.max(1, parseInt(e.target.value) || 1))}
      style={{ width: 52, textAlign: "center", padding: "4px 6px", fontSize: 13 }}
    />
    <span style={{ flex: 1, fontSize: 14, color: "var(--text)" }}>{card.name}</span>
    <button onClick={onRemove} style={{
      background: "none", border: "none", cursor: "pointer",
      color: "var(--muted)", fontSize: 16, lineHeight: 1, padding: "0 4px",
      transition: "color 0.15s",
    }}
      onMouseEnter={e => e.target.style.color = "var(--red2)"}
      onMouseLeave={e => e.target.style.color = "var(--muted)"}
    >✕</button>
  </div>
);

// ─── CARD LIST EDITOR ─────────────────────────────────────────────────────────
const CardListEditor = ({ title, icon, cards, setCards, accentColor = "var(--gold)" }) => {
  const [mode, setMode]       = useState("list");   // "list" | "paste"
  const [pasteText, setPaste] = useState("");
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty]   = useState(1);

  const total = cards.reduce((s, c) => s + c.qty, 0);

  const addCard = () => {
    if (!newName.trim()) return;
    const exists = cards.findIndex(c => c.name.toLowerCase() === newName.trim().toLowerCase());
    if (exists >= 0) {
      setCards(prev => prev.map((c, i) => i === exists ? { ...c, qty: c.qty + newQty } : c));
    } else {
      setCards(prev => [...prev, { name: newName.trim(), qty: newQty }]);
    }
    setNewName(""); setNewQty(1);
  };

  const importPaste = () => {
    const parsed = parseDecklistText(pasteText);
    if (!parsed.length) return alert("Nenhuma carta reconhecida. Use o formato: 4 Lightning Bolt");
    // merge with existing
    const merged = [...cards];
    parsed.forEach(({ name, qty }) => {
      const idx = merged.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
      if (idx >= 0) merged[idx] = { ...merged[idx], qty: merged[idx].qty + qty };
      else merged.push({ name, qty });
    });
    setCards(merged);
    setPaste(""); setMode("list");
  };

  const updateQty = (i, qty) => setCards(prev => prev.map((c, j) => j === i ? { ...c, qty } : c));
  const removeCard = (i) => setCards(prev => prev.filter((_, j) => j !== i));

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 18px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: accentColor, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</span>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700,
            background: total > 0 ? "rgba(201,168,76,0.12)" : "var(--surface)",
            border: "1px solid var(--border2)", borderRadius: 20,
            padding: "1px 10px", color: total > 0 ? accentColor : "var(--muted)",
          }}>{total}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn sm" onClick={() => setMode("list")}
            style={mode === "list" ? { borderColor: "var(--gold)", color: "var(--gold2)", background: "rgba(201,168,76,0.1)" } : {}}>
            ✏️ Manual
          </button>
          <button className="btn sm" onClick={() => setMode("paste")}
            style={mode === "paste" ? { borderColor: "var(--gold)", color: "var(--gold2)", background: "rgba(201,168,76,0.1)" } : {}}>
            📋 Colar lista
          </button>
          {cards.length > 0 && (
            <button className="btn sm danger" onClick={() => { if (confirm("Limpar todas as cartas?")) setCards([]); }}>
              Limpar
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: "16px 18px" }}>
        {/* PASTE MODE */}
        {mode === "paste" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>
              Cole a lista no formato MTGO/Arena: uma carta por linha, ex: <span style={{ color: "var(--gold2)", fontFamily: "'JetBrains Mono', monospace" }}>4 Lightning Bolt</span>
            </div>
            <textarea
              value={pasteText} onChange={e => setPaste(e.target.value)}
              rows={8} placeholder={"4 Lightning Bolt\n2 Snapcaster Mage\n1 Surgical Extraction\n…"}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, resize: "vertical" }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn primary" onClick={importPaste}>✓ Importar {parseDecklistText(pasteText).length > 0 ? `(${parseDecklistText(pasteText).length} cartas)` : ""}</button>
              <button className="btn" onClick={() => { setPaste(""); setMode("list"); }}>Cancelar</button>
            </div>
          </div>
        )}

        {/* MANUAL ADD ROW */}
        {mode === "list" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "flex-end" }}>
            <div style={{ width: 64 }}>
              <label>Qtd</label>
              <input type="number" min={1} max={99} value={newQty}
                onChange={e => setNewQty(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ textAlign: "center", padding: "8px 4px" }}
                onKeyDown={e => e.key === "Enter" && addCard()}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Nome da carta</label>
              <input value={newName} onChange={e => setNewName(e.target.value)}
                placeholder="Lightning Bolt…"
                onKeyDown={e => e.key === "Enter" && addCard()}
              />
            </div>
            <button className="btn primary" onClick={addCard} style={{ marginBottom: 1, whiteSpace: "nowrap" }}>+ Adicionar</button>
          </div>
        )}

        {/* CARD LIST */}
        {cards.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px 0", color: "var(--muted)", fontSize: 13, fontStyle: "italic" }}>
            Nenhuma carta adicionada ainda
          </div>
        ) : (
          <div style={{ maxHeight: 320, overflowY: "auto", paddingRight: 4 }}>
            {cards.map((c, i) => (
              <CardRow key={i} card={c}
                onQtyChange={qty => updateQty(i, qty)}
                onRemove={() => removeCard(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── DECK DETAIL MODAL ────────────────────────────────────────────────────────
const DeckDetail = ({ deck, onSave, onClose }) => {
  const [info, setInfo]          = useState({ name: deck.name, archetype: deck.archetype, format: deck.format, colors: deck.colors, isOwn: deck.isOwn, notes: deck.notes || "" });
  const [maindeck, setMaindeck]  = useState(deck.maindeck || []);
  const [sideboard, setSideboard] = useState(deck.sideboard || []);

  const isOwn     = info.isOwn;
  const mainTotal = maindeck.reduce((s, c) => s + c.qty, 0);
  const sideTotal = sideboard.reduce((s, c) => s + c.qty, 0);

  const handleSave = () => {
    if (!info.name.trim()) return alert("Nome obrigatório!");
    onSave({ ...deck, ...info, maindeck: isOwn ? maindeck : [], sideboard: isOwn ? sideboard : [] });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(5,7,12,0.85)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "24px 16px", overflowY: "auto",
    }}>
      <div style={{
        width: "100%", maxWidth: isOwn ? 820 : 560,
        background: "var(--bg2)", border: "1px solid var(--border2)",
        borderRadius: "var(--radius2)", overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
        animation: "fadeIn 0.25s ease",
      }}>
        {/* Modal header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px", borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>{isOwn ? "🃏" : "📖"}</span>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: isOwn ? "var(--gold2)" : "var(--muted)", fontWeight: 700 }}>
                {info.name || (isOwn ? "Novo Deck" : "Deck do Meta")}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                {isOwn ? `${mainTotal}/60 maindeck · ${sideTotal}/15 sideboard` : "Deck do meta · só informações"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn primary" onClick={handleSave}>✓ Salvar</button>
            <button className="btn" onClick={onClose}>✕ Fechar</button>
          </div>
        </div>

        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Deck info */}
          <div className="card">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
              <div>
                <label>Nome</label>
                <input value={info.name} onChange={e => setInfo(i => ({ ...i, name: e.target.value }))} placeholder="Murktide Regent" />
              </div>
              <div>
                <label>Archetype</label>
                <input value={info.archetype} onChange={e => setInfo(i => ({ ...i, archetype: e.target.value }))} placeholder="Murktide" />
              </div>
              <div>
                <label>Formato</label>
                <select value={info.format} onChange={e => setInfo(i => ({ ...i, format: e.target.value }))}>
                  {["Modern","Legacy","Pioneer","Standard","Vintage","Limited"].map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label>Cores</label>
                <input value={info.colors} onChange={e => setInfo(i => ({ ...i, colors: e.target.value.toUpperCase().replace(/[^WUBRG]/g,"") }))} placeholder="WUBRG" maxLength={5} />
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <label>Tipo</label>
              <select value={info.isOwn ? "own" : "meta"} onChange={e => setInfo(i => ({ ...i, isOwn: e.target.value === "own" }))}>
                <option value="own">Meu deck</option>
                <option value="meta">Deck do meta (oponente)</option>
              </select>
            </div>
          </div>

          {/* META DECK: só observações */}
          {!isOwn && (
            <div className="card">
              <label>Observações</label>
              <textarea
                value={info.notes}
                onChange={e => setInfo(i => ({ ...i, notes: e.target.value }))}
                rows={5}
                placeholder="Anote ameaças principais, estratégias, cards chave do sideboard adversário, dicas de como jogar contra…"
                style={{ resize: "vertical" }}
              />
            </div>
          )}

          {/* MEU DECK: avisos de contagem */}
          {isOwn && mainTotal > 0 && mainTotal !== 60 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: "var(--radius)", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", fontSize: 13, color: "var(--gold2)" }}>
              ⚠️ Maindeck com {mainTotal} cartas {mainTotal < 60 ? `(faltam ${60 - mainTotal})` : `(excede em ${mainTotal - 60})`}
            </div>
          )}
          {isOwn && sideTotal > 0 && sideTotal !== 15 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: "var(--radius)", background: "rgba(201,76,76,0.08)", border: "1px solid rgba(201,76,76,0.2)", fontSize: 13, color: "var(--red2)" }}>
              ⚠️ Sideboard com {sideTotal} cartas {sideTotal < 15 ? `(faltam ${15 - sideTotal})` : `(excede em ${sideTotal - 15})`}
            </div>
          )}

          {/* MEU DECK: editores de lista */}
          {isOwn && (
            <>
              <CardListEditor
                title="Maindeck" icon="⚔️"
                cards={maindeck} setCards={setMaindeck}
                accentColor="var(--gold)"
              />
              <CardListEditor
                title="Sideboard" icon="🛡️"
                cards={sideboard} setCards={setSideboard}
                accentColor="var(--blue2)"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── DECKS PAGE ───────────────────────────────────────────────────────────────
const DecksPage = ({ decks, setDecks }) => {
  const [editing, setEditing] = useState(null); // deck being edited, or "new"

  const ownDecks  = decks.filter(d => d.isOwn);
  const metaDecks = decks.filter(d => !d.isOwn);

  const openNew = () => setEditing({
    id: `d${Date.now()}`, name: "", archetype: "", format: "Modern",
    colors: "", isOwn: true, maindeck: [], sideboard: [],
  });

  const handleSave = (updated) => {
    setDecks(prev => {
      const exists = prev.find(d => d.id === updated.id);
      if (exists) return prev.map(d => d.id === updated.id ? updated : d);
      return [...prev, updated];
    });
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (!confirm("Deletar este deck?")) return;
    setDecks(prev => prev.filter(d => d.id !== id));
  };

  const DeckCard = ({ deck }) => {
    const mainTotal = (deck.maindeck || []).reduce((s, c) => s + c.qty, 0);
    const sideTotal = (deck.sideboard || []).reduce((s, c) => s + c.qty, 0);
    return (
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12, padding: "16px 18px", cursor: "pointer", transition: "border-color 0.18s" }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border2)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = ""}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: deck.isOwn ? "rgba(201,168,76,0.15)" : "var(--surface2)",
            border: `1px solid ${deck.isOwn ? "var(--border2)" : "var(--border)"}`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>{deck.isOwn ? "🃏" : "📖"}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: "var(--white)", fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{deck.name || <span style={{ color: "var(--muted)" }}>Sem nome</span>}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{deck.archetype}</span>
              {deck.archetype && <span style={{ color: "var(--border2)" }}>·</span>}
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{deck.format}</span>
              {deck.colors && <ManaRow colors={deck.colors} />}
            </div>
          </div>
        </div>

        {/* Own deck: card counts */}
        {deck.isOwn && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              flex: 1, textAlign: "center", padding: "6px 0",
              background: "var(--bg2)", borderRadius: "var(--radius)", border: "1px solid var(--border)",
            }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: mainTotal === 60 ? "var(--green2)" : mainTotal > 0 ? "var(--gold)" : "var(--muted)" }}>{mainTotal}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>Main</div>
            </div>
            <div style={{
              flex: 1, textAlign: "center", padding: "6px 0",
              background: "var(--bg2)", borderRadius: "var(--radius)", border: "1px solid var(--border)",
            }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: sideTotal === 15 ? "var(--green2)" : sideTotal > 0 ? "var(--blue2)" : "var(--muted)" }}>{sideTotal}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>Side</div>
            </div>
          </div>
        )}

        {/* Meta deck: notes preview */}
        {!deck.isOwn && deck.notes && (
          <div style={{
            fontSize: 13, color: "var(--text2)", fontStyle: "italic",
            background: "var(--bg2)", borderRadius: "var(--radius)",
            border: "1px solid var(--border)", padding: "8px 12px",
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            "{deck.notes}"
          </div>
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn sm" onClick={() => setEditing(deck)} style={{ flex: 1 }}>✏️ Editar</button>
          <button className="btn sm danger" onClick={() => handleDelete(deck.id)}>🗑</button>
        </div>
      </div>
    );
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {editing && (
        <DeckDetail
          deck={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn primary" onClick={openNew}>+ Novo Deck</button>
      </div>

      <div>
        <h3 style={{ fontSize: 14, color: "var(--gold)", marginBottom: 12, fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          🃏 Meus Decks ({ownDecks.length})
        </h3>
        {ownDecks.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: 32, color: "var(--muted)" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🃏</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13 }}>Nenhum deck cadastrado ainda</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {ownDecks.map(d => <DeckCard key={d.id} deck={d} />)}
          </div>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12, fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          📖 Meta Decks ({metaDecks.length})
        </h3>
        {metaDecks.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: 24, color: "var(--muted)", fontSize: 13 }}>
            Nenhum deck do meta cadastrado
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {metaDecks.map(d => <DeckCard key={d.id} deck={d} />)}
          </div>
        )}
      </div>
    </div>
  );
};

// little helper to avoid template literal issues
const var_radius2 = "var(--radius2)";

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [decks, setDecks] = useState(INITIAL_DECKS);

  const handleSaveMatch = (data) => {
    const newMatch = { id: `m${Date.now()}`, ...data };
    setMatches(prev => [newMatch, ...prev]);
    setPage("matches");
  };

  const handleDeleteMatch = (id) => {
    if (!confirm("Deletar esta partida?")) return;
    setMatches(prev => prev.filter(m => m.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <Header page={page} setPage={setPage} />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 60px" }}>
        {page === "dashboard" && <Dashboard matches={matches} decks={decks} />}
        {page === "matches" && <MatchesList matches={matches} decks={decks} onDelete={handleDeleteMatch} />}
        {page === "new" && <NewMatch decks={decks} setDecks={setDecks} onSave={handleSaveMatch} />}
        {page === "matchups" && <MatchupAnalysis matches={matches} decks={decks} />}
        {page === "decks" && <DecksPage decks={decks} setDecks={setDecks} />}
      </main>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "16px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em" }}>
          ⚡ TEAM GRAPESHOT · MATCH TRACKER · <span style={{ color: "var(--border2)" }}>storm count: {matches.length}</span>
        </div>
      </footer>
    </>
  );
}
