"use client";

import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');`;

const STYLES = `
:root {
  --cream: #F6F1EA; --cream-mid: #EDE6DB; --cream-dark: #DDD4C4;
  --sage: #3D5242; --sage-light: #5A7360; --sage-pale: #EAF0EB;
  --terra: #B85C38; --terra-pale: #F5E8E2;
  --amber: #C08A2A; --amber-pale: #FBF3DC;
  --teal: #2A9D8F;
  --text: #1E1E18; --text-mid: #5C5C4C; --text-light: #8C8C78;
  --white: #FEFCF9; --red: #A83232; --red-pale: #F5E8E8;
}
.app { min-height: 100vh; background: var(--cream); color: var(--text); font-family: 'Outfit', sans-serif; }
.header { background: var(--sage); padding: 0 20px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
.logo { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: var(--cream); letter-spacing: 3px; text-transform: uppercase; }
.logo em { font-style: italic; font-weight: 400; color: #D4A96A; }
.header-tag { font-size: 10px; color: rgba(246,241,234,0.45); font-weight: 300; letter-spacing: 1px; text-transform: uppercase; }
.scenario-banner { background: linear-gradient(135deg, #3D5242 0%, #2A3B2D 100%); padding: 16px 20px; display: flex; align-items: center; gap: 14px; }
.scenario-avatar { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.scenario-text { flex: 1; }
.scenario-greeting { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 400; color: var(--cream); line-height: 1.3; }
.scenario-sub { font-size: 11px; color: rgba(246,241,234,0.55); margin-top: 2px; font-weight: 300; }
.gf-badge { background: rgba(196,169,106,0.2); border: 1px solid rgba(196,169,106,0.4); color: #D4A96A; font-size: 9px; font-weight: 600; padding: 3px 7px; border-radius: 4px; letter-spacing: 0.8px; text-transform: uppercase; white-space: nowrap; }
.ready-bar { background: var(--white); border-bottom: 1px solid var(--cream-dark); padding: 11px 20px; display: flex; align-items: center; justify-content: space-between; }
.ready-count { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-style: italic; color: var(--sage); }
.ready-count strong { font-weight: 600; font-size: 17px; }
.soon-nudge { font-size: 11px; color: var(--teal); font-weight: 600; }
.nav { background: var(--white); border-bottom: 1px solid var(--cream-dark); display: flex; padding: 0 20px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.nav::-webkit-scrollbar { display: none; }
.nav-btn { background: none; border: none; padding: 12px 16px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 400; color: var(--text-light); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; -webkit-tap-highlight-color: transparent; }
.nav-btn.active { color: var(--sage); border-bottom-color: var(--terra); font-weight: 600; }
.nav-badge { display: inline-block; background: var(--teal); color: white; font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 8px; margin-left: 4px; vertical-align: middle; }
.main { padding: 20px; max-width: 600px; margin: 0 auto; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: var(--sage); margin-bottom: 4px; }
.page-sub { font-size: 13px; color: var(--text-light); margin-bottom: 20px; font-weight: 300; line-height: 1.5; }
.summary-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px; }
.summary-chip { background: var(--white); border-radius: 12px; padding: 12px 8px; text-align: center; border: 1px solid var(--cream-dark); }
.summary-num { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; color: var(--sage); line-height: 1; margin-bottom: 3px; }
.summary-lbl { font-size: 9px; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.6px; font-weight: 500; }
.inventory-grid { display: flex; flex-direction: column; gap: 14px; }
.cat-card { background: var(--white); border-radius: 14px; overflow: hidden; border: 1px solid var(--cream-dark); }
.cat-head { padding: 12px 15px; display: flex; align-items: center; justify-content: space-between; }
.cat-label { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; }
.cat-count { font-size: 11px; color: var(--text-light); font-weight: 300; }
.cat-body { padding: 0 15px 12px; }
.item-row { display: flex; align-items: center; gap: 8px; padding: 7px 0; border-bottom: 1px solid var(--cream-mid); }
.item-row:last-child { border-bottom: none; }
.item-name { font-size: 13px; flex: 1; }
.item-qty { font-size: 11px; color: var(--text-light); font-weight: 300; white-space: nowrap; }
.etag { font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; white-space: nowrap; }
.eo { background: var(--sage-pale); color: var(--sage-light); }
.es { background: var(--amber-pale); color: var(--amber); }
.eu { background: var(--red-pale); color: var(--red); }
.gf-dot { width: 7px; height: 7px; border-radius: 50%; background: #D4A96A; flex-shrink: 0; }
.item-del { background: none; border: none; cursor: pointer; color: var(--text-light); font-size: 18px; padding: 2px 6px; opacity: 0.4; transition: opacity 0.15s; -webkit-tap-highlight-color: transparent; }
.item-del:active { opacity: 1; color: var(--red); }
.add-bar { margin-top: 10px; display: flex; gap: 6px; }
.add-input { flex: 1; min-width: 0; padding: 8px 10px; border: 1.5px solid var(--cream-dark); border-radius: 8px; font-family: 'Outfit', sans-serif; font-size: 14px; background: var(--cream); color: var(--text); outline: none; -webkit-appearance: none; }
.add-input:focus { border-color: var(--sage-light); }
.add-btn { background: var(--sage); color: white; border: none; padding: 8px 14px; border-radius: 8px; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; -webkit-tap-highlight-color: transparent; }
.reset-btn { width: 100%; padding: 11px; background: none; border: 1.5px solid var(--cream-dark); border-radius: 8px; font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500; color: var(--text-light); cursor: pointer; margin-top: 20px; transition: all 0.15s; }
.reset-btn:active { border-color: var(--terra); color: var(--terra); }
.recipe-panel { background: var(--white); border-radius: 14px; padding: 20px; margin-bottom: 20px; border: 1px solid var(--cream-dark); }
.recipe-panel-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: var(--sage); margin-bottom: 3px; }
.recipe-panel-sub { font-size: 13px; color: var(--text-mid); margin-bottom: 16px; font-weight: 300; line-height: 1.5; }
.filter-row { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 16px; }
.pill { padding: 7px 14px; border-radius: 20px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--cream-dark); background: var(--cream); color: var(--text-mid); font-family: 'Outfit', sans-serif; transition: all 0.15s; -webkit-tap-highlight-color: transparent; }
.pill.active { background: var(--sage); color: white; border-color: var(--sage); }
.pill.gf-pill { border-color: #D4A96A66; color: var(--amber); background: var(--amber-pale); }
.pill.gf-pill.active { background: var(--amber); color: white; border-color: var(--amber); }
.gen-btn { width: 100%; padding: 16px; background: var(--terra); color: white; border: none; border-radius: 12px; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; font-style: italic; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.gen-btn:active { background: #A04E2E; }
.gen-btn:disabled { background: var(--text-light); cursor: not-allowed; }
.loading { text-align: center; padding: 32px 20px; }
.loading img { width: 180px; margin-bottom: 12px; }
.dots { display: inline-flex; gap: 6px; margin-bottom: 14px; }
.dot { width: 9px; height: 9px; border-radius: 50%; background: var(--teal); animation: pulse 1.2s infinite; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes pulse { 0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1);opacity:1} }
.loading-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-style: italic; color: var(--text-mid); margin-bottom: 5px; }
.loading-sub { font-size: 12px; color: var(--text-light); }
.error-box { background: var(--red-pale); border: 1px solid #D4A0A0; border-radius: 12px; padding: 16px 18px; margin-bottom: 16px; }
.error-title { font-weight: 600; color: var(--red); font-size: 13px; margin-bottom: 6px; }
.error-msg { font-size: 11px; color: var(--text-mid); font-family: monospace; word-break: break-all; line-height: 1.5; }
.recipes-list { display: flex; flex-direction: column; gap: 14px; }
.recipes-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.recipes-header img { width: 70px; flex-shrink: 0; }
.recipes-header-text { flex: 1; }
.recipes-header-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-style: italic; color: var(--sage); }
.recipes-header-sub { font-size: 12px; color: var(--text-light); margin-top: 2px; }
.recipe-card { background: var(--white); border-radius: 14px; overflow: hidden; border: 1px solid var(--cream-dark); }
.recipe-head { padding: 16px 18px 12px; border-bottom: 1px solid var(--cream-mid); cursor: pointer; -webkit-tap-highlight-color: transparent; }
.recipe-name { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 8px; }
.recipe-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.rtag { font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: 500; }
.rt-time { background: var(--amber-pale); color: var(--amber); }
.rt-diff { background: var(--sage-pale); color: var(--sage-light); }
.rt-comfort { background: var(--terra-pale); color: var(--terra); }
.rt-gf { background: var(--amber-pale); color: #9A6A00; border: 1px solid #D4A96A55; }
.recipe-body { padding: 14px 18px 18px; }
.recipe-desc { font-size: 14px; color: var(--text-mid); line-height: 1.7; margin-bottom: 14px; font-weight: 300; }
.ing-title { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-light); margin-bottom: 8px; }
.ing-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
.chip { font-size: 12px; padding: 4px 10px; border-radius: 6px; font-weight: 400; }
.chip-have { background: var(--sage-pale); color: var(--sage); }
.chip-need { background: var(--cream-dark); color: var(--text-mid); border: 1px dashed var(--text-light); }
.steps-title { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-light); margin-bottom: 10px; }
.steps-list { display: flex; flex-direction: column; gap: 10px; }
.step-row { display: flex; gap: 12px; align-items: flex-start; }
.step-num { width: 24px; height: 24px; border-radius: 50%; background: var(--sage); color: white; font-size: 11px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
.step-text { font-size: 13px; color: var(--text-mid); line-height: 1.6; font-weight: 300; flex: 1; }
.expand-hint { font-size: 11px; color: var(--teal); margin-top: 10px; font-style: italic; }
.luna-hero { display: flex; flex-direction: column; align-items: center; margin-bottom: 28px; }
.luna-bubble { background: var(--white); border: 1.5px solid var(--cream-dark); border-radius: 18px 18px 18px 4px; padding: 14px 20px; max-width: 280px; text-align: center; margin-bottom: 6px; }
.luna-bubble p { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-style: italic; color: var(--text-mid); line-height: 1.55; }
.luna-name { font-size: 10px; color: var(--text-light); letter-spacing: 0.6px; text-transform: uppercase; margin-top: 2px; }
.exp-list { display: flex; flex-direction: column; gap: 9px; }
.exp-item { background: var(--white); border-radius: 12px; padding: 13px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; border: 1px solid var(--cream-dark); border-left: 3px solid var(--cream-dark); }
.exp-item.soon { border-left-color: var(--teal); }
.exp-item.urgent { border-left-color: var(--terra); }
.exp-name { font-weight: 500; font-size: 14px; }
.exp-loc { font-size: 12px; color: var(--text-light); margin-top: 2px; font-weight: 300; }
.exp-note { font-size: 11px; font-style: italic; color: var(--text-light); margin-top: 3px; }
.exp-days { font-size: 13px; font-weight: 600; }
.ds { color: var(--teal); }
.du { color: var(--terra); }
.empty { text-align: center; padding: 48px 20px; }
.empty-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: var(--text-mid); margin-bottom: 6px; font-weight: 400; }
.empty-sub { font-size: 13px; color: var(--text-light); }
`;

