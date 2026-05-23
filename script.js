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
    languageBody: "选择后再继续，后面关键词和Review都会跟着切换。",
    continueBtn: "Continue",
    stepService: "Step 2",
    serviceTitle: "今天体验的是哪一个服务呢？🤍",
    waxingName: "热蜡美肌 / Waxing",
    waxingSubtitle: "温柔 · 干净 · 安心感",
    lashesName: "嫁接睫毛 / Eyelash Extensions",
    lashesSubtitle: "自然 · 精致 · 素颜也漂亮",
    stepKeywords: "Step 3",
    keywordTitle: "选择3-5个最像你感受的关键词",
    keywordHint: "选真实感受就好，我们会整理成自然的Google Review。",
    generateReviewBtn: "生成Review",
    backBtn: "返回",
    stepReview: "Step 4",
    reviewTitle: "你的Review已经准备好了 🤍",
    reviewNote: "如有其他建议，也可以自行加上 🤍",
    copyBtn: "复制Review",
    anotherBtn: "换一个版本",
    googleBtn: "前往 Google Review",
    editKeywordsBtn: "重新选择关键词",
    minNotice: "请选择至少3个关键词。",
    maxNotice: "最多选择5个关键词，这样Review会比较自然。",
    copied: "🤍 已复制成功"
  },
  en: {
    welcomeTitle: "🤍 Thank you for visiting us today",
    welcomeBody: "Every review you leave<br>helps more women feel safe choosing us.<br><br>We made writing your review simple ✨",
    startBtn: "Start Writing Review",
    stepLanguage: "Step 1",
    languageTitle: "Choose your language",
    languageBody: "Choose before continuing. Keywords and reviews will switch with your language.",
    continueBtn: "Continue",
    stepService: "Step 2",
    serviceTitle: "Which service did you enjoy today? ✨",
    waxingName: "Waxing",
    waxingSubtitle: "Gentle · Clean · Comfortable",
    lashesName: "Eyelash Extensions",
    lashesSubtitle: "Natural · Soft · Effortlessly Pretty",
    stepKeywords: "Step 3",
    keywordTitle: "Choose 3-5 words that feel most true",
    keywordHint: "Pick what feels real. We will turn it into a natural Google Review.",
    generateReviewBtn: "Generate Review",
    backBtn: "Back",
    stepReview: "Step 4",
    reviewTitle: "Your review is ready 🤍",
    reviewNote: "You may also add your own thoughts if you’d like 🤍",
    copyBtn: "Copy Review",
    anotherBtn: "Generate Another",
    googleBtn: "Go To Google Review",
    editKeywordsBtn: "Edit Keywords",
    minNotice: "Please choose at least 3 keywords.",
    maxNotice: "You can choose up to 5 keywords, so the review stays natural.",
    copied: "🤍 Review copied successfully"
  }
};

