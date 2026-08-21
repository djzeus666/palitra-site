/**
 * Правки админки: сначала сервер (/api/cms), иначе localStorage.
 */
(function () {
  var KEY = "rp_cms_v1";
  var APPS = "rp_apps_v1";
  var appsCache = [];

  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function merge(base, over) {
    if (over == null) return base;
    if (Array.isArray(over)) return over.slice();
    if (typeof over !== "object") return over;
    var out = Object.assign({}, base || {});
    Object.keys(over).forEach(function (k) {
      var bv = base ? base[k] : undefined;
      var ov = over[k];
      if (Array.isArray(ov)) out[k] = ov.slice();
      else if (ov && typeof ov === "object") out[k] = merge(bv || {}, ov);
      else out[k] = ov;
    });
    return out;
  }

  window.RP_DEFAULTS = {
    config: clone(window.RP_CONFIG),
    data: clone(window.RP_DATA),
  };

  function applySaved(saved) {
    if (!saved) return;
    if (saved.config) window.RP_CONFIG = merge(clone(window.RP_DEFAULTS.config), saved.config);
    if (saved.data) window.RP_DATA = merge(clone(window.RP_DEFAULTS.data), saved.data);
  }

  function payload() {
    return {
      config: window.RP_CONFIG,
      data: window.RP_DATA,
    };
  }

  function pin() {
    try {
      var s = sessionStorage.getItem("rp_admin_pin");
      if (s) return s;
    } catch (e) {}
    return (window.RP_CONFIG && window.RP_CONFIG.admin && window.RP_CONFIG.admin.pin) || "palitra";
  }

  function loadLocal() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      applySaved(JSON.parse(raw));
    } catch (err) {
      console.warn("CMS local load failed", err);
    }
  }

  function saveLocal() {
    localStorage.setItem(KEY, JSON.stringify(payload()));
  }

  function api(path, opts) {
    return fetch(path, opts).then(function (res) {
      if (!res.ok) {
        var err = new Error("api " + res.status);
        err.status = res.status;
        throw err;
      }
      if (res.status === 204) return null;
      return res.json();
    });
  }

  function loadRemote() {
    return api("/api/cms", { cache: "no-store" }).then(function (saved) {
      applySaved(saved);
      saveLocal();
      return "server";
    });
  }

  function loadAppsRemote() {
    return api("/api/apps", { cache: "no-store" })
      .then(function (list) {
        appsCache = Array.isArray(list) ? list : [];
        localStorage.setItem(APPS, JSON.stringify(appsCache));
      })
      .catch(function () {
        try {
          appsCache = JSON.parse(localStorage.getItem(APPS) || "[]");
        } catch (e) {
          appsCache = [];
        }
      });
  }

  var ready = loadRemote()
    .catch(function () {
      loadLocal();
      if (!localStorage.getItem(KEY)) return "local";
      return save().then(function (r) {
        return r.remote ? "migrated" : "local";
      });
    })
    .then(function (source) {
      return loadAppsRemote().then(function () {
        return source;
      });
    });

  function save() {
    saveLocal();
    return api("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pin: pin(),
        config: window.RP_CONFIG,
        data: window.RP_DATA,
      }),
    })
      .then(function () {
        try {
          if (window.RP_CONFIG && window.RP_CONFIG.admin && window.RP_CONFIG.admin.pin) {
            sessionStorage.setItem("rp_admin_pin", window.RP_CONFIG.admin.pin);
          }
        } catch (e) {}
        return { remote: true };
      })
      .catch(function () {
        return { remote: false };
      });
  }

  function reset() {
    localStorage.removeItem(KEY);
    window.RP_CONFIG = clone(window.RP_DEFAULTS.config);
    window.RP_DATA = clone(window.RP_DEFAULTS.data);
    return api("/api/cms/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pin() }),
    }).catch(function () {});
  }

  function dump() {
    return JSON.stringify(payload(), null, 2);
  }

  function restore(json) {
    var saved = typeof json === "string" ? JSON.parse(json) : json;
    applySaved(saved);
    return save();
  }

  function getApps() {
    return appsCache.slice();
  }

  function addApp(entry) {
    appsCache.unshift(entry);
    localStorage.setItem(APPS, JSON.stringify(appsCache));
    return api("/api/apps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pin(), entry: entry }),
    }).catch(function () {});
  }

  function clearApps() {
    appsCache = [];
    localStorage.removeItem(APPS);
    return api("/api/apps/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pin() }),
    }).catch(function () {});
  }

  window.RP_STORE = {
    ready: ready,
    whenReady: function (cb) {
      ready.then(cb);
    },
    load: loadLocal,
    save: save,
    reset: reset,
    dump: dump,
    restore: restore,
    clone: clone,
    getApps: getApps,
    addApp: addApp,
    clearApps: clearApps,
  };
})();
