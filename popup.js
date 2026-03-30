// =============================
// popup.js (FINAL FIX - MATCH HTML)
// =============================

// ===== ELEMENTS =====
const previewEl = document.getElementById("preview");

const uaEl = document.getElementById("ua");
const chPlatformEl = document.getElementById("chPlatform");
const chMobileEl = document.getElementById("chMobile");
const chModelEl = document.getElementById("chModel");
const chPlatformVersionEl = document.getElementById("chPlatformVersion");
const chFullVersionEl = document.getElementById("fullVersion");

// ===== HELPER =====
function val(el, fallback = "") {
  return el && el.value ? el.value.trim() : fallback;
}

// ===== AMBIL MAJOR DARI UA =====
function extractChromeMajor(ua) {
  if (!ua) return "146"; // fallback default
  const match = ua.match(/Chrome\/(\d+)/i);
  return match ? match[1] : "146";
}

// ===== GENERATE DATA =====
function generateData() {
  const ua = val(uaEl);
  const fullVersion = val(chFullVersionEl, "146.0.7680.153");
  const mobile = val(chMobileEl, "?0");

  const major = extractChromeMajor(ua);

  return {
    ua,

    // ambil dari UA
    sec_ch_ua: `"Chromium";v="${major}", "Not-A.Brand";v="24", "Google Chrome";v="${major}"`,

    mobile,
    platform: val(chPlatformEl),

    // manual
    fullVersion,

    // auto dari fullVersion
    fullList: `"Chromium";v="${fullVersion}", "Not-A.Brand";v="24.0.0.0", "Google Chrome";v="${fullVersion}"`,

    platformVersion: val(chPlatformVersionEl),
    model: val(chModelEl),

    // auto dari mobile
    formFactors: mobile === "?1" ? "Mobile" : "Dekstop"
  };
}

// ===== PREVIEW =====
function updatePreview() {
  try {
    const data = generateData();
    previewEl.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    previewEl.textContent = "Error: " + err.message;
  }
}

// ===== EVENTS =====
[
  uaEl,
  chPlatformEl,
  chMobileEl,
  chModelEl,
  chPlatformVersionEl,
  chFullVersionEl
].forEach(el => {
  if (el) el.addEventListener("input", updatePreview);
});

// ===== INIT =====
updatePreview();

// ===== APPLY =====
const applyBtn = document.getElementById("apply");

if (applyBtn) {
  applyBtn.addEventListener("click", async () => {
    try {
      const data = generateData();

      await chrome.storage.local.set({
        profile: data
      });

      alert("Applied!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  });
}