/**
 * Конфигурация сайта «Русская Палитра».
 * Поля с пометкой CMS заполняются в админке без правки вёрстки.
 */
window.RP_CONFIG = {
  event: {
    name: "Русская Палитра",
    start: "2026-09-27T10:00:00+05:00",
    end: "2026-09-27T22:00:00+05:00",
    timezone: "+05:00",
    city: "Екатеринбург",
    region: "Свердловская область",
    geo: "Урал",
    venue: "ЦК «Урал»",
    venueAddress: "г. Екатеринбург, ЦК «Урал»",
  },
  organizers: [
    { name: "Александра Сотникова", role: "Организатор" },
    { name: "Татьяна Бердус", role: "Организатор" },
  ],
  contacts: {
    phone: "",
    phoneHref: "",
    email: "hello@russkaya-palitra.ru",
    supportLabel: "Служба поддержки",
  },
  legal: {
    entity: "[ИП / наименование — CMS]",
    inn: "[ИНН — CMS]",
    ogrnip: "[ОГРНИП — CMS]",
  },
  fees: {
    selection: 500,
    creativeUnit: 500,
    proTiers: { 1: 3500, 2: 3000, 3: 2500 },
  },
  charity: {
    amountRub: 100,
    percent: 20,
    displayMode: "amount",
    fundName: "[Наименование фонда — CMS]",
  },
  max: {
    botName: "russkaya_palitra",
    base: "https://max.ru/",
  },
  analytics: {
    ymCounter: 0,
  },
  utmDefaults: {
    utm_source: "site",
    utm_medium: "web",
    utm_campaign: "russkaya_palitra_2026",
  },
  admin: {
    pin: "palitra",
  },
  copy: {
    headerCta: "Участвовать",
    partnerCta: "Оставить заявку",
    heroKicker: "Конкурс · Гранд-финал",
    heroTitle: "Русская Палитра",
    heroSub: "Ремесло выходит на главную сцену Урала. Выберите номинацию — жюри, протокол и выход на сцену ждут внутри.",
    badgeFee: "Стартовый взнос от 500 ₽",
    badgeCharity: "Часть взноса — на помощь детям",
    roleParticipant: "Хочу участвовать",
    roleBrand: "Представляю бренд",
    ctaChooseNom: "Выбрать номинацию",
    ctaBecomePartner: "Стать партнёром",
    ctaHowFee: "Как устроен взнос",
    ctaPacks: "Сетка пакетов",
    prizeKicker: "Главный приз сцены",
    prizeTitle: "Победа, которая видна",
    prizeText: "Именной статус, контент с гранд-финала и награда победителя. Точный состав призового фонда — в карточке номинации.",
    brandKicker: "Аудитория события",
    brandTitle: "Два формата бюджета",
    brandText: "Крупное партнёрство — от 100 000 ₽. Доступные форматы — от 5 000 ₽. Сцена, маркет, рассылки, жюри.",
    entryTitle: "500 ₽ — первый шаг на сцену, а не покупка приза",
    entryPlaque: "Часть взноса фиксируется в документах события и уходит в фонд. Это не игра на удачу и не покупка приза — это плата за рассмотрение работы и одновременный вклад в помощь детям.",
    entryNote: "Регистрация и оплата проходят в MAX-боте после выбора номинации. Стартовый взнос — плата за рассмотрение работы жюри, а не за приз.",
    whyTitle: "Почему участвовать",
    whyLead: "Шесть причин, которые остаются с вами независимо от места в протоколе.",
    allTitle: "Конкурс для всех",
    allLead: "Участвует любой человек вне бьюти и fashion — просто любой желающий. Текст, рисунок, фото, видео — отдельная ветка с тем же стартовым взносом 500 ₽.",
    nomTitle: "Направления",
    nomLead: "Сначала категория, затем список номинаций. В MAX-боте можно выбрать несколько специальностей и из каждой — несколько номинаций; стоимость суммируется.",
    giftTitle: "Подарки и призы",
    stepsTitle: "Этапы конкурса",
    juryTitle: "Звёздные гости",
    juryLead: "Люди сцены «Русской Палитры». Состав дополняется по мере подтверждения.",
    partnerTitle: "Партнёрам",
    partnerLead: "Аудитория мастеров, моделей, гостей и покупателей Урала. Крупное партнёрство — сцена и эксклюзив. Доступные форматы — маркет, спикер, жюри, коллаборация.",
    contactsTitle: "Организаторы и поддержка",
    contactsLead: "Александра Сотникова и Татьяна Бердус. Вопросы по участию и партнёрству — MAX-бот или форма заявки.",
    finalTitle: "Выходите на сцену",
    finalLead: "Номинация — для участников. Пакет — для брендов. QR ведёт в MAX с меткой страницы.",
    metaDescription: "Русская Палитра — региональное событие 27 сентября 2026 в ЦК «Урал», Екатеринбург. Участие от 500 ₽, номинации мастеров и творческий конкурс для всех.",
    navHome: "Главная",
    navNoms: "Направления",
    navPartners: "Партнёрам",
    navFaq: "Вопросы",
    navBecomePartner: "Стать партнёром",
    entryIndex: "03 · Старт участия",
    entryBody: "500 ₽ — стартовый взнос за участие в отборочном этапе. Вы подаёте свои работы на рассмотрение профессионального жюри и делаете первый шаг к главной сцене «Русской Палитры». Одновременно {amount} из этого взноса мы направляем в {fund} на помощь детям. Даже первый шаг в конкурсе уже становится добрым делом.",
    entryPlaqueLabel: "Адресная помощь",
    matryoshkaHint: "отборочный этап",
    matryoshkaCore: "Помощь детям",
    ctaDoc: "Положение о конкурсе",
    whyIndex: "04 · Зачем идти",
    allIndex: "05 · Вне цеха",
    allCtaOpen: "Открыть творческие номинации",
    allCtaMax: "Регистрация в MAX",
    nomIndex: "06 · Матрёшка участника",
    giftIndex: "07 · Три уровня",
    stepsIndex: "08 · Календарь",
    stepsCtaProgram: "Запросить программу в MAX",
    juryIndex: "09 · Люди сцены",
    partnerIndex: "10 · Ветка бренда",
    packCtaChoose: "Выбрать бюджет и пакет",
    contactsIndex: "11 · Контакты",
    ctaMaxBot: "MAX-бот",
    ctaPartnerForm: "Заявка партнёра",
    faqIndex: "12 · Вопросы",
    faqTitle: "FAQ",
    finalIndex: "Действие",
    qrCaption: "Наведите камеру: общая регистрация участника",
    nomsKicker: "Программа конкурса",
    nomsPageTitle: "Направления",
    nomsPageSub: "Откройте категорию и номинацию. В MAX-боте можно выбрать несколько специальностей и номинаций в одной заявке.",
    nomsCtaList: "К номинациям",
    nomsCtaMax: "Регистрация в MAX",
    nomsFinalIndex: "Регистрация",
    nomsFinalTitle: "Готовы к номинации?",
    nomsFinalLead: "Выберите направление выше, откройте карточку и зарегистрируйтесь в MAX. Или вернитесь на главную.",
    nomsFinalHome: "На главную",
    partnerPageKicker: "Партнёрство конкурса",
    partnerPageTitle: "Партнёрам",
    partnerPageSub: "Сначала выберите бюджет. Затем откроется список подходящих форматов, подробный состав пакета и заявка.",
    partnerCtaMax: "MAX-бот партнёра",
    partnerBudgetIndex: "01 · Выбор бюджета",
    partnerBudgetTitle: "Две категории",
    partnerBudgetLead: "Крупное партнёрство — сцена и бренд-зона. Доступные форматы — экспертиза, услуга или продукт без максимального бюджета.",
    partnerFormatsIndex: "02 · Подходящие форматы",
    partnerCardsIndex: "03 · Состав пакета",
    partnerCardsTitle: "Подробные карточки",
    partnerExtrasTitle: "Дополнительные опции",
    partnerExtrasLead: "Флаер в пакет участников — 15 000 ₽, если не входит в выбранный пакет.",
    partnerFormIndex: "04 · Действие",
    partnerFormTitle: "Заявка, звонок или MAX",
    partnerFormLead: "Оставьте заявку, напишите в MAX или укажите телефон — перезвоним. Согласие на обработку данных обязательно. Рассылка выключена.",
    partnerFormOk: "Заявка принята. Мы свяжемся с вами.",
    partnerFormSubmit: "Отправить заявку",
    partnerFormMax: "Написать в MAX",
    nomCardKicker: "Номинация",
    nomJuryMark: "Решение жюри",
    nomFitsTitle: "Кому подходит",
    nomPrepareTitle: "Заранее",
    nomOnsiteTitle: "На площадке",
    nomAllowedTitle: "Разрешено",
    nomForbiddenTitle: "Запрещено",
    nomReqTitle: "Требования",
    nomReqModel: "Модель",
    nomReqCostume: "Костюм",
    nomReqMaterials: "Материалы",
    nomCriteriaTitle: "Критерии оценки",
    nomCriteriaLead: "Жюри выставляет баллы по пунктам ниже. Итог — сумма, без отдельной «удачи».",
    nomExamplesTitle: "Примеры",
    nomOkTitle: "Допустимо",
    nomBadTitle: "Недопустимо",
    nomPriceIndex: "Цена и призы",
    nomPriceLead: "Стартовый взнос отбора оплачивается отдельно на этапе заявки. Можно добавить несколько номинаций в MAX — цена считается по количеству. Дедлайн подачи:",
    nomPriceNote: "Проф. номинации: 1 — 3 500 ₽, 2 — по 3 000 ₽, 3 и более — по 2 500 ₽. Творческий конкурс — 500 ₽ за каждую номинацию.",
    nomsPricingTitle: "Как считается оплата номинаций",
    nomsPricingLead: "На этапе 2 в MAX-боте выбираете специальности и номинации. Профессиональные и творческие номинации считаются отдельно, итог суммируется.",
    nomMaxTitle: "Зарегистрироваться через MAX",
    nomMaxLead: "Кнопка и QR несут код этой номинации.",
    nomMaxCta: "Открыть MAX-бот",
    nomBackCta: "К другим номинациям",
    partnerCallCta: "Заказать звонок",
    extraAddCta: "Добавить к заявке",
    packPickCta: "Выбрать пакет",
  },
  docs: {
    polozhenieTitle: "Положение о конкурсе",
    politikaTitle: "Политика конфиденциальности",
    soglasieTitle: "Согласие на обработку персональных данных",
    polozhenie: "Полный текст Положения загружается в админке (вкладка «Документы»). Ниже — каркас, который должен совпадать с публичной офертой события.\n\nСтартовый взнос — плата за участие в отборочном этапе и рассмотрение работ жюри. Формулировки «лотерея», «розыгрыш», «купи шанс» в официальных текстах не применяются.\n\nЧасть стартового взноса направляется в фонд помощи детям. Сумма (или доля) и наименование фонда указываются в актуальной редакции Положения и на главной странице сайта.",
    politika: "Оператор обрабатывает персональные данные заявителей (участников и партнёров) в целях регистрации, связи и исполнения договора участия / партнёрства.\n\nСостав данных: имя, контакты, компания, выбранная номинация или пакет, технические метки UTM и payload MAX-бота — в объёме, необходимом для заявки и аналитики события.\n\nПередача в CRM и MAX-бот осуществляется по выбранному пользователем действию. Рекламные рассылки — только при отдельном согласии, которое по умолчанию не установлено.\n\nРеквизиты оператора (ИП, ИНН, ОГРНИП) публикуются в подвале сайта и в настоящей политике после заполнения в админке.",
    soglasie: "Нажимая отметку в форме заявки, субъект даёт согласие оператору на обработку указанных им персональных данных для рассмотрения заявки на участие или партнёрство, связи по заявке и исполнения обязательств по событию.\n\nСогласие на рекламные рассылки оформляется отдельной отметкой и не является условием подачи заявки. Эта отметка по умолчанию выключена.\n\nСогласие может быть отозвано письмом на контактный email, указанный на сайте.",
  },
};

