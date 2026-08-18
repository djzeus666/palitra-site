(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getPath(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  function formatEventDate(iso, style) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    if (style === "short") {
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      return dd + "." + mm + "." + d.getFullYear();
    }
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  }

  function track(event, extra) {
    const payload = Object.assign(
      {
        event,
        page: location.pathname,
        utm_source: new URLSearchParams(location.search).get("utm_source") || "site",
      },
      extra || {}
    );
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    const id = window.RP_CONFIG && window.RP_CONFIG.analytics.ymCounter;
    if (id && window.ym) {
      window.ym(id, "reachGoal", event, extra || {});
    }
  }

  window.RP_TRACK = track;

  function applyCms() {
    const cfg = window.RP_CONFIG || {};
    const copy = cfg.copy || {};
    const ev = cfg.event || {};

    $$("[data-copy]").forEach((el) => {
      const key = el.getAttribute("data-copy");
      if (copy[key] != null && copy[key] !== "") el.textContent = copy[key];
    });

    $$("[data-copy-html]").forEach((el) => {
      const key = el.getAttribute("data-copy-html");
      const raw = copy[key];
      if (!raw) return;
      const amount = window.RP.charityPhrase();
      const fund = (cfg.charity && cfg.charity.fundName) || "";
      const fee = cfg.fees && cfg.fees.selection != null
        ? Number(cfg.fees.selection).toLocaleString("ru-RU") + " ₽"
        : "";
      el.innerHTML = esc(raw)
        .replace(/\{amount\}/g, "<strong data-charity-amount>" + esc(amount) + "</strong>")
        .replace(/\{fund\}/g, "<strong data-charity-fund>" + esc(fund) + "</strong>")
        .replace(/\{fee\}/g, esc(fee));
    });

    $$("[data-doc]").forEach((el) => {
      const key = el.getAttribute("data-doc");
      const text = cfg.docs && cfg.docs[key];
      if (!text) return;
      el.innerHTML = String(text)
        .split(/\n\s*\n/)
        .map((p) => "<p>" + esc(p) + "</p>")
        .join("");
    });

    $$("[data-organizers-line]").forEach((n) => {
      const names = (cfg.organizers || []).map((p) => p.name).filter(Boolean);
      if (names.length) n.textContent = "Организаторы: " + names.join(", ");
    });

    $$("[data-tier-cta]").forEach((el) => {
      const id = el.getAttribute("data-tier-cta");
      const tiers = (window.RP_DATA && window.RP_DATA.partnerTiers) || [];
      const t = tiers.find((x) => x.id === id);
      if (t) el.textContent = t.title + " · " + t.from;
    });

    $$("[data-cms]").forEach((el) => {
      const val = getPath(cfg, el.getAttribute("data-cms"));
      if (val != null && val !== "") el.textContent = val;
    });

    const longDate = formatEventDate(ev.start, "long");
    const shortDate = formatEventDate(ev.start, "short");
    $$("[data-event-date]").forEach((n) => {
      if (longDate) n.textContent = longDate;
    });
    $$("[data-event-date-short]").forEach((n) => {
      if (shortDate) n.textContent = shortDate;
    });
    $$("[data-event-city]").forEach((n) => {
      if (ev.city) n.textContent = ev.city;
    });
    $$("[data-event-venue]").forEach((n) => {
      if (ev.venue) n.textContent = ev.venue;
    });

    $$(".logo__sub").forEach((n) => {
      n.textContent = [ev.city, shortDate].filter(Boolean).join(" · ");
    });
    $$(".logo__mark").forEach((n) => {
      if (ev.name) n.textContent = ev.name;
    });

    const fee = cfg.fees && cfg.fees.selection;
    $$("[data-fee-start]").forEach((n) => {
      if (fee != null) n.textContent = Number(fee).toLocaleString("ru-RU") + " ₽";
    });

    const meta = document.querySelector('meta[name="description"]');
    if (meta && copy.metaDescription) meta.setAttribute("content", copy.metaDescription);
  }

  function renderBenefits() {
    const box = $("[data-benefits]");
    if (!box || !window.RP_DATA || !window.RP_DATA.benefits) return;
    box.innerHTML = window.RP_DATA.benefits
      .map((b) => `<article class="benefit"><strong>${esc(b.title)}</strong><p>${esc(b.text)}</p></article>`)
      .join("");
  }

  function renderGifts() {
    const box = $("[data-gifts]");
    if (!box || !window.RP_DATA || !window.RP_DATA.gifts) return;
    box.innerHTML = window.RP_DATA.gifts
      .map((g) => {
        const win = g.win ? " level--win" : "";
        return `<article class="level${win}"><span class="place">${esc(g.place)}</span><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p></article>`;
      })
      .join("");
  }

  function renderStages() {
    const box = $("[data-stages]");
    if (!box || !window.RP_DATA || !window.RP_DATA.stages) return;
    box.innerHTML = window.RP_DATA.stages
      .map((s) => `<article class="step"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`)
      .join("");
  }

  function renderPeople() {
    const box = $("[data-people]");
    if (!box || !window.RP_CONFIG || !window.RP_CONFIG.organizers) return;
    const name = (window.RP_CONFIG.event && window.RP_CONFIG.event.name) || "Русская Палитра";
    box.innerHTML = window.RP_CONFIG.organizers
      .map((p) => `<article class="person"><h3>${esc(p.name)}</h3><p>${esc(p.role || "Организатор")} «${esc(name)}»</p></article>`)
      .join("");
  }

  function bindMaxLinks() {
    $$("[data-max-payload]").forEach((el) => {
      const payload = el.getAttribute("data-max-payload");
      const href = window.RP.maxUrl(payload);
      if (el.tagName === "A") el.setAttribute("href", href);
      el.addEventListener("click", () => {
        const isPartner = payload.indexOf("partner") === 0;
        track(isPartner ? "click_partner" : "click_participant", { payload });
        track("max_bot_open", { payload });
      });
    });
  }

  function bindPhone() {
    $$("[data-track='phone']").forEach((el) => {
      el.addEventListener("click", () => track("phone_click"));
    });
  }

  function bindDocs() {
    $$("[data-track='document']").forEach((el) => {
      el.addEventListener("click", () =>
        track("document_download", { href: el.getAttribute("href") })
      );
    });
  }

  function roleSwitch() {
    const root = $("[data-role-switch]");
    if (!root) return;
    const hero = $(".hero");
    const buttons = $$("[data-role]", root);
    const scope = hero || root;
    const participantBind = $$("[data-for-role='participant']", scope);
    const brandBind = $$("[data-for-role='brand']", scope);

    function apply(role) {
      buttons.forEach((b) => b.classList.toggle("is-active", b.dataset.role === role));
      if (hero) hero.classList.toggle("hero--brand", role === "brand");
      participantBind.forEach((n) => {
        n.hidden = role !== "participant";
      });
      brandBind.forEach((n) => {
        n.hidden = role !== "brand";
      });
    }

    buttons.forEach((b) => {
      b.addEventListener("click", () => apply(b.dataset.role));
    });
    apply("participant");
  }

  function menu() {
    const btn = $("[data-menu]");
    const drawer = $("[data-drawer]");
    if (!btn || !drawer) return;
    btn.addEventListener("click", () => {
      const open = drawer.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  function fillCharity() {
    $$("[data-charity-amount]").forEach((n) => {
      n.textContent = window.RP.charityPhrase();
    });
    $$("[data-charity-fund]").forEach((n) => {
      n.textContent = window.RP_CONFIG.charity.fundName;
    });
  }

  function renderNominationCards(targetSel, opts) {
    const target = $(targetSel);
    if (!target || !window.RP_DATA) return;
    const cats = window.RP_DATA.categories;
    target.innerHTML = cats
      .map((c) => {
        const href = c.creative
          ? "nominacii.html#dlya-vseh"
          : "nominacii.html#" + c.slug;
        const creative = c.creative ? " card-nom--creative" : "";
        return `<a class="card-nom${creative}" href="${esc(href)}">
          <div class="card-nom__top"><span>${esc(c.index)}</span><span>${esc(c.count)} номинац.</span></div>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.teaser)}</p>
          <div class="card-nom__foot">
            <span class="card-nom__price">от ${Number(c.fromPrice).toLocaleString("ru-RU")} ₽</span>
            <span>Смотреть →</span>
          </div>
        </a>`;
      })
      .join("");
  }

  function renderPackages(targetSel, filter) {
    const target = $(targetSel);
    if (!target || !window.RP_DATA) return;
    const limit = Number(target.getAttribute("data-pack-limit") || 0);
    let list = window.RP_DATA.packages.filter((p) => !filter || filter === "all" || p.tier === filter);
    if (limit) list = list.slice(0, limit);
    target.innerHTML = list
      .map((p) => {
        const tier = p.tier === "large" ? "Крупное партнёрство" : "Доступный формат";
        const items = (p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("");
        return `<article class="card-pack" id="paket-${esc(p.slug)}">
          <p class="card-pack__tier">${tier}</p>
          <h3>${esc(p.title)}</h3>
          <p class="card-pack__price">${esc(p.priceLabel)}</p>
          <ul>${items}</ul>
          <a class="btn btn--wine" href="partneram.html#zayavka" data-pack="${esc(p.slug)}">${esc((window.RP_CONFIG.copy && window.RP_CONFIG.copy.packPickCta) || "Выбрать пакет")}</a>
        </article>`;
      })
      .join("");
    $$("[data-pack]", target).forEach((a) => {
      a.addEventListener("click", () => {
        sessionStorage.setItem("rp_pack", a.getAttribute("data-pack"));
        track("click_partner", { package: a.getAttribute("data-pack") });
      });
    });
  }

  function renderFAQ() {
    const box = $("[data-faq]");
    if (!box) return;
    box.innerHTML = window.RP_DATA.faq
      .map(
        (item) => `<details><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`
      )
      .join("");
  }

  function qr(el, text) {
    if (!el || !window.QRCode) return;
    el.innerHTML = "";
    window.QRCode.toString(text, { type: "svg", margin: 1, width: 132, color: { dark: "#16110e", light: "#fbf7f1" } }, (err, svg) => {
      if (err) {
        el.textContent = "QR";
        return;
      }
      el.innerHTML = svg;
    });
  }

  function fillMaxQr() {
    $$("[data-qr]").forEach((n) => {
      const payload = n.getAttribute("data-qr");
      qr(n, window.RP.maxUrl(payload));
    });
  }

  function partnerForm() {
    const form = $("[data-partner-form]");
    if (!form) return;
    const packSelect = $("[name='package']", form);
    if (packSelect) {
      window.RP_DATA.packages.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p.slug;
        opt.textContent = p.title + " — " + p.priceLabel;
        packSelect.appendChild(opt);
      });
      const saved = sessionStorage.getItem("rp_pack");
      if (saved) packSelect.value = saved;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const consent = $("[name='consent']", form);
      if (!consent.checked) {
        consent.focus();
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      if (window.RP_STORE && window.RP_STORE.addApp) {
        window.RP_STORE.addApp({
          id: Date.now(),
          createdAt: new Date().toISOString(),
          source: "partner_form",
          name: data.name || "",
          company: data.company || "",
          role: data.role || "",
          phone: data.phone || "",
          email: data.email || "",
          package: data.package || "",
          comment: data.comment || "",
          ads: !!data.ads,
        });
      }
      track("partner_form_sent", {
        package: data.package,
        payload: "partner_site",
      });
      const msg = $("[data-form-ok]");
      if (msg) msg.classList.add("is-on");
      form.reset();
      $("[name='ads']", form).checked = false;
      if (packSelect && data.package) packSelect.value = data.package;
    });
  }

  function nominationPage() {
    const root = $("[data-nomination-page]");
    if (!root) return;
    const params = new URLSearchParams(location.search);
    const slug = params.get("slug") || "futurizm";
    const nom = window.RP_DATA.nominations.find((n) => n.slug === slug);
    if (!nom) return;
    const cat = window.RP_DATA.categories.find((c) => c.slug === nom.category);
    const payload = nom.creative ? "creative_site" : "nomination_" + nom.slug;

    $("[data-nom-cat]").textContent = cat ? cat.title : "";
    $("[data-nom-cat]").setAttribute("href", "nominacii.html#" + nom.category);
    $("[data-nom-title]").textContent = nom.title;
    $("[data-nom-hero]").textContent = nom.hero;
    $("[data-nom-fits]").textContent = nom.fits;
    $("[data-nom-prepare]").textContent = nom.prepare;
    $("[data-nom-onsite]").textContent = nom.onsite;
    $("[data-nom-price]").textContent = nom.price.toLocaleString("ru-RU") + " ₽";
    $("[data-nom-deadline]").textContent = nom.deadline;
    $("[data-nom-model]").textContent = nom.requirements.model;
    $("[data-nom-costume]").textContent = nom.requirements.costume;
    $("[data-nom-materials]").textContent = nom.requirements.materials;

    const fillList = (sel, arr) => {
      const el = $(sel);
      if (!el) return;
      el.innerHTML = arr.map((x) => `<li>${esc(x)}</li>`).join("");
    };
    fillList("[data-nom-allowed]", nom.allowed);
    fillList("[data-nom-forbidden]", nom.forbidden);
    fillList("[data-nom-criteria]", nom.criteria);
    fillList("[data-nom-ok]", nom.okExamples);
    fillList("[data-nom-bad]", nom.badExamples);

    $$("[data-max-payload]").forEach((a) => a.setAttribute("data-max-payload", payload));
    $$("[data-qr]").forEach((n) => n.setAttribute("data-qr", payload));
    document.title = nom.title + " — Русская Палитра, Екатеринбург";
  }

  function categoryPage() {
    const root = $("[data-categories-page]");
    if (!root) return;
    const hash = (location.hash || "").replace("#", "");
    window.RP_DATA.categories.forEach((cat) => {
      const section = document.createElement("section");
      section.className = "section";
      section.id = cat.slug;
      const noms = window.RP_DATA.nominations.filter((n) => n.category === cat.slug);
      const cards = noms
        .map((n) => {
          const href = "nominaciya.html?slug=" + encodeURIComponent(n.slug);
          return `<a class="card-nom" href="${esc(href)}">
            <div class="card-nom__top"><span>${esc(cat.title)}</span><span>${Number(n.price).toLocaleString("ru-RU")} ₽</span></div>
            <h3>${esc(n.title)}</h3>
            <p>${esc(n.hero)}</p>
            <div class="card-nom__foot"><span>Условия и регистрация</span><span>→</span></div>
          </a>`;
        })
        .join("");
      section.innerHTML = `<div class="wrap">
        <p class="section__index">${esc(cat.index)} · направление</p>
        <h2 class="section__title">${esc(cat.title)}</h2>
        <p class="section__lead">${esc(cat.teaser)}. Выберите номинацию — внутри условия, критерии и регистрация в MAX.</p>
        <div class="grid-cards">${cards}</div>
      </div>`;
      root.appendChild(section);
    });
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ block: "start" });
    }
  }

  function selectPack(slug) {
    if (!slug) return;
    sessionStorage.setItem("rp_pack", slug);
    const sel = $("[data-partner-form] [name='package']");
    if (sel) sel.value = slug;
    track("click_partner", { package: slug });
  }

  function fillPhoneLinks() {
    const href = window.RP_CONFIG.contacts.phoneHref;
    const phone = window.RP_CONFIG.contacts.phone;
    $$("[data-phone-link]").forEach((el) => {
      if (!href) {
        el.hidden = true;
        return;
      }
      el.hidden = false;
      el.setAttribute("href", href);
      el.textContent = phone ? "Позвонить · " + phone : "Позвонить";
    });
  }

  function partnerJourney() {
    const page = $("[data-partner-page]");
    if (!page) return;
    const tiers = window.RP_DATA.partnerTiers || [];
    const budget = $("[data-budget-grid]");
    const list = $("[data-format-list]");
    const details = $("[data-pack-details]");
    const title = $("[data-format-title]");
    const lead = $("[data-format-lead]");

    if (budget) {
      budget.innerHTML = tiers
        .map((t) => {
          const href = t.id === "large" ? "#krupnoe" : "#dostupnye";
          const wine = t.id === "large" ? " budget-card--wine" : "";
          return `<a class="budget-card${wine}" href="${href}" data-budget="${esc(t.id)}">
            <p class="budget-card__from">${esc(t.from)}</p>
            <h2>${esc(t.title)}</h2>
            <p class="budget-card__contains">${esc(t.contains)}</p>
            <p>${esc(t.message)}</p>
            <span class="budget-card__go">Смотреть форматы →</span>
          </a>`;
        })
        .join("");
    }

    if (list) {
      list.innerHTML = window.RP_DATA.packages
        .map((p) => {
          const tierLabel = p.tier === "large" ? "Крупное" : "Доступный формат";
          return `<a class="card-nom" href="#paket-${esc(p.slug)}" data-format-item data-tier="${esc(p.tier)}" data-pack="${esc(p.slug)}">
            <div class="card-nom__top"><span>${tierLabel}</span><span>${esc(p.scene)}</span></div>
            <h3>${esc(p.title)}</h3>
            <p>${esc((p.highlights && p.highlights[0]) || "")}</p>
            <div class="card-nom__foot"><span class="card-nom__price">${esc(p.priceLabel)}</span><span>Состав →</span></div>
          </a>`;
        })
        .join("");
    }

    if (details) {
      details.innerHTML = window.RP_DATA.packages
        .map((p) => {
          const tierLabel = p.tier === "large" ? "Крупное партнёрство" : "Доступный формат";
          const items = (p.items || p.highlights).map((x) => `<li>${esc(x)}</li>`).join("");
          return `<article class="pack-detail" id="paket-${esc(p.slug)}" data-detail data-tier="${esc(p.tier)}" data-slug="${esc(p.slug)}">
            <p class="card-pack__tier">${tierLabel}</p>
            <h2>${esc(p.title)}</h2>
            <p class="pack-detail__price">${esc(p.priceLabel)}</p>
            <ul>${items}</ul>
            <div class="btn-row">
              <a class="btn btn--wine" href="#zayavka" data-pack="${esc(p.slug)}">${esc((window.RP_CONFIG.copy && window.RP_CONFIG.copy.partnerCta) || "Оставить заявку")}</a>
              <a class="btn btn--ghost" data-max-payload="partner_site" href="#">${esc((window.RP_CONFIG.copy && window.RP_CONFIG.copy.partnerFormMax) || "Написать в MAX")}</a>
              <a class="btn btn--ghost" href="#zayavka" data-pack="${esc(p.slug)}" data-call>${esc((window.RP_CONFIG.copy && window.RP_CONFIG.copy.partnerCallCta) || "Заказать звонок")}</a>
            </div>
          </article>`;
        })
        .join("");
    }

    let lastTier = "all";
    let lastPack = "";

    function apply() {
      const hash = (location.hash || "").replace("#", "");
      if (hash === "krupnoe") {
        lastTier = "large";
        lastPack = "";
      } else if (hash === "dostupnye") {
        lastTier = "access";
        lastPack = "";
      } else if (hash.indexOf("paket-") === 0) {
        lastPack = hash.slice(6);
        const found = window.RP_DATA.packages.find((p) => p.slug === lastPack);
        if (found) lastTier = found.tier;
      } else if (hash === "byudzhet") {
        lastTier = "all";
        lastPack = "";
      }
      const tier = lastTier;
      const pack = lastPack;
      const meta = tiers.find((t) => t.id === tier);
      if (title) title.textContent = meta ? meta.title : "Список форматов";
      if (lead) {
        lead.textContent = meta
          ? meta.message + " Откройте карточку — ниже полный состав."
          : "Сначала выберите бюджет: список сузится до подходящих форматов.";
      }
      $$("[data-budget]").forEach((el) => {
        el.classList.toggle("is-active", el.dataset.budget === tier);
      });
      $$("[data-format-item]").forEach((el) => {
        el.hidden = tier !== "all" && el.dataset.tier !== tier;
      });
      $$("[data-detail]").forEach((el) => {
        const match = tier === "all" || el.dataset.tier === tier;
        el.hidden = !match;
        el.classList.toggle("is-current", !!(pack && el.dataset.slug === pack));
        el.classList.toggle("is-dim", !!(pack && match && el.dataset.slug !== pack));
      });
    }

    page.addEventListener("click", (e) => {
      const packBtn = e.target.closest("[data-pack]");
      if (packBtn && packBtn.getAttribute("data-pack")) {
        selectPack(packBtn.getAttribute("data-pack"));
        if (packBtn.hasAttribute("data-call")) {
          const phone = $("[data-partner-form] [name='phone']");
          if (phone) setTimeout(() => phone.focus(), 50);
        }
      }
    });

    window.addEventListener("hashchange", () => {
      apply();
      if (location.hash === "#krupnoe" || location.hash === "#dostupnye") {
        const el = document.getElementById("formaty");
        if (el) el.scrollIntoView();
      }
    });
    apply();
  }

  function extras() {
    const box = $("[data-extras]");
    if (!box) return;
    box.innerHTML = window.RP_DATA.extras
      .map(
        (e) =>
          `<article class="card-pack"><p class="card-pack__tier">Доп. опция</p><h3>${esc(e.title)}</h3><p class="card-pack__price">${esc(e.priceLabel)}</p>${e.note ? `<p>${esc(e.note)}</p>` : ""}<a class="btn btn--ghost" href="#zayavka">${esc((window.RP_CONFIG.copy && window.RP_CONFIG.copy.extraAddCta) || "Добавить к заявке")}</a></article>`
      )
      .join("");
  }

  applyCms();
  menu();
  fillCharity();
  roleSwitch();
  renderBenefits();
  renderGifts();
  renderStages();
  renderPeople();
  renderNominationCards("[data-nom-grid]");
  renderPackages("[data-pack-grid]", "all");
  renderFAQ();
  nominationPage();
  categoryPage();
  extras();
  partnerJourney();
  partnerForm();
  fillPhoneLinks();
  bindMaxLinks();
  bindPhone();
  bindDocs();

  const packFilter = $("[data-pack-filter]");
  if (packFilter) {
    $$("button", packFilter).forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("button", packFilter).forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        renderPackages("[data-pack-grid]", btn.dataset.filter);
        bindMaxLinks();
      });
    });
  }

  if (window.QRCode) fillMaxQr();
  else {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js";
    s.onload = fillMaxQr;
    document.head.appendChild(s);
  }
})();
