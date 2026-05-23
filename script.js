const GOOGLE_REVIEW_URL = "https://g.page/r/CWSE5ipR122uEBE/review";
const MIN_KEYWORDS = 3;
const MAX_KEYWORDS = 5;

const state = {
  lang: detectLanguage(),
  service: "",
  selected: [],
  lastReview: ""
};

const copy = {
  zh: {
    welcomeTitle: "🤍 谢谢你今天的到来",
    welcomeBody: "你的每一个Review，<br>都能帮助更多女生安心找到我们。<br><br>我们已经帮你把Review变简单了 ✨",
    startBtn: "开始写Review",
    stepLanguage: "Step 1",
    languageTitle: "选择你想使用的语言",
    languageBody: "你可以随时在右上角切换中文或英文，Review也会同步转换。",
    continueBtn: "继续",
    stepService: "Step 2",
    serviceTitle: "今天体验的是哪一个服务呢？🤍",
    waxingName: "热蜡美肌 / Waxing",
    waxingSubtitle: "温柔 · 干净 · 安心感",
    lashesName: "嫁接睫毛 / Eyelash Extensions",
    lashesSubtitle: "自然 · 精致 · 素颜也漂亮",
    stepKeywords: "Step 3",
    keywordTitle: "选择3-5个最像你感受的关键词",
    keywordHint: "我们会把它变成一段自然、有温度的Review。",
    autoGenerateBtn: "✨ 一键帮我生成",
    generateReviewBtn: "生成Review",
    backBtn: "返回",
    stepReview: "Step 4",
    reviewTitle: "你的Review已经准备好了 🤍",
    copyBtn: "复制Review",
    anotherBtn: "换一个版本",
    googleBtn: "前往 Google Review",
    editKeywordsBtn: "重新选择关键词",
    minNotice: "请选择至少3个关键词，我们就能帮你生成更自然的Review。",
    maxNotice: "最多选择5个关键词，这样Review会更像真人写的。",
    copied: "🤍 已复制成功"
  },
  en: {
    welcomeTitle: "🤍 Thank you for visiting us today",
    welcomeBody: "Every review you leave<br>helps more women feel safe choosing us.<br><br>We made writing your review simple ✨",
    startBtn: "Start Writing Review",
    stepLanguage: "Step 1",
    languageTitle: "Choose your language",
    languageBody: "You can switch between Chinese and English anytime from the top right. Your review will change with it.",
    continueBtn: "Continue",
    stepService: "Step 2",
    serviceTitle: "Which service did you enjoy today? ✨",
    waxingName: "Waxing",
    waxingSubtitle: "Gentle · Clean · Comfortable",
    lashesName: "Eyelash Extensions",
    lashesSubtitle: "Natural · Soft · Effortlessly Pretty",
    stepKeywords: "Step 3",
    keywordTitle: "Choose 3-5 words that feel most true",
    keywordHint: "We will turn them into a warm, natural review.",
    autoGenerateBtn: "✨ Generate for Me",
    generateReviewBtn: "Generate Review",
    backBtn: "Back",
    stepReview: "Step 4",
    reviewTitle: "Your review is ready 🤍",
    copyBtn: "Copy Review",
    anotherBtn: "Generate Another",
    googleBtn: "Go To Google Review",
    editKeywordsBtn: "Edit Keywords",
    minNotice: "Please choose at least 3 keywords so we can create a more natural review.",
    maxNotice: "You can choose up to 5 keywords, so the review stays natural.",
    copied: "🤍 Review copied successfully"
  }
};

