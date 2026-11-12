/**
 * BANGLADESH GOVERNMENT NATIONAL AI PORTAL (ai.gov.bd)
 * Interactive Controller Script
 */

// State Management
const state = {
  lang: 'bn', // 'bn' or 'en'
  fontSizeStep: 0, // -1, 0, +1
  highContrast: false,
  tickerPlaying: true,
  currentSlide: 0,
  pollVoted: false,
  visitorCountToday: 4328,
  visitorCountTotal: 1284752
};

// Conversational AI Knowledge Base for "PROGNA" (প্রজ্ঞা)
const aiKnowledgeBase = {
  bn: {
    passport: `গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের 'প্রজ্ঞা' এআই সহকারী থেকে তথ্য:\n\n১. আবেদন প্রক্রিয়া: সরাসরি epassport.gov.bd পোর্টালে অনলাইন ফরম পূরণ করুন।\n২. প্রয়োজনীয় ডকুমেন্টস: জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্মনিবন্ধন সনদ (BRC), পূর্ববর্তী পাসপোর্ট (যদি থাকে)।\n৩. সাধারণ ফি (৪৮ পৃষ্ঠা, ৫ বছর): নিয়মিত ৪,০২৫ টাকা (১৫ কার্যদিবস), জরুরি ৬,৩২৫ টাকা (৭ কার্যদিবস)।\n৪. বায়োমেট্রিক: অনলাইনে আবেদন শেষে অ্যাপয়েন্টমেন্টের দিন নিকটস্থ আঞ্চলিক পাসপোর্ট অফিসে ছবি ও আঙুলের ছাপ প্রদান করতে হবে।`,
    tin: `ই-টিন (e-TIN) সংক্রান্ত সরকারি নির্দেশিকা:\n\n১. জাতীয় রাজস্ব বোর্ডের ওয়েবসাইট incometax.gov.bd-এ প্রবেশ করে রেজিস্টার করুন।\n২. NID নম্বর ও জন্মতারিখ প্রদান করলেই নির্বাচন কমিশনের ডাটাবেস থেকে স্বয়ংক্রিয়ভাবে তথ্য যাচাই হয়ে তাৎক্ষণিক ১২ সংখ্যার e-TIN সার্টিফিকেট ডাউনলোড করা যাবে।\n৩. কোনো ধরনের সরকারি ফি প্রদান করতে হয় না; সেবাটি সম্পূর্ণ বিনামূল্যে তাৎক্ষণিক পাওয়া যায়।`,
    land: `স্মার্ট ভূমি সেবা ও নামজারি (ই-নামজারি) নিয়মাবলী:\n\n১. ওয়েবসাইট: land.gov.bd অথবা mutation.land.gov.bd\n২. নামজারি কোর্ট ফি: ২০ টাকা + নোটিশ জারি ফি: ৫০ টাকা।\n৩. রেকর্ড সংশোধন ফি: ১,০০০ টাকা + খতিয়ান ফি: ১০০ টাকা (সর্বমোট সরকারি ফি ১,১৭০ টাকা)।\n৪. সর্বোচ্চ ২৮ কার্যদিবসের মধ্যে সহকারী কমিশনার (ভূমি) অফিস কর্তৃক আবেদন নিষ্পত্তি করার বাধ্যবাধকতা রয়েছে।`,
    nid: `জাতীয় পরিচয়পত্র (NID) সংশোধন ও সেবা সংক্রান্ত তথ্য:\n\n১. সেবা পোর্টাল: services.nidw.gov.bd\n২. নিজের নাম বা জন্মতারিখ সংশোধনের জন্য এসএসসি সনদ, অনলাইন জন্মসনদ এবং পাসপোর্ট/ড্রাইভিং লাইসেন্স আপলোড করতে হয়।\n৩. ফি: 'ক' শ্রেণির সংশোধনের জন্য সরকারি ফি ভ্যাটসহ ৩৪৫ টাকা (বিকাশ/রকেট/নগদ এর মাধ্যমে প্রদেয়)।\n৪. আবেদন অনুমোদনের পর অনলাইন থেকেই নতুন সংশোধিত ডিজিটাল এনআইডি ডাউনলোড করা সম্ভব।`,
    guideline: `সরকারি কাজে কৃত্রিম বুদ্ধিমত্তা (AI) ব্যবহারের জাতীয় নির্দেশিকা ২০২৬:\n\n১. ডেটা সার্বভৌমত্ব: সকল সরকারি তথ্য বাংলাদেশ ন্যাশনাল ডেটা সেন্টারে সংরক্ষিত থাকতে হবে; কোনো গোপনীয় সরকারি নথি বিদেশি সার্ভারে প্রসেস করা নিষিদ্ধ।\n২. অ্যালগরিদমিক জবাবদিহিতা: নাগরিক সংক্রান্ত যে কোনো স্বয়ংক্রিয় সিদ্ধান্তে চূড়ান্ত অনুমোদন সংশ্লিষ্ট প্রশাসনিক কর্মকর্তার থাকতে হবে।\n৩. পক্ষপাতহীনতা ও অন্তর্ভুক্তি: প্রান্তিক ও গ্রামীণ জনগোষ্ঠীর সেবা নিশ্চিতে বাংলা ভাষায় ভয়েস ও টেক্সট উভয়ের সমতা নিশ্চিতকরণ।`,
    default: `ধন্যবাদ আপনার প্রশ্নের জন্য। গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের জাতীয় এআই সহকারী 'প্রজ্ঞা' আপনার সেবায় নিয়োজিত। আপনার উল্লেখিত বিষয়ে বিস্তারিত নির্দেশিকা ও সার্কুলার জানতে সংশ্লিষ্ট সরকারি অধিদপ্তর বা ৩৩৩ নম্বরে কল করে তাৎক্ষণিক নাগরিক সেবা গ্রহণ করতে পারেন। আপনি চাইলে পাসপোর্ট, এনআইডি, ই-নামজারি, কর বা সরকারি এআই নির্দেশিকা বিষয়ে যেকোনো নির্দিষ্ট প্রশ্ন করতে পারেন।`
  },
  en: {
    passport: `Information from National AI Assistant 'PROGNA':\n\n1. Application: Apply online directly via epassport.gov.bd.\n2. Documents: Original National ID (NID) or online Birth Certificate (BRC), previous passport if available.\n3. Standard Fees (48 pages, 5 years): Regular BDT 4,025 (15 working days); Express BDT 6,325 (7 working days).\n4. Biometrics: Visit your local Regional Passport Office (RPO) on the appointed date for fingerprint & photo capture.`,
    tin: `Official e-TIN Registration Guidelines:\n\n1. Visit the National Board of Revenue portal at incometax.gov.bd.\n2. Provide your 10 or 17 digit NID number and date of birth.\n3. The system verifies identity via Election Commission API and generates your official 12-digit e-TIN certificate instantly.\n4. Official Fee: Free of cost (No government fees required).`,
    land: `Smart Land Mutation (e-Namjari) Procedure:\n\n1. Official Portal: land.gov.bd or mutation.land.gov.bd.\n2. Standard Govt Fees: Court fee 20 BDT + Notice fee 50 BDT + Record Correction fee 1,000 BDT + Khatian copy fee 100 BDT (Total BDT 1,170).\n3. Citizens do not need to pay any additional processing fees.\n4. Mandated resolution timeframe is maximum 28 working days by the AC (Land) office.`,
    nid: `National Identity Card (NID) Correction Assistance:\n\n1. Portal: services.nidw.gov.bd\n2. Documentation: SSC Certificate, digital birth registration certificate, and passport/driving license.\n3. Government fee: BDT 345 (inclusive of 15% VAT for Type-A correction) payable via bKash/Nagad/Rocket.\n4. Once verified, download the updated digital NID directly from the portal.`,
    guideline: `National Guidelines for AI Adoption in Public Sector 2026:\n\n1. Data Sovereignty: All sensitive administrative data must remain localized in the Tier-IV National Data Center.\n2. Human-in-the-Loop: Automated AI recommendations must be authorized by an executive officer before administrative execution.\n3. Ethical Compliance: Elimination of demographic bias and ensuring complete transparency under ISO/IEC 42001.`,
    default: `Thank you for your inquiry. Bangladesh Government's National AI Assistant 'PROGNA' is at your service. For administrative circulars and public services, you can also dial 333 (Toll Free). Feel free to ask about e-Passport, NID, Land Mutation, e-TIN, or National AI Policies.`
  }
};