const keywordSets = {
  lashes: {
    zh: [
      "睫毛很自然",
      "不会太浓",
      "很适合日常",
      "素颜也有精神",
      "款式设计适合眼型",
      "整体很整齐",
      "不会压眼",
      "不会有异物感",
      "过程很舒服",
      "不会刺眼",
      "眼睛不会熏",
      "接完眼睛不会不舒服",
      "持久度不错",
      "维持得很好",
      "掉落率比较少",
      "回去很好整理",
      "会先沟通想要的感觉",
      "老师会给建议",
      "不会乱推荐",
      "不会Hard Sell",
      "很有耐心",
      "环境很舒服",
      "整体体验很好",
      "推荐给喜欢自然款的人",
      "第一次接睫毛可以来试",
      "会根据眼型调整款式",
      "想找舒服型美睫的可以来"
    ],
    en: [
      "Very natural looking lashes",
      "Not too dramatic",
      "Perfect for daily look",
      "Looks good even without makeup",
      "Style suits my eye shape",
      "Overall very neat",
      "Doesn’t feel heavy",
      "No foreign body feeling",
      "Very comfortable process",
      "Eyes didn’t sting",
      "No strong fumes",
      "Eyes felt comfortable after appointment",
      "Retention is quite good",
      "Lasted really well",
      "Minimal fallout",
      "Easy to maintain afterwards",
      "Took time to discuss the style I wanted",
      "Gave helpful suggestions",
      "No hard selling",
      "Very patient",
      "Comfortable environment",
      "Overall great experience",
      "Recommended for natural lash lovers",
      "Great for first-time lash extensions",
      "Style adjusted based on eye shape",
      "Good choice if you prefer comfortable lashes"
    ]
  },
  waxing: {
    zh: [
      "除得很干净",
      "皮肤摸起来很滑",
      "做完清爽很多",
      "长出来的毛比较细",
      "后续比较不会刺刺的",
      "没有想象中痛",
      "过程不会尴尬",
      "很照顾顾客情绪",
      "整体节奏不会太赶",
      "第一次做也不会怕",
      "卫生做得很好",
      "环境很干净",
      "很注重隐私感",
      "过程很专业",
      "孕妇来也会比较安心",
      "不会Hard Sell",
      "老师讲话很温柔",
      "很有耐心",
      "会提醒术后护理",
      "第一次做热蜡的人可以来试",
      "怕尴尬的人会很安心",
      "敏感肌也可以先咨询",
      "想找细心老师的可以来",
      "会想固定回来保养"
    ],
    en: [
      "Very clean results",
      "Skin feels really smooth",
      "Feels much fresher after waxing",
      "Hair grows back finer",
      "Less prickly afterwards",
      "Less painful than expected",
      "Process wasn’t awkward",
      "Very considerate and comforting",
      "Didn’t feel rushed",
      "First-timers can feel comfortable too",
      "Hygiene standards are very good",
      "Clean environment",
      "Privacy is well respected",
      "Professional throughout the process",
      "Pregnant customers can feel more at ease",
      "No hard selling",
      "Very gentle communication",
      "Very patient",
      "Explained aftercare clearly",
      "Recommended for first-time waxing",
      "Good for people who feel shy or nervous",
      "Sensitive skin can consult first",
      "Great if you’re looking for a careful therapist",
      "Would come back regularly for maintenance"
    ]
  }
};

