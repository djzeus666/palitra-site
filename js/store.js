/**
 * Сохранение правок админки в браузере.
 * Публичные страницы подхватывают сохранённые данные при загрузке.
 */
(function () {
  var KEY = "rp_cms_v1";
  var APPS = "rp_apps_v1";

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

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (saved.config) window.RP_CONFIG = merge(window.RP_CONFIG, saved.config);
      if (saved.data) window.RP_DATA = merge(window.RP_DATA, saved.data);
    } catch (err) {
      console.warn("CMS load failed", err);
    }
  }

  function save() {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        config: window.RP_CONFIG,
        data: window.RP_DATA,
      })
    );
  }

  function reset() {
    localStorage.removeItem(KEY);
    window.RP_CONFIG = clone(window.RP_DEFAULTS.config);
    window.RP_DATA = clone(window.RP_DEFAULTS.data);
  }

  function dump() {
    return JSON.stringify({ config: window.RP_CONFIG, data: window.RP_DATA }, null, 2);
  }

  function restore(json) {
    var saved = typeof json === "string" ? JSON.parse(json) : json;
    if (saved.config) window.RP_CONFIG = merge(clone(window.RP_DEFAULTS.config), saved.config);
    if (saved.data) window.RP_DATA = merge(clone(window.RP_DEFAULTS.data), saved.data);
    save();
  }

  function getApps() {
    try {
      return JSON.parse(localStorage.getItem(APPS) || "[]");
    } catch (e) {
      return [];
    }
  }

  function addApp(entry) {
    var list = getApps();
    list.unshift(entry);
    localStorage.setItem(APPS, JSON.stringify(list));
  }

  function clearApps() {
    localStorage.removeItem(APPS);
  }

  window.RP_STORE = {
    load: load,
    save: save,
    reset: reset,
    dump: dump,
    restore: restore,
    clone: clone,
    getApps: getApps,
    addApp: addApp,
    clearApps: clearApps,
  };

  load();
})();