// Sample Circular Texts for the Document Summarizer
const sampleCirculars = {
  1: {
    bn: `গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ
নীতি ও প্রবৃদ্ধি অনুবিভাগ
স্মারক নং: ৫৬.০০.০০০০.০৭২.২২.০০৪.২৬; তারিখ: ১২ নভেম্বর ২০২৬

পরিপত্র
বিষয়: সরকারি দপ্তরসমূহে জেনারেটিভ এআই এবং লার্জ ল্যাঙ্গুয়েজ মডেল (LLM) ব্যবহারের ক্ষেত্রে পালনীয় আচরণবিধি ও নিরাপত্তা নির্দেশিকা।

১. উপযুক্ত বিষয়ের প্রেক্ষিতে জানানো যাচ্ছে যে, প্রশাসনিক কার্যক্রমে গতিশীলতা ও সেবার গুণগত মান বৃদ্ধির লক্ষ্যে সরকারি কর্মকর্তাগণ দাপ্তরিক খসড়া প্রস্তুত, নথি সারসংক্ষেপ এবং তথ্য বিশ্লেষণে কৃত্রিম বুদ্ধিমত্তার সহায়তা গ্রহণ করতে পারবেন।
২. তবে জনস্বার্থ ও সাইবার নিরাপত্তা বিবেচনায় নিম্নোক্ত নির্দেশনাসমূহ কঠোরভাবে মান্য করতে হবে:
(ক) 'অতি গোপনীয়' ও 'গোপনীয়' শ্রেণিভুক্ত কোনো সরকারি নথি, আর্থিক নিরীক্ষা কিংবা ব্যক্তিগত সংবেদনশীল তথ্য কোনো বাণিজ্যিক বা উন্মুক্ত পাবলিক ক্লাউড এআই সিস্টেমে ইনপুট করা যাবে না।
(খ) দাপ্তরিক কাজের ক্ষেত্রে শুধুমাত্র বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি) ও আইসিটি বিভাগ অনুমোদিত রাষ্ট্রীয় এআই মডেল 'প্রজ্ঞা' (PROGNA) ব্যবহার করতে হবে।
(গ) কোনো এআই জেনারেটেড খসড়া সরাসরি প্রজ্ঞাপন হিসেবে জারি করা যাবে না; দায়িত্বপ্রাপ্ত কর্মকর্তা কর্তৃক প্রতিটি লাইন যাচাই ও স্বাক্ষর আবশ্যক।`,
    en: `Government of the People's Republic of Bangladesh
Information and Communication Technology Division
Policy & Growth Wing
Memo No: 56.00.0000.072.22.004.26; Date: 12 November 2026

CIRCULAR
Subject: Code of conduct and security guidelines for the deployment of Generative AI and Large Language Models (LLMs) across government offices.

1. In reference to the above subject, government officers may utilize Artificial Intelligence tools for drafting official memos, summarizing lengthy circulars, and analyzing administrative data to augment administrative efficiency.
2. However, in the interest of national cybersecurity and citizen privacy, the following rules must be strictly enforced:
(a) No classified, confidential, financial, or personally identifiable information (PII) may be entered into unverified public commercial AI engines.
(b) Offices must mandate the sovereign state-approved 'PROGNA' AI platform audited by Bangladesh Computer Council (BCC).
(c) No AI-generated output may be issued without manual review and digital signature from the designated executive authority.`
  },
  2: {
    bn: `গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
ভূমি মন্ত্রণালয়
মাঠ প্রশাসন অনুবিভাগ
স্মারক নং: ৩১.০০.০০০০.০৪২.১১.০০৯.২৬; তারিখ: ১০ নভেম্বর ২০২৬

প্রজ্ঞাপন
বিষয়: এআই-ভিত্তিক স্মার্ট খতিয়ান এবং নামজারি প্রক্রিয়া স্বয়ংক্রিয়করণ সংক্রান্ত।

এতদ্বারা সর্বসাধারণের অবগতির জন্য জানানো যাচ্ছে যে, ভূমিসংক্রান্ত জালিয়াতি প্রতিরোধ এবং নাগরিক দুর্ভোগ লাঘবে কৃত্রিম বুদ্ধিমত্তা সমৃদ্ধ স্বয়ংক্রিয় রেকর্ড যাচাই ব্যবস্থা চালু করা হয়েছে। এখন থেকে আবেদনকারী অনলাইনে সিএস, এসএ, আরএস ও সিটি জরিপের খতিয়ান নম্বর প্রবেশ করামাত্র এআই অ্যালগরিদম স্বয়ংক্রিয়ভাবে দাগের খতিয়ান ধারাবাহিকতা যাচাই করে তাৎক্ষণিক প্রাথমিক প্রত্যয়নপত্র প্রস্তুত করবে। সংশ্লিষ্ট ভূমি কর্মকর্তা সর্বোচ্চ ৭ দিনের মধ্যে সরেজমিন তদন্ত প্রতিবেদন এআই পোর্টালে দাখিল করবেন।`,
    en: `Government of the People's Republic of Bangladesh
Ministry of Land
Field Administration Wing
Memo No: 31.00.0000.042.11.009.26; Date: 10 November 2026

NOTIFICATION
Subject: Automation of Smart Land Records and Mutation through Artificial Intelligence.

This is to notify the public that an automated AI-driven land record validation module has been implemented to eradicate record discrepancies and ensure rapid citizen verification. Upon entering CS, SA, RS, and City survey khatian references, the state AI engine automatically cross-references ownership lineage and produces a provisional verification docket. AC (Land) officers are directed to resolve applications within 7 working days.`
  }
};