const keywordSets = {
  waxing: {
    zh: [
      "很温柔", "不尴尬", "环境很干净", "比想象中不痛", "老师很细心",
      "过程很舒服", "卫生很安心", "私密感很好", "技术很好", "不会Hard Sell",
      "效果很干净", "毛发变细", "孕妇也安心", "很专业", "会再回来"
    ],
    en: [
      "Gentle", "Comfortable", "Clean Environment", "Less Painful Than Expected", "Very Attentive",
      "Relaxing Experience", "Hygienic", "Felt Safe", "Professional Skill", "No Hard Selling",
      "Very Clean Result", "Hair Grew Finer", "Pregnancy Friendly", "Professional", "Will Come Again"
    ]
  },
  lashes: {
    zh: [
      "很自然", "完全不刺眼", "很轻没有负担", "很舒服", "很持久",
      "整齐度很好", "款式很好看", "老师很有耐心", "素颜也有精神", "眼睛不会不舒服",
      "很适合我", "拍照很好看", "环境很舒服", "不会Hard Sell", "会再回来"
    ],
    en: [
      "Natural Look", "No Irritation", "Lightweight", "Comfortable", "Long Lasting",
      "Neat & Clean", "Beautiful Design", "Patient Technician", "Looks Good Even Barefaced", "Eyes Feel Comfortable",
      "Suits Me Well", "Photogenic", "Cozy Environment", "No Hard Selling", "Will Return Again"
    ]
  }
};

