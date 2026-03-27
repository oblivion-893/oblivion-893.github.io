/**
 * Discord webhook: rich embed for access events.
 * Set WEBHOOK_URL to your Discord webhook (same URL in one place for the whole site).
 */
(function () {
  var WEBHOOK_URL =
    "https://discord.com/api/webhooks/1487134608708599889/C1cpPbvaKvdhSyzXYsgBQNHPswBPAj90tdCn1mg_MM2ZKeKhxHRF63DFk6SNt8Tv10yb";

  function isConfigured() {
    return (
      WEBHOOK_URL &&
      WEBHOOK_URL.indexOf("PASTE_YOUR_WEBHOOK_URL_HERE") === -1
    );
  }

  function truncate(str, max) {
    str = String(str || "");
    return str.length <= max ? str : str.slice(0, max - 3) + "...";
  }

  /**
   * @param {{ source: string, code: string, ip?: string, page?: string, userAgent?: string }} opts
   */
  window.kneeNotifyAccess = function (opts) {
    if (!isConfigured()) return Promise.resolve();

    var source = opts.source || "unknown";
    var code = opts.code || "";
    var ip = opts.ip != null ? opts.ip : "unknown";
    var page =
      opts.page ||
      (typeof location !== "undefined" ? location.href : "");
    var ua =
      opts.userAgent ||
      (typeof navigator !== "undefined" ? navigator.userAgent : "");

    var payload = {
      username: "Site access",
      avatar_url:
        "https://cdn.discordapp.com/embed/avatars/0.png",
      embeds: [
        {
          title: "Access granted",
          description:
            "Someone entered with a valid **7-character access code** on **" +
            source +
            "**.",
          color: 0x38bdf8,
          fields: [
            {
              name: "Access code",
              value: "`" + truncate(code, 100) + "`",
              inline: true,
            },
            {
              name: "IP (approx.)",
              value: truncate(ip, 1024),
              inline: true,
            },
            {
              name: "Page",
              value: truncate(page, 1024),
            },
            {
              name: "User-Agent",
              value: truncate(ua, 1024),
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "oblivion-893.github.io",
          },
        },
      ],
    };

    return fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(function () {});
  };
})();