// Memo Database for PDF Preview Modal
const memoDatabase = {
  1: {
    memo: "৫৬.০০.০০০০.০৭২.২২.০০৪.২৬",
    date: "১২ নভেম্বর ২০২৬",
    subject: "সরকারি দপ্তরসমূহে কৃত্রিম বুদ্ধিমত্তা (AI) প্রয়োগের জাতীয় নির্দেশিকা ২০২৬ সংক্রান্ত পরিপত্র।",
    body: "সরকারি কার্যক্রমে স্বচ্ছতা, জবাবদিহিতা ও দ্রুত নাগরিক সেবা নিশ্চিতে জাতীয় এআই প্ল্যাটফর্ম 'প্রজ্ঞা' চালুর প্রশাসনিক অনুমোদন প্রদান করা হলো। সকল মন্ত্রণালয় ও অধীনস্থ দপ্তরকে তাদের বিদ্যমান সেবাসমূহে এআই এপিআই সংযুক্ত করার অনুরোধ জানানো যাচ্ছে।",
    signatory: "মো: সামিউল হক\nযুগ্মসচিব\nতথ্য ও যোগাযোগ প্রযুক্তি বিভাগ\nফোন: +৮৮০-২-৫৫০০০২২",
    recipient: "১. মন্ত্রিপরিষদ সচিব, মন্ত্রিপরিষদ বিভাগ\n২. সকল সিনিয়র সচিব / সচিব (সকল মন্ত্রণালয়/বিভাগ)\n৩. মহাপরিচালক, বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি)\n৪. প্রকল্প পরিচালক, এটুআই (a2i) প্রোগ্রাম"
  },
  2: {
    memo: "৫৬.০০.০০০০.০৭২.২২.০০৩.২৬",
    date: "০৫ নভেম্বর ২০২৬",
    subject: "জাতীয় সার্বভৌম লার্জ ল্যাঙ্গুয়েজ মডেল 'বন্ধন-বাংলা' উদ্ভাবনী প্রকল্পের ফান্ডিং অনুমোদন।",
    body: "বাংলা ভাষা ও আঞ্চলিক উপভাষাসমূহের ব্যাকরণগত সমৃদ্ধি ধরে রেখে রাষ্ট্রীয় মডেল হিসেবে 'বন্ধন' এআই সিস্টেম উন্নয়নের জন্য বাজেট বরাদ্দের সরকারি আদেশ জারি করা হলো।",
    signatory: "তানিয়া সুলতানা\nউপসচিব\nবাজেট অনুবিভাগ",
    recipient: "১. প্রধান হিসাবরক্ষণ কর্মকর্তা, আইসিটি বিভাগ\n২. নির্বাহী পরিচালক, বিসিসি"
  },
  3: {
    memo: "০৪.০০.০০০০.৫১১.০৮.০১৫.২৬",
    date: "২৮ অক্টোবর ২০২৬",
    subject: "নাগরিক তথ্যের সুরক্ষা ও সাইবার ইন্টেলিজেন্সে এআই ব্যবহারের মানদণ্ড।",
    body: "জাতীয় সাইবার নিরাপত্তা এজেন্সি এবং আইসিটি বিভাগের যৌথ পরিচালনায় সরকারি ডেটা সুরক্ষায় রিয়েল-টাইম থ্রেট ডিটেকশন এআই অ্যালগরিদম সক্রিয় করার প্রজ্ঞাপন।",
    signatory: "ড. খোন্দকার মোস্তাক আহমেদ\nঅতিরিক্ত সচিব",
    recipient: "১. সচিব, স্বরাষ্ট্র মন্ত্রণালয়\n২. সকল বিভাগীয় কমিশনার"
  }
};

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initAccessibility();
  initHeroSlider();
  initNewsTicker();
  initChatbot();
  initSummarizer();
  initNoticeTabs();
  initNationalAnthem();
  initPoll();
  initPopupModal();
  initPdfModal();
  initVisitorCounter();
});

