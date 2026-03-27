(() => {
  const ACCESS_CODES = [
    "Q7M4X2P",
    "N8K1V5R",
    "T3B9L6W",
    "H2D7S4Y",
    "P6J8C1N",
    "R5F2Z9K",
    "V1G7M3T",
    "X4Q8H6B",
    "L9W2P5D",
    "C3Y7R1F",
  ];

  const STORAGE_KEY = "kneeAccessGranted";
  const CODE_KEY = "kneeAccessCode";

  function normalize(v) {
    return String(v || "").trim().toUpperCase();
  }

  async function getIP() {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data && data.ip ? data.ip : "unknown";
    } catch (e) {
      return "unknown";
    }
  }

  async function sendWebhook(code) {
    if (typeof window.kneeNotifyAccess !== "function") return;
    const ip = await getIP();
    await window.kneeNotifyAccess({
      source: "Game page",
      code: code,
      ip: ip,
      page: window.location.href,
      userAgent: navigator.userAgent,
    });
  }

  const alreadyGranted = localStorage.getItem(STORAGE_KEY) === "1";
  if (alreadyGranted) return;

  const entered = normalize(prompt("Enter 7-character access code"));
  if (!ACCESS_CODES.includes(entered)) {
    alert("Invalid access code.");
    window.location.replace("../../index.html");
    return;
  }

  localStorage.setItem(STORAGE_KEY, "1");
  localStorage.setItem(CODE_KEY, entered);
  sendWebhook(entered);
})();
