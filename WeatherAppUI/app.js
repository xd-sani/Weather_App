/* ─────────────────────────────────────────
   SKYWATCH — app.js
   ───────────────────────────────────────── */

/* ── 1. Generate stars ─────────────────── */
(function generateStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 0.5;
    s.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      --d:${2 + Math.random() * 4}s;
      --delay:-${Math.random() * 5}s;
      --min-op:${0.1 + Math.random() * 0.3};
    `;
    container.appendChild(s);
  }
})();


/* ── 2. SVG Weather Icons ──────────────── */
const ICONS = {

  sunny: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stop-color="#ffe566"/>
        <stop offset="100%" stop-color="#f5a623"/>
      </radialGradient>
    </defs>
    <g opacity="0.6">
      ${buildRays(8, 50, 50, 28, 40, '#ffe566', 3)}
    </g>
    <circle cx="50" cy="50" r="20" fill="url(#sunG)"/>
    <circle cx="50" cy="50" r="20" fill="none" stroke="#ffe566" stroke-width="1" opacity="0.5"/>
  </svg>`,

  cloudy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cloudG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#c8e8ff"/>
        <stop offset="100%" stop-color="#8ab4d0"/>
      </linearGradient>
    </defs>
    <circle cx="38" cy="58" r="18" fill="url(#cloudG)" opacity="0.9"/>
    <circle cx="54" cy="52" r="22" fill="url(#cloudG)"/>
    <circle cx="70" cy="60" r="14" fill="url(#cloudG)" opacity="0.9"/>
    <rect x="24" y="60" width="60" height="18" rx="9" fill="url(#cloudG)"/>
  </svg>`,

  partlycloudy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sunG2" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stop-color="#ffe566"/>
        <stop offset="100%" stop-color="#f5a623"/>
      </radialGradient>
      <linearGradient id="cloudG2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#dff0ff"/>
        <stop offset="100%" stop-color="#9ec9e8"/>
      </linearGradient>
    </defs>
    <g opacity="0.7">
      ${buildRays(6, 30, 32, 18, 26, '#ffe566', 2.5, -30)}
    </g>
    <circle cx="30" cy="32" r="14" fill="url(#sunG2)"/>
    <circle cx="44" cy="62" r="15" fill="url(#cloudG2)"/>
    <circle cx="57" cy="57" r="18" fill="url(#cloudG2)"/>
    <circle cx="70" cy="64" r="12" fill="url(#cloudG2)"/>
    <rect x="30" y="66" width="52" height="14" rx="7" fill="url(#cloudG2)"/>
  </svg>`,

  rain: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rainCloudG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#7a9cb0"/>
        <stop offset="100%" stop-color="#4a6b80"/>
      </linearGradient>
    </defs>
    <circle cx="38" cy="42" r="16" fill="url(#rainCloudG)"/>
    <circle cx="52" cy="36" r="19" fill="url(#rainCloudG)"/>
    <circle cx="66" cy="44" r="13" fill="url(#rainCloudG)"/>
    <rect x="26" y="44" width="52" height="14" rx="7" fill="url(#rainCloudG)"/>
    <line x1="38" y1="66" x2="35" y2="74" stroke="#5bc8f5" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <line x1="48" y1="72" x2="45" y2="80" stroke="#5bc8f5" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <line x1="58" y1="66" x2="55" y2="74" stroke="#5bc8f5" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <line x1="44" y1="78" x2="41" y2="86" stroke="#5bc8f5" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <line x1="54" y1="78" x2="51" y2="86" stroke="#5bc8f5" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <line x1="64" y1="72" x2="61" y2="80" stroke="#5bc8f5" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  </svg>`,

  thunder: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="thunderCloudG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#4a5568"/>
        <stop offset="100%" stop-color="#2d3748"/>
      </linearGradient>
    </defs>
    <circle cx="38" cy="38" r="16" fill="url(#thunderCloudG)"/>
    <circle cx="52" cy="32" r="19" fill="url(#thunderCloudG)"/>
    <circle cx="66" cy="40" r="13" fill="url(#thunderCloudG)"/>
    <rect x="26" y="40" width="52" height="14" rx="7" fill="url(#thunderCloudG)"/>
    <polygon points="52,58 44,72 50,72 42,88 58,68 51,68"
             fill="#ffe566" stroke="#f5c842" stroke-width="0.5"/>
  </svg>`,

  snow: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="snowCloudG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#ddeeff"/>
        <stop offset="100%" stop-color="#aac8e0"/>
      </linearGradient>
    </defs>
    <circle cx="38" cy="40" r="16" fill="url(#snowCloudG)"/>
    <circle cx="52" cy="34" r="19" fill="url(#snowCloudG)"/>
    <circle cx="66" cy="42" r="13" fill="url(#snowCloudG)"/>
    <rect x="26" y="42" width="52" height="14" rx="7" fill="url(#snowCloudG)"/>
    <text x="36" y="66" font-size="10" fill="white" opacity="0.9" text-anchor="middle">*</text>
    <text x="50" y="70" font-size="10" fill="white" opacity="0.9" text-anchor="middle">*</text>
    <text x="64" y="66" font-size="10" fill="white" opacity="0.9" text-anchor="middle">*</text>
    <text x="43" y="78" font-size="10" fill="white" opacity="0.9" text-anchor="middle">*</text>
    <text x="57" y="78" font-size="10" fill="white" opacity="0.9" text-anchor="middle">*</text>
  </svg>`,

  foggy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="17" y="38" width="66" height="6"  rx="3" fill="#9ec9e8" opacity="0.5"/>
    <rect x="22" y="48" width="58" height="6"  rx="3" fill="#8ab4d0" opacity="0.6"/>
    <rect x="15" y="58" width="70" height="6"  rx="3" fill="#9ec9e8" opacity="0.7"/>
    <rect x="20" y="68" width="62" height="6"  rx="3" fill="#8ab4d0" opacity="0.5"/>
    <rect x="28" y="78" width="44" height="5"  rx="2.5" fill="#9ec9e8" opacity="0.4"/>
  </svg>`,

  windy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 30 Q40 22 70 30" fill="none" stroke="#9ec9e8" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
    <circle cx="70" cy="30" r="5" fill="none" stroke="#9ec9e8" stroke-width="2" opacity="0.5"/>
    <path d="M13 46 Q40 36 68 46" fill="none" stroke="#9ec9e8" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    <circle cx="68" cy="46" r="5" fill="none" stroke="#9ec9e8" stroke-width="2" opacity="0.7"/>
    <path d="M16 62 Q35 50 58 62" fill="none" stroke="#9ec9e8" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
    <circle cx="58" cy="62" r="5" fill="none" stroke="#9ec9e8" stroke-width="2" opacity="0.9"/>
    <path d="M10 78 Q40 65 80 78" fill="none" stroke="#7ab8d8" stroke-width="2.5"
          stroke-linecap="round" opacity="0.6" stroke-dasharray="4 3"/>
  </svg>`,
};

/** Helper — build evenly-spaced sun rays */
function buildRays(count, cx, cy, r1, r2, color, sw, startDeg = 0) {
  let lines = '';
  for (let i = 0; i < count; i++) {
    const a = ((i * (360 / count)) + startDeg) * Math.PI / 180;
    const x1 = cx + r1 * Math.cos(a), y1 = cy + r1 * Math.sin(a);
    const x2 = cx + r2 * Math.cos(a), y2 = cy + r2 * Math.sin(a);
    lines += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}"
                    x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"
                    stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }
  return lines;
}

/** Map condition string → icon key */
function getIconKey(condition) {
  const c = (condition || '').toLowerCase();
  if (c.includes('sun') || c.includes('clear'))                    return 'sunny';
  if (c.includes('thunder') || c.includes('storm'))                return 'thunder';
  if (c.includes('snow') || c.includes('sleet') || c.includes('ice')) return 'snow';
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return 'rain';
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return 'foggy';
  if (c.includes('wind') || c.includes('breezy'))                  return 'windy';
  if (c.includes('overcast') || (c.includes('cloud') && !c.includes('partly'))) return 'cloudy';
  return 'partlycloudy'; // default
}

/** Extract inner SVG markup from a full <svg>…</svg> string */
function svgInner(svgStr) {
  const m = svgStr.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return m ? m[1] : '';
}


/* ── 3. Format helpers ─────────────────── */
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const DAYS   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN',
                  'JUL','AUG','SEP','OCT','NOV','DEC'];
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function barWidth(maxTemp) {
  return Math.min(Math.max(((maxTemp - 5) / 45) * 100, 20), 100).toFixed(1);
}


/* ── 4. Error helper ───────────────────── */
function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.classList.add('show');
}


/* ── 5. Render ─────────────────────────── */
function renderWeather(data) {
  const { weatherResponse: w, dayTemp: days } = data;

  if (!w || !days || !days.length) {
    showError('Unexpected API response format.');
    return;
  }

  // Show content, hide empty state
  document.getElementById('emptyState').classList.remove('show');
  document.getElementById('contentArea').classList.add('show');

  const iconKey  = getIconKey(w.condition);
  const iconSvg  = ICONS[iconKey];
  const iconBody = svgInner(iconSvg);

  // ── Hero ──
  document.getElementById('heroIcon').innerHTML =
    `<svg class="weather-icon-large" viewBox="0 0 100 100">${iconBody}</svg>`;

  document.getElementById('cityName').textContent    = w.city;
  document.getElementById('regionLabel').textContent = `${w.region}, ${w.country}`;
  document.getElementById('conditionText').textContent = w.condition;
  document.getElementById('currentTemp').textContent   = w.temp?.toFixed(1);

  // ── Stats (from first day) ──
  const today = days[0];
  document.getElementById('statsGrid').innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Max Temp</div>
      <div class="stat-value hot">${today.maxtemp?.toFixed(1)}<span style="font-size:1rem;color:var(--text-muted)">°</span></div>
      <div class="stat-sub">Today's High</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Avg Temp</div>
      <div class="stat-value avg">${today.avgtemp?.toFixed(1)}<span style="font-size:1rem;color:var(--text-muted)">°</span></div>
      <div class="stat-sub">Today's Mean</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Min Temp</div>
      <div class="stat-value cool">${today.mintemp?.toFixed(1)}<span style="font-size:1rem;color:var(--text-muted)">°</span></div>
      <div class="stat-sub">Today's Low</div>
    </div>
  `;

  // ── Forecast ──
  document.getElementById('forecastGrid').innerHTML = days.map((d, i) => `
    <div class="forecast-card">
      <div class="forecast-date">${formatDate(d.date)}${i === 0 ? ' · Today' : ''}</div>
      <svg class="forecast-icon" viewBox="0 0 100 100">${iconBody}</svg>
      <div class="forecast-avg">
        ${d.avgtemp?.toFixed(1)}<span style="font-size:0.9rem;color:var(--text-muted)">°C</span>
      </div>
      <div class="forecast-range">
        <span class="temp-max">▲ ${d.maxtemp?.toFixed(1)}°</span>
        <span class="temp-min">▼ ${d.mintemp?.toFixed(1)}°</span>
      </div>
      <div class="temp-bar-wrap">
        <div class="temp-bar-fill" style="width:${barWidth(d.maxtemp)}%"></div>
      </div>
    </div>
  `).join('');

  // ── Timestamp ──
  const now = new Date();
  document.getElementById('lastUpdated').innerHTML =
    `Updated ${now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}<br>` +
    `${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
}


/* ── 6. Fetch ──────────────────────────── */
async function fetchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const days = document.getElementById('daysSelect').value;
  const btn  = document.getElementById('fetchBtn');
  const err  = document.getElementById('errorMsg');

  if (!city) { showError('Please enter a city name.'); return; }

  err.classList.remove('show');
  document.getElementById('loadingOverlay').classList.add('show');
  btn.disabled = true;

  try {
    const res = await fetch(
      `http://localhost:8080/weather/forecast?city=${encodeURIComponent(city)}&days=${days}`
    );
    if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
    const data = await res.json();
    renderWeather(data);
  } catch (e) {
    showError(
      `Could not fetch weather data. ` +
      `Make sure your server is running at localhost:8080. (${e.message})`
    );
  } finally {
    document.getElementById('loadingOverlay').classList.remove('show');
    btn.disabled = false;
  }
}


/* ── 7. Enter key & auto-load ──────────── */
document.getElementById('cityInput')
  .addEventListener('keydown', e => { if (e.key === 'Enter') fetchWeather(); });

window.addEventListener('load', fetchWeather);