const today = new Date();
const daysFromNow = (d) => Math.round((new Date(d) - today) / 86400000);
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().split("T")[0]; };
const fmtExp = (d) => {
  const days = daysFromNow(d);
  if (days < 0) return { label: "Expired", cls: "eu" };
  if (days === 0) return { label: "Today", cls: "eu" };
  if (days <= 3) return { label: `${days}d`, cls: "eu" };
  if (days <= 7) return { label: `${days}d`, cls: "es" };
  return { label: `${days}d`, cls: "eo" };
};

const LUNA_SITTING   = "/984A5FB2-EA02-47C4-9B9D-9BB4E48769A2.png";
const LUNA_PASTA     = "/IMG_4949.png";
const LUNA_FRIDGE    = "/IMG_4950.png";
const LUNA_PANTRY    = "/IMG_4951.png";
const LUNA_PORTRAIT  = "/0874324A-D6B2-4139-911B-A1A4953696FA.png";

const DEFAULT_INVENTORY = {
  fridge: [
    { id:1, name:"Butter",      qty:"~3 tbsp",     expiry:addDays(14), gf:true },
    { id:2, name:"Milk",        qty:"~2 cups",      expiry:addDays(5),  gf:true },
    { id:3, name:"Egg",         qty:"1 large",      expiry:addDays(18), gf:true },
    { id:4, name:"GF bread",    qty:"3 slices",     expiry:addDays(4),  gf:true },
    { id:5, name:"Cooking oil", qty:"small amount", expiry:addDays(90), gf:true },
  ],
  freezer: [
    { id:6, name:"Ground beef",     qty:"~1 lb",      expiry:addDays(90),  gf:true },
    { id:7, name:"Chicken breasts", qty:"2 ct",       expiry:addDays(120), gf:true },
    { id:8, name:"GF Texas toast",  qty:"4–5 slices", expiry:addDays(180), gf:true },
  ],
  pantry: [
    { id:9,  name:"GF pasta (penne)",        qty:"½ box",       expiry:addDays(300), gf:true },
    { id:10, name:"GF pasta (rotini)",       qty:"⅓ bag",       expiry:addDays(280), gf:true },
    { id:11, name:"Instant mashed potatoes", qty:"most of box", expiry:addDays(400), gf:true },
    { id:12, name:"Chicken broth",           qty:"1 can",       expiry:addDays(500), gf:true },
    { id:13, name:"Canned diced tomatoes",   qty:"1 can",       expiry:addDays(600), gf:true },
    { id:14, name:"Olive oil",               qty:"½ bottle",    expiry:addDays(365), gf:true },
    { id:15, name:"Cornstarch",              qty:"½ box",       expiry:addDays(700), gf:true },
  ],
  spices: [
    { id:16, name:"Garlic powder",       qty:"full",  expiry:addDays(500), gf:true },
    { id:17, name:"Italian seasoning",   qty:"½ jar", expiry:addDays(400), gf:true },
    { id:18, name:"Smoked paprika",      qty:"½ jar", expiry:addDays(450), gf:true },
    { id:19, name:"Salt & black pepper", qty:"full",  expiry:addDays(999), gf:true },
    { id:20, name:"Onion powder",        qty:"½ jar", expiry:addDays(480), gf:true },
    { id:21, name:"Red pepper flakes",   qty:"full",  expiry:addDays(600), gf:true },
  ],
};

