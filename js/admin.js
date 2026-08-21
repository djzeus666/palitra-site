(function () {
  var SESSION = "rp_admin_ok";
  var $ = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  var $$ = function (sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  };

  var COPY_GROUPS = [
    {
      title: "Шапка и кнопки",
      keys: {
        navHome: "Меню: Главная",
        navNoms: "Меню: Направления",
        navPartners: "Меню: Партнёрам",
        navFaq: "Меню: Вопросы",
        navBecomePartner: "Меню: Стать партнёром",
        headerCta: "Шапка: Участвовать",
        partnerCta: "Шапка партнёрам / заявка",
        ctaChooseNom: "Выбрать номинацию",
        ctaBecomePartner: "Стать партнёром",
        ctaHowFee: "Как устроен взнос",
        ctaPacks: "Сетка пакетов",
        ctaDoc: "Положение о конкурсе",
        ctaMaxBot: "MAX-бот",
        ctaPartnerForm: "Заявка партнёра",
        packPickCta: "Выбрать пакет",
        extraAddCta: "Добавить к заявке",
        partnerCallCta: "Заказать звонок",
        partnerFormSubmit: "Отправить заявку",
        partnerFormMax: "Написать в MAX",
        partnerCtaMax: "MAX-бот партнёра",
        allCtaOpen: "Открыть творческие номинации",
        allCtaMax: "Регистрация в MAX",
        nomsCtaList: "К номинациям",
        nomsCtaMax: "Регистрация в MAX (страница направлений)",
        nomsFinalHome: "На главную",
        nomMaxCta: "Открыть MAX-бот (карточка номинации)",
        nomBackCta: "К другим номинациям",
        stepsCtaProgram: "Запросить программу в MAX",
        packCtaChoose: "Выбрать бюджет и пакет",
      },
    },
    {
      title: "Главная: герой и взнос",
      keys: {
        heroKicker: "Герой: надзаголовок",
        heroTitle: "Герой: заголовок",
        heroSub: "Герой: подзаголовок",
        badgeFee: "Бейдж взноса",
        badgeCharity: "Бейдж помощи детям",
        roleParticipant: "Переключатель: участник",
        roleBrand: "Переключатель: бренд",
        prizeKicker: "Карточка приза: надзаголовок",
        prizeTitle: "Карточка приза: заголовок",
        prizeText: "Карточка приза: текст",
        brandKicker: "Карточка бренда: надзаголовок",
        brandTitle: "Карточка бренда: заголовок",
        brandText: "Карточка бренда: текст",
        entryIndex: "Взнос: номер блока",
        entryTitle: "Взнос: заголовок",
        entryBody: "Взнос: текст ({amount} и {fund} подставятся сами)",
        entryPlaqueLabel: "Взнос: подпись таблички",
        entryPlaque: "Взнос: табличка",
        entryNote: "Взнос: юридическая сноска",
        matryoshkaHint: "Матрёшка: подпись",
        matryoshkaCore: "Матрёшка: центр",
      },
    },
    {
      title: "Главная: блоки",
      keys: {
        whyIndex: "Почему: номер",
        whyTitle: "Почему: заголовок",
        whyLead: "Почему: лид",
        allIndex: "Для всех: номер",
        allTitle: "Для всех: заголовок",
        allLead: "Для всех: лид",
        nomIndex: "Направления: номер",
        nomTitle: "Направления: заголовок",
        nomLead: "Направления: лид",
        giftIndex: "Призы: номер",
        giftTitle: "Призы: заголовок",
        stepsIndex: "Этапы: номер",
        stepsTitle: "Этапы: заголовок",
        juryIndex: "Организаторы: номер",
        juryTitle: "Организаторы: заголовок",
        juryLead: "Организаторы: лид",
        partnerIndex: "Партнёрам на главной: номер",
        partnerTitle: "Партнёрам на главной: заголовок",
        partnerLead: "Партнёрам на главной: лид",
        contactsIndex: "Контакты: номер",
        contactsTitle: "Контакты: заголовок",
        contactsLead: "Контакты: лид",
        faqIndex: "FAQ: номер",
        faqTitle: "FAQ: заголовок",
        finalIndex: "Финал: номер",
        finalTitle: "Финал: заголовок",
        finalLead: "Финал: лид",
        qrCaption: "Подпись QR",
        metaDescription: "Meta description (SEO)",
      },
    },
    {
      title: "Страница направлений",
      keys: {
        nomsKicker: "Надзаголовок",
        nomsPageTitle: "Заголовок",
        nomsPageSub: "Подзаголовок",
        nomsFinalIndex: "Нижний блок: номер",
        nomsFinalTitle: "Нижний блок: заголовок",
        nomsFinalLead: "Нижний блок: лид",
      },
    },
    {
      title: "Страница партнёрам",
      keys: {
        partnerPageKicker: "Надзаголовок",
        partnerPageTitle: "Заголовок",
        partnerPageSub: "Подзаголовок",
        partnerBudgetIndex: "Бюджет: номер",
        partnerBudgetTitle: "Бюджет: заголовок",
        partnerBudgetLead: "Бюджет: лид",
        partnerFormatsIndex: "Форматы: номер",
        partnerCardsIndex: "Карточки: номер",
        partnerCardsTitle: "Карточки: заголовок",
        partnerExtrasTitle: "Доп. опции: заголовок",
        partnerExtrasLead: "Доп. опции: лид",
        partnerFormIndex: "Форма: номер",
        partnerFormTitle: "Форма: заголовок",
        partnerFormLead: "Форма: лид",
        partnerFormOk: "Сообщение после отправки",
      },
    },
    {
      title: "Карточка номинации (общие подписи)",
      keys: {
        nomCardKicker: "Надзаголовок",
        nomJuryMark: "Метка жюри",
        nomFitsTitle: "Кому подходит",
        nomPrepareTitle: "Заранее",
        nomOnsiteTitle: "На площадке",
        nomAllowedTitle: "Разрешено",
        nomForbiddenTitle: "Запрещено",
        nomReqTitle: "Требования",
        nomReqModel: "Модель",
        nomReqCostume: "Костюм",
        nomReqMaterials: "Материалы",
        nomCriteriaTitle: "Критерии",
        nomCriteriaLead: "Критерии: лид",
        nomExamplesTitle: "Примеры",
        nomOkTitle: "Допустимо",
        nomBadTitle: "Недопустимо",
        nomPriceIndex: "Цена: номер",
        nomPriceLead: "Цена: лид",
        nomMaxTitle: "MAX: заголовок",
        nomMaxLead: "MAX: лид",
      },
    },
  ];

  var LONG_COPY = {
    heroSub: 1, prizeText: 1, brandText: 1, entryBody: 1, entryPlaque: 1, entryNote: 1,
    whyLead: 1, allLead: 1, nomLead: 1, juryLead: 1, partnerLead: 1, contactsLead: 1,
    finalLead: 1, metaDescription: 1, nomsPageSub: 1, nomsFinalLead: 1,
    partnerPageSub: 1, partnerBudgetLead: 1, partnerExtrasLead: 1, partnerFormLead: 1,
    nomCriteriaLead: 1, nomMaxLead: 1, nomPriceLead: 1,
  };

  var RU = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
    и: "i", й: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };

  var nomIndex = 0;
  var packIndex = 0;
  var saveTimer = 0;
  var statusEl = null;

  function slugify(str) {
    return String(str || "")
      .toLowerCase()
      .split("")
      .map(function (ch) {
        return RU[ch] != null ? RU[ch] : ch;
      })
      .join("")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
  }

  function getPath(obj, path) {
    return path.split(".").reduce(function (o, k) {
      return o == null ? o : o[k];
    }, obj);
  }

  function setPath(obj, path, val) {
    var parts = path.split(".");
    var cur = obj;
    var i;
    for (i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]] || typeof cur[parts[i]] !== "object") cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = val;
  }

  function lines(text) {
    return String(text || "")
      .split(/\r?\n/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function recalc() {
    var data = window.RP_DATA;
    data.categories.forEach(function (c) {
      c.count = data.nominations.filter(function (n) {
        return n.category === c.slug;
      }).length;
    });
  }

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function persist() {
    recalc();
    var phone = window.RP_CONFIG.contacts && window.RP_CONFIG.contacts.phone;
    if (phone && window.RP_CONFIG.contacts && !window.RP_CONFIG.contacts.phoneHref) {
      window.RP_CONFIG.contacts.phoneHref = "tel:" + String(phone).replace(/[^\d+]/g, "");
    }
    var result = window.RP_STORE.save();
    if (result && typeof result.then === "function") {
      result.then(function (info) {
        if (info && info.remote) {
          setStatus("Сохранено на сайте. Обновите страницу сайта (Ctrl+F5).");
        } else {
          setStatus("Сервер недоступен: пока только в этом браузере.");
        }
      });
    } else {
      setStatus("Сохранено. Обновите страницу сайта.");
    }
  }

  function persistSoon() {
    setStatus("Сохраняем…");
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 380);
  }

  function download(name, text) {
    var blob = new Blob([text], { type: "application/json;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function emptyNom() {
    var cat = window.RP_DATA.categories[0];
    return {
      slug: "",
      category: cat ? cat.slug : "",
      title: "Новая номинация",
      price: 2500,
      deadline: "",
      hero: "",
      fits: "",
      prepare: "",
      onsite: "",
      allowed: [],
      forbidden: [],
      requirements: { model: "", costume: "", materials: "" },
      criteria: [],
      okExamples: [],
      badExamples: [],
      creative: false,
    };
  }

  function emptyPack() {
    return {
      slug: "",
      tier: "access",
      title: "Новый пакет",
      price: 0,
      priceLabel: "0 ₽",
      scene: "",
      highlights: [],
      items: [],
    };
  }

  function bindValue(el, getter, setter, type) {
    var v = getter();
    if (el.tagName === "INPUT" && el.type === "checkbox") {
      el.checked = !!v;
      el.addEventListener("change", function () {
        setter(el.checked);
        persistSoon();
      });
      return;
    }
    el.value = v == null ? "" : v;
    el.addEventListener("input", function () {
      var next = el.value;
      if (type === "number") next = Number(el.value);
      setter(next);
      persistSoon();
    });
  }

  function bindConfigFields() {
    $$("[data-bind]").forEach(function (el) {
      var path = el.getAttribute("data-bind");
      var type = el.getAttribute("data-type") || "";
      bindValue(
        el,
        function () {
          return getPath(window.RP_CONFIG, path);
        },
        function (val) {
          setPath(window.RP_CONFIG, path, val);
        },
        type
      );
    });
  }

  function renderCopy() {
    var box = $("[data-copy-form]");
    if (!box) return;
    var copy = window.RP_CONFIG.copy || (window.RP_CONFIG.copy = {});
    var seen = {};
    var html = "";
    COPY_GROUPS.forEach(function (group) {
      html += '<h3 class="adm-field--wide" style="grid-column:1/-1">' + group.title + "</h3>";
      Object.keys(group.keys).forEach(function (key) {
        seen[key] = true;
        if (copy[key] == null) copy[key] = "";
        var label = group.keys[key];
        var long = LONG_COPY[key] || String(copy[key] || "").length > 80;
        var field = long
          ? '<textarea data-copy-key="' + key + '" rows="3"></textarea>'
          : '<input data-copy-key="' + key + '">';
        html += '<label class="adm-field' + (long ? " adm-field--wide" : "") + '"><span>' + label + "</span>" + field + "</label>";
      });
    });
    Object.keys(copy).forEach(function (key) {
      if (seen[key]) return;
      html += '<label class="adm-field adm-field--wide"><span>' + key + '</span><textarea data-copy-key="' + key + '" rows="2"></textarea></label>';
    });
    box.innerHTML = html;
    $$("[data-copy-key]", box).forEach(function (el) {
      var key = el.getAttribute("data-copy-key");
      bindValue(
        el,
        function () {
          return window.RP_CONFIG.copy[key];
        },
        function (val) {
          window.RP_CONFIG.copy[key] = val;
        }
      );
    });
  }

  function card(title, body, onDel) {
    var wrap = document.createElement("article");
    wrap.className = "adm-card";
    wrap.innerHTML = '<div class="adm-card__head"><strong></strong><button class="adm-btn adm-btn--danger" type="button">Удалить</button></div><div class="adm-grid"></div>';
    wrap.querySelector("strong").textContent = title;
    wrap.querySelector(".adm-grid").appendChild(body);
    wrap.querySelector("button").addEventListener("click", onDel);
    return wrap;
  }

  function inputField(label, value, onInput, opts) {
    opts = opts || {};
    var lab = document.createElement("label");
    lab.className = "adm-field" + (opts.wide ? " adm-field--wide" : "");
    var span = document.createElement("span");
    span.textContent = label;
    var el;
    if (opts.area) {
      el = document.createElement("textarea");
      el.rows = opts.rows || 4;
    } else if (opts.select) {
      el = document.createElement("select");
      opts.select.forEach(function (opt) {
        var o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        el.appendChild(o);
      });
    } else {
      el = document.createElement("input");
      if (opts.type) el.type = opts.type;
    }
    el.value = value == null ? "" : value;
    el.addEventListener("input", function () {
      onInput(opts.number ? Number(el.value) : el.value);
      persistSoon();
    });
    lab.appendChild(span);
    lab.appendChild(el);
    return lab;
  }

  function checkField(label, checked, onChange) {
    var lab = document.createElement("label");
    lab.className = "adm-check";
    var el = document.createElement("input");
    el.type = "checkbox";
    el.checked = !!checked;
    el.addEventListener("change", function () {
      onChange(el.checked);
      persistSoon();
    });
    lab.appendChild(el);
    lab.appendChild(document.createTextNode(label));
    return lab;
  }

  function gridOf(nodes) {
    var g = document.createDocumentFragment();
    nodes.forEach(function (n) {
      g.appendChild(n);
    });
    return g;
  }

  function renderOrganizers() {
    var box = $('[data-repeat="organizers"]');
    if (!box) return;
    box.innerHTML = "";
    var list = window.RP_CONFIG.organizers || (window.RP_CONFIG.organizers = []);
    list.forEach(function (p, i) {
      var body = gridOf([
        inputField("Имя", p.name, function (v) {
          p.name = v;
        }),
        inputField("Роль", p.role, function (v) {
          p.role = v;
        }),
      ]);
      box.appendChild(
        card(p.name || "Организатор", body, function () {
          list.splice(i, 1);
          persist();
          renderOrganizers();
        })
      );
    });
    var add = document.createElement("p");
    add.innerHTML = '<button class="adm-btn adm-btn--wine" type="button">Добавить организатора</button>';
    add.querySelector("button").addEventListener("click", function () {
      list.push({ name: "", role: "Организатор" });
      persist();
      renderOrganizers();
    });
    box.appendChild(add);
  }

  function renderCategories() {
    var box = $('[data-repeat="categories"]');
    if (!box) return;
    box.innerHTML = "";
    window.RP_DATA.categories.forEach(function (c, i) {
      var body = gridOf([
        inputField("Код (slug)", c.slug, function (v) {
          c.slug = v;
        }),
        inputField("Название", c.title, function (v) {
          c.title = v;
        }),
        inputField("Индекс на карточке", c.index, function (v) {
          c.index = v;
        }),
        inputField("Короткое описание", c.teaser, function (v) {
          c.teaser = v;
        }, { wide: true }),
        inputField("Цена «от», ₽", c.fromPrice, function (v) {
          c.fromPrice = v;
        }, { type: "number", number: true }),
      ]);
      var wrap = document.createElement("div");
      wrap.appendChild(body);
      wrap.appendChild(
        checkField("Творческое направление «для всех»", c.creative, function (v) {
          c.creative = v;
        })
      );
      box.appendChild(
        card((c.index || "") + " · " + (c.title || "Направление"), wrap, function () {
          if (!confirm("Удалить направление «" + c.title + "»?")) return;
          window.RP_DATA.categories.splice(i, 1);
          persist();
          renderCategories();
          fillNomSelect();
        })
      );
    });
  }

  function fillNomSelect() {
    var sel = $("[data-nom-select]");
    if (!sel) return;
    var noms = window.RP_DATA.nominations;
    if (!noms.length) {
      noms.push(emptyNom());
      nomIndex = 0;
    }
    if (nomIndex >= noms.length) nomIndex = 0;
    sel.innerHTML = noms
      .map(function (n, i) {
        return '<option value="' + i + '">' + (n.title || "Без названия") + " (" + (n.slug || "нет кода") + ")</option>";
      })
      .join("");
    sel.value = String(nomIndex);
  }

  function renderNomEditor() {
    var box = $("[data-nom-editor]");
    if (!box) return;
    var n = window.RP_DATA.nominations[nomIndex];
    if (!n) {
      box.innerHTML = "<p>Нет номинаций.</p>";
      return;
    }
    if (!n.requirements) n.requirements = { model: "", costume: "", materials: "" };
    var cats = window.RP_DATA.categories.map(function (c) {
      return { value: c.slug, label: c.title };
    });
    box.innerHTML = "";
    var grid = document.createElement("div");
    grid.className = "adm-grid";
    [
      inputField("Название", n.title, function (v) {
        n.title = v;
        if (!n.slug) n.slug = slugify(v);
        fillNomSelect();
      }),
      inputField("Код (slug)", n.slug, function (v) {
        n.slug = v;
        fillNomSelect();
      }),
      inputField("Направление", n.category, function (v) {
        n.category = v;
      }, { select: cats }),
      inputField("Цена, ₽", n.price, function (v) {
        n.price = v;
      }, { type: "number", number: true }),
      inputField("Дедлайн", n.deadline, function (v) {
        n.deadline = v;
      }),
      inputField("Короткий текст карточки", n.hero, function (v) {
        n.hero = v;
      }, { area: true, wide: true, rows: 3 }),
      inputField("Кому подходит", n.fits, function (v) {
        n.fits = v;
      }, { area: true, wide: true }),
      inputField("Заранее", n.prepare, function (v) {
        n.prepare = v;
      }, { area: true, wide: true }),
      inputField("На площадке", n.onsite, function (v) {
        n.onsite = v;
      }, { area: true, wide: true }),
      inputField("Модель", n.requirements.model, function (v) {
        n.requirements.model = v;
      }, { area: true, wide: true, rows: 2 }),
      inputField("Костюм", n.requirements.costume, function (v) {
        n.requirements.costume = v;
      }, { area: true, wide: true, rows: 2 }),
      inputField("Материалы", n.requirements.materials, function (v) {
        n.requirements.materials = v;
      }, { area: true, wide: true, rows: 2 }),
      inputField("Разрешено (по строке)", (n.allowed || []).join("\n"), function (v) {
        n.allowed = lines(v);
      }, { area: true, wide: true }),
      inputField("Запрещено (по строке)", (n.forbidden || []).join("\n"), function (v) {
        n.forbidden = lines(v);
      }, { area: true, wide: true }),
      inputField("Критерии (по строке)", (n.criteria || []).join("\n"), function (v) {
        n.criteria = lines(v);
      }, { area: true, wide: true }),
      inputField("Допустимые примеры", (n.okExamples || []).join("\n"), function (v) {
        n.okExamples = lines(v);
      }, { area: true, wide: true }),
      inputField("Недопустимые примеры", (n.badExamples || []).join("\n"), function (v) {
        n.badExamples = lines(v);
      }, { area: true, wide: true }),
    ].forEach(function (node) {
      grid.appendChild(node);
    });
    box.appendChild(grid);
    box.appendChild(
      checkField("Творческая номинация (ветка «для всех»)", n.creative, function (v) {
        n.creative = v;
      })
    );
  }

  function fillPackSelect() {
    var sel = $("[data-pack-select]");
    if (!sel) return;
    var packs = window.RP_DATA.packages;
    if (!packs.length) {
      packs.push(emptyPack());
      packIndex = 0;
    }
    if (packIndex >= packs.length) packIndex = 0;
    sel.innerHTML = packs
      .map(function (p, i) {
        return '<option value="' + i + '">' + (p.title || "Пакет") + " — " + (p.priceLabel || "") + "</option>";
      })
      .join("");
    sel.value = String(packIndex);
  }

  function renderPackEditor() {
    var box = $("[data-pack-editor]");
    if (!box) return;
    var p = window.RP_DATA.packages[packIndex];
    if (!p) {
      box.innerHTML = "<p>Нет пакетов.</p>";
      return;
    }
    box.innerHTML = "";
    var grid = document.createElement("div");
    grid.className = "adm-grid";
    [
      inputField("Название", p.title, function (v) {
        p.title = v;
        if (!p.slug) p.slug = slugify(v);
        fillPackSelect();
      }),
      inputField("Код (slug)", p.slug, function (v) {
        p.slug = v;
        fillPackSelect();
      }),
      inputField("Категория", p.tier, function (v) {
        p.tier = v;
      }, {
        select: [
          { value: "large", label: "Крупное партнёрство" },
          { value: "access", label: "Доступный формат" },
        ],
      }),
      inputField("Цена, число (для сортировки)", p.price, function (v) {
        p.price = v;
      }, { type: "number", number: true }),
      inputField("Цена на сайте (как писать)", p.priceLabel, function (v) {
        p.priceLabel = v;
      }),
      inputField("Сцена / пометка", p.scene, function (v) {
        p.scene = v;
      }),
      inputField("Короткий список на карточке (по строке)", (p.highlights || []).join("\n"), function (v) {
        p.highlights = lines(v);
      }, { area: true, wide: true }),
      inputField("Полный состав пакета (по строке)", (p.items || []).join("\n"), function (v) {
        p.items = lines(v);
      }, { area: true, wide: true, rows: 8 }),
    ].forEach(function (node) {
      grid.appendChild(node);
    });
    box.appendChild(grid);
  }

  function renderTiers() {
    var box = $('[data-repeat="partnerTiers"]');
    if (!box) return;
    box.innerHTML = "";
    window.RP_DATA.partnerTiers.forEach(function (t, i) {
      var body = gridOf([
        inputField("Код", t.id, function (v) {
          t.id = v;
        }),
        inputField("Заголовок", t.title, function (v) {
          t.title = v;
        }),
        inputField("От какой суммы", t.from, function (v) {
          t.from = v;
        }),
        inputField("Что входит", t.contains, function (v) {
          t.contains = v;
        }, { wide: true }),
        inputField("Сообщение", t.message, function (v) {
          t.message = v;
        }, { area: true, wide: true, rows: 3 }),
      ]);
      box.appendChild(
        card(t.title || "Категория", body, function () {
          window.RP_DATA.partnerTiers.splice(i, 1);
          persist();
          renderTiers();
        })
      );
    });
  }

  function renderExtras() {
    var box = $('[data-repeat="extras"]');
    if (!box) return;
    box.innerHTML = "";
    window.RP_DATA.extras.forEach(function (e, i) {
      var body = gridOf([
        inputField("Код", e.slug, function (v) {
          e.slug = v;
        }),
        inputField("Название", e.title, function (v) {
          e.title = v;
        }),
        inputField("Цена на сайте", e.priceLabel, function (v) {
          e.priceLabel = v;
        }),
        inputField("Пояснение", e.note || "", function (v) {
          e.note = v;
        }, { wide: true }),
      ]);
      box.appendChild(
        card(e.title || "Опция", body, function () {
          window.RP_DATA.extras.splice(i, 1);
          persist();
          renderExtras();
        })
      );
    });
  }

  function renderBenefits() {
    var box = $('[data-repeat="benefits"]');
    if (!box) return;
    box.innerHTML = "";
    window.RP_DATA.benefits.forEach(function (b, i) {
      var body = gridOf([
        inputField("Заголовок", b.title, function (v) {
          b.title = v;
        }),
        inputField("Текст", b.text, function (v) {
          b.text = v;
        }, { area: true, wide: true, rows: 3 }),
      ]);
      box.appendChild(
        card(b.title || "Причина", body, function () {
          window.RP_DATA.benefits.splice(i, 1);
          persist();
          renderBenefits();
        })
      );
    });
  }

  function renderGifts() {
    var box = $('[data-repeat="gifts"]');
    if (!box) return;
    box.innerHTML = "";
    window.RP_DATA.gifts.forEach(function (g, i) {
      var wrap = document.createElement("div");
      wrap.appendChild(
        gridOf([
          inputField("Место (I / II / III)", g.place, function (v) {
            g.place = v;
          }),
          inputField("Заголовок", g.title, function (v) {
            g.title = v;
          }),
          inputField("Текст", g.text, function (v) {
            g.text = v;
          }, { area: true, wide: true, rows: 3 }),
        ])
      );
      wrap.appendChild(
        checkField("Главный приз (золотая карточка)", g.win, function (v) {
          g.win = v;
        })
      );
      box.appendChild(
        card((g.place || "") + " · " + (g.title || "Уровень"), wrap, function () {
          window.RP_DATA.gifts.splice(i, 1);
          persist();
          renderGifts();
        })
      );
    });
  }

  function renderStages() {
    var box = $('[data-repeat="stages"]');
    if (!box) return;
    box.innerHTML = "";
    window.RP_DATA.stages.forEach(function (s, i) {
      var body = gridOf([
        inputField("Название этапа", s.title, function (v) {
          s.title = v;
        }),
        inputField("Текст", s.text, function (v) {
          s.text = v;
        }, { area: true, wide: true, rows: 3 }),
      ]);
      box.appendChild(
        card(s.title || "Этап", body, function () {
          window.RP_DATA.stages.splice(i, 1);
          persist();
          renderStages();
        })
      );
    });
  }

  function renderFaq() {
    var box = $('[data-repeat="faq"]');
    if (!box) return;
    box.innerHTML = "";
    window.RP_DATA.faq.forEach(function (item, i) {
      var body = gridOf([
        inputField("Вопрос", item.q, function (v) {
          item.q = v;
        }, { wide: true }),
        inputField("Ответ", item.a, function (v) {
          item.a = v;
        }, { area: true, wide: true, rows: 4 }),
      ]);
      box.appendChild(
        card(item.q || "Вопрос", body, function () {
          window.RP_DATA.faq.splice(i, 1);
          persist();
          renderFaq();
        })
      );
    });
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderApps() {
    var box = $("[data-apps-table]");
    if (!box) return;
    var apps = window.RP_STORE.getApps();
    if (!apps.length) {
      box.innerHTML = "<p>Заявок пока нет.</p>";
      return;
    }
    var head = "<tr><th>Дата</th><th>Имя</th><th>Компания</th><th>Телефон</th><th>Email</th><th>Пакет</th><th>Комментарий</th><th>Рассылка</th></tr>";
    var rows = apps
      .map(function (a) {
        var d = a.createdAt ? new Date(a.createdAt).toLocaleString("ru-RU") : "";
        return (
          "<tr><td>" +
          esc(d) +
          "</td><td>" +
          esc(a.name || "") +
          "</td><td>" +
          esc(a.company || "") +
          "</td><td>" +
          esc(a.phone || "") +
          "</td><td>" +
          esc(a.email || "") +
          "</td><td>" +
          esc(a.package || "") +
          "</td><td>" +
          esc(a.comment || "") +
          "</td><td>" +
          (a.ads ? "да" : "нет") +
          "</td></tr>"
        );
      })
      .join("");
    box.innerHTML = "<table><thead>" + head + "</thead><tbody>" + rows + "</tbody></table>";
  }

  function showApp() {
    $("[data-login]").hidden = true;
    $("[data-app]").hidden = false;
    bindConfigFields();
    renderCopy();
    renderOrganizers();
    renderCategories();
    fillNomSelect();
    renderNomEditor();
    fillPackSelect();
    renderPackEditor();
    renderTiers();
    renderExtras();
    renderBenefits();
    renderGifts();
    renderStages();
    renderFaq();
    renderApps();
    setStatus("Можно править. Сохранение на сайт — автоматически.");
  }

  function boot() {
    statusEl = $("[data-status]");

    $("[data-login-form]").addEventListener("submit", function (e) {
      e.preventDefault();
      var pin = $("[name='pin']").value;
      var expected = (window.RP_CONFIG.admin && window.RP_CONFIG.admin.pin) || "palitra";
      var err = $("[data-login-error]");
      if (pin !== expected) {
        err.hidden = false;
        return;
      }
      sessionStorage.setItem(SESSION, "1");
      sessionStorage.setItem("rp_admin_pin", pin);
      showApp();
    });

    $("[data-logout]").addEventListener("click", function () {
      sessionStorage.removeItem(SESSION);
      location.reload();
    });

    $$("[data-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-tab");
        $$("[data-tab]").forEach(function (b) {
          b.classList.toggle("is-on", b === btn);
        });
        $$("[data-panel]").forEach(function (p) {
          p.hidden = p.getAttribute("data-panel") !== id;
        });
        if (id === "apps") renderApps();
      });
    });

    $("[data-add='category']").addEventListener("click", function () {
      var n = window.RP_DATA.categories.length + 1;
      window.RP_DATA.categories.push({
        slug: "napravlenie-" + n,
        title: "Новое направление",
        index: String(n).padStart(2, "0"),
        teaser: "",
        fromPrice: 2500,
        count: 0,
      });
      persist();
      renderCategories();
    });

    $("[data-nom-select]").addEventListener("change", function () {
      nomIndex = Number(this.value);
      renderNomEditor();
    });
    $("[data-add='nomination']").addEventListener("click", function () {
      window.RP_DATA.nominations.push(emptyNom());
      nomIndex = window.RP_DATA.nominations.length - 1;
      persist();
      fillNomSelect();
      renderNomEditor();
    });
    $("[data-del='nomination']").addEventListener("click", function () {
      var n = window.RP_DATA.nominations[nomIndex];
      if (!n || !confirm("Удалить номинацию «" + n.title + "»?")) return;
      window.RP_DATA.nominations.splice(nomIndex, 1);
      nomIndex = 0;
      persist();
      fillNomSelect();
      renderNomEditor();
    });

    $("[data-pack-select]").addEventListener("change", function () {
      packIndex = Number(this.value);
      renderPackEditor();
    });
    $("[data-add='package']").addEventListener("click", function () {
      window.RP_DATA.packages.push(emptyPack());
      packIndex = window.RP_DATA.packages.length - 1;
      persist();
      fillPackSelect();
      renderPackEditor();
    });
    $("[data-del='package']").addEventListener("click", function () {
      var p = window.RP_DATA.packages[packIndex];
      if (!p || !confirm("Удалить пакет «" + p.title + "»?")) return;
      window.RP_DATA.packages.splice(packIndex, 1);
      packIndex = 0;
      persist();
      fillPackSelect();
      renderPackEditor();
    });

    $("[data-add='extra']").addEventListener("click", function () {
      window.RP_DATA.extras.push({ slug: "opciya", title: "Новая опция", priceLabel: "0 ₽", note: "" });
      persist();
      renderExtras();
    });
    $("[data-add='benefit']").addEventListener("click", function () {
      window.RP_DATA.benefits.push({ title: "", text: "" });
      persist();
      renderBenefits();
    });
    $("[data-add='gift']").addEventListener("click", function () {
      window.RP_DATA.gifts.push({ place: "", title: "", text: "", win: false });
      persist();
      renderGifts();
    });
    $("[data-add='stage']").addEventListener("click", function () {
      window.RP_DATA.stages.push({ title: "", text: "" });
      persist();
      renderStages();
    });
    $("[data-add='faq']").addEventListener("click", function () {
      window.RP_DATA.faq.push({ q: "", a: "" });
      persist();
      renderFaq();
    });

    $("[data-export]").addEventListener("click", function () {
      download("russkaya-palitra-cms.json", window.RP_STORE.dump());
    });
    $("[data-import]").addEventListener("click", function () {
      try {
        var restored = window.RP_STORE.restore($("[data-import-json]").value);
        Promise.resolve(restored).then(function () {
          location.reload();
        });
      } catch (err) {
        alert("Не удалось прочитать JSON");
      }
    });
    $("[data-reset]").addEventListener("click", function () {
      if (!confirm("Вернуть все тексты и цены к исходным из кода сайта? Заявки не трогаем.")) return;
      Promise.resolve(window.RP_STORE.reset()).then(function () {
        location.reload();
      });
    });
    $("[data-export-apps]").addEventListener("click", function () {
      download("russkaya-palitra-zayavki.json", JSON.stringify(window.RP_STORE.getApps(), null, 2));
    });
    $("[data-clear-apps]").addEventListener("click", function () {
      if (!confirm("Удалить все заявки из этого браузера?")) return;
      Promise.resolve(window.RP_STORE.clearApps()).then(function () {
        renderApps();
      });
    });

    if (sessionStorage.getItem(SESSION) === "1") showApp();
  }

  if (window.RP_STORE && window.RP_STORE.whenReady) window.RP_STORE.whenReady(boot);
  else boot();
})();
