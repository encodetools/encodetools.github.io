// =============================
// background.js (CROSS BROWSER)
// =============================

let currentProfile = {};

// load awal
chrome.storage.local.get("profile", (data) => {
  if (data.profile) currentProfile = data.profile;
});

// update kalau berubah
chrome.storage.onChanged.addListener((changes) => {
  if (changes.profile) {
    currentProfile = changes.profile.newValue;
  }
});

// ===== MODIFY HEADERS =====
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {

    if (!currentProfile || !currentProfile.ua) return;

    let headers = details.requestHeaders;

    function setHeader(name, value) {
      const index = headers.findIndex(h => h.name.toLowerCase() === name.toLowerCase());
      if (index >= 0) {
        headers[index].value = value;
      } else {
        headers.push({ name, value });
      }
    }

    // ===== UA =====
    setHeader("User-Agent", currentProfile.ua);

    // ===== CLIENT HINTS =====
    setHeader("Sec-CH-UA", currentProfile.sec_ch_ua);
    setHeader("Sec-CH-UA-Mobile", currentProfile.mobile);
    setHeader("Sec-CH-UA-Platform", `"${currentProfile.platform}"`);
    setHeader("Sec-CH-UA-Full-Version", `"${currentProfile.fullVersion}"`);
    setHeader("Sec-CH-UA-Full-Version-List", currentProfile.fullList);

    if (currentProfile.platformVersion) {
      setHeader("Sec-CH-UA-Platform-Version", `"${currentProfile.platformVersion}"`);
    }

    if (currentProfile.model) {
      setHeader("Sec-CH-UA-Model", `"${currentProfile.model}"`);
    }

    if (currentProfile.formFactors) {
      setHeader("Sec-CH-UA-Form-Factors", currentProfile.formFactors);
    }

    return { requestHeaders: headers };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);