// ==========================================================================
// 1. LANGUAGE SWITCHER (BANGLA <-> ENGLISH)
// ==========================================================================
function initLanguageSwitcher() {
  const switchBtn = document.getElementById('langSwitchBtn');
  if (!switchBtn) return;

  switchBtn.addEventListener('click', () => {
    state.lang = state.lang === 'bn' ? 'en' : 'bn';
    applyLanguage(state.lang);
  });
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  
  // Toggle all elements with data-bn and data-en
  document.querySelectorAll('[data-bn]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.innerText = text;
      }
    }
  });

  const langBtn = document.getElementById('langSwitchBtn');
  if (langBtn) {
    langBtn.innerHTML = lang === 'bn' 
      ? '🌐 <span>English</span>' 
      : '🌐 <span>বাংলা</span>';
  }

  // Update dates
  const dateEl = document.getElementById('currentDateText');
  if (dateEl) {
    dateEl.innerText = lang === 'bn'
      ? 'বৃহস্পতিবার, ১২ নভেম্বর ২০২৬ | ২৭ কার্তিক ১৪৩৩ বঙ্গাব্দ'
      : 'Thursday, 12 November 2026 | 27 Kartik 1433';
  }
}

// ==========================================================================
// 2. ACCESSIBILITY CONTROLS
// ==========================================================================
function initAccessibility() {
  const btnDec = document.getElementById('btnFontDec');
  const btnReset = document.getElementById('btnFontReset');
  const btnInc = document.getElementById('btnFontInc');
  const btnContrast = document.getElementById('btnContrast');

  btnDec?.addEventListener('click', () => adjustFontSize(-1));
  btnReset?.addEventListener('click', () => adjustFontSize(0));
  btnInc?.addEventListener('click', () => adjustFontSize(1));

  btnContrast?.addEventListener('click', () => {
    state.highContrast = !state.highContrast;
    document.body.classList.toggle('high-contrast', state.highContrast);
  });
}

