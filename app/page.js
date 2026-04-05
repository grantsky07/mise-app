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
.loading { text-align: center; padding: 48px 20px; }
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
.recipe-card { background: var(--white); border-radius: 14px; overflow: hidden; border: 1px solid var(--cream-dark); }
.recipe-head { padding: 16px 18px 12px; border-bottom: 1px solid var(--cream-mid); }
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
.ing-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font-size: 12px; padding: 4px 10px; border-radius: 6px; font-weight: 400; }
.chip-have { background: var(--sage-pale); color: var(--sage); }
.chip-need { background: var(--cream-dark); color: var(--text-mid); border: 1px dashed var(--text-light); }
.sous-hero { display: flex; flex-direction: column; align-items: center; margin-bottom: 28px; }
.sous-bubble { background: var(--white); border: 1.5px solid var(--cream-dark); border-radius: 18px 18px 18px 4px; padding: 14px 20px; max-width: 280px; text-align: center; margin-bottom: 6px; }
.sous-bubble p { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-style: italic; color: var(--text-mid); line-height: 1.55; }
.sous-name { font-size: 10px; color: var(--text-light); letter-spacing: 0.6px; text-transform: uppercase; margin-top: 2px; }
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

function SousDog({ size = 150 }) {
  return (
    <svg width={size} height={Math.round(size * 1.45)} viewBox="0 0 240 348" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bodyG" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FAFAFA"/>
          <stop offset="100%" stopColor="#EBEBEB"/>
        </radialGradient>
        <radialGradient id="muzzleG" cx="25%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#282828"/>
          <stop offset="100%" stopColor="#111111"/>
        </radialGradient>
      </defs>
      <ellipse cx="104" cy="21" rx="33" ry="18" fill="#FFFFFF" stroke="#C2C2C2" strokeWidth="2"/>
      <rect x="68" y="17" width="72" height="52" rx="8" fill="#FFFFFF" stroke="#C2C2C2" strokeWidth="2"/>
      <ellipse cx="104" cy="69" rx="49" ry="13" fill="#FFFFFF" stroke="#C2C2C2" strokeWidth="2"/>
      <rect x="68" y="58" width="72" height="11" fill="#EFEFEF" stroke="#C2C2C2" strokeWidth="1"/>
      <path d="M88 21 Q90 10 92 21" fill="none" stroke="#DCDCDC" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M102 17 Q104 7 106 17" fill="none" stroke="#DCDCDC" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M116 21 Q118 10 120 21" fill="none" stroke="#DCDCDC" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="57" cy="122" rx="16" ry="25" fill="#1A1A1A" stroke="#111" strokeWidth="2" transform="rotate(-16 57 122)"/>
      <ellipse cx="170" cy="130" rx="20" ry="31" fill="#1A1A1A" stroke="#111" strokeWidth="2" transform="rotate(20 170 130)"/>
      <path d="M 70 94 C 78 70, 108 63, 134 70 C 158 77, 175 98, 176 124 C 177 146, 164 162, 150 167 C 138 172, 120 173, 104 169 C 84 163, 65 150, 60 132 C 54 114, 58 104, 70 94 Z" fill="#1E1E1E" stroke="#111" strokeWidth="2.5"/>
      <path d="M 148 144 C 160 136, 184 136, 198 148 C 208 156, 207 172, 198 180 C 189 188, 172 190, 158 183 C 142 176, 136 162, 148 144 Z" fill="url(#muzzleG)" stroke="#111" strokeWidth="2"/>
      <ellipse cx="84" cy="110" rx="9" ry="10" fill="#FFFFFF" stroke="#111" strokeWidth="1.5"/>
      <ellipse cx="84" cy="111" rx="6" ry="7" fill="#5A2E0C"/>
      <ellipse cx="84" cy="112" rx="3.5" ry="4.5" fill="#080402"/>
      <ellipse cx="81" cy="107" rx="2.2" ry="2.2" fill="#FFFFFF"/>
      <ellipse cx="136" cy="112" rx="14" ry="16" fill="#FFFFFF" stroke="#111" strokeWidth="2"/>
      <ellipse cx="136" cy="113" rx="10" ry="12" fill="#5A2E0C"/>
      <ellipse cx="136" cy="114" rx="6.5" ry="8" fill="#060402"/>
      <ellipse cx="130" cy="107" rx="3.8" ry="3.8" fill="#FFFFFF"/>
      <ellipse cx="141" cy="119" rx="1.8" ry="1.8" fill="#FFFFFF"/>
      <path d="M 123 122 Q 136 127 149 122" fill="none" stroke="#111" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 178 146 C 184 140, 202 140, 206 150 C 208 156, 204 163, 196 165 C 187 167, 177 162, 175 154 C 173 148, 175 148, 178 146 Z" fill="#0C0C0C" stroke="#111" strokeWidth="1.5"/>
      <path d="M 184 152 Q 193 149 200 154" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="183" cy="148" rx="4" ry="2.5" fill="#2C2C2C"/>
      <path d="M 157 168 Q 174 177 196 170" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 157 168 Q 168 188 178 193 Q 190 188 196 170 Q 174 179 157 168 Z" fill="#0C0604"/>
      <rect x="160" y="168" width="34" height="8" rx="4" fill="#F0EEEB"/>
      <ellipse cx="177" cy="186" rx="13" ry="5" fill="#E8E6E2"/>
      <ellipse cx="177" cy="185" rx="15" ry="9" fill="#D46A5E"/>
      <path d="M 177 176 L 177 193" fill="none" stroke="#BA5050" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="106" cy="208" rx="42" ry="23" fill="#F5F5F5" stroke="#D0D0D0" strokeWidth="1.5"/>
      <rect x="64" y="195" width="84" height="19" rx="9.5" fill="#2A9D8F" stroke="#1B7A6E" strokeWidth="2"/>
      <line x1="84" y1="196" x2="84" y2="213" stroke="#24907F" strokeWidth="1"/>
      <line x1="106" y1="196" x2="106" y2="213" stroke="#24907F" strokeWidth="1"/>
      <line x1="128" y1="196" x2="128" y2="213" stroke="#24907F" strokeWidth="1"/>
      <rect x="100" y="197" width="12" height="15" rx="3" fill="#3DBDAD" stroke="#1B7A6E" strokeWidth="1.2"/>
      <line x1="106" y1="214" x2="106" y2="224" stroke="#909090" strokeWidth="1.5"/>
      <circle cx="106" cy="229" r="8" fill="#242424" stroke="#111" strokeWidth="1.5"/>
      <circle cx="106" cy="229" r="5.5" fill="#323232"/>
      <ellipse cx="106" cy="286" rx="52" ry="42" fill="url(#bodyG)" stroke="#CACACA" strokeWidth="1.5"/>
      <ellipse cx="84" cy="268" rx="15" ry="11" fill="#252525" transform="rotate(-14 84 268)"/>
      <ellipse cx="124" cy="276" rx="11" ry="9" fill="#252525" transform="rotate(10 124 276)"/>
      <ellipse cx="92" cy="294" rx="10" ry="7" fill="#252525" transform="rotate(20 92 294)"/>
      <ellipse cx="126" cy="298" rx="7" ry="6" fill="#252525"/>
      <ellipse cx="72" cy="284" rx="7" ry="5" fill="#252525" transform="rotate(-8 72 284)"/>
      <ellipse cx="114" cy="258" rx="6" ry="5" fill="#252525"/>
      <ellipse cx="72" cy="316" rx="23" ry="13" fill="#F5F5F5" stroke="#CACACA" strokeWidth="1.5"/>
      <ellipse cx="58" cy="313" rx="6" ry="4.5" fill="#ECECEC" stroke="#CACACA" strokeWidth="1.2"/>
      <ellipse cx="71" cy="309" rx="6" ry="4.5" fill="#ECECEC" stroke="#CACACA" strokeWidth="1.2"/>
      <ellipse cx="84" cy="313" rx="6" ry="4.5" fill="#ECECEC" stroke="#CACACA" strokeWidth="1.2"/>
      <ellipse cx="152" cy="294" rx="21" ry="12" fill="#F5F5F5" stroke="#CACACA" strokeWidth="1.5" transform="rotate(-26 152 294)"/>
      <rect x="162" y="244" width="9" height="48" rx="4.5" fill="#C08A2A" stroke="#8A5A10" strokeWidth="1.5" transform="rotate(-40 162 244)"/>
      <ellipse cx="183" cy="226" rx="14" ry="10" fill="#C08A2A" stroke="#8A5A10" strokeWidth="1.5" transform="rotate(-40 183 226)"/>
      <ellipse cx="180" cy="222" rx="7" ry="4.5" fill="#D4A050" transform="rotate(-40 180 222)"/>
      <path d="M 152 268 Q 190 248 194 274 Q 197 294 174 293" fill="none" stroke="#1A1A1A" strokeWidth="15" strokeLinecap="round"/>
      <path d="M 152 268 Q 190 248 194 274 Q 197 294 174 293" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const SOUS_MESSAGES = [
  "I spotted a few things that'd make something really wonderful right now…",
  "Nothing urgent — just some good ingredients at their peak. Tonight's a great night to cook.",
  "These are calling your name. A little dinner, a little less waste. Perfect.",
  "I've been keeping an eye on these. Use them soon and they'll be at their very best.",
];

const EXPIRY_NOTES = { 0:"Perfect timing — cook with this today.", 1:"At its best tonight or tomorrow.", 2:"Still lovely, but worth using soon.", 3:"Worth planning around this week." };

const INVENTORY = {
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

let nextId = 200;

export default function MiseApp() {
  const [tab,       setTab]       = useState("recipes");
  const [inventory, setInventory] = useState(INVENTORY);
  const [recipes,   setRecipes]   = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);
  const [modes,     setModes]     = useState(["quick","comfort","gf"]);
  const [addState,  setAddState]  = useState({});

  const allItems = Object.entries(inventory).flatMap(([cat,items])=>items.map(i=>({...i,category:cat})));
  const expiring  = allItems.filter(i=>i.expiry&&daysFromNow(i.expiry)<=7).sort((a,b)=>daysFromNow(a.expiry)-daysFromNow(b.expiry));
  const sousMsg   = SOUS_MESSAGES[Math.floor(Date.now()/86400000)%SOUS_MESSAGES.length];

  const toggleMode = id => setModes(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const removeItem = (cat,id) => setInventory(p=>({...p,[cat]:p[cat].filter(i=>i.id!==id)}));
  const addItem = cat => {
    const s=addState[cat]||{};
    if(!s.name?.trim())return;
    setInventory(p=>({...p,[cat]:[...p[cat],{id:nextId++,name:s.name.trim(),qty:s.qty?.trim()||"—",expiry:s.expiry||addDays(30),gf:false}]}));
    setAddState(p=>({...p,[cat]:{}}));
  };

  const generate = async () => {
    setLoading(true); setRecipes([]); setError(null);
    try {
      const modeLabels = MODES.filter(m=>modes.includes(m.id)).map(m=>m.label);
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventory, modes: modeLabels }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
      setRecipes(data.recipes || []);
    } catch(e) { setError(e.message||"Unknown error"); }
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
          {expiring.length>0&&<div className="soon-nudge">Sous has {expiring.length} tip{expiring.length>1?"s":""} ✦</div>}
        </div>
        <nav className="nav">
          <button className={`nav-btn ${tab==="recipes"?"active":""}`} onClick={()=>setTab("recipes")}>Tonight's Recipes</button>
          <button className={`nav-btn ${tab==="inventory"?"active":""}`} onClick={()=>setTab("inventory")}>My Kitchen</button>
          <button className={`nav-btn ${tab==="expiring"?"active":""}`} onClick={()=>setTab("expiring")}>
            Sous Says…{expiring.length>0&&<span className="nav-badge">{expiring.length}</span>}
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
            {loading&&<div className="loading"><div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div><div className="loading-title">Finding your dinner…</div><div className="loading-sub">Matching ingredients, checking what's freshest</div></div>}
            {!loading&&!error&&recipes.length===0&&<div className="empty"><div style={{fontSize:36,marginBottom:12}}>🍽</div><div className="empty-title">Ready when you are</div><div className="empty-sub">Choose your mood above and hit the button.</div></div>}
            {!loading&&recipes.length>0&&<div className="recipes-list">{recipes.map((r,i)=>(
              <div className="recipe-card" key={i}>
                <div className="recipe-head">
                  <div className="recipe-name">{r.name}</div>
                  <div className="recipe-tags">
                    {r.time&&<span className="rtag rt-time">⏱ {r.time}</span>}
                    {r.difficulty&&<span className="rtag rt-diff">{r.difficulty}</span>}
                    {r.comfort&&<span className="rtag rt-comfort">☕ {r.comfort} comfort</span>}
                    <span className="rtag rt-gf">✦ GF</span>
                  </div>
                </div>
                <div className="recipe-body">
                  <p className="recipe-desc">{r.description}</p>
                  {r.uses?.length>0&&<><div className="ing-title">Ingredients</div><div className="ing-chips">
                    {r.uses.map((ing,j)=><span key={j} className="chip chip-have">✓ {ing}</span>)}
                    {r.needs?.map((ing,j)=><span key={j} className="chip chip-need">+ {ing}</span>)}
                    {(!r.needs||r.needs.length===0)&&<span style={{fontSize:12,color:"var(--sage-light)",fontStyle:"italic"}}>Everything already in your kitchen ✦</span>}
                  </div></>}
                </div>
              </div>
            ))}</div>}
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
          </>}
          {tab==="expiring"&&<>
            <div className="sous-hero">
              <SousDog size={150}/>
              <div className="sous-bubble"><p>"{sousMsg}"</p></div>
              <div className="sous-name">Sous — your kitchen companion</div>
            </div>
            {expiring.length===0
              ?<div className="empty"><div className="empty-title">All quiet in the kitchen</div><div className="empty-sub">Sous has nothing to flag. Your kitchen is in great shape.</div></div>
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