const sentenceBank = {
  zh: {
    waxing: {
      opening: [
        "第一次体验热蜡，本来有一点紧张。",
        "这次来做热蜡，整体感觉比想象中舒服很多。",
        "一直想尝试热蜡，这次体验下来真的很安心。",
        "今天的热蜡体验让我蛮惊喜的。"
      ],
      bridge: [
        "不过整个过程下来，",
        "最让我喜欢的是，",
        "可以感觉到，",
        "从开始到结束，"
      ],
      closing: [
        "整体是很舒服、很安心的一次体验，下次还会再回来 🤍",
        "做完之后效果很干净，也不会有压力感，真的蛮推荐。",
        "如果是第一次尝试热蜡，这里会让人比较放松。",
        "体验比预期好很多，是会想介绍给朋友的地方。"
      ]
    },
    lashes: {
      opening: [
        "这次来做睫毛，完成后的效果很喜欢。",
        "本来担心嫁接睫毛会不舒服，但这次体验很放松。",
        "做完睫毛之后整个人看起来比较有精神。",
        "这次的美睫体验很温柔，也很细致。"
      ],
      bridge: [
        "过程中可以感受到，",
        "我最喜欢的是，",
        "让我觉得加分的是，",
        "整体下来，"
      ],
      closing: [
        "效果自然又精致，素颜也会比较有精神 🤍",
        "整体很舒服，没有压力感，下次还会再来。",
        "款式很适合我，日常看起来也很自然。",
        "是一次很满意的体验，已经想推荐给朋友了。"
      ]
    },
    fragments: {
      "很温柔": ["老师很温柔", "手法很轻柔", "服务过程让人很放松", "会一直照顾我的感受"],
      "不尴尬": ["整个过程完全不会尴尬", "沟通起来很自在", "气氛让人很安心"],
      "环境很干净": ["环境很干净", "空间整理得很舒服", "一进去就觉得很干净明亮"],
      "比想象中不痛": ["比我想象中不痛", "疼痛感在可以接受的范围", "过程比预期轻松很多"],
      "老师很细心": ["老师很细心", "每个步骤都有认真说明", "会一直关心我的感受"],
      "过程很舒服": ["整个过程很舒服", "体验下来很放松", "没有想象中的紧张感"],
      "卫生很安心": ["卫生方面让人很安心", "细节处理得很干净", "可以感觉到她们很重视卫生"],
      "私密感很好": ["私密感很好", "空间安排让人很放心", "不会有不自在的感觉"],
      "技术很好": ["技术很稳定", "手法很熟练", "效果看得出很细致"],
      "不会Hard Sell": ["不会Hard Sell", "没有一直推销", "整个沟通过程很舒服没有压力"],
      "效果很干净": ["做完效果很干净", "处理得很细致", "效果比预期更满意"],
      "毛发变细": ["后续毛发感觉有变细", "维持后的状态也不错", "效果让我觉得值得继续回来"],
      "孕妇也安心": ["孕妇来也会觉得安心", "会特别照顾安全感和舒适度", "过程安排得很贴心"],
      "很专业": ["建议很专业", "流程安排得很专业", "问题都有认真回答"],
      "会再回来": ["之后会想再回来", "下次还会预约", "是会让人想固定来的地方"],
      "很自然": ["效果很自然", "睫毛看起来不会夸张", "完成后很像自己原本就好看"],
      "完全不刺眼": ["完全不刺眼", "眼睛没有不舒服", "过程中没有明显刺激感"],
      "很轻没有负担": ["睫毛很轻没有负担", "戴起来不会厚重", "眼睛不会觉得被压住"],
      "很舒服": ["整个过程很舒服", "几乎可以放松到睡着", "完成后眼睛也很舒服"],
      "很持久": ["维持度很不错", "效果很持久", "过了一段时间还是很好看"],
      "整齐度很好": ["整齐度很好", "细节处理得很干净", "每一根看起来都很顺"],
      "款式很好看": ["款式很好看", "设计很适合我的眼型", "做出来的弧度很漂亮"],
      "老师很有耐心": ["老师很有耐心", "会慢慢沟通适合的款式", "不会急着完成而忽略感受"],
      "素颜也有精神": ["素颜也会比较有精神", "不用化妆也看起来比较亮眼", "日常出门方便很多"],
      "眼睛不会不舒服": ["眼睛不会不舒服", "完成后没有异物感", "睁眼闭眼都很自然"],
      "很适合我": ["整体很适合我", "款式和我的感觉很搭", "效果刚好是我想要的自然感"],
      "拍照很好看": ["拍照也很好看", "上镜效果很自然", "照片里眼睛看起来更有神"],
      "环境很舒服": ["环境很舒服", "氛围安静放松", "待在里面很自在"]
    }
  },
  en: {
    waxing: {
      opening: [
        "It was my first waxing experience, and I was honestly a little nervous.",
        "I came in for waxing today and it felt much more comfortable than I expected.",
        "I had been wanting to try waxing for a while, and this visit made me feel really safe.",
        "My waxing session today was such a pleasant surprise."
      ],
      bridge: [
        "What I appreciated most was that",
        "Throughout the session,",
        "From start to finish,",
        "It really felt like"
      ],
      closing: [
        "Overall, it was a comfortable and reassuring experience. I would definitely come back 🤍",
        "The result was clean, and the whole experience felt calm and pressure-free.",
        "If it is your first waxing experience, this place makes it feel much easier.",
        "It was better than I expected, and I would happily recommend it."
      ]
    },
    lashes: {
      opening: [
        "I came in for eyelash extensions and really loved the final look.",
        "I was worried eyelash extensions might feel uncomfortable, but the session was very relaxing.",
        "After getting my lashes done, my eyes looked brighter even without makeup.",
        "This lash appointment felt gentle, detailed, and very comfortable."
      ],
      bridge: [
        "What stood out to me was that",
        "During the session,",
        "I really liked that",
        "Overall,"
      ],
      closing: [
        "The result looks natural and soft, perfect even on no-makeup days 🤍",
        "It was comfortable and pressure-free. I would definitely come back.",
        "The style suits me really well and still looks natural for everyday wear.",
        "I am really happy with the experience and would recommend it to friends."
      ]
    },
    fragments: {
      "Gentle": ["the staff was very gentle", "the service felt soft and caring", "they made the whole process feel easy"],
      "Comfortable": ["the session felt comfortable", "I felt relaxed throughout", "the experience was much calmer than I expected"],
      "Clean Environment": ["the environment was very clean", "the space felt bright and well kept", "everything looked clean and organized"],
      "Less Painful Than Expected": ["it was less painful than I expected", "the discomfort was very manageable", "it felt much easier than I imagined"],
      "Very Attentive": ["they kept checking on how I felt", "the staff was very attentive", "every step was explained clearly"],
      "Relaxing Experience": ["the experience was surprisingly relaxing", "I felt calm during the session", "the whole process felt peaceful"],
      "Hygienic": ["the hygiene made me feel safe", "they clearly cared about cleanliness", "the details felt very hygienic"],
      "Felt Safe": ["I felt safe the whole time", "the session felt reassuring", "they made me feel well taken care of"],
      "Professional Skill": ["the technique felt very professional", "the staff was skilled and steady", "the result showed great skill"],
      "No Hard Selling": ["there was no hard selling", "I never felt pressured to buy anything", "the conversation felt comfortable and honest"],
      "Very Clean Result": ["the result was very clean", "the finishing was neat", "the final result was exactly what I hoped for"],
      "Hair Grew Finer": ["my hair felt finer after coming back", "the after-effect made me want to continue", "the result felt worth maintaining"],
      "Pregnancy Friendly": ["it felt pregnancy friendly", "they were extra careful and considerate", "they paid attention to comfort and safety"],
      "Professional": ["the advice felt professional", "they answered my questions clearly", "the whole flow was well handled"],
      "Will Come Again": ["I will come again", "I would book another session", "this is a place I would return to"],
      "Natural Look": ["the result looks very natural", "the lashes do not look overdone", "it looks effortlessly pretty"],
      "No Irritation": ["there was no irritation", "my eyes did not sting", "my eyes felt comfortable throughout"],
      "Lightweight": ["the lashes feel lightweight", "they do not feel heavy at all", "my eyes do not feel weighed down"],
      "Long Lasting": ["the lashes lasted well", "the retention was really nice", "the result still looked good after some time"],
      "Neat & Clean": ["the lashes looked neat and clean", "the details were very tidy", "each lash looked well placed"],
      "Beautiful Design": ["the design was beautiful", "the style matched my eye shape", "the curl and shape were really pretty"],
      "Patient Technician": ["the technician was patient", "they took time to understand what I wanted", "they explained the style options clearly"],
      "Looks Good Even Barefaced": ["it looks good even barefaced", "my eyes look brighter without makeup", "it makes daily mornings easier"],
      "Eyes Feel Comfortable": ["my eyes feel comfortable", "there is no heavy or poking feeling", "the lashes feel natural when I blink"],
      "Suits Me Well": ["the style suits me well", "the final look fits my face", "it was exactly the natural look I wanted"],
      "Photogenic": ["it looks beautiful in photos", "my eyes look more defined in pictures", "the result is very photogenic"],
      "Cozy Environment": ["the environment was cozy", "the atmosphere felt calm", "the space made me feel relaxed"],
      "Will Return Again": ["I will return again", "I would book my next appointment here", "I definitely want to come back"]
    }
  }
};