const CATS = [
  { key:"fridge",  label:"Fridge",  icon:"🧊", color:"#3D5242" },
  { key:"freezer", label:"Freezer", icon:"❄️", color:"#3A5C7A" },
  { key:"pantry",  label:"Pantry",  icon:"🫙", color:"#8A6020" },
  { key:"spices",  label:"Spices",  icon:"🌿", color:"#6A3E28" },
];

const MODES = [
  { id:"quick",     label:"Quick & easy" },
  { id:"comfort",   label:"Comfort food" },
  { id:"gf",        label:"✦ Gluten-free", cls:"gf-pill" },
  { id:"loweffort", label:"Minimal cleanup" },
  { id:"hearty",    label:"Filling & hearty" },
];

const LUNA_MESSAGES = [
  "I spotted a few things that'd make something really wonderful right now…",
  "Nothing urgent — just some good ingredients at their peak. Tonight's a great night to cook.",
  "These are calling your name. A little dinner, a little less waste. Perfect.",
  "I've been keeping an eye on these. Use them soon and they'll be at their very best.",
];

const EXPIRY_NOTES = {
  0:"Perfect timing — cook with this today.",
  1:"At its best tonight or tomorrow.",
  2:"Still lovely, but worth using soon.",
  3:"Worth planning around this week."
};

