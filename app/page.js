"use client";

import { useState } from "react";
import { FONTS, LUNA_SITTING, LUNA_PASTA, LUNA_FRIDGE, daysFromNow, fmtExp, CATS, MODES, LUNA_MESSAGES, EXPIRY_NOTES, DEFAULT_INVENTORY, PREFERENCE_GROUPS } from "./data";

let nextId = 200;

const DEFAULT_PREFS = { allergies:[], lifestyle:[], religious:[], custom:"" };

export default function MiseApp() {
  const [tab,       setTab]       = useState("recipes");
  const [inventory, setInventory] = useState(DEFAULT_INVENTORY);
  const [recipes,   setRecipes]   = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);
  const [modes,     setModes]     = useState(["quick","comfort"]);
  const [addState,  setAddState]  = useState({});
  const [expanded,  setExpanded]  = useState({});
  const [prefs,     setPrefs]     = useState({...DEFAULT_PREFS, allergies:["gluten-free"]});
  const [showPrefs, setShowPrefs] = useState(false);

  const allItems = Object.entries(inventory).flatMap(([cat,items])=>items.map(i=>({...i,category:cat})));
  const expiring  = allItems.filter(i=>i.expiry&&daysFromNow(i.expiry)<=7).sort((a,b)=>daysFromNow(a.expiry)-daysFromNow(b.expiry));
  const lunaMsg   = LUNA_MESSAGES[Math.floor(Date.now()/86400000)%LUNA_MESSAGES.length];
  const allPrefs  = [...prefs.allergies,...prefs.lifestyle,...prefs.religious];

  const toggleMode   = id  => setModes(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const toggleExpand = idx => setExpanded(p=>({...p,[idx]:!p[idx]}));
  const removeItem   = (cat,id) => setInventory(p=>({...p,[cat]:p[cat].filter(i=>i.id!==id)}));
  const resetInventory = () => { setInventory(DEFAULT_INVENTORY); setRecipes([]); };

  const togglePref = (group, id) => {
    setPrefs(p => {
      const cur = p[group] || [];
      return { ...p, [group]: cur.includes(id) ? cur.filter(x=>x!==id) : [...cur, id] };
    });
  };

  const addItem = cat => {
    const s=addState[cat]||{};
    if(!s.name?.trim())return;
    setInventory(p=>({...p,[cat]:[...p[cat],{id:nextId++,name:s.name.trim(),qty:s.qty?.trim()||"—",expiry:s.expiry||"2026-12-01",gf:false}]}));
    setAddState(p=>({...p,[cat]:{}}));
  };

  const generate = async () => {
    setLoading(true); setRecipes([]); setError(null); setExpanded({});
    try {
      const modeLabels = MODES.filter(m=>modes.includes(m.id)).map(m=>m.label);
      const res = await fetch("/api/recipes",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({inventory, modes:modeLabels, preferences:prefs}),
      });
      const data = await res.json();
      if(!res.ok||data.error) throw new Error(data.error||`HTTP ${res.status}`);
      setRecipes(data.recipes||[]);
    } catch(e){setError(e.message||"Unknown error");}
    setLoading(false);
  };

  return (
    <>
      <style>{`${FONTS}`}</style>
      <div className="app">

        <header className="header">
          <div className="logo">m<em>i</em>se</div>
          <button
            onClick={()=>setShowPrefs(!showPrefs)}
            style={{background:"none",border:"none",cursor:"pointer",color:"rgba(246,241,234,0.7)",fontSize:20,padding:"4px 8px"}}
            title="Dietary preferences"
          >⚙︎</button>
        </header>

        {showPrefs&&(
          <div style={{background:"var(--white)",borderBottom:"1px solid var(--cream-dark)",padding:"20px"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:"var(--sage)",marginBottom:4}}>Dietary Preferences</div>
            <div style={{fontSize:12,color:"var(--text-light)",marginBottom:18,fontWeight:300}}>These apply to every recipe Mise suggests.</div>
            {PREFERENCE_GROUPS.map(group=>(
              <div key={group.id} style={{marginBottom:20}}>
                <div style={{fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px",color:"var(--text-light)",marginBottom:4}}>{group.icon} {group.label}</div>
                <div style={{fontSize:10,color:"var(--text-light)",fontStyle:"italic",marginBottom:10}}>{group.note}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {group.options.map(opt=>{
                    const active = (prefs[group.id]||[]).includes(opt.id);
                    return(
                      <button key={opt.id}
                        onClick={()=>togglePref(group.id,opt.id)}
                        style={{
                          padding:"6px 13px",borderRadius:20,fontSize:12,fontWeight:500,
                          cursor:"pointer",fontFamily:"'Outfit',sans-serif",
                          background: active?"var(--sage)":"var(--cream)",
                          color: active?"white":"var(--text-mid)",
                          border: active?"1.5px solid var(--sage)":"1.5px solid var(--cream-dark)",
                          WebkitTapHighlightColor:"transparent",
                        }}
                      >{opt.label}</button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{marginBottom:20}}>
              <div style={{fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px",color:"var(--text-light)",marginBottom:8}}>✎ Custom restriction</div>
              <input
                style={{width:"100%",padding:"8px 12px",border:"1.5px solid var(--cream-dark)",borderRadius:8,fontFamily:"'Outfit',sans-serif",fontSize:13,background:"var(--cream)",color:"var(--text)",outline:"none"}}
                placeholder="e.g. no cilantro, low sodium, soft foods only…"
                value={prefs.custom}
                onChange={e=>setPrefs(p=>({...p,custom:e.target.value}))}
              />
            </div>
            <button onClick={()=>setShowPrefs(false)}
              style={{width:"100%",padding:"13px",background:"var(--sage)",color:"white",border:"none",borderRadius:10,fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontStyle:"italic",cursor:"pointer"}}>
              Save preferences →
            </button>
          </div>
        )}

        <div className="scenario-banner">
          <div className="scenario-avatar">🏠</div>
          <div className="scenario-text">
            <div className="scenario-greeting">Long day. Let's make something good.</div>
            <div className="scenario-sub">Your kitchen has {allItems.length} ingredients — here's what you can make tonight.</div>
          </div>
          {allPrefs.length>0&&<div className="gf-badge">{allPrefs.length} restriction{allPrefs.length>1?"s":""}</div>}
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
              <div className="filter-row">{MODES.map(m=><button key={m.id} className={`pill ${modes.includes(m.id)?"active":""}`} onClick={()=>toggleMode(m.id)}>{m.label}</button>)}</div>
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
                <img src={LUNA_PASTA} alt="Luna with pasta"/>
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
                      {r.badges?.map((b,j)=><span key={j} className="rtag rt-gf">✦ {b}</span>)}
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
