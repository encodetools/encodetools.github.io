// === TOGGLE MODE LOGIC ===
const selectModeBtn = document.getElementById('selectModeBtn');
const manualModeBtn = document.getElementById('manualModeBtn');
const selectModeSection = document.getElementById('selectModeSection');
const manualModeSection = document.getElementById('manualModeSection');

// Set mode awal aktif
selectModeBtn.classList.add('active');
selectModeSection.style.display = 'block';
manualModeSection.style.display = 'none';

// Event toggle mode
selectModeBtn.addEventListener('click', () => {
  selectModeBtn.classList.add('active');
  manualModeBtn.classList.remove('active');
  selectModeSection.style.display = 'block';
  manualModeSection.style.display = 'none';
});

manualModeBtn.addEventListener('click', () => {
  manualModeBtn.classList.add('active');
  selectModeBtn.classList.remove('active');
  manualModeSection.style.display = 'block';
  selectModeSection.style.display = 'none';
});


// === CUSTOM INPUT LOGIC ===
const selectElements = [
  { select: document.getElementById('deviceType'), input: document.getElementById('customDeviceType') },
  { select: document.getElementById('chromeVersion'), input: document.getElementById('customChromeVersion') },
  { select: document.getElementById('deviceModel'), input: document.getElementById('customDeviceModel') },
  { select: document.getElementById('platformVersion'), input: document.getElementById('customPlatformVersion') }
];

// Tampilkan input custom saat pilih "lainnya"
selectElements.forEach(item => {
  item.select.addEventListener('change', () => {
    if (item.select.value === 'lainnya') {
      item.input.style.display = 'block';
    } else {
      item.input.style.display = 'none';
    }
    generateHeaders();
  });
});