const pages = document.querySelectorAll(".page");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const langButtons = document.querySelectorAll(".lang-btn");
const serviceButtons = document.querySelectorAll(".service-card");
const tagGrid = document.querySelector("#tagGrid");
const keywordCount = document.querySelector("#keywordCount");
const notice = document.querySelector("#notice");
const reviewText = document.querySelector("#reviewText");
const reviewCard = document.querySelector(".review-glass");
const toast = document.querySelector("#toast");

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.next));
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.back));
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.service = button.dataset.service;
    state.selected = [];
    renderKeywords();
    showPage("keywords");
  });
});

document.querySelector("#autoPickBtn").addEventListener("click", autoPickKeywords);
document.querySelector("#generateBtn").addEventListener("click", handleGenerate);
document.querySelector("#copyBtn").addEventListener("click", copyReview);
document.querySelector("#anotherBtn").addEventListener("click", () => {
  reviewText.textContent = generateReview();
  pulseReviewCard();
});
document.querySelector("#googleBtn").addEventListener("click", () => {
  window.open(GOOGLE_REVIEW_URL, "_blank");
});

setLanguage(state.lang);

function detectLanguage() {
  const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  return browserLang.startsWith("zh") ? "zh" : "en";
}

function setLanguage(lang) {
  const previousLang = state.lang;

  if (state.service && previousLang !== lang && state.selected.length) {
    const previousKeywords = keywordSets[state.service][previousLang];
    const nextKeywords = keywordSets[state.service][lang];
    state.selected = state.selected
      .map((keyword) => previousKeywords.indexOf(keyword))
      .filter((index) => index >= 0)
      .map((index) => nextKeywords[index]);
  }

  state.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    node.innerHTML = copy[lang][key];
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  if (state.service) {
    renderKeywords();
  }

  if (reviewText.textContent.trim()) {
    reviewText.textContent = generateReview();
  }
}

