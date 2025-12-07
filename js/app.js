// PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('data:application/javascript,self.skipWaiting()').catch(()=>{});
}

feather.replace();

// Wallpapers
const wallpapers = {
  "America/New_York":["https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/1485789/pexels-photo-1485789.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "America/Los_Angeles":["https://images.pexels.com/photos/34975692/pexels-photo-34975692.jpeg?auto=compress&w=2000","https://images.pexels.com/photos/208819/pexels-photo-208819.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/1078986/pexels-photo-1078986.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/358136/pexels-photo-358136.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "Europe/London":["https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/672142/pexels-photo-672142.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "Europe/Paris":["https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/236001/pexels-photo-236001.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/6992/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "Asia/Dubai":["https://images.pexels.com/photos/2857716/pexels-photo-2857716.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/1450379/pexels-photo-1450379.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "Asia/Kolkata":["https://images.pexels.com/photos/28762053/pexels-photo-28762053.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/3581365/pexels-photo-3581365.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/739212/pexels-photo-739212.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/358136/pexels-photo-358136.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "Asia/Singapore":["https://images.pexels.com/photos/3914755/pexels-photo-3914755.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/774440/pexels-photo-774440.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/259589/pexels-photo-259589.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/240333/pexels-photo-240333.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "Asia/Tokyo":["https://images.pexels.com/photos/1169935/pexels-photo-1169935.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "Australia/Sydney":["https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/358136/pexels-photo-358136.jpeg?auto=compress&cs=tinysrgb&w=2000"],
  "Pacific/Auckland":["https://images.pexels.com/photos/5342974/pexels-photo-5342974.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/441577/pexels-photo-441577.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=2000","https://images.pexels.com/photos/358136/pexels-photo-358136.jpeg?auto=compress&cs=tinysrgb&w=2000"]
};

const presetZones = [
  {city:"New York",tz:"America/New_York"},
  {city:"Los Angeles",tz:"America/Los_Angeles"},
  {city:"London",tz:"Europe/London"},
  {city:"Paris",tz:"Europe/Paris"},
  {city:"Dubai",tz:"Asia/Dubai"},
  {city:"Mumbai",tz:"Asia/Kolkata"},
  {city:"Singapore",tz:"Asia/Singapore"},
  {city:"Tokyo",tz:"Asia/Tokyo"},
  {city:"Sydney",tz:"Australia/Sydney"},
  {city:"Auckland",tz:"Pacific/Auckland"}
];

// DOM
const app = document.getElementById('app');
const intro = document.getElementById('intro');
const mainApp = document.getElementById('mainApp');
const digitalTime = document.getElementById('digitalTime');
const ampm = document.getElementById('ampm');
const dateEl = document.getElementById('date');
const themeToggle = document.getElementById('themeToggle');
const tzPreset = document.getElementById('tzPreset');
const tzCustom = document.getElementById('tzCustom');
const tzPresetModal = document.getElementById('tzPresetModal');
const tzCustomModal = document.getElementById('tzCustomModal');
const tzPresetGrid = document.getElementById('tzPresetGrid');
const tzCustomGrid = document.getElementById('tzCustomGrid');
const tzSearch = document.getElementById('tzSearch');
const panel = document.getElementById('panel');
const cityEl = document.getElementById('city');
const panelTime = document.getElementById('panelTime');
const panelAmpm = document.getElementById('panelAmpm');
const offsetEl = document.getElementById('offset');
const closeBtn = document.getElementById('closeBtn');

let panelInterval = null;
let currentTZ = localStorage.getItem('selectedTZ') || "Asia/Tokyo";

// Wallpaper logic
function getWallpaper(tz) {
  const h = parseInt(new Date().toLocaleString("en-US", {timeZone: tz, hour: 'numeric', hour12: false}));
  const list = wallpapers[tz] || wallpapers["Asia/Tokyo"];
  if (h >= 5 && h < 11) return list[0];
  if (h >= 11 && h < 17) return list[1] || list[0];
  if (h >= 17 && h < 20) return list[2] || list[0];
  return list[3] || list[0];
}

function applyWallpaper(tz) {
  const url = getWallpaper(tz);
  app.style.backgroundImage = `url(${url})`;
  app.classList.add('wallpaper-active');
  localStorage.setItem('selectedTZ', tz);
}

// Hourly wallpaper update
setInterval(() => {
  const saved = localStorage.getItem('selectedTZ');
  if (saved) applyWallpaper(saved);
}, 3600000);

// Local digital clock
function updateLocalClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const displayH = h % 12 || 12;

  digitalTime.textContent = `${displayH.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  ampm.textContent = h >= 12 ? 'PM' : 'AM';
  dateEl.textContent = now.toLocaleDateString('en-US', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
}

function updatePanelClock() {
  const opts = { timeZone: currentTZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const parts = new Intl.DateTimeFormat('en-US', opts).formatToParts(new Date());
  const h = parseInt(parts.find(p=>p.type==='hour').value);
  const m = parts.find(p=>p.type==='minute').value;
  const s = parts.find(p=>p.type==='second').value;
  const period = parts.find(p=>p.type==='dayPeriod').value.toUpperCase();
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;

  panelTime.textContent = `${displayH.toString().padStart(2,'0')}:${m}:${s}`;
  panelAmpm.textContent = period;
}

function getOffset(tz) {
  return new Intl.DateTimeFormat('en', {timeZone: tz, timeZoneName: 'shortOffset'}).formatToParts().find(p=>p.type==='timeZoneName').value.replace('GMT','UTC');
}

function showPanel(city, tz) {
  currentTZ = tz;
  cityEl.textContent = city;
  offsetEl.textContent = getOffset(tz);
  applyWallpaper(tz);

  if (panelInterval) clearInterval(panelInterval);
  updatePanelClock();
  panelInterval = setInterval(updatePanelClock, 1000);
  panel.classList.add('active');
}

closeBtn.onclick = () => {
  panel.classList.remove('active');
  if (panelInterval) clearInterval(panelInterval);
};

// Load saved wallpaper
window.addEventListener('load', () => {
  const saved = localStorage.getItem('selectedTZ');
  if (saved) applyWallpaper(saved);
  else {
    app.style.backgroundImage = `url(${wallpapers["Asia/Tokyo"][0]})`;
    app.classList.add('wallpaper-active');
  }
});

// Presets
presetZones.forEach(zone => {
  const el = document.createElement('div');
  el.className = 'tz-item';
  el.innerHTML = `<div class="tz-city">${zone.city}</div><div class="tz-offset">${getOffset(zone.tz)}</div>`;
  el.onclick = () => { showPanel(zone.city, zone.tz); tzPresetModal.classList.remove('active'); };
  tzPresetGrid.appendChild(el);
});

// Search
const allZones = Intl.supportedValuesOf?.('timeZone') || [];
tzSearch.addEventListener('input', () => {
  const q = tzSearch.value.trim().toLowerCase();
  tzCustomGrid.innerHTML = '';
  if (q.length < 2) return;
  allZones.filter(tz => tz.toLowerCase().includes(q)).slice(0,20).forEach(tz => {
    const city = tz.split('/').pop().replace(/_/g,' ');
    const el = document.createElement('div');
    el.className = 'tz-item';
    el.innerHTML = `<div class="tz-city">${city}</div><div class="tz-offset">${getOffset(tz)}</div>`;
    el.onclick = () => { showPanel(city, tz); tzCustomModal.classList.remove('active'); tzSearch.value = ''; };
    tzCustomGrid.appendChild(el);
  });
});

// Start after intro
setTimeout(() => {
  intro.remove();
  mainApp.classList.add('visible');
  updateLocalClock();
  setInterval(updateLocalClock, 1000);
}, 5500);

// Theme toggle
themeToggle.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.innerHTML = `<i data-feather="${isDark ? 'sun' : 'moon'}"></i>`;
  feather.replace();
});

// Modal controls
tzPreset.onclick = () => tzPresetModal.classList.add('active');
tzCustom.onclick = () => tzCustomModal.classList.add('active');
document.addEventListener('click', e => {
  if (!tzPresetModal.contains(e.target) && e.target !== tzPreset) tzPresetModal.classList.remove('active');
  if (!tzCustomModal.contains(e.target) && e.target !== tzCustom) tzCustomModal.classList.remove('active');
});

feather.replace();