window.RP = {
  formatRub(amount) {
    return Number(amount).toLocaleString("ru-RU") + " ₽";
  },
  proNominationUnitPrice(count) {
    const tiers = window.RP_CONFIG.fees.proTiers;
    const n = Math.max(0, count);
    if (n <= 1) return tiers[1];
    if (n === 2) return tiers[2];
    return tiers[3];
  },
  categoryFromPrice(cat) {
    const fees = window.RP_CONFIG.fees;
    if (cat.creative) return fees.creativeUnit;
    return fees.proTiers[3];
  },
  nominationListPrice(nom) {
    const fees = window.RP_CONFIG.fees;
    if (nom.creative) return this.formatRub(fees.creativeUnit);
    return "от " + this.formatRub(fees.proTiers[3]);
  },
  nominationDetailPrice(nom) {
    const fees = window.RP_CONFIG.fees;
    if (nom.creative) return this.formatRub(fees.creativeUnit);
    return this.formatRub(fees.proTiers[1]);
  },
  nominationPriceNote(nom) {
    const fees = window.RP_CONFIG.fees;
    if (nom.creative) {
      return "Каждая номинация творческого конкурса — " + this.formatRub(fees.creativeUnit) + ". Можно выбрать несколько.";
    }
    return (
      "Можно выбрать несколько специальностей и номинаций в MAX. Проф. номинации: 1 — " +
      this.formatRub(fees.proTiers[1]) +
      ", 2 — " +
      this.formatRub(fees.proTiers[2]) +
      " каждая, 3 и более — " +
      this.formatRub(fees.proTiers[3]) +
      " каждая."
    );
  },
  pricingRulesText() {
    const fees = window.RP_CONFIG.fees;
    return (
      "Проф. номинации: 1 — " +
      this.formatRub(fees.proTiers[1]) +
      ", 2 — " +
      this.formatRub(fees.proTiers[2]) +
      " каждая, 3 и более — " +
      this.formatRub(fees.proTiers[3]) +
      " каждая. Творческий конкурс — " +
      this.formatRub(fees.creativeUnit) +
      " за номинацию. Можно выбрать несколько специальностей — сумма складывается."
    );
  },
  calculateNominationsTotal(items) {
    const fees = window.RP_CONFIG.fees;
    const creative = items.filter(function (i) {
      return i.creative;
    });
    const pro = items.filter(function (i) {
      return !i.creative;
    });
    const proUnit = pro.length ? this.proNominationUnitPrice(pro.length) : 0;
    const creativeTotal = creative.length * fees.creativeUnit;
    const proTotal = proUnit * pro.length;
    return {
      creativeCount: creative.length,
      proCount: pro.length,
      proUnit: proUnit,
      creativeTotal: creativeTotal,
      proTotal: proTotal,
      total: creativeTotal + proTotal,
    };
  },
  maxUrl(payload) {
    const cfg = window.RP_CONFIG;
    const params = new URLSearchParams(window.location.search);
    const utm = {
      ...cfg.utmDefaults,
      utm_source: params.get("utm_source") || cfg.utmDefaults.utm_source,
      utm_medium: params.get("utm_medium") || cfg.utmDefaults.utm_medium,
      utm_campaign: params.get("utm_campaign") || cfg.utmDefaults.utm_campaign,
      utm_content: params.get("utm_content") || payload,
    };
    const start = encodeURIComponent(payload);
    return `${cfg.max.base}${cfg.max.botName}?start=${start}&${new URLSearchParams(utm)}`;
  },
  charityPhrase() {
    const c = window.RP_CONFIG.charity;
    if (c.displayMode === "percent") return `${c.percent}%`;
    return `${c.amountRub.toLocaleString("ru-RU")} ₽`;
  },
};