function adjustFontSize(delta) {
  if (delta === 0) {
    state.fontSizeStep = 0;
    document.body.style.fontSize = '15px';
  } else {
    state.fontSizeStep = Math.max(-2, Math.min(3, state.fontSizeStep + delta));
    const newSize = 15 + (state.fontSizeStep * 1.5);
    document.body.style.fontSize = `${newSize}px`;
  }
}

// ==========================================================================
// 3. HERO SLIDER CAROUSEL
// ==========================================================================
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot-btn');
  if (!slides.length) return;

  function goToSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    state.currentSlide = idx;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide') || '0', 10);
      goToSlide(idx);
    });
  });

  // Auto rotation every 6 seconds
  setInterval(() => {
    const nextIdx = (state.currentSlide + 1) % slides.length;
    goToSlide(nextIdx);
  }, 6000);
}

// ==========================================================================
// 4. BREAKING NEWS TICKER
// ==========================================================================
function initNewsTicker() {
  const marquee = document.getElementById('tickerMarquee');
  const toggleBtn = document.getElementById('tickerToggleBtn');
  if (!marquee || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    state.tickerPlaying = !state.tickerPlaying;
    marquee.style.animationPlayState = state.tickerPlaying ? 'running' : 'paused';
    toggleBtn.innerText = state.tickerPlaying ? '⏸' : '▶';
  });
}