const keywordTranslations = {
  lashes: {
    zhToEn: {
      "睫毛很自然": "Very natural looking lashes",
      "不会太浓": "Not too dramatic",
      "很适合日常": "Perfect for daily look",
      "素颜也有精神": "Looks good even without makeup",
      "款式设计适合眼型": "Style suits my eye shape",
      "整体很整齐": "Overall very neat",
      "不会压眼": "Doesn’t feel heavy",
      "不会有异物感": "No foreign body feeling",
      "过程很舒服": "Very comfortable process",
      "不会刺眼": "Eyes didn’t sting",
      "眼睛不会熏": "No strong fumes",
      "接完眼睛不会不舒服": "Eyes felt comfortable after appointment",
      "持久度不错": "Retention is quite good",
      "维持得很好": "Lasted really well",
      "掉落率比较少": "Minimal fallout",
      "回去很好整理": "Easy to maintain afterwards",
      "会先沟通想要的感觉": "Took time to discuss the style I wanted",
      "老师会给建议": "Gave helpful suggestions",
      "不会乱推荐": "No hard selling",
      "不会Hard Sell": "No hard selling",
      "很有耐心": "Very patient",
      "环境很舒服": "Comfortable environment",
      "整体体验很好": "Overall great experience",
      "推荐给喜欢自然款的人": "Recommended for natural lash lovers",
      "第一次接睫毛可以来试": "Great for first-time lash extensions",
      "会根据眼型调整款式": "Style adjusted based on eye shape",
      "想找舒服型美睫的可以来": "Good choice if you prefer comfortable lashes"
    },
    enToZh: {
      "Very natural looking lashes": "睫毛很自然",
      "Not too dramatic": "不会太浓",
      "Perfect for daily look": "很适合日常",
      "Looks good even without makeup": "素颜也有精神",
      "Style suits my eye shape": "款式设计适合眼型",
      "Overall very neat": "整体很整齐",
      "Doesn’t feel heavy": "不会压眼",
      "No foreign body feeling": "不会有异物感",
      "Very comfortable process": "过程很舒服",
      "Eyes didn’t sting": "不会刺眼",
      "No strong fumes": "眼睛不会熏",
      "Eyes felt comfortable after appointment": "接完眼睛不会不舒服",
      "Retention is quite good": "持久度不错",
      "Lasted really well": "维持得很好",
      "Minimal fallout": "掉落率比较少",
      "Easy to maintain afterwards": "回去很好整理",
      "Took time to discuss the style I wanted": "会先沟通想要的感觉",
      "Gave helpful suggestions": "老师会给建议",
      "No hard selling": "不会Hard Sell",
      "Very patient": "很有耐心",
      "Comfortable environment": "环境很舒服",
      "Overall great experience": "整体体验很好",
      "Recommended for natural lash lovers": "推荐给喜欢自然款的人",
      "Great for first-time lash extensions": "第一次接睫毛可以来试",
      "Style adjusted based on eye shape": "会根据眼型调整款式",
      "Good choice if you prefer comfortable lashes": "想找舒服型美睫的可以来"
    }
  },
  waxing: {
    zhToEn: {
      "除得很干净": "Very clean results",
      "皮肤摸起来很滑": "Skin feels really smooth",
      "做完清爽很多": "Feels much fresher after waxing",
      "长出来的毛比较细": "Hair grows back finer",
      "后续比较不会刺刺的": "Less prickly afterwards",
      "没有想象中痛": "Less painful than expected",
      "过程不会尴尬": "Process wasn’t awkward",
      "很照顾顾客情绪": "Very considerate and comforting",
      "整体节奏不会太赶": "Didn’t feel rushed",
      "第一次做也不会怕": "First-timers can feel comfortable too",
      "卫生做得很好": "Hygiene standards are very good",
      "环境很干净": "Clean environment",
      "很注重隐私感": "Privacy is well respected",
      "过程很专业": "Professional throughout the process",
      "孕妇来也会比较安心": "Pregnant customers can feel more at ease",
      "不会Hard Sell": "No hard selling",
      "老师讲话很温柔": "Very gentle communication",
      "很有耐心": "Very patient",
      "会提醒术后护理": "Explained aftercare clearly",
      "第一次做热蜡的人可以来试": "Recommended for first-time waxing",
      "怕尴尬的人会很安心": "Good for people who feel shy or nervous",
      "敏感肌也可以先咨询": "Sensitive skin can consult first",
      "想找细心老师的可以来": "Great if you’re looking for a careful therapist",
      "会想固定回来保养": "Would come back regularly for maintenance"
    },
    enToZh: {
      "Very clean results": "除得很干净",
      "Skin feels really smooth": "皮肤摸起来很滑",
      "Feels much fresher after waxing": "做完清爽很多",
      "Hair grows back finer": "长出来的毛比较细",
      "Less prickly afterwards": "后续比较不会刺刺的",
      "Less painful than expected": "没有想象中痛",
      "Process wasn’t awkward": "过程不会尴尬",
      "Very considerate and comforting": "很照顾顾客情绪",
      "Didn’t feel rushed": "整体节奏不会太赶",
      "First-timers can feel comfortable too": "第一次做也不会怕",
      "Hygiene standards are very good": "卫生做得很好",
      "Clean environment": "环境很干净",
      "Privacy is well respected": "很注重隐私感",
      "Professional throughout the process": "过程很专业",
      "Pregnant customers can feel more at ease": "孕妇来也会比较安心",
      "No hard selling": "不会Hard Sell",
      "Very gentle communication": "老师讲话很温柔",
      "Very patient": "很有耐心",
      "Explained aftercare clearly": "会提醒术后护理",
      "Recommended for first-time waxing": "第一次做热蜡的人可以来试",
      "Good for people who feel shy or nervous": "怕尴尬的人会很安心",
      "Sensitive skin can consult first": "敏感肌也可以先咨询",
      "Great if you’re looking for a careful therapist": "想找细心老师的可以来",
      "Would come back regularly for maintenance": "会想固定回来保养"
    }
  }
};

