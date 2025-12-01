if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('data:text/javascript,').catch(() => {});
  }
  feather.replace();

  const backgrounds = {
    "America/New_York": "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=format&fit=crop&w=2000&q=80",
    "America/Los_Angeles": "https://images.pexels.com/photos/34975692/pexels-photo-34975692.jpeg?auto=format&fit=crop&w=2000&q=80",
    "Europe/London": "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=format&fit=crop&w=2000&q=80",
    "Europe/Paris": "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=format&fit=crop&w=2000&q=80",
    "Asia/Dubai": "https://images.pexels.com/photos/2857716/pexels-photo-2857716.jpeg?auto=format&fit=crop&w=2000&q=80",
    "Asia/Kolkata": "https://images.pexels.com/photos/28762053/pexels-photo-28762053.jpeg?auto=format&fit=crop&w=2000&q=80",
    "Asia/Singapore": "https://images.pexels.com/photos/3914755/pexels-photo-3914755.jpeg?auto=format&fit=crop&w=2000&q=80",
    "Asia/Tokyo": "https://images.pexels.com/photos/1169935/pexels-photo-1169935.jpeg?auto=format&fit=crop&w=2000&q=80",
    "Australia/Sydney": "https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=format&fit=crop&w=2000&q=80",
    "Pacific/Auckland": "https://images.pexels.com/photos/5342974/pexels-photo-5342974.jpeg?auto=format&fit=crop&w=2000&q=80"
  };

  const presetZones = [
    {city:"New York", tz:"America/New_York", offset:-5},
    {city:"Los Angeles", tz:"America/Los_Angeles", offset:-8},
    {city:"London", tz:"Europe/London", offset:0},
    {city:"Paris", tz:"Europe/Paris", offset:1},
    {city:"Dubai", tz:"Asia/Dubai", offset:4},
    {city:"Mumbai", tz:"Asia/Kolkata", offset:5.5},
    {city:"Singapore", tz:"Asia/Singapore", offset:8},
    {city:"Tokyo", tz:"Asia/Tokyo", offset:9},
    {city:"Sydney", tz:"Australia/Sydney", offset:11},
    {city:"Auckland", tz:"Pacific/Auckland", offset:13}
  ];

  const app = document.getElementById('app');
  const intro = document.getElementById('intro');
  const mainApp = document.getElementById('mainApp');
  const digitalTime = document.getElementById('digitalTime');
  const ampm = document.getElementById('ampm');
  const panelTime = document.getElementById('panelTime');
  const panelAmpm = document.getElementById('panelAmpm');
  const dateEl = document.getElementById('date');
  const hourHand = document.getElementById('hourHand');
  const minuteHand = document.getElementById('minuteHand');
  const secondHand = document.getElementById('secondHand');
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
  const offsetEl = document.getElementById('offset');
  const closeBtn = document.getElementById('closeBtn');

  let panelInterval = null;
  let currentWallpaper = null;

  // Intro → Main + Default Wallpaper
  setTimeout(() => {
    intro.remove();
    mainApp.classList.add('visible');
    app.classList.add('wallpaper-active');
    currentWallpaper = backgrounds["Asia/Tokyo"];
    app.style.backgroundImage = `url(${currentWallpaper})`;
  }, 5500);

  // Clock with Colorful Animation
  function updateClocks() {
    const now = new Date();
    const hours = now.getHours();
    const ampmText = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    const timeStr = `${displayHours.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    digitalTime.textContent = timeStr;
    ampm.textContent = ampmText;
    dateEl.textContent = now.toLocaleDateString('en-US', {weekday:'long', day:'numeric', month:'long', year:'numeric'});

    const h = hours % 12 * 30 + now.getMinutes() * 0.5;
    const m = now.getMinutes() * 6;
    const s = now.getSeconds() * 6;

    hourHand.style.transform = `rotate(${h - 90}deg)`;
    minuteHand.style.transform = `rotate(${m - 90}deg)`;
    secondHand.style.transform = `rotate(${s - 90}deg)`;
  }
  setInterval(updateClocks, 1000);
  updateClocks();

  // Hour marks
  for(let i = 0; i < 12; i++) {
    const mark = document.createElement('div');
    mark.className = 'hour-mark';
    mark.style.transform = `rotate(${i*30}deg)`;
    document.querySelector('.clock-face').appendChild(mark);
  }

  // Theme Toggle
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = `<i data-feather="${isDark ? 'sun' : 'moon'}"></i>`;
    feather.replace();
  });

  // Preset Zones
  presetZones.forEach(zone => {
    const item = document.createElement('div');
    item.className = 'tz-item';
    item.innerHTML = `<div class="tz-city">${zone.city}</div><div class="tz-offset">UTC${zone.offset >= 0 ? '+'+zone.offset : zone.offset}</div>`;
    item.onclick = () => { selectZone(zone); tzPresetModal.classList.remove('active'); };
    tzPresetGrid.appendChild(item);
  });

  // Custom Search
  const allTimezones = Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : [];
  tzSearch.addEventListener('input', () => {
    const query = tzSearch.value.trim().toLowerCase();
    tzCustomGrid.innerHTML = '';
    if (query.length < 2) return;

    const matches = allTimezones.filter(tz => tz.toLowerCase().includes(query)).slice(0, 20);
    if (matches.length === 0) {
      tzCustomGrid.innerHTML = '<div style="grid-column:1/-1;padding:20px;text-align:center;opacity:0.6">No results found</div>';
      return;
    }

    matches.forEach(tz => {
      const item = document.createElement('div');
      item.className = 'tz-item';
      const city = tz.split('/').pop().replace(/_/g, ' ');
      item.innerHTML = `<div class="tz-city">${city}</div><div class="tz-offset">${tz}</div>`;
      item.onclick = () => {
        selectZone({city: city, tz: tz});
        tzCustomModal.classList.remove('active');
        tzSearch.value = '';
      };
      tzCustomGrid.appendChild(item);
    });
  });

  // Select Zone
  function selectZone(zone) {
    currentWallpaper = backgrounds[zone.tz] || backgrounds["Asia/Tokyo"];
    app.style.backgroundImage = `url(${currentWallpaper})`;
    showPanel(zone);
  }

  function showPanel(zone) {
    cityEl.textContent = zone.city;
    offsetEl.textContent = zone.offset !== undefined ? `UTC${zone.offset >= 0 ? '+'+zone.offset : zone.offset}` : '';
    panel.classList.add('active');

    if (panelInterval) clearInterval(panelInterval);
    const update = () => {
      const now = new Date();
      const hours = now.getHours();
      const ampmText = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const timeStr = `${displayHours.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      panelTime.textContent = timeStr;
      panelAmpm.textContent = ampmText;
    };
    update();
    panelInterval = setInterval(update, 1000);
  }

  // Modal Controls
  tzPreset.onclick = e => { e.stopPropagation(); tzPresetModal.classList.add('active'); };
  tzCustom.onclick = e => { e.stopPropagation(); tzCustomModal.classList.add('active'); };
  document.addEventListener('click', e => {
    if (!tzPresetModal.contains(e.target) && e.target !== tzPreset) tzPresetModal.classList.remove('active');
    if (!tzCustomModal.contains(e.target) && e.target !== tzCustom) tzCustomModal.classList.remove('active');
  });
  closeBtn.onclick = () => {
    panel.classList.remove('active');
    if (panelInterval) clearInterval(panelInterval);
  };

  feather.replace();