// ==========================================================================
// 5. CITIZEN SERVICE AI CHATBOT ("PROGNA" / প্রজ্ঞা)
// ==========================================================================
function initChatbot() {
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('btnChatSend');
  const messagesBox = document.getElementById('chatMessagesArea');
  const chips = document.querySelectorAll('.ai-prompt-chip');

  if (!chatInput || !sendBtn || !messagesBox) return;

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.innerText = sender === 'bot' ? 'প্র' : 'না';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerText = text;

    if (sender === 'bot') {
      const meta = document.createElement('div');
      meta.className = 'msg-meta';
      
      const audioBtn = document.createElement('button');
      audioBtn.className = 'btn-msg-audio';
      audioBtn.innerHTML = '🔊 <span>পড়ে শুনুন</span>';
      audioBtn.onclick = () => speakText(text);

      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn-msg-audio';
      copyBtn.innerHTML = '📋 <span>কপি</span>';
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(text);
        copyBtn.innerHTML = '✅ <span>কপি সম্পন্ন</span>';
        setTimeout(() => copyBtn.innerHTML = '📋 <span>কপি</span>', 2000);
      };

      meta.appendChild(audioBtn);
      meta.appendChild(copyBtn);
      bubble.appendChild(meta);
    }

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function handleUserQuery(query) {
    if (!query.trim()) return;

    appendMessage('user', query);
    chatInput.value = '';

    // Typing simulation placeholder
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg bot';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
      <div class="chat-avatar">প্র</div>
      <div class="msg-bubble" style="font-style:italic; color:#666;">
        ${state.lang === 'bn' ? 'প্রজ্ঞা সরকারি তথ্যকোষ অনুসন্ধান করছে...' : 'PROGNA is analyzing government repositories...'}
      </div>
    `;
    messagesBox.appendChild(typingIndicator);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const botResponse = generateBotResponse(query);
      appendMessage('bot', botResponse);
    }, 600);
  }

  sendBtn.addEventListener('click', () => handleUserQuery(chatInput.value));
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserQuery(chatInput.value);
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query') || chip.innerText;
      handleUserQuery(query);
    });
  });
}

function generateBotResponse(query) {
  const q = query.toLowerCase();
  const kb = aiKnowledgeBase[state.lang];

  if (q.includes('পাসপোর্ট') || q.includes('passport') || q.includes('ফি')) {
    return kb.passport;
  } else if (q.includes('টিন') || q.includes('tin') || q.includes('ট্যাক্স') || q.includes('কর')) {
    return kb.tin;
  } else if (q.includes('জমি') || q.includes('নামজারি') || q.includes('খারিজ') || q.includes('land') || q.includes('mutation')) {
    return kb.land;
  } else if (q.includes('এনআইডি') || q.includes('nid') || q.includes('পরিচয়পত্র') || q.includes('আইডি')) {
    return kb.nid;
  } else if (q.includes('নির্দেশিকা') || q.includes('নীতি') || q.includes('guideline') || q.includes('policy') || q.includes('বিধি')) {
    return kb.guideline;
  } else {
    return kb.default;
  }
}

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert('দুঃখিত, আপনার ব্রাউজার স্পিচ সিন্থেসিস সমর্থন করে না।');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.lang === 'bn' ? 'bn-BD' : 'en-US';
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}

// ==========================================================================
// 6. DOCUMENT SUMMARIZER & MEMO DRAFTER
// ==========================================================================
function initSummarizer() {
  const textarea = document.getElementById('docInputText');
  const summarizeBtn = document.getElementById('btnRunSummarize');
  const styleSelect = document.getElementById('summaryStyleSelect');
  const outputBox = document.getElementById('summaryOutputBox');
  const outputText = document.getElementById('summaryResultText');
  const loadBtn1 = document.getElementById('btnLoadSample1');
  const loadBtn2 = document.getElementById('btnLoadSample2');

  if (!textarea || !summarizeBtn) return;

  loadBtn1?.addEventListener('click', () => {
    textarea.value = sampleCirculars[1][state.lang];
  });

  loadBtn2?.addEventListener('click', () => {
    textarea.value = sampleCirculars[2][state.lang];
  });

  summarizeBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) {
      alert(state.lang === 'bn' ? 'অনুগ্রহ করে সারসংক্ষেপ করার জন্য কোনো সরকারি নথির টেক্সট লিখুন বা নমুনা বাটন চাপুন।' : 'Please enter or load a document text to summarize.');
      return;
    }

    const style = styleSelect?.value || 'simple';
    outputBox.style.display = 'block';

    if (style === 'bullets') {
      outputText.innerHTML = `
        <strong>${state.lang === 'bn' ? 'মূল সিদ্ধান্ত ও গুরুত্বপূর্ণ পয়েন্টসমূহ:' : 'Key Decisions & Action Points:'}</strong>
        <ul style="margin-left: 20px; margin-top: 8px;">
          <li>${state.lang === 'bn' ? 'সরকারি কর্মকর্তাদের প্রশাসনিক গতি বাড়াতে এআই ব্যবহারে বৈধতা প্রদান করা হয়েছে।' : 'Public servants are authorized to utilize audited AI models for administrative productivity.'}</li>
          <li>${state.lang === 'bn' ? 'গোপনীয় সরকারি নথি উন্মুক্ত কমার্শিয়াল এআই প্ল্যাটফর্মে ইনপুট করা সম্পূর্ণ নিষিদ্ধ।' : 'Strict prohibition on processing confidential state data on unauthorized external cloud models.'}</li>
          <li>${state.lang === 'bn' ? 'চূড়ান্ত নথিতে দায়িত্বপ্রাপ্ত নির্বাহী কর্মকর্তার পর্যালোচনা ও স্বাক্ষর বাধ্যতামূলক।' : 'Human verification and executive signature required before issuing any official circular.'}</li>
        </ul>
      `;
    } else if (style === 'draft') {
      outputText.innerHTML = `
        <div style="font-family: monospace; background: #fdf8e6; padding: 10px; border: 1px dashed #d4af37; border-radius: 4px;">
          <strong>স্মারক নং: ৫৬.০০.০৯২.২৬.এআই-ড্রাফট</strong><br/>
          <strong>নোটশীট সারসংক্ষেপ:</strong><br/>
          উক্ত প্রস্তাব পর্যালোচনায় দেখা যায় যে, প্রস্তাবিত সিদ্ধান্তটি জাতীয় তথ্য প্রযুক্তি নীতিমালা ২০২৬ এবং নাগরিক তথ্য সুরক্ষা ফ্রেমওয়ার্কের সাথে সঙ্গতিপূর্ণ। নথিটি সদয় অনুমোদনের জন্য উপস্থাপন করা যেতে পারে।
        </div>
      `;
    } else {
      outputText.innerHTML = `
        <strong>${state.lang === 'bn' ? 'নাগরিকবান্ধব সহজ সারসংক্ষেপ:' : 'Plain Citizen Summary:'}</strong><br/>
        ${state.lang === 'bn' 
          ? 'এই প্রজ্ঞাপনের মূল উদ্দেশ্য হলো সরকারি কাজে কৃত্রিম বুদ্ধিমত্তার যথাযথ ও নিরাপদ প্রয়োগ নিশ্চিত করা। কর্মকর্তা-কর্মচারীগণ দাপ্তরিক কাজে অনুমোদিত রাষ্ট্রীয় এআই ব্যবহার করতে পারবেন, তবে নাগরিকদের ব্যক্তিগত গোপনীয় তথ্য কঠোরভাবে সুরক্ষিত রাখতে হবে এবং কোনো অবস্থাতেই যাচাই ছাড়া নথি জারি করা যাবে না।'
          : 'The core purpose of this circular is to ensure safe, transparent, and sovereign deployment of AI across public offices. Civil servants may use certified government AI platforms while ensuring full compliance with citizen data protection laws.'}
      `;
    }

    outputBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// ==========================================================================
// 7. NOTICE BOARD TABS
// ==========================================================================
function initNoticeTabs() {
  const tabs = document.querySelectorAll('.notice-tab-btn');
  const rows = document.querySelectorAll('.notice-row');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-tab');
      rows.forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
        } else {
          const cat = row.getAttribute('data-category');
          row.style.display = cat === filter ? '' : 'none';
        }
      });
    });
  });
}

// ==========================================================================
// 8. NATIONAL ANTHEM SYNTHESIZER / PLAYER
// ==========================================================================
function initNationalAnthem() {
  const btn = document.getElementById('btnPlayAnthem');
  const status = document.getElementById('anthemStatusText');
  let audioCtx = null;
  let isPlaying = false;
  let synthTimeout = null;

  if (!btn) return;

  btn.addEventListener('click', () => {
    if (isPlaying) {
      stopAnthem();
    } else {
      playAnthemMelody();
    }
  });

  function stopAnthem() {
    isPlaying = false;
    clearTimeout(synthTimeout);
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    btn.innerHTML = '▶ <span>জাতীয় সঙ্গীত শুনুন</span>';
    if (status) status.innerText = 'প্লেয়ার প্রস্তুত';
  }

  function playAnthemMelody() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    } catch (e) {
      alert('ওয়েব অডিও সমর্থিত নয়।');
      return;
    }

    isPlaying = true;
    btn.innerHTML = '⏹ <span>বন্ধ করুন</span>';
    if (status) status.innerText = 'বাজছে: আমার সোনার বাংলা...';

    // Melody notes for Amar Shonar Bangla opening
    // Frequencies (Hz): G4, A4, B4, C5, D5...
    const notes = [
      { f: 392.00, d: 0.4 }, // G4
      { f: 440.00, d: 0.4 }, // A4
      { f: 493.88, d: 0.4 }, // B4
      { f: 523.25, d: 0.6 }, // C5
      { f: 493.88, d: 0.4 }, // B4
      { f: 440.00, d: 0.4 }, // A4
      { f: 392.00, d: 0.8 }, // G4
      { f: 440.00, d: 0.4 }, // A4
      { f: 493.88, d: 0.4 }, // B4
      { f: 392.00, d: 0.4 }, // G4
      { f: 349.23, d: 0.4 }, // F4
      { f: 329.63, d: 0.8 }  // E4
    ];

    let time = audioCtx.currentTime + 0.1;

    notes.forEach(note => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle'; // Warm woodwind-like acoustic tone
      osc.frequency.setValueAtTime(note.f, time);

      gain.gain.setValueAtTime(0.01, time);
      gain.gain.exponentialRampToValueAtTime(0.2, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(time);
      osc.stop(time + note.d);

      time += note.d + 0.08;
    });

    const totalDuration = (time - audioCtx.currentTime) * 1000;
    synthTimeout = setTimeout(() => {
      stopAnthem();
    }, totalDuration);
  }
}

// ==========================================================================
// 9. CITIZEN POLL WIDGET
// ==========================================================================
function initPoll() {
  const submitBtn = document.getElementById('btnSubmitVote');
  const pollOpts = document.getElementById('pollOptionsGroup');
  const pollResults = document.getElementById('pollResultsBox');

  if (!submitBtn || !pollResults) return;

  submitBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="poll_option"]:checked');
    if (!selected) {
      alert(state.lang === 'bn' ? 'অনুগ্রহ করে একটি মতামত নির্বাচন করুন।' : 'Please select an option.');
      return;
    }

    pollOpts.style.display = 'none';
    submitBtn.style.display = 'none';
    pollResults.style.display = 'block';

    setTimeout(() => {
      document.getElementById('pollFillYes').style.width = '84%';
      document.getElementById('pollFillNo').style.width = '11%';
      document.getElementById('pollFillNeutral').style.width = '5%';
    }, 100);
  });
}

// ==========================================================================
// 10. WELCOME / EMERGENCY ANNOUNCEMENT POPUP MODAL
// ==========================================================================
function initPopupModal() {
  const modal = document.getElementById('welcomeModal');
  const closeBtn = document.getElementById('btnCloseModal');
  const ackBtn = document.getElementById('btnModalAcknowledge');
  const dontShow = document.getElementById('chkDontShowModal');

  if (!modal) return;

  const seen = localStorage.getItem('ai_portal_popup_dismissed');
  if (!seen) {
    setTimeout(() => {
      modal.classList.add('active');
    }, 400);
  }

  function dismiss() {
    modal.classList.remove('active');
    if (dontShow?.checked) {
      localStorage.setItem('ai_portal_popup_dismissed', 'true');
    }
  }

  closeBtn?.addEventListener('click', dismiss);
  ackBtn?.addEventListener('click', dismiss);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) dismiss();
  });
}

// ==========================================================================
// 11. PDF MEMO PREVIEW MODAL
// ==========================================================================
function initPdfModal() {
  const modal = document.getElementById('pdfModal');
  const closeBtn = document.getElementById('btnClosePdfModal');
  const memoLinks = document.querySelectorAll('.btn-view-memo');

  if (!modal) return;

  memoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-memo-id') || '1';
      const data = memoDatabase[id] || memoDatabase[1];

      document.getElementById('pdfModalMemoNo').innerText = `স্মারক নং: ${data.memo}`;
      document.getElementById('pdfModalDate').innerText = `তারিখ: ${data.date}`;
      document.getElementById('pdfModalSubject').innerText = `বিষয়: ${data.subject}`;
      document.getElementById('pdfModalBody').innerText = data.body;
      document.getElementById('pdfModalSignatory').innerText = data.signatory;
      document.getElementById('pdfModalRecipients').innerText = data.recipient;

      modal.classList.add('active');
    });
  });

  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

// ==========================================================================
// 12. DYNAMIC VISITOR COUNTER
// ==========================================================================
function initVisitorCounter() {
  const todayEl = document.getElementById('valVisitorToday');
  const totalEl = document.getElementById('valVisitorTotal');

  if (!todayEl || !totalEl) return;

  // Slowly tick up visitor counter
  setInterval(() => {
    state.visitorCountToday += Math.floor(Math.random() * 2) + 1;
    state.visitorCountTotal += Math.floor(Math.random() * 2) + 1;

    todayEl.innerText = state.lang === 'bn' 
      ? toBanglaNumber(state.visitorCountToday) 
      : state.visitorCountToday.toLocaleString();

    totalEl.innerText = state.lang === 'bn' 
      ? toBanglaNumber(state.visitorCountTotal) 
      : state.visitorCountTotal.toLocaleString();
  }, 4000);
}

function toBanglaNumber(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, d => bnDigits[d]);
}
