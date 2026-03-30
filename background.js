// === INISIALISASI ===
let headerSettings = {};

// Muat pengaturan saat ekstensi aktif
browser.storage.local.get('httpHeaders', (result) => {
  if (result.httpHeaders) {
    headerSettings = result.httpHeaders;
  }
});

// Perbarui pengaturan jika ada perubahan
browser.storage.onChanged.addListener((changes) => {
  if (changes.httpHeaders) {
    headerSettings = changes.httpHeaders.newValue;
  }
});


// === MODIFIKASI HEADER HTTP ===
browser.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    // Hapus header default yang akan diganti
    const headersToReplace = [
      'User-Agent',
      'Sec-CH-UA',
      'Sec-CH-UA-Platform',
      'Sec-CH-UA-Mobile',
      'Sec-CH-UA-Full-Version',
      'Sec-CH-UA-Full-Version-List',
      'Sec-CH-UA-Platform-Version',
      'Sec-CH-UA-Model',
      'Sec-CH-UA-Form-Factors'
    ];

    details.requestHeaders = details.requestHeaders.filter(header => {
      const headerName = header.name.toLowerCase();
      return !headersToReplace.some(h => h.toLowerCase() === headerName);
    });

    // Tambahkan header dari pengaturan
    if (headerSettings.mode === 'select' || headerSettings.mode === 'manual') {
      // Tambahkan User-Agent
      details.requestHeaders.push({
        name: 'User-Agent',
        value: headerSettings.headers.userAgent || headerSettings.headers.ua
      });

      // Tambahkan Sec-CH-UA Headers
      details.requestHeaders.push({
        name: 'Sec-CH-UA',
        value: headerSettings.headers.secChUa
      });

      details.requestHeaders.push({
        name: 'Sec-CH-UA-Platform',
        value: headerSettings.headers.secChUaPlatform
      });

      details.requestHeaders.push({
        name: 'Sec-CH-UA-Mobile',
        value: headerSettings.headers.secChUaMobile
      });

      details.requestHeaders.push({
        name: 'Sec-CH-UA-Full-Version',
        value: headerSettings.headers.secChUaFullVersion
      });

      details.requestHeaders.push({
        name: 'Sec-CH-UA-Full-Version-List',
        value: headerSettings.headers.secChUaFullVersionList
      });

      details.requestHeaders.push({
        name: 'Sec-CH-UA-Platform-Version',
        value: headerSettings.headers.secChUaPlatformVersion
      });

      details.requestHeaders.push({
        name: 'Sec-CH-UA-Model',
        value: headerSettings.headers.secChUaModel
      });

      details.requestHeaders.push({
        name: 'Sec-CH-UA-Form-Factors',
        value: headerSettings.headers.secChUaFormFactors
      });
    }

    // Tambahkan header tambahan dari pengguna
    if (headerSettings.extraHeaders && headerSettings.extraHeaders.length > 0) {
      headerSettings.extraHeaders.forEach(extra => {
        if (extra.name && extra.value) {
          details.requestHeaders.push({
            name: extra.name,
            value: extra.value
          });
        }
      });
    }

    return { requestHeaders: details.requestHeaders };
  },
  { urls: ['<all_urls>'] }, // Terapkan ke semua situs
  ['blocking', 'requestHeaders', 'extraHeaders'] // Izin yang dibutuhkan
);


// === NOTIFIKASI SAAT EKSTENSI DIHAPUS/DIUPDATE ===
browser.runtime.setUninstallURL('https://example.com/feedback', () => {
  if (browser.runtime.lastError) {
    console.log('Gagal set uninstall URL:', browser.runtime.lastError);
  }
});

// Log status saat ekstensi aktif
console.log('HTTP Header Modifier Aktif');