// === GENERATE HEADER PREVIEW ===
function generateHeaders() {
  // Ambil nilai dari field
  let deviceType = document.getElementById('deviceType').value;
  let chromeVersion = document.getElementById('chromeVersion').value;
  let deviceModel = document.getElementById('deviceModel').value;
  let platformVersion = document.getElementById('platformVersion').value;

  // Ambil nilai custom jika ada
  if (deviceType === 'lainnya') {
    deviceType = document.getElementById('customDeviceType').value.trim() || 'Custom';
  }
  if (chromeVersion === 'lainnya') {
    chromeVersion = document.getElementById('customChromeVersion').value.trim() || '146.0.7680.153';
  }
  if (deviceModel === 'lainnya') {
    deviceModel = document.getElementById('customDeviceModel').value.trim() || 'Infinix X693';
  }
  if (platformVersion === 'lainnya') {
    platformVersion = document.getElementById('customPlatformVersion').value.trim() || '11.0.0';
  }

  // Versi singkat Chrome
  const chromeShortVer = chromeVersion.split('.')[0] || '146';

  // Generate header sesuai tipe perangkat
  let ua, secChUa, secChUaPlatform, secChUaMobile, secChUaFullVersion, secChUaFullVersionList, secChUaPlatformVersion, secChUaModel, secChUaFormFactors;

  switch(deviceType) {
    case 'android':
      ua = `Mozilla/5.0 (Linux; Android ${platformVersion}; ${deviceModel}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Mobile Safari/537.36`;
      secChUa = `"Chromium";v="${chromeShortVer}", "Not-A.Brand";v="24", "Google Chrome";v="${chromeShortVer}"`;
      secChUaPlatform = `"Android"`;
      secChUaMobile = "?1";
      secChUaFormFactors = `"Mobile"`;
      break;

    case 'ios':
      ua = `Mozilla/5.0 (iPhone; CPU iPhone OS ${platformVersion.replace('.', '_')} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/${chromeVersion} Mobile/15E148 Safari/604.1`;
      secChUa = `"Chromium";v="${chromeShortVer}", "Not-A.Brand";v="24", "Google Chrome";v="${chromeShortVer}"`;
      secChUaPlatform = `"iOS"`;
      secChUaMobile = "?1";
      secChUaFormFactors = `"Mobile"`;
      break;

    case 'macos':
      ua = `Mozilla/5.0 (Macintosh; Intel Mac OS X ${platformVersion}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
      secChUa = `"Chromium";v="${chromeShortVer}", "Not-A.Brand";v="24", "Google Chrome";v="${chromeShortVer}"`;
      secChUaPlatform = `"macOS"`;
      secChUaMobile = "?0";
      secChUaFormFactors = `"Desktop"`;
      break;

    case 'windows':
      ua = `Mozilla/5.0 (Windows NT ${platformVersion}; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
      secChUa = `"Chromium";v="${chromeShortVer}", "Not-A.Brand";v="24", "Google Chrome";v="${chromeShortVer}"`;
      secChUaPlatform = `"Windows"`;
      secChUaMobile = "?0";
      secChUaFormFactors = `"Desktop"`;
      break;

    default: // Custom device type
      ua = `Mozilla/5.0 (${deviceType}; ${platformVersion}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
      secChUa = `"Chromium";v="${chromeShortVer}", "Not-A.Brand";v="24", "Google Chrome";v="${chromeShortVer}"`;
      secChUaPlatform = `"${deviceType}"`;
      secChUaMobile = "?0";
      secChUaFormFactors = `"Desktop"`;
      break;
  }

  // Isi SEMUA field preview termasuk FULL VERSION LIST
  document.getElementById('uaPreview').value = ua;
  document.getElementById('secChUaPreview').value = secChUa;
  document.getElementById('secChUaPlatformPreview').value = secChUaPlatform;
  document.getElementById('secChUaMobilePreview').value = secChUaMobile;
  document.getElementById('secChUaFullVersionPreview').value = `"${chromeVersion}"`;
  document.getElementById('secChUaFullVersionListPreview').value = `"Chromium";v="${chromeVersion}", "Not-A.Brand";v="24.0.0.0", "Google Chrome";v="${chromeVersion}"`;
  document.getElementById('secChUaPlatformVersionPreview').value = `"${platformVersion}"`;
  document.getElementById('secChUaModelPreview').value = `"${deviceModel}"`;
  document.getElementById('secChUaFormFactorsPreview').value = secChUaFormFactors;
}


// === HEADER TAMBAHAN LOGIC ===
const addHeaderBtn = document.getElementById('add-header');
const headerList = document.getElementById('headerList');

// Tambah header baru
addHeaderBtn.addEventListener('click', () => {
  const newItem = document.createElement('div');
  newItem.className = 'header-item';
  newItem.innerHTML = `
    <input type="text" class="header-name" placeholder="Nama Header">
    <input type="text" class="header-value" placeholder="Nilai Header">
    <button class="remove-btn">Hapus</button>
  `;
  headerList.appendChild(newItem);
  
  // Event hapus untuk item baru
  newItem.querySelector('.remove-btn').addEventListener('click', () => {
    newItem.remove();
  });
});

// Hapus header yang ada
document.querySelectorAll('.remove-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    if (headerList.children.length > 1) {
      this.parentElement.remove();
    } else {
      alert('Setidaknya ada satu header tambahan!');
    }
  });
});


// === SIMPAN SETTING ===
document.getElementById('saveBtn').addEventListener('click', () => {
  let settings = {};

  // Ambil data dari mode aktif
  if (selectModeBtn.classList.contains('active')) {
    settings = {
      mode: 'select',
      deviceType: document.getElementById('deviceType').value,
      chromeVersion: document.getElementById('chromeVersion').value,
      deviceModel: document.getElementById('deviceModel').value,
      platformVersion: document.getElementById('platformVersion').value,
      headers: {
        userAgent: document.getElementById('uaPreview').value,
        secChUa: document.getElementById('secChUaPreview').value,
        secChUaPlatform: document.getElementById('secChUaPlatformPreview').value,
        secChUaMobile: document.getElementById('secChUaMobilePreview').value,
        secChUaFullVersion: document.getElementById('secChUaFullVersionPreview').value,
        secChUaFullVersionList: document.getElementById('secChUaFullVersionListPreview').value,
        secChUaPlatformVersion: document.getElementById('secChUaPlatformVersionPreview').value,
        secChUaModel: document.getElementById('secChUaModelPreview').value,
        secChUaFormFactors: document.getElementById('secChUaFormFactorsPreview').value
      }
    };
  } else {
    settings = {
      mode: 'manual',
      headers: {
        userAgent: document.getElementById('manualUa').value,
        secChUa: document.getElementById('manualSecChUa').value,
        secChUaPlatform: document.getElementById('manualSecChUaPlatform').value,
        secChUaMobile: document.getElementById('manualSecChUaMobile').value,
        secChUaFullVersion: document.getElementById('manualSecChUaFullVersion').value,
        secChUaFullVersionList: document.getElementById('manualSecChUaFullVersionList').value,
        secChUaPlatformVersion: document.getElementById('manualSecChUaPlatformVersion').value,
        secChUaModel: document.getElementById('manualSecChUaModel').value,
        secChUaFormFactors: document.getElementById('manualSecChUaFormFactors').value
      }
    };
  }

  // Tambahkan header tambahan
  settings.extraHeaders = [];
  document.querySelectorAll('.header-item').forEach(item => {
    const name = item.querySelector('.header-name').value.trim();
    const value = item.querySelector('.header-value').value.trim();
    if (name) settings.extraHeaders.push({name, value});
  });

  // Simpan ke storage
  if (typeof browser !== 'undefined' && browser.storage) {
    browser.storage.local.set({httpHeaders: settings}, () => {
      alert('Pengaturan berhasil disimpan!');
    });
  } else {
    alert('Browser tidak mendukung storage lokal!');
  }
});


// Jalankan generate header saat pertama kali buka
generateHeaders();

// Jalankan generate header setiap ada perubahan
selectElements.forEach(item => {
  item.select.addEventListener('change', generateHeaders);
  item.input.addEventListener('input', generateHeaders);
});