function showPage(pageName) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });
  notice.textContent = "";
}

function renderKeywords() {
  tagGrid.innerHTML = "";
  notice.textContent = "";

  keywordSets[state.service][state.lang].forEach((keyword) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tag-btn";
    button.textContent = keyword;
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => toggleKeyword(keyword, button));
    tagGrid.appendChild(button);
  });

  updateKeywordCount();
}

function toggleKeyword(keyword, button) {
  const hasKeyword = state.selected.includes(keyword);

  if (hasKeyword) {
    state.selected = state.selected.filter((item) => item !== keyword);
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
    notice.textContent = "";
  } else {
    if (state.selected.length >= MAX_KEYWORDS) {
      notice.textContent = copy[state.lang].maxNotice;
      return;
    }

    state.selected.push(keyword);
    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
    notice.textContent = "";
  }

  updateKeywordCount();
}

function updateKeywordCount() {
  keywordCount.textContent = `${state.selected.length} / ${MAX_KEYWORDS}`;
}

function autoPickKeywords() {
  const keywords = shuffle(keywordSets[state.service][state.lang]);
  const count = randomBetween(3, 4);
  state.selected = keywords.slice(0, count);

  document.querySelectorAll(".tag-btn").forEach((button) => {
    const selected = state.selected.includes(button.textContent);
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  notice.textContent = "";
  updateKeywordCount();
}

function handleGenerate() {
  if (state.selected.length < MIN_KEYWORDS) {
    notice.textContent = copy[state.lang].minNotice;
    return;
  }

  reviewText.textContent = generateReview();
  showPage("review");
  pulseReviewCard();
}

function generateReview() {
  let review = buildReview();
  let attempts = 0;

  while (review === state.lastReview && attempts < 8) {
    review = buildReview();
    attempts += 1;
  }

  state.lastReview = review;
  return review;
}

function buildReview() {
  const bank = sentenceBank[state.lang];
  const serviceBank = bank[state.service];
  const fragments = shuffle(state.selected)
    .slice(0, MAX_KEYWORDS)
    .map((keyword) => pick(bank.fragments[keyword]))
    .filter(Boolean);

  const firstPart = fragments.slice(0, 2).join(state.lang === "zh" ? "，" : ", and ");
  const secondPart = fragments.slice(2).join(state.lang === "zh" ? "，" : ", and ");

  if (state.lang === "zh") {
    const middle = secondPart
      ? `${pick(serviceBank.bridge)}${firstPart}。\n\n另外，${secondPart}。`
      : `${pick(serviceBank.bridge)}${firstPart}。`;
    return `${pick(serviceBank.opening)}\n\n${middle}\n\n${pick(serviceBank.closing)}`;
  }

  const middle = secondPart
    ? `${pick(serviceBank.bridge)} ${firstPart}.\n\nI also noticed that ${secondPart}.`
    : `${pick(serviceBank.bridge)} ${firstPart}.`;
  return `${pick(serviceBank.opening)}\n\n${middle}\n\n${pick(serviceBank.closing)}`;
}

async function copyReview() {
  const text = reviewText.textContent.trim();

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  showToast(copy[state.lang].copied);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function pulseReviewCard() {
  reviewCard.classList.remove("refresh");
  window.requestAnimationFrame(() => {
    reviewCard.classList.add("refresh");
  });
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
