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
.add-btn { background: var(--sage); color: white; border: none; padding: 8px 14px; border-radius: 8px; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