const reviewPhrases = {
  zh: {
    lashes: {
      opening: [
        "这次来接睫毛，整体感觉不错。",
        "第一次来做睫毛，过程蛮舒服的。",
        "睫毛做完很自然，是我喜欢的感觉。",
        "这次的美睫体验很好。"
      ],
      fragments: {
        "睫毛很自然": ["睫毛很自然", "效果看起来很自然"],
        "不会太浓": ["不会太浓", "不会看起来太夸张"],
        "很适合日常": ["很适合日常", "平常出门也很自然"],
        "素颜也有精神": ["素颜也比较有精神", "不化妆也看起来精神一点"],
        "款式设计适合眼型": ["款式很适合我的眼型", "设计有根据眼型调整"],
        "整体很整齐": ["整体很整齐", "睫毛排列得很干净"],
        "不会压眼": ["不会压眼", "接完不会觉得厚重"],
        "不会有异物感": ["不会有异物感", "眼睛没有不舒服的感觉"],
        "过程很舒服": ["过程很舒服", "做的过程中蛮放松"],
        "不会刺眼": ["不会刺眼", "过程中眼睛不会刺"],
        "眼睛不会熏": ["眼睛不会熏", "没有很重的熏眼感"],
        "接完眼睛不会不舒服": ["接完眼睛不会不舒服", "做完眼睛还是舒服的"],
        "持久度不错": ["持久度不错", "维持度还不错"],
        "维持得很好": ["维持得很好", "过后状态也保持得不错"],
        "掉落率比较少": ["掉落率比较少", "掉的情况不多"],
        "回去很好整理": ["回去也很好整理", "日常整理很方便"],
        "会先沟通想要的感觉": ["会先沟通想要的感觉", "开始前有认真沟通款式"],
        "老师会给建议": ["老师会给建议", "老师的建议蛮实用"],
        "不会乱推荐": ["不会乱推荐", "不会一直推荐不适合的款式"],
        "不会Hard Sell": ["不会Hard Sell", "没有一直推销"],
        "很有耐心": ["老师很有耐心", "沟通过程很有耐心"],
        "环境很舒服": ["环境很舒服", "店里氛围很放松"],
        "整体体验很好": ["整体体验很好", "整体感觉蛮满意"],
        "推荐给喜欢自然款的人": ["推荐给喜欢自然款的人", "喜欢自然款的可以来"],
        "第一次接睫毛可以来试": ["第一次接睫毛也可以来试", "新手来做也不会有压力"],
        "会根据眼型调整款式": ["会根据眼型调整款式", "款式有配合我的眼型"],
        "想找舒服型美睫的可以来": ["想找舒服型美睫的可以来", "适合想要舒服自然款的人"]
      },
      closing: [
        "整体很舒服，会再回来。",
        "下次还会再来。",
        "喜欢自然款的人可以试试。",
        "整体是会推荐的。"
      ]
    },
    waxing: {
      opening: [
        "第一次来体验热蜡，原本有点紧张。",
        "这次来做热蜡，整体感觉蛮好的。",
        "热蜡做完感觉清爽很多。",
        "这次体验比想象中轻松。"
      ],
      fragments: {
        "除得很干净": ["除得很干净", "效果很干净"],
        "皮肤摸起来很滑": ["皮肤摸起来很滑", "做完皮肤很滑"],
        "做完清爽很多": ["做完清爽很多", "做完感觉舒服很多"],
        "长出来的毛比较细": ["长出来的毛比较细", "后续毛感比较细"],
        "后续比较不会刺刺的": ["后续比较不会刺刺的", "长出来不会那么刺"],
        "没有想象中痛": ["没有想象中痛", "疼痛感比想象中轻"],
        "过程不会尴尬": ["过程不会尴尬", "整个过程蛮自在"],
        "很照顾顾客情绪": ["很照顾顾客情绪", "会留意我的感受"],
        "整体节奏不会太赶": ["整体节奏不会太赶", "过程不会让人觉得赶"],
        "第一次做也不会怕": ["第一次做也不会怕", "第一次来做也蛮安心"],
        "卫生做得很好": ["卫生做得很好", "卫生方面让人放心"],
        "环境很干净": ["环境很干净", "店里看起来很干净"],
        "很注重隐私感": ["很注重隐私感", "隐私感做得不错"],
        "过程很专业": ["过程很专业", "整体流程很专业"],
        "孕妇来也会比较安心": ["孕妇来也会比较安心", "感觉有顾到安全和舒适"],
        "不会Hard Sell": ["不会Hard Sell", "没有一直推销"],
        "老师讲话很温柔": ["老师讲话很温柔", "老师沟通很温柔"],
        "很有耐心": ["老师很有耐心", "过程很有耐心"],
        "会提醒术后护理": ["会提醒术后护理", "做完有说明怎么护理"],
        "第一次做热蜡的人可以来试": ["第一次做热蜡的人可以来试", "第一次体验也不会太有压力"],
        "怕尴尬的人会很安心": ["怕尴尬的人会很安心", "容易害羞的人也会比较放松"],
        "敏感肌也可以先咨询": ["敏感肌也可以先咨询", "有疑问可以先咨询"],
        "想找细心老师的可以来": ["想找细心老师的可以来", "老师蛮细心的"],
        "会想固定回来保养": ["会想固定回来保养", "之后会想继续回来"]
      },
      closing: [
        "整体很舒服，会再回来。",
        "第一次做的人也可以放心试试。",
        "效果不错，也没有压力感。",
        "之后会想固定回来保养。"
      ]
    }
  },
  en: {
    lashes: {
      opening: [
        "First time here for lashes and the experience was nice.",
        "The lash appointment felt comfortable.",
        "The lashes turned out very natural.",
        "I liked the overall lash result."
      ],
      fragments: {
        "Very natural looking lashes": ["the lashes look very natural", "the result looks natural"],
        "Not too dramatic": ["not too dramatic", "not too heavy looking"],
        "Perfect for daily look": ["perfect for a daily look", "easy to wear every day"],
        "Looks good even without makeup": ["looks good even without makeup", "my eyes look fresher without makeup"],
        "Style suits my eye shape": ["the style suits my eye shape", "the design fits my eyes"],
        "Overall very neat": ["overall very neat", "the lashes look clean and neat"],
        "Doesn’t feel heavy": ["doesn’t feel heavy", "doesn’t weigh my eyes down"],
        "No foreign body feeling": ["no foreign body feeling", "my eyes do not feel uncomfortable"],
        "Very comfortable process": ["the process was very comfortable", "the appointment felt relaxing"],
        "Eyes didn’t sting": ["my eyes didn’t sting", "there was no stinging feeling"],
        "No strong fumes": ["there were no strong fumes", "my eyes didn’t feel irritated by fumes"],
        "Eyes felt comfortable after appointment": ["my eyes felt comfortable after the appointment", "my eyes still felt fine after"],
        "Retention is quite good": ["retention is quite good", "the lashes lasted well"],
        "Lasted really well": ["it lasted really well", "the lashes held up nicely"],
        "Minimal fallout": ["fallout was minimal", "not many lashes fell out"],
        "Easy to maintain afterwards": ["easy to maintain afterwards", "simple to take care of at home"],
        "Took time to discuss the style I wanted": ["they took time to discuss the style I wanted", "we talked through the style first"],
        "Gave helpful suggestions": ["they gave helpful suggestions", "the suggestions were useful"],
        "No hard selling": ["no hard selling", "I didn’t feel pressured"],
        "Very patient": ["the staff was very patient", "they were patient throughout"],
        "Comfortable environment": ["the environment was comfortable", "the space felt relaxing"],
        "Overall great experience": ["overall great experience", "the whole experience was good"],
        "Recommended for natural lash lovers": ["recommended for natural lash lovers", "good for people who like natural lashes"],
        "Great for first-time lash extensions": ["great for first-time lash extensions", "a good place for first timers"],
        "Style adjusted based on eye shape": ["the style was adjusted based on my eye shape", "they matched the style to my eyes"],
        "Good choice if you prefer comfortable lashes": ["good choice if you prefer comfortable lashes", "suitable if you want lashes that feel comfortable"]
      },
      closing: [
        "Will come back again.",
        "I would come back for my next appointment.",
        "Good choice if you prefer a natural look.",
        "Overall, I’m happy with it."
      ]
    },
    waxing: {
      opening: [
        "First time here for waxing and it felt comfortable.",
        "The waxing process was better than expected.",
        "Came in for waxing and the result was clean.",
        "The whole waxing appointment felt smooth."
      ],
      fragments: {
        "Very clean results": ["the result was very clean", "the waxing was done cleanly"],
        "Skin feels really smooth": ["my skin feels really smooth", "skin felt smooth after"],
        "Feels much fresher after waxing": ["it felt much fresher after waxing", "I felt fresher after the session"],
        "Hair grows back finer": ["hair grows back finer", "the regrowth feels finer"],
        "Less prickly afterwards": ["less prickly afterwards", "the regrowth felt less prickly"],
        "Less painful than expected": ["less painful than expected", "the pain was manageable"],
        "Process wasn’t awkward": ["the process wasn’t awkward", "I didn’t feel embarrassed"],
        "Very considerate and comforting": ["they were considerate and comforting", "they cared about how I felt"],
        "Didn’t feel rushed": ["it didn’t feel rushed", "the pace was comfortable"],
        "First-timers can feel comfortable too": ["first-timers can feel comfortable too", "it feels okay even for a first timer"],
        "Hygiene standards are very good": ["hygiene standards are very good", "the hygiene made me feel safe"],
        "Clean environment": ["the environment was clean", "the place looked clean"],
        "Privacy is well respected": ["privacy is well respected", "the privacy felt good"],
        "Professional throughout the process": ["professional throughout the process", "the whole process felt professional"],
        "Pregnant customers can feel more at ease": ["pregnant customers can feel more at ease", "they seem careful about comfort and safety"],
        "No hard selling": ["no hard selling", "I didn’t feel pressured"],
        "Very gentle communication": ["communication was very gentle", "the therapist spoke gently"],
        "Very patient": ["the therapist was very patient", "they were patient throughout"],
        "Explained aftercare clearly": ["aftercare was explained clearly", "they explained what to do after"],
        "Recommended for first-time waxing": ["recommended for first-time waxing", "good for first timers"],
        "Good for people who feel shy or nervous": ["good for people who feel shy or nervous", "suitable if you feel nervous"],
        "Sensitive skin can consult first": ["sensitive skin can consult first", "you can ask first if you have sensitive skin"],
        "Great if you’re looking for a careful therapist": ["great if you’re looking for a careful therapist", "good if you want someone careful"],
        "Would come back regularly for maintenance": ["I would come back regularly for maintenance", "I’d come back again for maintenance"]
      },
      closing: [
        "Will come back again.",
        "Good for first timers too.",
        "Overall, it was a comfortable visit.",
        "I’d come back again for maintenance."
      ]
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
    const translationKey = previousLang === "zh" ? "zhToEn" : "enToZh";
    const translations = keywordTranslations[state.service][translationKey];
    state.selected = state.selected
      .map((keyword) => translations[keyword])
      .filter(Boolean)
      .filter((keyword, index, list) => list.indexOf(keyword) === index);
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

    if (state.selected.includes(keyword)) {
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
    }

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
  const bank = reviewPhrases[state.lang][state.service];
  const fragments = shuffle(state.selected)
    .slice(0, MAX_KEYWORDS)
    .map((keyword) => pick(bank.fragments[keyword]))
    .filter(Boolean);

  if (state.lang === "zh") {
    return buildChineseReview(bank, fragments);
  }

  return buildEnglishReview(bank, fragments);
}

function buildChineseReview(bank, fragments) {
  const picked = fragments.slice(0, randomBetween(3, Math.min(4, fragments.length)));
  const lines = [
    pick(bank.opening),
    `${picked.slice(0, 2).join("，")}。`,
    picked[2] ? `${picked.slice(2).join("，")}。` : "",
    pick(bank.closing)
  ];

  return lines.filter(Boolean).join("\n");
}

function buildEnglishReview(bank, fragments) {
  const picked = fragments.slice(0, randomBetween(3, Math.min(4, fragments.length)));
  const lines = [
    pick(bank.opening),
    sentenceCase(`${picked.slice(0, 2).join(", and ")}.`),
    picked[2] ? sentenceCase(`${picked.slice(2).join(", and ")}.`) : "",
    pick(bank.closing)
  ];

  return lines.filter(Boolean).join("\n");
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

function sentenceCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
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