let nextId = 200;

export default function MiseApp() {
  const [tab,        setTab]        = useState("recipes");
  const [inventory,  setInventory]  = useState(DEFAULT_INVENTORY);
  const [recipes,    setRecipes]    = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [modes,      setModes]      = useState(["quick","comfort","gf"]);
  const [addState,   setAddState]   = useState({});
  const [expanded,   setExpanded]   = useState({});

  const allItems = Object.entries(inventory).flatMap(([cat,items])=>items.map(i=>({...i,category:cat})));
  const expiring  = allItems.filter(i=>i.expiry&&daysFromNow(i.expiry)<=7).sort((a,b)=>daysFromNow(a.expiry)-daysFromNow(b.expiry));
  const lunaMsg   = LUNA_MESSAGES[Math.floor(Date.now()/86400000)%LUNA_MESSAGES.length];

  const toggleMode   = id  => setModes(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const toggleExpand = idx => setExpanded(p=>({...p,[idx]:!p[idx]}));
  const removeItem   = (cat,id) => setInventory(p=>({...p,[cat]:p[cat].filter(i=>i.id!==id)}));
  const resetInventory = () => setInventory(DEFAULT_INVENTORY);

  const addItem = cat => {
    const s=addState[cat]||{};
    if(!s.name?.trim())return;
    setInventory(p=>({...p,[cat]:[...p[cat],{id:nextId++,name:s.name.trim(),qty:s.qty?.trim()||"—",expiry:s.expiry||addDays(30),gf:false}]}));
    setAddState(p=>({...p,[cat]:{}}));
  };

  const generate = async () => {
    setLoading(true); setRecipes([]); setError(null); setExpanded({});
    try {
      const modeLabels = MODES.filter(m=>modes.includes(m.id)).map(m=>m.label);
      const res = await fetch("/api/recipes",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({inventory,modes:modeLabels}),
      });
      const data = await res.json();
      if(!res.ok||data.error) throw new Error(data.error||`HTTP ${res.status}`);
      setRecipes(data.recipes||[]);
    } catch(e){setError(e.message||"Unknown error");}
    setLoading(false);
  };

  return (
    <>
      <style>{`${FONTS}\n${STYLES}`}</style>
      <div className="app">

        <header className="header">
          <div className="logo">m<em>i</em>se</div>
          <div className="header-tag">Always ready to cook</div>
        </header>

        <div className="scenario-banner">
          <div className="scenario-avatar">🏠</div>
          <div className="scenario-text">
            <div className="scenario-greeting">Long day. Let's make something good.</div>
            <div className="scenario-sub">Your kitchen has {allItems.length} ingredients — here's what you can make tonight.</div>
          </div>
          <div className="gf-badge">GF</div>
        </div>

        <div className="ready-bar">
          <div className="ready-count"><strong>{allItems.length}</strong> ingredients in your kitchen</div>
          {expiring.length>0&&<div className="soon-nudge">Luna has {expiring.length} tip{expiring.length>1?"s":""} ✦</div>}
        </div>

        <nav className="nav">
          <button className={`nav-btn ${tab==="recipes"?"active":""}`} onClick={()=>setTab("recipes")}>Tonight's Recipes</button>
          <button className={`nav-btn ${tab==="inventory"?"active":""}`} onClick={()=>setTab("inventory")}>My Kitchen</button>
          <button className={`nav-btn ${tab==="expiring"?"active":""}`} onClick={()=>setTab("expiring")}>
            Luna Says…{expiring.length>0&&<span className="nav-badge">{expiring.length}</span>}
          </button>
        </nav>

        <main className="main">

          {tab==="recipes"&&<>
            <div className="recipe-panel">
              <div className="recipe-panel-title">What are you in the mood for?</div>
              <div className="recipe-panel-sub">Mise will scan your {allItems.length} ingredients and find what works right now.</div>
              <div className="filter-row">{MODES.map(m=><button key={m.id} className={`pill ${m.cls||""} ${modes.includes(m.id)?"active":""}`} onClick={()=>toggleMode(m.id)}>{m.label}</button>)}</div>
              <button className="gen-btn" onClick={generate} disabled={loading}>{loading?"Scanning your kitchen…":"What can I make tonight?"}</button>
            </div>

            {error&&<div className="error-box"><div className="error-title">Something went wrong</div><div className="error-msg">{error}</div></div>}

            {loading&&<div className="loading">
              <img src={LUNA_FRIDGE} alt="Luna checking the fridge"/>
              <div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div>
              <div className="loading-title">Luna's checking your kitchen…</div>
              <div className="loading-sub">Finding the most comforting combinations</div>
            </div>}

            {!loading&&!error&&recipes.length===0&&<div className="empty">
              <div style={{fontSize:36,marginBottom:12}}>🍽</div>
              <div className="empty-title">Ready when you are</div>
              <div className="empty-sub">Choose your mood above and hit the button.</div>
            </div>}

            {!loading&&recipes.length>0&&<>
              <div className="recipes-header">
                <img src={LUNA_PASTA} alt="Luna with a plate of food"/>
                <div className="recipes-header-text">
                  <div className="recipes-header-title">Here's what you can make tonight</div>
                  <div className="recipes-header-sub">Tap any recipe to see the full steps</div>
                </div>
              </div>
              <div className="recipes-list">{recipes.map((r,i)=>(
                <div className="recipe-card" key={i}>
                  <div className="recipe-head" onClick={()=>toggleExpand(i)}>
                    <div className="recipe-name">{r.name}</div>
                    <div className="recipe-tags">
                      {r.time&&<span className="rtag rt-time">⏱ {r.time}</span>}
                      {r.difficulty&&<span className="rtag rt-diff">{r.difficulty}</span>}
                      {r.comfort&&<span className="rtag rt-comfort">☕ {r.comfort} comfort</span>}
                      <span className="rtag rt-gf">✦ GF</span>
                    </div>
                    {!expanded[i]&&<div className="expand-hint">Tap to see full recipe →</div>}
                  </div>
                  <div className="recipe-body">
                    <p className="recipe-desc">{r.description}</p>
                    {r.uses?.length>0&&<>
                      <div className="ing-title">Ingredients</div>
                      <div className="ing-chips">
                        {r.uses.map((ing,j)=><span key={j} className="chip chip-have">✓ {ing}</span>)}
                        {r.needs?.map((ing,j)=><span key={j} className="chip chip-need">+ {ing}</span>)}
                        {(!r.needs||r.needs.length===0)&&<span style={{fontSize:12,color:"var(--sage-light)",fontStyle:"italic"}}>Everything already in your kitchen ✦</span>}
                      </div>
                    </>}
                    {expanded[i]&&r.steps?.length>0&&<>
                      <div className="steps-title" style={{marginTop:16}}>How to make it</div>
                      <div className="steps-list">
                        {r.steps.map((step,j)=>(
                          <div className="step-row" key={j}>
                            <div className="step-num">{j+1}</div>
                            <div className="step-text">{step}</div>
                          </div>
                        ))}
                      </div>
                    </>}
                  </div>
                </div>
              ))}</div>
            </>}
          </>}

          {tab==="inventory"&&<>
            <div className="page-title">My Kitchen</div>
            <div className="page-sub">Everything Mise is tracking. Gold dots = gluten-free verified.</div>
            <div className="summary-bar">{CATS.map(c=><div className="summary-chip" key={c.key}><div className="summary-num">{inventory[c.key].length}</div><div className="summary-lbl">{c.label}</div></div>)}</div>
            <div className="inventory-grid">{CATS.map(cat=>(
              <div className="cat-card" key={cat.key}>
                <div className="cat-head" style={{background:cat.color+"0F",borderBottom:`2px solid ${cat.color}22`}}>
                  <div className="cat-label" style={{color:cat.color}}><span>{cat.icon}</span>{cat.label}</div>
                  <span className="cat-count">{inventory[cat.key].length} items</span>
                </div>
                <div className="cat-body">
                  {inventory[cat.key].map(item=>{const exp=item.expiry?fmtExp(item.expiry):null;return(
                    <div className="item-row" key={item.id}>
                      {item.gf&&<span className="gf-dot"/>}
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">{item.qty}</span>
                      {exp&&<span className={`etag ${exp.cls}`}>{exp.label}</span>}
                      <button className="item-del" onClick={()=>removeItem(cat.key,item.id)}>×</button>
                    </div>
                  );})}
                  <div className="add-bar">
                    <input className="add-input" placeholder="Add item" value={addState[cat.key]?.name||""} onChange={e=>setAddState(p=>({...p,[cat.key]:{...p[cat.key],name:e.target.value}}))} onKeyDown={e=>e.key==="Enter"&&addItem(cat.key)}/>
                    <input className="add-input" placeholder="Qty" style={{maxWidth:60}} value={addState[cat.key]?.qty||""} onChange={e=>setAddState(p=>({...p,[cat.key]:{...p[cat.key],qty:e.target.value}}))} onKeyDown={e=>e.key==="Enter"&&addItem(cat.key)}/>
                    <button className="add-btn" onClick={()=>addItem(cat.key)}>+</button>
                  </div>
                </div>
              </div>
            ))}</div>
            <button className="reset-btn" onClick={resetInventory}>↺ Reset to demo kitchen</button>
          </>}

          {tab==="expiring"&&<>
            <div className="luna-hero">
              <img src={LUNA_SITTING} alt="Luna" style={{width:150,marginBottom:8}}/>
              <div className="luna-bubble"><p>"{lunaMsg}"</p></div>
              <div className="luna-name">Luna — your kitchen companion</div>
            </div>
            {expiring.length===0
              ?<div className="empty">
                  <div className="empty-title">All quiet in the kitchen</div>
                  <div className="empty-sub">Luna has nothing to flag. Your kitchen is in great shape.</div>
                </div>
              :<div className="exp-list">{expiring.map(item=>{
                const days=daysFromNow(item.expiry);
                const urgency=days<=2?"urgent":"soon";
                const cat=CATS.find(c=>c.key===item.category);
                return<div className={`exp-item ${urgency}`} key={item.id}>
                  <div>
                    <div className="exp-name">{item.name}</div>
                    <div className="exp-loc">{cat?.icon} {cat?.label} · {item.qty}</div>
                    {EXPIRY_NOTES[days]&&<div className="exp-note">{EXPIRY_NOTES[days]}</div>}
                  </div>
                  <div className={`exp-days ${urgency==="urgent"?"du":"ds"}`}>{days===0?"Today":days===1?"Tomorrow":`${days} days`}</div>
                </div>;
              })}</div>
            }
          </>}

        </main>
      </div>
    </>
  );
}
