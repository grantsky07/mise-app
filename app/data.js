export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');`;

export const LUNA_SITTING  = "/984A5FB2-EA02-47C4-9B9D-9BB4E48769A2.png";
export const LUNA_PASTA    = "/IMG_4949.png";
export const LUNA_FRIDGE   = "/IMG_4950.png";
export const LUNA_PORTRAIT = "/0874324A-D6B2-4139-911B-A1A4953696FA.png";

export const today = new Date();
export const daysFromNow = (d) => Math.round((new Date(d) - today) / 86400000);
export const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().split("T")[0]; };
export const fmtExp = (d) => {
  const days = daysFromNow(d);
  if (days < 0) return { label: "Expired", cls: "eu" };
  if (days === 0) return { label: "Today", cls: "eu" };
  if (days <= 3) return { label: `${days}d`, cls: "eu" };
  if (days <= 7) return { label: `${days}d`, cls: "es" };
  return { label: `${days}d`, cls: "eo" };
};

export const CATS = [
  { key:"fridge",  label:"Fridge",  icon:"🧊", color:"#3D5242" },
  { key:"freezer", label:"Freezer", icon:"❄️", color:"#3A5C7A" },
  { key:"pantry",  label:"Pantry",  icon:"🫙", color:"#8A6020" },
  { key:"spices",  label:"Spices",  icon:"🌿", color:"#6A3E28" },
];

export const MODES = [
  { id:"quick",     label:"Quick & easy" },
  { id:"comfort",   label:"Comfort food" },
  { id:"loweffort", label:"Minimal cleanup" },
  { id:"hearty",    label:"Filling & hearty" },
];

export const LUNA_MESSAGES = [
  "I spotted a few things that'd make something really wonderful right now…",
  "Nothing urgent — just some good ingredients at their peak. Tonight's a great night to cook.",
  "These are calling your name. A little dinner, a little less waste. Perfect.",
  "I've been keeping an eye on these. Use them soon and they'll be at their very best.",
];

export const EXPIRY_NOTES = {
  0:"Perfect timing — cook with this today.",
  1:"At its best tonight or tomorrow.",
  2:"Still lovely, but worth using soon.",
  3:"Worth planning around this week.",
};

export const PREFERENCE_GROUPS = [
  {
    id: "allergies",
    label: "Intolerances & Allergies",
    icon: "⚕️",
    note: "Treated as strict medical requirements",
    options: [
      { id:"gluten-free",    label:"Gluten-free" },
      { id:"dairy-free",     label:"Dairy-free" },
      { id:"nut-free",       label:"Tree nut-free" },
      { id:"peanut-free",    label:"Peanut-free" },
      { id:"shellfish-free", label:"Shellfish-free" },
      { id:"egg-free",       label:"Egg-free" },
      { id:"soy-free",       label:"Soy-free" },
      { id:"nightshade-free",label:"Nightshade-free" },
      { id:"low-fodmap",     label:"Low-FODMAP" },
    ],
  },
  {
    id: "lifestyle",
    label: "Dietary Lifestyle",
    icon: "🥗",
    note: "Applied to all recipe suggestions",
    options: [
      { id:"vegetarian",  label:"Vegetarian" },
      { id:"vegan",       label:"Vegan" },
      { id:"pescatarian", label:"Pescatarian" },
      { id:"paleo",       label:"Paleo" },
      { id:"keto",        label:"Keto / Low-carb" },
      { id:"whole30",     label:"Whole30" },
    ],
  },
  {
    id: "religious",
    label: "Religious & Ethical",
    icon: "✦",
    note: "Treated as strict requirements",
    options: [
      { id:"kosher",          label:"Kosher" },
      { id:"halal",           label:"Halal" },
      { id:"hindu-veg",       label:"Hindu vegetarian (no beef)" },
      { id:"jain",            label:"Jain (no root vegetables)" },
    ],
  },
];

export const DEFAULT_INVENTORY = {
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
