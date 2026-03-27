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
    "__",
    "C3Y7R1F"
  ];

  const STORAGE_KEY = "kneeAccessGranted";
  const CODE_KEY = "kneeAccessCode";
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1487134608708599889/C1cpPbvaKvdhSyzXYsgBQNHPswBPAj90tdCn1mg_MM2ZKeKhxHRF63DFk6SNt8Tv10yb";

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
    if (!WEBHOOK_URL || WEBHOOK_URL.includes("https://discord.com/api/webhooks/1487134608708599889/C1cpPbvaKvdhSyzXYsgBQNHPswBPAj90tdCn1mg_MM2ZKeKhxHRF63DFk6SNt8Tv10yb")) return;
    const ip = await getIP();
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content:
            "Access granted on game page\n" +
            "Code: " + code + "\n" +
            "IP: " + ip + "\n" +
            "Page: " + window.location.href + "\n" +
            "User-Agent: " + navigator.userAgent
        })
      });
    } catch (e) {
      // Do nothing; auth should still work.
    }
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
