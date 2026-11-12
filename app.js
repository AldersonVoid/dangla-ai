/**
 * BANGLADESH GOVERNMENT NATIONAL AI PORTAL (ai.gov.bd)
 * Core Interactive Controller Script - NPF V2 / a2i Architecture
 * 
 * Features:
 * 1. Seamless Bilingual Engine (বাংলা ⇄ English) with local persistence & Bengali calendar
 * 2. Conversational AI Assistant "ডংলা এআই" (Dangla AI) with comprehensive government knowledge base,
 *    Web Speech API speech synthesis, speech recognition voice typing, and clipboard utilities
 * 3. D-Nothi / e-Nothi Document Summarizer & Secretariat Memo Drafter with workflow actions
 * 4. Smart Land & Survey (CS / SA / RS / BS / City) Search Simulator & Digital Porcha Generator
 * 5. Authentic Secretariat Notice Board Tab Switcher & Category Filtering (সকল, পরিপত্র, অফিস আদেশ, নীতিমালা, টেন্ডার)
 * 6. Official Government Memorandum PDF Modal Preview with genuine Secretariat layout & signatures (Memos 1-5)
 * 7. National Anthem (আমার সোনার বাংলা) Melodic Synthesizer via Web Audio API with lyrics toggle and progress animation
 * 8. Universal Accessibility Suite (Font scaling A- A A+, high-contrast mode, screen reader support)
 * 9. Emergency Welcome Announcement Popup Modal with localStorage persistence
 * 10. Live Visitor Counter with automated ticking and Interactive Citizen Opinion Poll
 * 11. Header Global Search & Voice Search
 */

// Global language reference for inline event handlers in index.html
const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  window.currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem('bd_portal_lang')) || 'bn';
}

// ==========================================================================
// 1. STATE MANAGEMENT & STORAGE PERSISTENCE
// ==========================================================================
const state = {
  lang: isBrowser ? (window.currentLang || 'bn') : 'bn', // 'bn' | 'en'
  fontSizeStep: (isBrowser && typeof localStorage !== 'undefined') ? parseInt(localStorage.getItem('bd_portal_font_size') || '0', 10) : 0,
  highContrast: (isBrowser && typeof localStorage !== 'undefined') && localStorage.getItem('bd_portal_high_contrast') === 'true',
  tickerPlaying: true,
  currentSlide: 0,
  pollVoted: (isBrowser && typeof localStorage !== 'undefined') && localStorage.getItem('bd_portal_poll_voted') === 'true',
  visitorCountToday: (isBrowser && typeof localStorage !== 'undefined') ? parseInt(localStorage.getItem('bd_portal_visitor_today') || '4328', 10) : 4328,
  visitorCountTotal: (isBrowser && typeof localStorage !== 'undefined') ? parseInt(localStorage.getItem('bd_portal_visitor_total') || '1284752', 10) : 1284752,
  currentSpeechUtterance: null,
  isSpeaking: false,
  activeAnthemAudioCtx: null,
  isAnthemPlaying: false,
  anthemSynthTimer: null,
  anthemProgressInterval: null,
  lastBotMessageText: '',
  isVoiceSearching: false,
  nothiSigned: false
};

// ==========================================================================
// 2. COMPREHENSIVE KNOWLEDGE BASE FOR "Dangla AI" (ডংলা এআই) AI ASSISTANT
// ==========================================================================
const aiKnowledgeBase = {
  bn: {
    identity: `আমি গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সার্বভৌম কৃত্রিম বুদ্ধিমত্তা সহকারী 'ডংলা এআই' (Dangla AI)। বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি) ও আইসিটি বিভাগ কর্তৃক পরিচালিত এবং গাজীপুর টায়ার-৪ জাতীয় ডেটা সেন্টারে সংরক্ষিত এই প্ল্যাটফর্ম নাগরিক সেবা, সরকারি তথ্য ও জাতীয় নীতিমালা সংক্রান্ত সহায়তায় সার্বক্ষণিক নিয়োজিত।`,

    passport: `🏛️ **গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | ই-পাসপোর্ট (e-Passport) নির্দেশিকা**

১. **অনলাইন আবেদন পোর্টাল:** [epassport.gov.bd](https://epassport.gov.bd)
২. **প্রয়োজনীয় কাগজপত্র:**
   - ১৮ বছরের ঊর্ধ্বে: জাতীয় পরিচয়পত্র (NID)।
   - ১৮ বছরের নিচে: অনলাইন ভেরিফায়েড জন্মনিবন্ধন সনদ (BRC) এবং পিতা-মাতার NID।
   - রি-ইস্যুর ক্ষেত্রে: পূর্ববর্তী মূল পাসপোর্ট।
   - সরকারি কর্মচারীদের জন্য: প্রযোজ্য ক্ষেত্রে GO / NOC।
   *(কোনো প্রকার সত্যায়নের প্রয়োজন নেই)*

৩. **সরকারি ফি তালিকা (১৫% ভ্যাট অন্তর্ভুক্ত):**
   • **৪৮ পৃষ্ঠা, ৫ বছর মেয়াদ:**
     - নিয়মিত (১৫ কার্যদিবস): ৪,০২৫/- টাকা
     - জরুরি (৭ কার্যদিবস): ৬,৩২৫/- টাকা
     - অতি জরুরি (২ কার্যদিবস): ৮,৬২৫/- টাকা
   • **৪৮ পৃষ্ঠা, ১০ বছর মেয়াদ:**
     - নিয়মিত: ৫,৭৫০/- টাকা | জরুরি: ৮,০৫০/- টাকা | অতি জরুরি: ১০,৩৫০/- টাকা
   • **৬৪ পৃষ্ঠা, ৫ বছর মেয়াদ:**
     - নিয়মিত: ৬,৩২৫/- টাকা | জরুরি: ৮,৬২৫/- টাকা | অতি জরুরি: ১২,০৭৫/- টাকা
   • **৬৪ পৃষ্ঠা, ১০ বছর মেয়াদ:**
     - নিয়মিত: ৮,০৫০/- টাকা | জরুরি: ১০,৩৫০/- টাকা | অতি জরুরি: ১৩,৮০০/- টাকা

৪. **আবেদন ও বায়োমেট্রিক পদ্ধতি:**
   - অনলাইনে ফরম পূরণ করে এ-চালান (A-Challan) বা মোবাইল ব্যাংকিং (বিকাশ/রকেট) এর মাধ্যমে ফি পরিশোধ করুন।
   - অ্যাপয়েন্টমেন্ট তারিখে নিকটস্থ আঞ্চলিক পাসপোর্ট অফিসে (RPO) গিয়ে ছবি, ১০ আঙুলের ছাপ এবং আইরিশ স্ক্যান প্রদান করুন।
   - পুলিশ ভেরিফিকেশন (SB Verification) সম্পন্ন হলে এসএমএস নোটিফিকেশন পাবেন এবং পাসপোর্ট সংগ্রহ করতে পারবেন।`,

    tin: `🏛️ **জাতীয় রাজস্ব বোর্ড (NBR) | ই-টিন (e-TIN) সনদ নির্দেশিকা**

১. **অফিসিয়াল পোর্টাল:** [incometax.gov.bd](https://incometax.gov.bd)
২. **সরকারি ফি:** **সম্পূর্ণ বিনামূল্যে (০/- টাকা)**। কোনো সরকারি বা প্রক্রিয়াকরণ ফি নেই।
৩. **প্রয়োজনীয় ডকুমেন্টস:**
   - ১০ ডিজিটের স্মার্ট এনআইডি অথবা ১৭ ডিজিটের জাতীয় পরিচয়পত্র নম্বর।
   - সঠিক জন্মতারিখ এবং আবেদনকারীর নিজস্ব সচল মোবাইল নম্বর।
৪. **তাৎক্ষণিক ইস্যুকরণ:**
   - নির্বাচন কমিশনের সেন্ট্রাল সার্ভারের সাথে স্বয়ংক্রিয় এপিআই যাচাইয়ের মাধ্যমে আবেদন জমা দেওয়ার সাথে সাথেই কিউআর কোড (QR Code) সম্বলিত ১২ সংখ্যার অফিসিয়াল ই-টিন সার্টিফিকেট ডাউনলোড করা যায়।
৫. **যেসব ক্ষেত্রে ই-টিন বাধ্যতামূলক:**
   - বার্ষিক আয়কর রিটার্ন দাখিল।
   - ব্যবসা প্রতিষ্ঠানের ট্রেড লাইসেন্স গ্রহণ ও নবায়ন।
   - সিটি কর্পোরেশন এলাকায় জমি, ফ্ল্যাট বা মোটরযান রেজিস্ট্রেশন।
   - ব্যাংকে ক্রেডিট কার্ড বা বাণিজ্যিক ঋণ আবেদন।`,

    land: `🏛️ **ভূমি মন্ত্রণালয় | স্মার্ট ভূমি সেবা ও ই-নামজারি (e-Mutation)**

১. **অফিসিয়াল পোর্টাল:** [land.gov.bd](https://land.gov.bd) অথবা [mutation.land.gov.bd](https://mutation.land.gov.bd)
২. **সর্বোচ্চ সরকারি সেবা ফি: সর্বমোট ১,১৭০/- টাকা**
   - আবেদন কোর্ট ফি: ২০/- টাকা
   - নোটিশ জারি ফি: ৫০/- টাকা
   - রেকর্ড সংশোধন ফি: ১,০০০/- টাকা
   - প্রতি কপি খতিয়ান ফি: ১০০/- টাকা
   *(দালাল বা মধ্যস্বত্বভোগীকে কোনো অতিরিক্ত টাকা দেবেন না)*

৩. **সেবা নিষ্পত্তির সময়সীমা (SLA):**
   - সিটিজেন চার্টার অনুযায়ী সর্বোচ্চ **২৮ কার্যদিবসের** মধ্যে সহকারী কমিশনার (ভূমি) / AC (Land) অফিস কর্তৃক আবেদন নিষ্পত্তি বাধ্যতামূলক।

৪. **আবেদন ও প্রক্রিয়াকরণ ধাপসমূহ:**
   - ক. মূল দলিল, পূর্ববর্তী বায়া দলিল, ওয়ারিশান সনদ (প্রযোজ্য ক্ষেত্রে) স্ক্যান করে অনলাইনে আপলোড করুন।
   - খ. সংশ্লিষ্ট ইউনিয়ন ভূমি সহকারী কর্মকর্তা (নায়েব) সরেজমিন তদন্ত প্রতিবেদন দাখিল করবেন।
   - গ. নির্ধারিত তারিখে এসিল্যান্ড অফিসে শুনানি গ্রহণ।
   - ঘ. আবেদন মঞ্জুর হলে ডিসিআর (DCR) ফি অনলাইনে পরিশোধ করে তাৎক্ষণিক ডিজিটাল খতিয়ান (পর্চা) প্রিন্ট করুন।
৫. **ভূমি হটলাইন:** ১৬১২২ (দিনরাত ২৪ ঘণ্টা সেবা)।`,

    nid: `🏛️ **বাংলাদেশ নির্বাচন কমিশন | জাতীয় পরিচয়পত্র (NID) সংশোধন সেবা**

১. **অফিসিয়াল পোর্টাল:** [services.nidw.gov.bd](https://services.nidw.gov.bd)
২. **ফি বিবরণী (১৫% সরকারি ভ্যাটসহ):**
   - **'ক' শ্রেণি (ব্যক্তিগত তথ্য সংশোধন যেমন নিজের নাম, পিতা/মাতার নাম, জন্মতারিখ):** ৩৪৫/- টাকা।
   - **'খ' শ্রেণি (ঠিকানা সংশোধন):** ২৩০/- টাকা।
   - **'গ' শ্রেণি (একসাথে ব্যক্তিগত তথ্য ও ঠিকানা সংশোধন):** ৩৪৫/- টাকা।
   - **স্মার্ট কার্ড রি-ইস্যু (হারানো বা বিনষ্ট):** নিয়মিত ৩৪৫/- টাকা, জরুরি ৫৭৫/- টাকা।
   *(বিকাশ, রকেট, নগদ বা সোনালী ব্যাংকের মাধ্যমে ফি প্রদেয়)*

৩. **প্রয়োজনীয় প্রমাণক নথিপত্র:**
   - নাম ও জন্মতারিখ সংশোধনে: এসএসসি/সমমান সনদপত্র, অনলাইন ভেরিফায়েড জন্মনিবন্ধন সনদ, পাসপোর্ট/ড্রাইভিং লাইসেন্স।
   - বৈবাহিক অবস্থা ও স্বামী/স্ত্রীর নাম: নিকাহনামা/বিবাহ নিবন্ধন সনদ ও স্বামী/স্ত্রীর এনআইডি কপি।
   - পিতা/মাতার নাম সংশোধন: পিতা ও মাতার এনআইডি কার্ড কপি এবং ওয়ারিশান সনদ।
৪. **হেল্পলাইন:** ১০৫ (NID কল সেন্টার, সকাল ৯টা থেকে বিকেল ৫টা)।`,

    guideline: `🏛️ **ডাক, টেলিযোগাযোগ ও তথ্যপ্রযুক্তি মন্ত্রণালয় | জাতীয় এআই নির্দেশিকা ২০২৬**

১. **সার্বভৌম ডেটা নীতি (Sovereign Data Policy):**
   - বাংলাদেশের সকল নাগরিক তথ্য, সরকারি প্রশাসনিক নথি এবং আর্থিক লেনদেনের ডেটা অবশ্যই কালিয়াকৈর গাজীপুরস্থ **টায়ার-৪ জাতীয় ডেটা সেন্টারে** সংরক্ষিত থাকতে হবে।
   - কোনো রাষ্ট্রীয় বা ব্যক্তিগত সংবেদনশীল তথ্য বিদেশি উন্মুক্ত বাণিজ্যিক ক্লাউড মডেলে ইনপুট করা আইনত দণ্ডনীয়।

২. **হিউম্যান-ইন-দ্য-লুপ (Human-in-the-Loop - HITL) বাধ্যবাধকতা:**
   - নাগরিক অধিকার খর্ব হতে পারে এমন কোনো প্রশাসনিক, বিচারিক বা শাস্তিমূলক সিদ্ধান্ত সম্পূর্ণ স্বয়ংক্রিয় এআই দ্বারা কার্যকর করা যাবে না।
   - প্রতিটি এআই জেনারেটেড সিদ্ধান্তের ক্ষেত্রে দায়িত্বপ্রাপ্ত গেজেটেড কর্মকর্তার সরাসরি যাচাই এবং ডিজিটাল স্বাক্ষর বাধ্যতামূলক।

৩. **নৈতিকতা ও জবাবদিহিতা (ISO/IEC 42001):**
   - অ্যালগরিদমে আঞ্চলিক, লৈঙ্গিক বা বর্ণগত পক্ষপাত প্রতিরোধে নিয়মিত অডিট পরিচালনা।
   - বাংলা ভাষা, সকল আঞ্চলিক উপভাষা এবং ক্ষুদ্র নৃগোষ্ঠীর ভাষার সম-অধিকার নিশ্চিতকরণ।
   - জাতীয় সাইবার নিরাপত্তা এজেন্সি (NCSA) ও বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি) কর্তৃক নিয়মিত নিরাপত্তা নিরীক্ষা।`,

    survey: `🏛️ **ভূমি রেকর্ড ও জরিপ অধিদপ্তর (DLRS) | জরিপ ও খতিয়ান পরিচিতি**

১. **সিএস (CS - Cadastral Survey):** ১৮৮৮ থেকে ১৯৪০ সালের মধ্যে ব্রিটিশ সরকারের আমলে প্রস্তুতকৃত প্রথম পূর্ণাঙ্গ জরিপ ও ভারতচন্দ্রীয় নকশা।
২. **এসএ (SA - State Acquisition Survey):** ১৯৫০ সালের জমিদারি অধিগ্রহণ ও প্রজাস্বত্ব আইন পাসের পর ১৯৫৬-১৯৬৩ সালে জমিদারদের রেকর্ড বিলুপ্ত করে প্রস্তুতকৃত জরিপ।
৩. **আরএস (RS - Revisional Survey):** এসএ জরিপের ভুলত্রুটি সংশোধন করে ১৯৬৫ থেকে ১৯৯০ এর দশক পর্যন্ত পরিচালিত আধুনিক মাঠ জরিপ।
৪. **বিএস / সিটি জরিপ (BS / City Survey):** ১৯৯৮ সাল থেকে চলমান সর্বাধুনিক জরিপ যা বর্তমান ডিজিটাল খতিয়ানের মূল ভিত্তি।
*স্মার্ট ভূমি পোর্টালে সিএস থেকে বিএস পর্যন্ত প্রতিটি দাগ ও খতিয়ানের ধারাবাহিক মিল (Chain of Title) যাচাই করা যায়।*`,

    hotline: `🚨 **গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | জাতীয় জরুরি হেল্পলাইন ও হটলাইনসমূহ**

• 📞 **৯৯৯ (999):** জরুরি সেবা (পুলিশ, ফায়ার সার্ভিস, অ্যাম্বুলেন্স - দিনরাত ২৪ ঘণ্টা টোল ফ্রি)।
• 📞 **৩৩৩ (333):** সরকারি তথ্য, সামাজিক সমস্যা সমাধান ও নাগরিক সেবা কল সেন্টার (টোল ফ্রি)।
• 📞 **১৬১২২ (16122):** স্মার্ট ভূমি সেবা ও খতিয়ান/নামজারি সহায়তা সেল।
• 📞 **১০৫ (105):** বাংলাদেশ নির্বাচন কমিশন জাতীয় পরিচয়পত্র (NID) হেল্পলাইন।
• 📞 **১০৬ (106):** দুর্নীতি দমন কমিশন (দুদক) অভিযোগ হটলাইন।
• 📞 **১০৯ (109):** নারী ও শিশু নির্যাতন প্রতিরোধে জাতীয় হেল্পলাইন।
• 📞 **১০৯০ (1090):** দুর্যোগ ব্যবস্থাপনা ও বন্যা/ঘূর্ণিঝড় সতর্কবার্তা।
• 📞 **৩৩৩১ (3331):** জাতীয় কৃত্রিম বুদ্ধিমত্তা ও সাইবার হেল্পডেস্ক।`,

    default: `আসসালামু আলাইকুম। গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের রাষ্ট্রীয় এআই প্ল্যাটফর্ম 'ডংলা এআই' (Dangla AI) আপনার সেবায় নিয়োজিত।

আপনি সরকারের বিভিন্ন নাগরিক সেবা ও নীতিমালা সংক্রান্ত তথ্য জানতে পারেন:
• **ই-পাসপোর্ট:** পাসপোর্ট আবেদন, সরকারি ফি তালিকা ও আঞ্চলিক অফিস সংক্রান্ত তথ্য।
• **ই-টিন:** বিনামূল্যে তাৎক্ষণিক আয়কর সনদ রেজিস্ট্রেশন প্রক্রিয়া।
• **ই-নামজারি:** ভূমির নামজারি ও জমাভাগ আবেদন, ১,১৭০ টাকার ফি ও ২৮ দিনের এসএলএ।
• **জাতীয় পরিচয়পত্র:** NID নাম/বয়স সংশোধন ফি ও প্রয়োজনীয় প্রমাণক।
• **সরকারি এআই নীতি ২০২৬:** ডেটা সার্বভৌমত্ব, টায়ার-৪ ডেটা সেন্টার ও হিউম্যান-ইন-দ্য-লুপ।

জরুরি সরকারি সহায়তার জন্য কল করুন:
📞 **৩৩৩** (সরকারি তথ্য ও সেবা) | 📞 **১৬১২২** (ভূমি সেবা) | 📞 **১০৫** (এনআইডি সেল) | 📞 **৯৯৯** (জরুরি পুলিশ/ফায়ার/অ্যাম্বুলেন্স)`
  },

  en: {
    identity: `I am 'Dangla AI', the sovereign citizen-service AI assistant of the Government of the People's Republic of Bangladesh. Operated by the Bangladesh Computer Council (BCC) and ICT Division, and hosted at the National Tier-IV Data Center in Gazipur, I am here to assist you with public services, circulars, and government directives 24/7.`,

    passport: `🏛️ **Government of the People's Republic of Bangladesh | e-Passport Guidelines**

1. **Online Application Portal:** [epassport.gov.bd](https://epassport.gov.bd)
2. **Required Documents:**
   - Age 18+: National ID (NID) card.
   - Below 18: Online verified Birth Registration Certificate (BRC) and parents' NIDs.
   - Re-issue: Original previous passport.
   - Government employees: GO / NOC if applicable.
   *(No physical attestation required)*

3. **Official Fee Structure (Inclusive of 15% VAT):**
   • **48 Pages, 5-Year Validity:**
     - Regular (15-21 working days): BDT 4,025
     - Express (7-10 working days): BDT 6,325
     - Super Express (2 working days): BDT 8,625
   • **48 Pages, 10-Year Validity:**
     - Regular: BDT 5,750 | Express: BDT 8,050 | Super Express: BDT 10,350
   • **64 Pages, 5-Year Validity:**
     - Regular: BDT 6,325 | Express: BDT 8,625 | Super Express: BDT 12,075
   • **64 Pages, 10-Year Validity:**
     - Regular: BDT 8,050 | Express: BDT 10,350 | Super Express: BDT 13,800

4. **Biometrics & Issuance Procedure:**
   - Complete online form and pay fees via A-Challan, bKash, Rocket, or designated banks.
   - Attend scheduled appointment at Regional Passport Office (RPO) for photograph, 10 fingerprints, and iris scan.
   - Upon completion of Special Branch (SB) police verification, an SMS notification will be delivered for passport collection.`,

    tin: `🏛️ **National Board of Revenue (NBR) | Official e-TIN Registration**

1. **Official Portal:** [incometax.gov.bd](https://incometax.gov.bd)
2. **Official Govt Fee:** **Free of Cost (BDT 0.00)**. No application or issuance charge.
3. **Prerequisites:**
   - 10-digit Smart NID or 17-digit National Identity Number.
   - Verified date of birth matching Election Commission database.
   - Active mobile phone number.
4. **Instant Processing:**
   - Automatic API integration with Election Commission guarantees immediate issuance of the official 12-digit e-TIN certificate featuring an authentic QR code.
5. **Mandatory Use Cases:**
   - Filing annual income tax returns.
   - Issuance and renewal of business trade licenses.
   - Vehicle registration and real estate registration in city corporations.
   - Credit card applications and commercial bank financing.`,

    land: `🏛️ **Ministry of Land | Smart Land Mutation (e-Namjari) Directives**

1. **Official Web Portals:** [land.gov.bd](https://land.gov.bd) and [mutation.land.gov.bd](https://mutation.land.gov.bd)
2. **Statutory Official Fee: Exact BDT 1,170 Only**
   - Application Court Fee: BDT 20
   - Notice Issuance Fee: BDT 50
   - Record Correction Fee: BDT 1,000
   - Per Copy Khatian DCR Fee: BDT 100
   *(Citizens are advised strictly against paying any unauthorized broker fees)*

3. **Service Level Agreement (SLA):**
   - Under the Citizen Charter, Assistant Commissioner (Land) / AC (Land) offices must finalize applications within a maximum of **28 working days**.

4. **Application Journey:**
   - Step 1: Upload scanned deed, previous chain deeds, and succession certificates.
   - Step 2: Field inquiry report by Union Land Assistant Officer (Naib).
   - Step 3: Formal hearing before the Assistant Commissioner (Land).
   - Step 4: Pay DCR fee online and download the legally binding digital Khatian (Porcha).
5. **Land Service Helpline:** 16122 (Available 24/7).`,

    nid: `🏛️ **Bangladesh Election Commission | National ID (NID) Correction Services**

1. **Citizen Portal:** [services.nidw.gov.bd](https://services.nidw.gov.bd)
2. **Fee Schedule (Inclusive of 15% VAT):**
   - **Type 'A' (Personal Data: Name, Parents' names, Date of Birth):** BDT 345
   - **Type 'B' (Address amendment):** BDT 230
   - **Type 'C' (Combined personal & address amendment):** BDT 345
   - **Smart NID Re-issue (Lost or damaged):** Regular BDT 345, Urgent BDT 575
   *(Payable through bKash, Rocket, Nagad, or Sonali Bank)*

3. **Required Documentation:**
   - Name and DOB: SSC/HSC academic certificates, online digital birth certificate (BRC), passport/driving license.
   - Marital info: Nikahnama / marriage registration deed, spouse's NID copy.
   - Parents' names: Parents' NID copies and succession certificate.
4. **Helpline:** 105 (Official NID Call Center, 9:00 AM to 5:00 PM).`,

    guideline: `🏛️ **Ministry of Posts, Telecommunications & IT | National AI Guidelines 2026**

1. **Data Sovereignty & Localization:**
   - All public sector data, administrative archives, and citizen PII must be hosted exclusively within the sovereign **Tier-IV National Data Center** at Kaliakair, Gazipur.
   - Entering classified or personal state data into unauthorized commercial public AI engines is strictly prohibited.

2. **Human-in-the-Loop (HITL) Imperative:**
   - No high-impact administrative decision affecting citizen rights, benefits, or punitive sanctions may be fully automated.
   - An authorized gazetted civil servant must independently review, approve, and digitally sign every AI-assisted draft.

3. **Ethics, Inclusivity & Audit (ISO/IEC 42001):**
   - Rigorous algorithmic auditing against demographic, gender, and regional biases.
   - Complete parity for Bengali linguistic diversity, regional dialects, and indigenous languages.
   - Continuous vulnerability and cybersecurity inspection led by the National Cyber Security Agency (NCSA) and BCC.`,

    survey: `🏛️ **Directorate General of Land Records and Surveys (DLRS) | Land Survey Hierarchy**

1. **CS (Cadastral Survey):** Conducted under British governance between 1888 and 1940; established baseline geographical maps and plots.
2. **SA (State Acquisition Survey):** Executed between 1956 and 1963 following the abolition of the Zamindari estate system.
3. **RS (Revisional Survey):** Comprehensive field survey conducted between 1965 and 1990 to rectify discrepancies in SA records.
4. **BS / City Survey:** Modern survey underway since 1998, serving as the definitive foundation of the digital land registry.
*Citizens can cross-reference the complete lineage (Chain of Title) across all surveys on the smart land portal.*`,

    hotline: `🚨 **Government of the People's Republic of Bangladesh | National Emergency Hotlines**

• 📞 **999:** National Emergency Services (Police, Fire Brigade, Ambulance - 24/7 Toll-Free).
• 📞 **333:** Public Information & Citizen Service Redress Call Center (Toll-Free).
• 📞 **16122:** Smart Land Services, Khatian & Mutation Assistance Desk.
• 📞 **105:** Election Commission National ID (NID) Helpline.
• 📞 **106:** Anti-Corruption Commission (ACC) Reporting Line.
• 📞 **109:** Violence Against Women & Children Prevention Cell.
• 📞 **1090:** Disaster Management & Flood/Cyclone Early Warning.
• 📞 **3331:** National AI & Cyber Security Helpdesk.`,

    default: `Assalamu Alaikum. Welcome to 'Dangla AI', the sovereign citizen-service AI platform of the Government of the People's Republic of Bangladesh.

Feel free to consult on public digital services and directives:
• **e-Passport:** Application procedure, fee schedules, and RPO appointment guidelines.
• **e-TIN:** 100% free instant income tax certificate registration.
• **Land Mutation (e-Namjari):** 1,170 BDT standard fee, AC Land procedure, and 28-day SLA.
• **National ID (NID):** Name/DOB correction categories, documentary evidence, and fees.
• **National AI Policy 2026:** Sovereign Tier-IV data hosting, human-in-the-loop, and ISO/IEC 42001 compliance.

For direct government assistance, call:
📞 **333** (Public Services & Info) | 📞 **16122** (Land Services) | 📞 **105** (NID Cell) | 📞 **999** (Emergency Police/Fire)`
  }
};

// ==========================================================================
// 3. SAMPLE CIRCULARS FOR D-NOTHI / E-NOTHI SUMMARIZER
// ==========================================================================
const sampleCirculars = {
  1: {
    bn: `গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ
নীতি ও প্রবৃদ্ধি অনুবিভাগ
আইসিটি টাওয়ার, আগারগাঁও, ঢাকা-১২০৭
স্মারক নং: ৫৬.০০.০০০০.০৭২.২২.০০৪.২৬; তারিখ: ১২ নভেম্বর ২০২৬

পরিপত্র
বিষয়: সরকারি দপ্তরসমূহে জেনারেটিভ এআই এবং লার্জ ল্যাঙ্গুয়েজ মডেল (LLM) ব্যবহারের ক্ষেত্রে পালনীয় আচরণবিধি ও নিরাপত্তা নির্দেশিকা।

১. উপযুক্ত বিষয়ের প্রেক্ষিতে জানানো যাচ্ছে যে, প্রশাসনিক কার্যক্রমে গতিশীলতা ও সেবার গুণগত মান বৃদ্ধির লক্ষ্যে সরকারি কর্মকর্তাগণ দাপ্তরিক খসড়া প্রস্তুত, নথি সারসংক্ষেপ এবং তথ্য বিশ্লেষণে কৃত্রিম বুদ্ধিমত্তার সহায়তা গ্রহণ করতে পারবেন।
২. তবে জনস্বার্থ ও সাইবার নিরাপত্তা বিবেচনায় নিম্নোক্ত নির্দেশনাসমূহ কঠোরভাবে মান্য করতে হবে:
(ক) 'অতি গোপনীয়' ও 'গোপনীয়' শ্রেণিভুক্ত কোনো সরকারি নথি, আর্থিক নিরীক্ষা কিংবা ব্যক্তিগত সংবেদনশীল তথ্য কোনো বাণিজ্যিক বা উন্মুক্ত পাবলিক ক্লাউড এআই সিস্টেমে ইনপুট করা যাবে না।
(খ) দাপ্তরিক কাজের ক্ষেত্রে শুধুমাত্র বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি) ও আইসিটি বিভাগ অনুমোদিত রাষ্ট্রীয় এআই মডেল 'ডংলা এআই (Dangla AI)' ব্যবহার করতে হবে।
(গ) কোনো এআই জেনারেটেড খসড়া সরাসরি প্রজ্ঞাপন হিসেবে জারি করা যাবে না; দায়িত্বপ্রাপ্ত কর্মকর্তা কর্তৃক প্রতিটি লাইন যাচাই ও স্বাক্ষর আবশ্যক।`,
    en: `Government of the People's Republic of Bangladesh
Information and Communication Technology Division
Policy & Growth Wing
ICT Tower, Agargaon, Dhaka-1207
Memo No: 56.00.0000.072.22.004.26; Date: 12 November 2026

CIRCULAR
Subject: Code of conduct and security guidelines for the deployment of Generative AI and Large Language Models (LLMs) across government offices.

1. In reference to the above subject, public servants are authorized to utilize sovereign Artificial Intelligence systems for drafting administrative memos, summarizing lengthy circulars, and processing non-classified operational data.
2. However, in the strict interest of national cybersecurity and data sovereignty, the following directives must be rigorously enforced:
(a) No classified, confidential, financial, or personally identifiable information (PII) may be processed on external unverified commercial public cloud AI engines.
(b) All government departments must mandate the sovereign state-approved 'Dangla AI' platform hosted on the National Tier-IV Data Center.
(c) No AI-generated output may be issued without manual review and digital signature from the designated executive authority.`
  },
  2: {
    bn: `গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
ভূমি মন্ত্রণালয়
মাঠ প্রশাসন অনুবিভাগ
বাংলাদেশ সচিবালয়, ঢাকা
স্মারক নং: ৩১.০০.০০০০.০৪২.১১.০০৯.২৬; তারিখ: ১০ নভেম্বর ২০২৬

প্রজ্ঞাপন
বিষয়: এআই-ভিত্তিক স্মার্ট খতিয়ান এবং নামজারি প্রক্রিয়া স্বয়ংক্রিয়করণ সংক্রান্ত।

এতদ্বারা সর্বসাধারণের অবগতির জন্য জানানো যাচ্ছে যে, ভূমিসংক্রান্ত জালিয়াতি প্রতিরোধ এবং নাগরিক দুর্ভোগ লাঘবে কৃত্রিম বুদ্ধিমত্তা সমৃদ্ধ স্বয়ংক্রিয় রেকর্ড যাচাই ব্যবস্থা চালু করা হয়েছে। এখন থেকে আবেদনকারী অনলাইনে সিএস, এসএ, আরএস ও সিটি জরিপের খতিয়ান নম্বর প্রবেশ করামাত্র এআই অ্যালগরিদম স্বয়ংক্রিয়ভাবে দাগের খতিয়ান ধারাবাহিকতা যাচাই করে তাৎক্ষণিক প্রাথমিক প্রত্যয়নপত্র প্রস্তুত করবে। সংশ্লিষ্ট সহকারী কমিশনার (ভূমি) সর্বোচ্চ ৭ কার্যদিবসের মধ্যে সরেজমিন তদন্ত প্রতিবেদন এআই পোর্টালে দাখিল করবেন। কোনো মধ্যস্বত্বভোগী বা দালাল চক্রের সম্পৃক্ততা প্রমাণিত হলে কঠোর আইনি ব্যবস্থা গ্রহণ করা হবে।`,
    en: `Government of the People's Republic of Bangladesh
Ministry of Land
Field Administration Wing
Bangladesh Secretariat, Dhaka
Memo No: 31.00.0000.042.11.009.26; Date: 10 November 2026

NOTIFICATION
Subject: Automation of Smart Land Records and Mutation through Artificial Intelligence.

This is to notify the general public that an automated AI-driven land record validation module has been implemented to eradicate record tampering and streamline citizen mutation services. Upon entering CS, SA, RS, and City survey references, the state AI engine cross-references ownership lineage and produces a provisional digital docket. AC (Land) officers are instructed to submit field verification reports within 7 working days. Strict legal penalties will be enforced against any unauthorized intermediaries.`
  },
  3: {
    bn: `গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
ডাক, টেলিযোগাযোগ ও তথ্যপ্রযুক্তি মন্ত্রণালয়
সাইবার নিরাপত্তা সেল
স্মারক নং: ০৪.০০.০০০০.৫১১.০৮.০১৫.২৬; তারিখ: ২৮ অক্টোবর ২০২৬

অফিস আদেশ
বিষয়: জাতীয় সার্বভৌম লার্জ ল্যাঙ্গুয়েজ মডেল 'বন্ধন-বাংলা' উদ্ভাবনী প্রকল্পে নিরাপত্তা নিরীক্ষা পরিচালনা।

রাষ্ট্রীয় এআই মডেল 'বন্ধন-বাংলা' এবং নাগরিক সহকারী 'ডংলা এআই (Dangla AI)'-এর অবকাঠামোগত নিরাপত্তা নিশ্চিতকরণে জাতীয় সাইবার নিরাপত্তা এজেন্সির সমন্বয়ে একটি উচ্চপর্যায়ের বিশেষজ্ঞ টাস্কফোর্স গঠন করা হলো। উক্ত কমিটি প্রতি মাসে গাজীপুরস্থ টায়ার-৪ জাতীয় ডেটা সেন্টারের অ্যালগরিদম ও ডেটা এনক্রিপশন অডিট সম্পন্ন করে মন্ত্রণালয়ে প্রতিবেদন দাখিল করবে।`,
    en: `Government of the People's Republic of Bangladesh
Ministry of Posts, Telecommunications and Information Technology
Cyber Security Wing
Memo No: 04.00.0000.511.08.015.26; Date: 28 October 2026

OFFICE ORDER
Subject: Implementation of Continuous Security Audits for the Sovereign LLM Project 'Bandhan-Bangla'.

A high-level technical oversight taskforce is hereby constituted in coordination with the National Cyber Security Agency to audit the infrastructure of the sovereign AI model 'Bandhan-Bangla' and citizen assistant 'Dangla AI'. The committee shall perform monthly data encryption and algorithmic bias reviews at the National Tier-IV Data Center in Gazipur.`
  }
};

// ==========================================================================
// 4. MEMORANDUM DATABASE FOR PDF PREVIEW MODAL (MEMOS 1 - 5)
// ==========================================================================
const memoDatabase = {
  1: {
    memo: "৫৬.০০.০০০০.০৭২.২২.০০৪.২৬",
    memoEn: "56.00.0000.072.22.004.26",
    date: "১২ নভেম্বর ২০২৬",
    dateEn: "12 November 2026",
    subject: "সরকারি দপ্তরসমূহে কৃত্রিম বুদ্ধিমত্তা (AI) প্রয়োগের জাতীয় নির্দেশিকা ২০২৬ সংক্রান্ত পরিপত্র।",
    subjectEn: "Circular on the National Guidelines for Artificial Intelligence (AI) Deployment in Public Offices 2026.",
    body: "সরকারি কার্যক্রমে গতিশীলতা, শতভাগ স্বচ্ছতা, জবাবদিহিতা ও দ্রুত নাগরিক সেবা নিশ্চিতে জাতীয় এআই প্ল্যাটফর্ম 'ডংলা এআই (Dangla AI)' ব্যবহারের প্রশাসনিক অনুমোদন প্রদান করা হলো। সকল মন্ত্রণালয়, বিভাগ এবং আওতাধীন অধিদপ্তর/সংস্থাসমূহকে তাদের বিদ্যমান সেবাসমূহে এআই এপিআই সংযুক্ত করার অনুরোধ জানানো যাচ্ছে। উক্ত কার্যক্রমের আওতায় সংরক্ষিত সকল নাগরিক ডেটা বাংলাদেশ জাতীয় ডেটা সেন্টারে সম্পূর্ণ সুরক্ষিত থাকবে।",
    signatory: "মো: সামিউল হক\nযুগ্মসচিব (আইসিটি ও এআই অনুবিভাগ)\nতথ্য ও যোগাযোগ প্রযুক্তি বিভাগ\nফোন: +৮৮০-২-৫৫০০০২২ | ইমেইল: js.ai@ictd.gov.bd",
    recipient: "১. মন্ত্রিপরিষদ সচিব, মন্ত্রিপরিষদ বিভাগ, বাংলাদেশ সচিবালয়, ঢাকা।\n২. মুখ্য সচিব, প্রধান উপদেষ্টার কার্যালয়, তেজগাঁও, ঢাকা।\n৩. সকল সিনিয়র সচিব / সচিব (সকল মন্ত্রণালয়/বিভাগ)।\n৪. মহাপরিচালক, বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি)।\n৫. প্রকল্প পরিচালক, এটুআই (a2i) প্রোগ্রাম, আগারগাঁও, ঢাকা।\n৬. সিস্টেম অ্যানালিস্ট, আইসিটি বিভাগ (ওয়েবসাইটে প্রকাশের অনুরোধসহ)।"
  },
  2: {
    memo: "৫৬.০০.০০০০.০৭২.২২.০০৩.২৬",
    memoEn: "56.00.0000.072.22.003.26",
    date: "০৫ নভেম্বর ২০২৬",
    dateEn: "05 November 2026",
    subject: "জাতীয় সার্বভৌম লার্জ ল্যাঙ্গুয়েজ মডেল 'বন্ধন-বাংলা' উদ্ভাবনী প্রকল্পের ফান্ডিং ও বাজেট বরাদ্দ অনুমোদন।",
    subjectEn: "Budgetary approval for Sovereign Large Language Model Innovation Project 'Bandhan-Bangla'.",
    body: "বাংলা ভাষা, আঞ্চলিক উপভাষাসমূহ এবং ক্ষুদ্র নৃগোষ্ঠীর ভাষাগত বৈচিত্র্যকে কৃত্রিম বুদ্ধিমত্তার মানদণ্ডে সমৃদ্ধ করার লক্ষ্যে রাষ্ট্রীয় মডেল 'বন্ধন' উন্নয়নের নিমিত্ত বিশেষ গবেষণা ও উদ্ভাবনী তহবিলের প্রশাসনিক মঞ্জুরি প্রদান করা হলো। এ প্রকল্পের অধীনে গাজীপুর জাতীয় ডেটা সেন্টারে ১০০০ টি বিশেষায়িত জিপিইউ সমৃদ্ধ উচ্চগতির এআই ক্লাস্টার স্থাপন সম্পন্ন হয়েছে।",
    signatory: "তানিয়া সুলতানা\nউপসচিব (বাজেট ও পরিকল্পনা)\nতথ্য ও যোগাযোগ প্রযুক্তি বিভাগ\nফোন: +৮৮০-২-৫৫০০০৮৯ | ইমেইল: ds.budget@ictd.gov.bd",
    recipient: "১. প্রধান হিসাবরক্ষণ কর্মকর্তা, তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ, সেগুনবাগিচা, ঢাকা।\n২. নির্বাহী পরিচালক, বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি)।\n৩. বিভাগীয় হিসাব নিয়ন্ত্রক, ঢাকা।\n৪. সচিবের একান্ত সচিব, আইসিটি বিভাগ।"
  },
  3: {
    memo: "৫৬.০০.০০০০.০৫৪.১৮.০১২.২৬",
    memoEn: "56.00.0000.054.18.012.26",
    date: "২৮ অক্টোবর ২০২৬",
    dateEn: "28 October 2026",
    subject: "নাগরিক তথ্যের সুরক্ষা ও সাইবার নিরাপত্তা ফ্রেমওয়ার্ক নির্দেশিকা পরিমার্জন গেজেট।",
    subjectEn: "Citizen Data Protection & National Cyber Security Framework Directive Gazette.",
    body: "জাতীয় সাইবার নিরাপত্তা এজেন্সি এবং আইসিটি বিভাগের যৌথ পরিচালনায় সরকারি ডেটা সুরক্ষায় রিয়েল-টাইম থ্রেট ডিটেকশন এআই অ্যালগরিদম সক্রিয় করার প্রজ্ঞাপন জারি করা হলো। সকল নাগরিক সেবা ডাটাবেসে এন্ড-টু-এন্ড এনক্রিপশন এবং জিরো-ট্রাস্ট সিকিউরিটি ফ্রেমওয়ার্ক বাস্তবায়ন নিশ্চিত করতে হবে।",
    signatory: "ড. খোন্দকার মোস্তাক আহমেদ\nঅতিরিক্ত সচিব (সাইবার ও তথ্য নিরাপত্তা অনুবিভাগ)\nফোন: +৮৮০-২-৫৫০০১১২ | ইমেইল: addl.sec@ictd.gov.bd",
    recipient: "১. সচিব, জননিরাপত্তা বিভাগ, স্বরাষ্ট্র মন্ত্রণালয়।\n২. মহাপরিচালক, জাতীয় সাইবার নিরাপত্তা এজেন্সি (NCSA)।\n৩. সকল বিভাগীয় কমিশনার (সকল বিভাগ)।\n৪. অতিরিক্ত পুলিশ মহাপরিদর্শক (এসবি / সিআইডি)।"
  },
  4: {
    memo: "আইসিটিডি/বিসিসি/এআই/২০২৬-টি০৯",
    memoEn: "ICTD/BCC/AI/2026-T09 (Tender ID: 984215)",
    date: "২০ অক্টোবর ২০২৬",
    dateEn: "20 October 2026",
    subject: "গাজীপুর ডেটা সেন্টারে বিশেষায়িত সার্বভৌম এআই সার্ভার ক্লাস্টার ক্লাউড নোড সরবরাহ সংক্রান্ত ই-দরপত্র (e-GP)।",
    subjectEn: "e-GP Tender for Sovereign AI High-Compute Server Nodes at Gazipur Tier-IV Data Center.",
    body: "জাতীয় কৃত্রিম বুদ্ধিমত্তা ক্লাউড অবকাঠামো সম্প্রসারণের নিমিত্তে উচ্চগতির এন্টারপ্রাইজ গ্রেড সার্ভার নোড, এনভিডিয়া এইচ১০০ ক্লাস্টার সমতুল্য কম্পিউটেশনাল হার্ডওয়্যার এবং হাই-স্পিড ইনফিনিব্যান্ড নেটওয়ার্কিং সুইচের আন্তর্জাতিক সরবরাহকারী প্রতিষ্ঠানের নিকট হতে ই-জিপি পোর্টালে উন্মুক্ত দরপত্র আহ্বান করা যাচ্ছে। দরপত্র জমা দেওয়ার শেষ সময় ৩০ নভেম্বর ২০২৬, দুপুর ১২:০০ ঘটিকা।",
    signatory: "প্রকৌশলী একেএম রেজাউল করিম\nপরিচালক (ক্রয় ও অবকাঠামো)\nবাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি)\nফোন: +৮৮০-২-৫৫০০০৬৪",
    recipient: "১. নির্বাহী পরিচালক, বিসিসি, আগারগাঁও, ঢাকা।\n২. সেন্ট্রাল প্রকিউরমেন্ট টেকনিক্যাল ইউনিট (CPTU), পরিকল্পনা মন্ত্রণালয়।\n৩. সিনিয়র সিস্টেম অ্যানালিস্ট, আইসিটি বিভাগ (e-GP নোটিফিকেশন)।"
  },
  5: {
    memo: "০৪.০০.০০০০.৫১১.০৩.০১৯.২৬",
    memoEn: "04.00.0000.511.03.019.26",
    date: "১৫ অক্টোবর ২০২৬",
    dateEn: "15 October 2026",
    subject: "বাংলাদেশ সচিবালয়ে ডি-নথি ও এআই পেপারলেস ফাইলিং মডিউল বাধ্যতামূলক ব্যবহারের অফিস আদেশ।",
    subjectEn: "Mandatory adoption of D-Nothi and AI paperless administrative filing across Ministries.",
    body: "প্রশাসনিক অপচয় রোধ ও নথি নিষ্পত্তিতে স্বচ্ছতা আনয়নের লক্ষ্যে বাংলাদেশ সচিবালয়ের সকল মন্ত্রণালয় ও বিভাগে ডিজিটাল নথি (D-Nothi) ও কৃত্রিম বুদ্ধিমত্তা সমৃদ্ধ স্বয়ংক্রিয় সারসংক্ষেপণ মডিউল ব্যবহারের বাধ্যবাধকতা আরোপ করা হলো। এখন থেকে কোনো কাগুজে ফাইল উপস্থাপন করা যাবে না। সকল কর্মকর্তা-কর্মচারীকে ডিজিটাল স্বাক্ষর টোকেন বাধ্যতামূলক ব্যবহারের নির্দেশ প্রদান করা হলো।",
    signatory: "মোহাম্মদ গোলাম মোস্তফা\nসিনিয়র সচিব\nমন্ত্রিপরিষদ বিভাগ (সমন্বয় ও সংস্কার)\nবাংলাদেশ সচিবালয়, ঢাকা।",
    recipient: "১. প্রধান উপদেষ্টার মুখ্য সচিব, তেজগাঁও, ঢাকা।\n২. সকল সিনিয়র সচিব/সচিব (সকল মন্ত্রণালয়/বিভাগ)।\n৩. সকল বিভাগীয় কমিশনার ও জেলা প্রশাসক।\n৪. প্রকল্প পরিচালক, ডি-নথি সেল, এটুআই প্রোগ্রাম।"
  }
};

// ==========================================================================
// 5. DOM INITIALIZATION
// ==========================================================================
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initAccessibility();
    initHeroSlider();
    initNewsTicker();
    initChatbot();
    initSummarizer();
    initLandSurveySearch();
    initNoticeTabs();
    initNationalAnthem();
    initPoll();
    initPopupModal();
    initPdfModal();
    initGalleryLightbox();
    initVisitorCounter();
    initGlobalSearch();
    initLiveClock();

    // Apply initial saved preferences
    if (state.highContrast) {
      document.body.classList.add('high-contrast');
    }
    if (state.fontSizeStep !== 0) {
      adjustFontSize(state.fontSizeStep, false);
    }
    applyLanguage(state.lang);
  });
}

// ==========================================================================
// 6. LANGUAGE SWITCHER (BANGLA <-> ENGLISH) & BENGALI CALENDAR ENGINE
// ==========================================================================
function initLanguageSwitcher() {
  const switchBtn = document.getElementById('langSwitchBtn');
  if (!switchBtn) return;

  switchBtn.addEventListener('click', () => {
    state.lang = state.lang === 'bn' ? 'en' : 'bn';
    window.currentLang = state.lang;
    localStorage.setItem('bd_portal_lang', state.lang);
    applyLanguage(state.lang);
  });
}

function applyLanguage(lang) {
  state.lang = lang;
  window.currentLang = lang;
  document.documentElement.lang = lang;

  // 1. Translate all elements with data-bn and data-en
  document.querySelectorAll('[data-bn]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null && text !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else {
        if (/<[a-z][\s\S]*>/i.test(text)) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    }
  });

  // 2. Update Language Switcher Button Text & Tooltip
  const langBtn = document.getElementById('langSwitchBtn');
  if (langBtn) {
    langBtn.innerHTML = lang === 'bn' 
      ? '🌐 <span>English</span>' 
      : '🌐 <span>বাংলা</span>';
    langBtn.setAttribute('title', lang === 'bn' ? 'Switch to English' : 'বাংলায় রূপান্তর করুন');
  }

  // 3. Update Official Date Banner
  updateDateDisplay(lang);

  // 4. Update Visitor Statistics Display Format
  updateVisitorStatsDisplay();

  // 5. Update National Anthem Player Status if idle
  const anthemStatus = document.getElementById('anthemStatusText');
  const anthemBtn = document.getElementById('btnPlayAnthem');
  if (!state.isAnthemPlaying) {
    if (anthemStatus) {
      anthemStatus.innerText = lang === 'bn' ? 'প্লেয়ার প্রস্তুত' : 'Player ready';
    }
    if (anthemBtn) {
      anthemBtn.innerHTML = lang === 'bn' ? '▶ <span>জাতীয় সংগীত শুনুন</span>' : '▶ <span>Play National Anthem</span>';
    }
  }

  // 6. Update Notice Filter tab active badges
  updateNoticeTabBadges();
}

function updateDateDisplay(lang) {
  const dateEl = document.getElementById('currentDateText');
  if (!dateEl) return;

  if (lang === 'bn') {
    dateEl.innerText = 'বৃহস্পতিবার, ১২ নভেম্বর ২০২৬ | ২৭ কার্তিক ১৪৩৩ বঙ্গাব্দ';
  } else {
    dateEl.innerText = 'Thursday, 12 November 2026 | 27 Kartik 1433 BS';
  }
}

function initLiveClock() {
  updateDateDisplay(state.lang);
}

// ==========================================================================
// 7. ACCESSIBILITY CONTROLS (FONT RESIZING, CONTRAST, SCREEN READER)
// ==========================================================================
function initAccessibility() {
  const btnDec = document.getElementById('btnFontDec');
  const btnReset = document.getElementById('btnFontReset');
  const btnInc = document.getElementById('btnFontInc');
  const btnContrast = document.getElementById('btnContrast');
  const btnScreenReader = document.getElementById('btnScreenReader');

  btnDec?.addEventListener('click', () => adjustFontSize(-1, true));
  btnReset?.addEventListener('click', () => adjustFontSize(0, true));
  btnInc?.addEventListener('click', () => adjustFontSize(1, true));

  btnContrast?.addEventListener('click', () => {
    state.highContrast = !state.highContrast;
    document.body.classList.toggle('high-contrast', state.highContrast);
    localStorage.setItem('bd_portal_high_contrast', state.highContrast);
  });

  btnScreenReader?.addEventListener('click', () => {
    const announcement = state.lang === 'bn'
      ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের জাতীয় কৃত্রিম বুদ্ধিমত্তা বাতায়নে আপনাকে স্বাগতম। এই পোর্টালে নাগরিক সহায়ক ডংলা এআই, ডি-নথি সারসংক্ষেপক এবং স্মার্ট ভূমি রেকর্ড যাচাই সেবা সক্রিয় রয়েছে।'
      : 'Welcome to the National Artificial Intelligence Portal of the Government of the People\'s Republic of Bangladesh. Active services include Dangla AI Citizen Assistant, D-Nothi Summarizer, and Smart Land Verification.';
    speakText(announcement, btnScreenReader);
  });
}

function adjustFontSize(delta, relative = true) {
  if (!relative) {
    state.fontSizeStep = delta;
  } else if (delta === 0) {
    state.fontSizeStep = 0;
  } else {
    state.fontSizeStep = Math.max(-2, Math.min(3, state.fontSizeStep + delta));
  }
  
  localStorage.setItem('bd_portal_font_size', state.fontSizeStep);

  // Update font modifier classes on body & html matching styles.css rules
  const fontClasses = ['font-sm', 'font-md', 'font-lg', 'font-xl'];
  document.body.classList.remove(...fontClasses);
  document.documentElement.classList.remove(...fontClasses);

  let activeClass = 'font-md';
  if (state.fontSizeStep < 0) {
    activeClass = 'font-sm';
  } else if (state.fontSizeStep === 0) {
    activeClass = 'font-md';
  } else if (state.fontSizeStep === 1) {
    activeClass = 'font-lg';
  } else if (state.fontSizeStep >= 2) {
    activeClass = 'font-xl';
  }

  document.body.classList.add(activeClass);
  document.documentElement.classList.add(activeClass);

  const baseSize = 15;
  const newSize = baseSize + (state.fontSizeStep * 1.5);
  document.documentElement.style.fontSize = `${newSize}px`;
}

// ==========================================================================
// 8. HERO SLIDER CAROUSEL
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

  // Auto-rotation every 7 seconds
  setInterval(() => {
    const nextIdx = (state.currentSlide + 1) % slides.length;
    goToSlide(nextIdx);
  }, 7000);
}

// ==========================================================================
// 9. BREAKING NEWS TICKER
// ==========================================================================
function initNewsTicker() {
  const marquee = document.getElementById('tickerMarquee');
  const toggleBtn = document.getElementById('tickerToggleBtn');
  if (!marquee || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    state.tickerPlaying = !state.tickerPlaying;
    marquee.style.animationPlayState = state.tickerPlaying ? 'running' : 'paused';
    toggleBtn.innerText = state.tickerPlaying ? '⏸' : '▶';
    toggleBtn.setAttribute('title', state.tickerPlaying ? 'Pause Ticker' : 'Play Ticker');
  });
}

// ==========================================================================
// 10. CITIZEN SERVICE AI ASSISTANT ("Dangla AI" / ডংলা এআই)
// ==========================================================================
function initChatbot() {
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('btnChatSend');
  const messagesBox = document.getElementById('chatMessagesArea');
  const chips = document.querySelectorAll('.ai-prompt-chip');
  const btnChatVoice = document.getElementById('btnChatVoice');
  const btnChatListen = document.getElementById('btnChatListen');
  const btnChatCopy = document.getElementById('btnChatCopy');

  if (!chatInput || !sendBtn || !messagesBox) return;

  function appendMessage(sender, rawText) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.innerText = sender === 'bot' ? 'ড' : 'না';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';

    // Format Markdown-like text (bold, links, bullet points)
    bubble.innerHTML = formatChatMarkup(rawText);

    if (sender === 'bot') {
      bubble.style.color = '#111111';
      state.lastBotMessageText = rawText;
      const meta = document.createElement('div');
      meta.className = 'msg-meta';
      
      const audioBtn = document.createElement('button');
      audioBtn.className = 'btn-msg-audio';
      audioBtn.style.color = '#008532';
      audioBtn.innerHTML = state.lang === 'bn' ? '🔊 <span>পড়ে শুনুন</span>' : '🔊 <span>Listen</span>';
      audioBtn.onclick = () => speakText(rawText, audioBtn);

      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn-msg-audio';
      copyBtn.style.color = '#008532';
      copyBtn.innerHTML = state.lang === 'bn' ? '📋 <span>কপি</span>' : '📋 <span>Copy</span>';
      copyBtn.onclick = () => {
        copyToClipboard(rawText);
        copyBtn.innerHTML = state.lang === 'bn' ? '✅ <span>কপি সম্পন্ন</span>' : '✅ <span>Copied</span>';
        setTimeout(() => {
          copyBtn.innerHTML = state.lang === 'bn' ? '📋 <span>কপি</span>' : '📋 <span>Copy</span>';
        }, 2200);
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
    if (!query || !query.trim()) return;

    appendMessage('user', query.trim());
    chatInput.value = '';

    // Typing simulation indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg bot';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
      <div class="chat-avatar">ড</div>
      <div class="msg-bubble" style="font-style:italic; color:#555555; background:#f0f7f3; border: 1px solid #c9e4d5;">
        ${state.lang === 'bn' 
          ? '🏛️ ডংলা এআই সরকারি তথ্যভান্ডার অনুসন্ধান করছে...' 
          : '🏛️ Dangla AI is querying government repositories...'}
      </div>
    `;
    messagesBox.appendChild(typingIndicator);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const botResponse = getChatbotResponse(query);
      appendMessage('bot', botResponse);
    }, 550);
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

  // Speech Recognition (Voice Typing into Chat Input)
  btnChatVoice?.addEventListener('click', () => {
    startVoiceRecognition((transcript) => {
      chatInput.value = transcript;
      handleUserQuery(transcript);
    });
  });

  // Style static welcome bubble buttons to official #008532
  if (btnChatListen) btnChatListen.style.color = '#008532';
  if (btnChatCopy) btnChatCopy.style.color = '#008532';

  // Listen to the last bot response
  btnChatListen?.addEventListener('click', () => {
    const textToSpeak = state.lastBotMessageText || aiKnowledgeBase[state.lang].default;
    speakText(textToSpeak, btnChatListen);
  });

  // Copy last bot response
  btnChatCopy?.addEventListener('click', () => {
    const textToCopy = state.lastBotMessageText || aiKnowledgeBase[state.lang].default;
    copyToClipboard(textToCopy);
    btnChatCopy.innerHTML = state.lang === 'bn' ? '✅ কপি সম্পন্ন' : '✅ Copied!';
    setTimeout(() => {
      btnChatCopy.innerHTML = state.lang === 'bn' ? '📋 কপি' : '📋 Copy';
    }, 2000);
  });
}

function formatChatMarkup(text) {
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Markdown Bold **text** -> <strong>text</strong>
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Markdown Links [title](url)
  escaped = escaped.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #008532; text-decoration: underline; font-weight: 600;">$1</a>');

  // Line breaks
  escaped = escaped.replace(/\n/g, '<br/>');

  return escaped;
}

function getChatbotResponse(query) {
  return generateBotResponse(query);
}

function generateBotResponse(query) {
  const q = query.toLowerCase();
  const kb = aiKnowledgeBase[state.lang] || aiKnowledgeBase.bn;
  const isBnQuery = /[\u0980-\u09FF]/.test(query);
  const isEnQuery = /[a-zA-Z]/.test(query) && !isBnQuery;

  // 0. Identity & "Who are you" / "Who made you" queries
  if (
    q.includes('তুমি কে') || q.includes('কে তুমি') || 
    q.includes('পরিচয়') || q.includes('পরিচয়') || 
    q.includes('তোমার নাম') || q.includes('কার তৈরি') || 
    q.includes('কে বানিয়েছে') || q.includes('কে বানিয়েছে') || 
    q.includes('কে তৈরি করেছে') || q.includes('নির্মাতা') || 
    q.includes('ডংলা কে') || q.includes('ডংলা এআই') || 
    q.includes('who are you') || q.includes('who are u') || 
    q.includes('your name') || q.includes('who made you') || 
    q.includes('who created you') || q.includes('who built you') ||
    q.includes('what is dangla') || q.includes('identity') || 
    q.includes('about you') || q.includes('introduce yourself') ||
    q.includes('who made u')
  ) {
    if (state.lang === 'en' || isEnQuery) {
      return "I am 'Dangla AI', the sovereign citizen-service AI assistant of the Government of the People's Republic of Bangladesh. Operated by the Bangladesh Computer Council (BCC) and ICT Division, and hosted at the National Tier-IV Data Center in Gazipur, I am here to assist you with digital public services, citizen queries, and government information.";
    }
    return "আমি গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সার্বভৌম কৃত্রিম বুদ্ধিমত্তা সহকারী 'ডংলা এআই' (Dangla AI)। বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি) ও আইসিটি বিভাগ কর্তৃক পরিচালিত এবং গাজীপুর টায়ার-৪ জাতীয় ডেটা সেন্টারে হোস্টকৃত এই ব্যবস্থা নাগরিক সেবা, সরকারি বিধিবিধান ও তথ্য প্রদানে সার্বক্ষণিক নিয়োজিত।";
  }

  // Legacy name queries ('প্রজ্ঞা' / 'PROGNA')
  if (q.includes('progna') || q.includes('প্রজ্ঞা')) {
    if (state.lang === 'en' || isEnQuery) {
      return "Previously this government AI platform was designated as 'PROGNA', which is now officially upgraded and operated as the sovereign citizen AI model 'Dangla AI' (ডংলা এআই).";
    }
    return "পূর্বে এই সরকারি এআই প্ল্যাটফর্মটির নাম 'প্রজ্ঞা' (PROGNA) ছিল, যা এখন মানোন্নয়ন করে রাষ্ট্রীয় সার্বভৌম কৃত্রিম বুদ্ধিমত্তা সহকারী 'ডংলা এআই' (Dangla AI) নামে পরিচালিত হচ্ছে।";
  }

  // 1. Hotlines & Emergency Services
  if (q.includes('হটলাইন') || q.includes('হেল্পলাইন') || q.includes('জরুরি সেবা') || q.includes('জরুরী সেবা') || q.includes('hotline') || q.includes('emergency') || q.includes('৯৯৯') || q.includes('৩৩৩') || q.includes('১৬১২২') || q.includes('১০৫') || q.includes('১০৬') || q.includes('১০৯') || q.includes('১০৯০') || q.includes('৩৩৩১') || q.includes('পুলিশ') || q.includes('ফায়ার') || q.includes('police') || q.includes('ambulance')) {
    return kb.hotline;
  }

  // 2. Land, Mutation, Survey & Khatian
  if (q.includes('জমি') || q.includes('নামজারি') || q.includes('খারিজ') || q.includes('খতিয়ান') || q.includes('পর্চা') || q.includes('দাগ') || q.includes('land') || q.includes('mutation') || q.includes('khatian') || q.includes('porcha') || q.includes('১,১৭০') || q.includes('1170') || q.includes('২৮ দিন') || q.includes('28 days') || q.includes('এসিল্যান্ড') || q.includes('ac land')) {
    if (q.includes('জরিপ') || q.includes('survey') || q.includes('সিএস') || q.includes('cs') || q.includes('এসএ') || q.includes('sa') || q.includes('আরএস') || q.includes('rs') || q.includes('বিএস') || q.includes('bs')) {
      return kb.survey;
    }
    return kb.land;
  }

  // 3. Survey specific (if land keywords were not explicitly mentioned)
  if (q.includes('জরিপ') || q.includes('survey') || q.includes('ক্যাডাস্ট্রাল') || q.includes('cadastral') || q.includes('রেকর্ড')) {
    return kb.survey;
  }

  // 4. e-Passport (strictly requires passport keyword or 48/64 page combinations)
  if (q.includes('পাসপোর্ট') || q.includes('passport') || q.includes('epassport') || ((q.includes('৪৮ পৃষ্ঠা') || q.includes('৬৪ পৃষ্ঠা') || q.includes('48 page') || q.includes('64 page')) && (q.includes('বছর') || q.includes('year') || q.includes('টাকা') || q.includes('fee')))) {
    return kb.passport;
  }

  // 5. e-TIN & Income Tax
  if (q.includes('টিন') || q.includes('tin') || q.includes('ট্যাক্স') || q.includes('কর') || q.includes('আয়কর') || q.includes('আয়কর') || q.includes('income tax') || q.includes('tax return') || q.includes('এনবিআর') || q.includes('nbr')) {
    return kb.tin;
  }

  // 6. National ID (NID)
  if (q.includes('এনআইডি') || q.includes('nid') || q.includes('পরিচয়পত্র') || q.includes('ভোটার') || q.includes('স্মার্ট কার্ড') || q.includes('smart card')) {
    return kb.nid;
  }

  // 7. National AI Guidelines, Ethics, Sovereignty & Human-in-the-Loop
  if (q.includes('নির্দেশিকা') || q.includes('নীতিমালা') || q.includes('নীতি') || q.includes('guideline') || q.includes('policy') || q.includes('সার্বভৌম') || q.includes('sovereignty') || q.includes('হিউম্যান') || q.includes('hitl') || q.includes('human-in-the-loop') || q.includes('টায়ার-৪') || q.includes('tier-4') || q.includes('কৃত্রিম বুদ্ধিমত্তা নীতি')) {
    return kb.guideline;
  }

  // 8. Polite civil service fallback
  return kb.default;
}

// ==========================================================================
// 11. WEB SPEECH API & CLIPBOARD UTILITIES
// ==========================================================================
function speakText(text, btnElement = null) {
  if (!('speechSynthesis' in window)) {
    alert(state.lang === 'bn' ? 'দুঃখিত, আপনার ব্রাউজার স্পিচ সিন্থেসিস সমর্থন করে না।' : 'Speech synthesis not supported in this browser.');
    return;
  }

  // If already speaking, stop it
  if (state.isSpeaking) {
    window.speechSynthesis.cancel();
    state.isSpeaking = false;
    if (btnElement) {
      btnElement.innerHTML = state.lang === 'bn' ? '🔊 <span>পড়ে শুনুন</span>' : '🔊 <span>Listen</span>';
    }
    return;
  }

  window.speechSynthesis.cancel();

  // Strip Markdown / HTML symbols for clear spoken text
  const cleanText = text
    .replace(/[*#_\[\]()]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\n+/g, '. ');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = state.lang === 'bn' ? 'bn-BD' : 'en-US';
  utterance.rate = 0.95;

  state.isSpeaking = true;
  if (btnElement) {
    btnElement.innerHTML = state.lang === 'bn' ? '⏹ <span>থামান</span>' : '⏹ <span>Stop</span>';
  }

  utterance.onend = () => {
    state.isSpeaking = false;
    if (btnElement) {
      btnElement.innerHTML = state.lang === 'bn' ? '🔊 <span>পড়ে শুনুন</span>' : '🔊 <span>Listen</span>';
    }
  };

  utterance.onerror = () => {
    state.isSpeaking = false;
    if (btnElement) {
      btnElement.innerHTML = state.lang === 'bn' ? '🔊 <span>পড়ে শুনুন</span>' : '🔊 <span>Listen</span>';
    }
  };

  state.currentSpeechUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function startVoiceRecognition(callback) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert(state.lang === 'bn' 
      ? 'দুঃখিত, আপনার ব্রাউজারে ভয়েস রিকগনিশন সুবিধা সমর্থিত নয়। Chrome বা Edge ব্রাউজার ব্যবহার করুন।' 
      : 'Voice speech recognition is not supported in this browser. Please use Chrome or Edge.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = state.lang === 'bn' ? 'bn-BD' : 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    const statusNote = document.getElementById('typingIndicator');
    if (statusNote) statusNote.innerText = state.lang === 'bn' ? '🎤 শুনছি... কথা বলুন...' : '🎤 Listening... Please speak...';
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (callback) callback(transcript);
  };

  recognition.onerror = () => {
    // Graceful error fallback
  };

  recognition.start();
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    // Ignore
  }
  document.body.removeChild(textArea);
}

// ==========================================================================
// 12. D-NOTHI / E-NOTHI DOCUMENT SUMMARIZER & MEMO DRAFTER
// ==========================================================================
function initSummarizer() {
  const textarea = document.getElementById('docInputText');
  const summarizeBtn = document.getElementById('btnRunSummarize');
  const styleSelect = document.getElementById('summaryStyleSelect');
  const outputBox = document.getElementById('summaryOutputBox');
  const outputText = document.getElementById('summaryResultText');
  const loadBtn1 = document.getElementById('btnLoadSample1');
  const loadBtn2 = document.getElementById('btnLoadSample2');
  const loadBtn3 = document.getElementById('btnLoadSample3');

  // Secretariat action buttons
  const btnPresent = document.getElementById('btnPresentToNothi');
  const btnForward = document.getElementById('btnForwardNothi');
  const btnSign = document.getElementById('btnSignNothi');
  const btnPrint = document.getElementById('btnPrintNothi');

  if (!textarea || !summarizeBtn) return;

  loadBtn1?.addEventListener('click', () => {
    textarea.value = sampleCirculars[1][state.lang];
  });

  loadBtn2?.addEventListener('click', () => {
    textarea.value = sampleCirculars[2][state.lang];
  });

  loadBtn3?.addEventListener('click', () => {
    textarea.value = sampleCirculars[3][state.lang];
  });

  summarizeBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) {
      alert(state.lang === 'bn' 
        ? 'অনুগ্রহ করে সারসংক্ষেপ করার জন্য কোনো সরকারি নথির টেক্সট লিখুন বা নমুনা বাটন চাপুন।' 
        : 'Please enter or load a document text to summarize.');
      return;
    }

    const style = styleSelect?.value || 'simple';
    if (!outputBox || !outputText) return;

    outputBox.style.display = 'block';
    outputText.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #008532;">
        <div style="font-size: 24px; animation: spin 1s infinite linear;">⚙️</div>
        <div style="font-weight: 600; margin-top: 8px; color: #008532;">
          ${state.lang === 'bn' 
            ? '🏛️ বিসিসি সার্বভৌম এআই ক্লাস্টারে নথি বিশ্লেষণ ও সারসংক্ষেপ প্রস্তুত হচ্ছে...' 
            : '🏛️ Analyzing document via BCC Sovereign AI Engine...'}
        </div>
      </div>
    `;
    outputBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
      renderSummaryOutput(style, text, outputText);
    }, 600);
  });

  // Secretariat Workflow Button Handlers
  btnPresent?.addEventListener('click', () => {
    alert(state.lang === 'bn' 
      ? '📥 নথি নম্বর ৫৬.০০.০৭২.২৬-এ সারসংক্ষেপ এবং নোট উপস্থাপন সম্পন্ন হয়েছে।' 
      : '📥 Presented to official Secretariat File No. 56.00.072.26 successfully.');
  });

  btnForward?.addEventListener('click', () => {
    alert(state.lang === 'bn' 
      ? '⏩ নথিটি অনুমোদনের জন্য সিনিয়র সচিব মহোদয়ের দপ্তরে অগ্রগামী করা হয়েছে।' 
      : '⏩ Document forwarded to the Senior Secretary for approval.');
  });

  btnSign?.addEventListener('click', () => {
    state.nothiSigned = true;
    if (outputText && outputBox.style.display !== 'none') {
      const sigStamp = document.createElement('div');
      sigStamp.style.cssText = 'margin-top: 15px; padding: 10px; background: #e8f5e9; border: 1px dashed #008532; border-radius: 4px; font-size: 12.5px; color: #008532;';
      sigStamp.innerHTML = `
        <strong style="color: #008532;">✓ ডিজিটালি স্বাক্ষরিত ও অনুমোদিত (BCC Digital Token: 0x99A4-BD-2026)</strong><br>
        <span style="color: #008532;">স্বাক্ষরকারী: মো: সামিউল হক, যুগ্মসচিব (আইসিটি অনুবিভাগ)</span><br>
        <span style="color: #008532;">তারিখ ও সময়: ১২ নভেম্বর ২০২৬, সময়: ১৮:৪৫:০০</span>
      `;
      outputText.appendChild(sigStamp);
      alert(state.lang === 'bn' ? '✍️ ডিজিটাল স্বাক্ষর সফলভাবে সংযুক্ত হয়েছে।' : '✍️ Digital signature successfully applied.');
    } else {
      alert(state.lang === 'bn' ? 'অনুগ্রহ করে প্রথমে নথির সারসংক্ষেপ তৈরি করুন।' : 'Please generate summary first.');
    }
  });

  btnPrint?.addEventListener('click', () => {
    window.print();
  });
}

function renderSummaryOutput(style, originalText, targetContainer) {
  if (style === 'bullets') {
    targetContainer.innerHTML = `
      <div class="summary-card-rendered">
        <h4 style="color: #008532; margin-bottom: 8px; font-weight: 700;">
          ${state.lang === 'bn' ? '📌 মূল সিদ্ধান্ত ও গুরুত্বপূর্ণ অ্যাকশন পয়েন্টসমূহ:' : '📌 Key Decisions & Action Items:'}
        </h4>
        <ul style="margin-left: 20px; line-height: 1.7; color: #222222;">
          <li style="color: #222222;"><strong style="color: #111111;">${state.lang === 'bn' ? 'এআই ব্যবহারে অনুমোদন:' : 'AI Authorization:'}</strong> <span style="color: #222222;">${state.lang === 'bn' ? 'সরকারি কর্মকর্তাদের দাপ্তরিক খসড়া প্রস্তুত, নথি সারসংক্ষেপ ও তথ্য বিশ্লেষণে রাষ্ট্রীয় এআই ব্যবহারের প্রশাসনিক অনুমোদন প্রদান করা হয়েছে।' : 'Public servants are authorized to utilize sovereign AI tools for administrative drafting and summarization.'}</span></li>
          <li style="color: #222222;"><strong style="color: #111111;">${state.lang === 'bn' ? 'তথ্য নিরাপত্তা বিধিনিষেধ:' : 'Data Security Strictures:'}</strong> <span style="color: #222222;">${state.lang === 'bn' ? 'গোপনীয় সরকারি নথি বা নাগরিক ব্যক্তিগত তথ্য (PII) বিদেশি কোনো উন্মুক্ত পাবলিক ক্লাউড সিস্টেমে ইনপুট করা সম্পূর্ণ নিষিদ্ধ।' : 'Strict prohibition on entering confidential administrative records or citizen PII into unverified public cloud LLMs.'}</span></li>
          <li style="color: #222222;"><strong style="color: #111111;">${state.lang === 'bn' ? 'হিউম্যান-ইন-দ্য-লুপ বাধ্যবাধকতা:' : 'HITL Compliance:'}</strong> <span style="color: #222222;">${state.lang === 'bn' ? 'কোনো এআই খসড়া সরাসরি জারি করা যাবে না; দায়িত্বপ্রাপ্ত নির্বাহী কর্মকর্তার অনুপুঙ্খ যাচাই এবং ডিজিটাল স্বাক্ষর আবশ্যক।' : 'No AI generated draft may be issued without manual review and executive digital signature.'}</span></li>
          <li style="color: #222222;"><strong style="color: #111111;">${state.lang === 'bn' ? 'সার্বভৌম অবকাঠামো:' : 'Sovereign Hosting:'}</strong> <span style="color: #222222;">${state.lang === 'bn' ? 'কালিয়াকৈর জাতীয় ডেটা সেন্টারে সংরক্ষিত সার্বভৌম মডেল \'ডংলা এআই\' দ্বারা সকল সেবা পরিচালিত হবে।' : 'All operations remain localized in the Tier-IV National Data Center at Gazipur.'}</span></li>
        </ul>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
          <button class="btn-msg-audio" style="color: #008532;" onclick="navigator.clipboard.writeText(this.parentElement.parentElement.innerText); alert('${state.lang === 'bn' ? 'কপি সম্পন্ন হয়েছে' : 'Copied to clipboard'}')">📋 ${state.lang === 'bn' ? 'সারসংক্ষেপ কপি করুন' : 'Copy Bullets'}</button>
        </div>
      </div>
    `;
  } else if (style === 'draft') {
    targetContainer.innerHTML = `
      <div style="font-family: Nikosh, Kalpurush, Arial, sans-serif; background: #fffdf7; padding: 18px; border: 1px solid #d4af37; border-radius: 4px; box-shadow: inset 0 0 5px rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #008532; padding-bottom: 6px; margin-bottom: 12px;">
          <strong style="color: #008532; font-size: 14px;">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | ডি-নথি নোটশীট খসড়া</strong>
          <span style="color: #DC2626; font-weight: 700; font-size: 13px;">স্মারক নং: ৫৬.০০.০৯২.২৬.এআই-নোট</span>
        </div>
        <div style="line-height: 1.8; color: #222222;">
          <strong style="color: #111111;">১. বিষয়:</strong> <span style="color: #222222;">সরকারি দপ্তরসমূহে রাষ্ট্রীয় কৃত্রিম বুদ্ধিমত্তা 'ডংলা এআই' ব্যবহারের নীতিমালা অনুমোদন ও বাস্তবায়ন সংক্রান্ত।</span><br/>
          <strong style="color: #111111;">২. উপস্থাপন ও পটভূমি:</strong> <span style="color: #222222;">উপর্যুক্ত বিষয়ে নথিভুক্ত সার্কুলারটি পর্যালোচনায় প্রতীয়মান হয় যে, দাপ্তরিক কার্যক্রমে স্বচ্ছতা ও গতিশীলতা বৃদ্ধির লক্ষ্যে আইসিটি বিভাগ কর্তৃক প্রস্তাবিত এআই গাইডলাইনটি সময়োপযোগী এবং জাতীয় সাইবার নিরাপত্তা নির্দেশিকা ২০২৬-এর সাথে পূর্ণ সঙ্গতিপূর্ণ।</span><br/>
          <strong style="color: #111111;">৩. সিদ্ধান্ত প্রস্তাব:</strong> <span style="color: #222222;">বর্ণিতাবস্থায়, প্রস্তাবিত নির্দেশনা অনুযায়ী সকল অধীনস্থ দপ্তর ও মাঠ প্রশাসনে সার্বভৌম এআই মডেল ব্যবহারের প্রশাসনিক মঞ্জুরি সদয় স্বাক্ষরের জন্য উপস্থাপন করা হলো।</span>
        </div>
        <div style="margin-top: 25px; text-align: right; color: #222222;">
          <div style="border-top: 1px dashed #777; display: inline-block; padding-top: 4px; text-align: center; color: #222222;">
            <strong style="color: #111111;">(দায়িত্বপ্রাপ্ত নির্বাহী কর্মকর্তা)</strong><br/>
            <span style="color: #333333;">যুগ্মসচিব (প্রশাসন)<br/>তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ</span>
          </div>
        </div>
      </div>
    `;
  } else {
    targetContainer.innerHTML = `
      <div class="summary-card-rendered">
        <h4 style="color: #008532; margin-bottom: 8px; font-weight: 700;">
          ${state.lang === 'bn' ? '📖 সহজ নাগরিক সারসংক্ষেপ:' : '📖 Plain Citizen Summary:'}
        </h4>
        <p style="line-height: 1.7; color: #111111;">
          ${state.lang === 'bn' 
            ? 'এই সরকারি নির্দেশনার মূল বক্তব্য হলো—সরকারি দপ্তরগুলোতে কৃত্রিম বুদ্ধিমত্তার প্রয়োগ নিশ্চিত করে নাগরিক সেবা দ্রুততর ও সহজ করা। সরকারি কর্মকর্তাগণ দাপ্তরিক কাজে রাষ্ট্রীয় এআই সহকারী ব্যবহার করতে পারবেন, কিন্তু নাগরিকদের ব্যক্তিগত ও গোপনীয় তথ্য সম্পূর্ণ সুরক্ষিত রাখতে হবে এবং কোনো অবস্থাতেই যাচাইহীন এআই খসড়া জারি করা যাবে না। সকল ডেটা বাংলাদেশ জাতীয় ডেটা সেন্টারে সম্পূর্ণ নিরাপদ ও সংরক্ষিত থাকবে।'
            : 'The primary purpose of this circular is to accelerate public service delivery using sovereign Artificial Intelligence across government offices. Civil servants may utilize certified AI platforms for administrative efficiency while ensuring total protection of citizen privacy and compliance with data sovereignty protocols. No AI generated output can be published without human executive verification.'}
        </p>
        <div style="margin-top: 12px;">
          <button class="btn-msg-audio" style="color: #008532;" onclick="navigator.clipboard.writeText(this.parentElement.parentElement.innerText); alert('${state.lang === 'bn' ? 'কপি সম্পন্ন হয়েছে' : 'Copied to clipboard'}')">📋 ${state.lang === 'bn' ? 'কপি করুন' : 'Copy Summary'}</button>
        </div>
      </div>
    `;
  }
}

// ==========================================================================
// 13. SMART LAND & SURVEY (CS/SA/RS) SEARCH SIMULATOR
// ==========================================================================
function initLandSurveySearch() {
  const surveySelect = document.getElementById('surveyTypeSelect');
  const divSelect = document.getElementById('landDivisionSelect');
  const distSelect = document.getElementById('landDistrictSelect');
  const upaSelect = document.getElementById('landUpazilaSelect');
  const mouzaInput = document.getElementById('landMouzaInput');
  const khatianInput = document.getElementById('landKhatianInput');
  const dagInput = document.getElementById('landDagInput');
  const sampleBtn = document.getElementById('btnLoadLandSample');
  const searchBtn = document.getElementById('btnSearchLand');
  const resultBox = document.getElementById('landResultBox');
  const resultContent = document.getElementById('landResultContent');

  if (!searchBtn) return;

  // Load sample land search query
  sampleBtn?.addEventListener('click', () => {
    if (surveySelect) surveySelect.value = 'rs';
    if (divSelect) divSelect.value = 'dhaka';
    if (distSelect) distSelect.value = 'gazipur';
    if (upaSelect) upaSelect.value = 'gazipur_sadar';
    if (mouzaInput) mouzaInput.value = state.lang === 'bn' ? 'চন্দ্রা (জে.এল. ১২)' : 'Chandra (J.L. 12)';
    if (khatianInput) khatianInput.value = '৪২৮';
    if (dagInput) dagInput.value = '১০৭৫';
  });

  searchBtn.addEventListener('click', () => {
    const khatianVal = khatianInput?.value.trim() || '৪২৮';
    const dagVal = dagInput?.value.trim() || '১০৭৫';
    const surveyType = surveySelect?.value || 'rs';
    const mouzaVal = mouzaInput?.value.trim() || (state.lang === 'bn' ? 'চন্দ্রা (জে.এল. ১২)' : 'Chandra (J.L. 12)');

    if (!resultBox || !resultContent) return;

    resultBox.style.display = 'block';
    resultContent.innerHTML = `
      <div style="padding: 25px; text-align: center; color: #008532;">
        <div style="font-size: 26px; animation: spin 1s infinite linear;">🔍</div>
        <div style="font-weight: 600; margin-top: 8px; color: #008532;">
          ${state.lang === 'bn' 
            ? 'ভূমি রেকর্ড ও জরিপ অধিদপ্তরের ডিজিটাল খতিয়ান ডাটাবেসে অনুসন্ধান চলছে...' 
            : 'Querying DLRS Sovereign Land Records Database...'}
        </div>
      </div>
    `;
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
      renderLandQueryResult(surveyType, mouzaVal, khatianVal, dagVal, resultContent);
    }, 600);
  });
}

function renderLandQueryResult(surveyType, mouza, khatian, dag, container) {
  const surveyNames = {
    cs: state.lang === 'bn' ? 'সিএস (Cadastral Survey - ১৯৪০)' : 'CS (Cadastral Survey - 1940)',
    sa: state.lang === 'bn' ? 'এসএ (State Acquisition - ১৯৬২)' : 'SA (State Acquisition - 1962)',
    rs: state.lang === 'bn' ? 'আরএস (Revisional Survey - ১৯৮৮)' : 'RS (Revisional Survey - 1988)',
    bs: state.lang === 'bn' ? 'বিএস (Bangladesh Survey - ২০০০)' : 'BS (Bangladesh Survey - 2000)',
    city: state.lang === 'bn' ? 'সিটি জরিপ (City Survey)' : 'City Survey (Modern)'
  };

  const surveyTitle = surveyNames[surveyType] || 'আরএস জরিপ';
  const ownerName = state.lang === 'bn' ? 'মো: রফিকুল ইসলাম ও অন্যান্য' : 'Md. Rafiqul Islam & Others';
  const fatherName = state.lang === 'bn' ? 'মরহুম আব্দুল কাদের' : 'Late Abdul Kader';

  container.innerHTML = `
    <div class="land-porcha-card" style="background: #ffffff; border: 2px solid #008532; border-radius: 6px; padding: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Top Porcha Crest Strip -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #008532; padding-bottom: 10px; margin-bottom: 12px;">
        <div>
          <div style="font-size: 11px; color: #555555;">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | ভূমি মন্ত্রণালয়</div>
          <h3 style="color: #008532; margin: 2px 0;">স্মার্ট ডিজিটাল খতিয়ান পর্চা (অনলাইন ভেরিফায়েড)</h3>
          <span style="font-size: 12px; background: #e8f5e9; color: #008532; padding: 2px 8px; border-radius: 4px; font-weight: 600;">জরিপ: ${surveyTitle}</span>
        </div>
        <div style="text-align: right;">
          <span style="display: inline-block; background: #008532; color: #ffffff; font-size: 11px; padding: 4px 10px; border-radius: 12px; font-weight: 600;">✓ বৈধ ও নিষ্কণ্টক</span>
          <div style="font-size: 10.5px; color: #666666; margin-top: 3px;">বারকোড নং: DLRS-2026-98124</div>
        </div>
      </div>

      <!-- Khatian Summary Table -->
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 12px; color: #000000;">
        <tr style="background: #f8f9fa;">
          <td style="padding: 6px 10px; border: 1px solid #ddd; width: 25%; color: #333333;"><strong>খতিয়ান নম্বর:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; width: 25%; color: #DC2626; font-weight: bold;">${khatian}</td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; width: 25%; color: #333333;"><strong>দাগ নম্বর:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; width: 25%; font-weight: bold; color: #000000;">${dag}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #333333;"><strong>মৌজা ও জে.এল নং:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #000000;">${mouza}</td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #333333;"><strong>উপজেলা ও জেলা:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #000000;">কালিয়াকৈর, গাজীপুর</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #333333;"><strong>মালিক / রায়তের নাম:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; font-weight: 600; color: #000000;">${ownerName}</td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #333333;"><strong>পিতা / স্বামীর নাম:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #000000;">${fatherName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #333333;"><strong>জমির শ্রেণি:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #000000;">নাল ও ভিটি</td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #333333;"><strong>জমির পরিমাণ:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #008532; font-weight: bold;">০.১২৫০ একর (১২.৫ শতক)</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #333333;"><strong>ই-নামজারি স্ট্যাটাস:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #008532; font-weight: 600;">অনুমোদিত ও রেকর্ডভুক্ত</td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #333333;"><strong>খাজনা / কর স্ট্যাটাস:</strong></td>
          <td style="padding: 6px 10px; border: 1px solid #ddd; color: #000000;">পরিশোধিত (১৪৩৩ সন পর্যন্ত)</td>
        </tr>
      </table>

      <!-- AI Lineage Verification Note -->
      <div style="background: #eef7ee; border-left: 3px solid #008532; padding: 10px; font-size: 12px; margin-bottom: 12px; color: #222222;">
        🤖 <strong>এআই ধারাবাহিকতা বিশ্লেষণ (Chain of Title):</strong> <span style="color: #222222;">সিএস থেকে আরএস জরিপ পর্যন্ত মালিকানার ধারাবাহিকতায় কোনো বিরোধ বা রেকর্ড জালিয়াতি পাওয়া যায়নি। বিরোধ ঝুঁকি স্কোর:</span> <strong style="color: #008532;">০% (সম্পূর্ণ নিরাপদ)</strong>।
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="btn-govt-action" style="background: #008532; color: #ffffff;" onclick="window.print()">🖨️ ${state.lang === 'bn' ? 'ডিজিটাল পর্চা প্রিন্ট' : 'Print Porcha'}</button>
        <button class="btn-govt-action" style="background: #0d3b66; color: #ffffff;" onclick="window.open('https://mutation.land.gov.bd', '_blank')">🌐 ${state.lang === 'bn' ? 'ই-নামজারি আবেদন (land.gov.bd)' : 'Apply for e-Mutation'}</button>
      </div>

    </div>
  `;
}

// ==========================================================================
// 14. NOTICE BOARD TABS FILTER (সকল, পরিপত্র, অফিস আদেশ, নীতিমালা, টেন্ডার)
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

function updateNoticeTabBadges() {
  const tabs = document.querySelectorAll('.notice-tab-btn');
  const rows = document.querySelectorAll('.notice-row');

  tabs.forEach(tab => {
    const filter = tab.getAttribute('data-tab');
    if (!filter) return;

    let count = 0;
    rows.forEach(row => {
      const cat = row.getAttribute('data-category');
      if (filter === 'all' || cat === filter) count++;
    });

    const badge = tab.querySelector('.tab-count-badge');
    if (badge) {
      badge.innerText = state.lang === 'bn' ? toBanglaNumber(count) : count;
      badge.style.color = '#008532';
    }
  });
}

// ==========================================================================
// 15. NATIONAL ANTHEM (AUTHENTIC AUDIO & SYNTHESIZER FALLBACK)
// ==========================================================================
function initNationalAnthem() {
  const btn = document.getElementById('btnPlayAnthem');
  const status = document.getElementById('anthemStatusText');
  const progressFill = document.getElementById('anthemProgressFill');
  const lyricsBtn = document.getElementById('btnAnthemLyrics');
  const lyricsBox = document.getElementById('anthemLyricsBox');
  const audioEl = document.getElementById('nationalAnthemAudio');

  // Toggle lyrics box
  lyricsBtn?.addEventListener('click', () => {
    if (!lyricsBox) return;
    const isHidden = lyricsBox.style.display === 'none' || !lyricsBox.style.display;
    lyricsBox.style.display = isHidden ? 'block' : 'none';
    lyricsBtn.innerText = isHidden 
      ? (state.lang === 'bn' ? '📜 গানের কথা লুকান' : '📜 Hide Lyrics')
      : (state.lang === 'bn' ? '📜 গানের কথা দেখুন' : '📜 View Lyrics');
  });

  if (audioEl) {
    audioEl.addEventListener('play', () => {
      state.isAnthemPlaying = true;
      if (btn) {
        btn.innerHTML = state.lang === 'bn' ? '⏹ <span>বন্ধ করুন</span>' : '⏹ <span>Stop Anthem</span>';
      }
      if (status) {
        status.innerText = state.lang === 'bn' ? 'বাজছে: আমার সোনার বাংলা...' : 'Playing: Amar Shonar Bangla...';
      }
    });

    audioEl.addEventListener('pause', () => {
      state.isAnthemPlaying = false;
      if (btn) {
        btn.innerHTML = state.lang === 'bn' ? '▶ <span>বাজান</span>' : '▶ <span>Play</span>';
      }
      if (status) {
        status.innerText = state.lang === 'bn' ? 'অডিও স্থগিত' : 'Audio paused';
      }
    });

    audioEl.addEventListener('ended', () => {
      state.isAnthemPlaying = false;
      if (btn) {
        btn.innerHTML = state.lang === 'bn' ? '▶ <span>বাজান</span>' : '▶ <span>Play</span>';
      }
      if (status) {
        status.innerText = state.lang === 'bn' ? 'অফিসিয়াল রেকর্ডিং সমাপ্ত' : 'Official audio ended';
      }
      if (progressFill) progressFill.style.width = '0%';
    });

    audioEl.addEventListener('timeupdate', () => {
      if (progressFill && audioEl.duration) {
        const pct = Math.min(100, (audioEl.currentTime / audioEl.duration) * 100);
        progressFill.style.width = `${pct}%`;
      }
    });
  }

  if (!btn) return;

  btn.addEventListener('click', () => {
    if (audioEl) {
      if (audioEl.paused) {
        audioEl.play().catch(err => {
          console.warn('HTML5 Audio play blocked or failed, falling back to Web Audio API synthesis:', err);
          if (state.isAnthemPlaying) {
            stopAnthem();
          } else {
            playAnthemMelody();
          }
        });
      } else {
        audioEl.pause();
      }
      return;
    }

    if (state.isAnthemPlaying) {
      stopAnthem();
    } else {
      playAnthemMelody();
    }
  });

  function stopAnthem() {
    state.isAnthemPlaying = false;
    clearTimeout(state.anthemSynthTimer);
    clearInterval(state.anthemProgressInterval);

    if (progressFill) progressFill.style.width = '0%';

    if (state.activeAnthemAudioCtx) {
      try {
        state.activeAnthemAudioCtx.close();
      } catch (e) {
        // Ignore
      }
      state.activeAnthemAudioCtx = null;
    }
    btn.innerHTML = state.lang === 'bn' ? '▶ <span>জাতীয় সংগীত শুনুন</span>' : '▶ <span>Play National Anthem</span>';
    if (status) {
      status.innerText = state.lang === 'bn' ? 'প্লেয়ার প্রস্তুত' : 'Player ready';
    }
  }

  function playAnthemMelody() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      state.activeAnthemAudioCtx = new AudioContext();
    } catch (e) {
      alert(state.lang === 'bn' ? 'ওয়েব অডিও সমর্থিত নয়।' : 'Web Audio API not supported.');
      return;
    }

    state.isAnthemPlaying = true;
    btn.innerHTML = state.lang === 'bn' ? '⏹ <span>বন্ধ করুন</span>' : '⏹ <span>Stop Anthem</span>';
    if (status) {
      status.innerText = state.lang === 'bn' ? 'বাজছে: আমার সোনার বাংলা (সুর)...' : 'Playing: Amar Shonar Bangla (Melody)...';
    }

    // Melodic notes for "আমার সোনার বাংলা, আমি তোমায় ভালোবাসি"
    // Frequencies: G4 (392.00), A4 (440.00), B4 (493.88), C5 (523.25), D5 (587.33), E4 (329.63), F#4 (369.99)
    const notes = [
      { f: 392.00, d: 0.45 }, // G4 - আ
      { f: 440.00, d: 0.45 }, // A4 - মার
      { f: 493.88, d: 0.45 }, // B4 - সো
      { f: 523.25, d: 0.70 }, // C5 - নার
      { f: 493.88, d: 0.45 }, // B4 - বাং
      { f: 440.00, d: 0.45 }, // A4 - লা
      { f: 392.00, d: 0.85 }, // G4 -
      { f: 440.00, d: 0.45 }, // A4 - আ
      { f: 493.88, d: 0.45 }, // B4 - মি
      { f: 523.25, d: 0.45 }, // C5 - তো
      { f: 493.88, d: 0.45 }, // B4 - মায়
      { f: 440.00, d: 0.45 }, // A4 - ভা
      { f: 392.00, d: 0.45 }, // G4 - লো
      { f: 369.99, d: 0.45 }, // F#4- বা
      { f: 392.00, d: 0.90 }  // G4 - সি
    ];

    let time = state.activeAnthemAudioCtx.currentTime + 0.1;

    notes.forEach(note => {
      const osc = state.activeAnthemAudioCtx.createOscillator();
      const gain = state.activeAnthemAudioCtx.createGain();
      const filter = state.activeAnthemAudioCtx.createBiquadFilter();

      // Warm acoustic tone with harmonic filtration
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, time);

      // ADSR Envelope
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.25, time + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(state.activeAnthemAudioCtx.destination);

      osc.start(time);
      osc.stop(time + note.d);

      time += note.d + 0.08;
    });

    const totalDuration = (time - state.activeAnthemAudioCtx.currentTime) * 1000;
    const startTime = Date.now();

    // Progress bar animation
    if (progressFill) {
      clearInterval(state.anthemProgressInterval);
      state.anthemProgressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / totalDuration) * 100);
        progressFill.style.width = `${pct}%`;
        if (pct >= 100) clearInterval(state.anthemProgressInterval);
      }, 100);
    }

    state.anthemSynthTimer = setTimeout(() => {
      stopAnthem();
    }, totalDuration);
  }
}

// ==========================================================================
// 16. CITIZEN OPINION POLL WIDGET
// ==========================================================================
function initPoll() {
  const submitBtn = document.getElementById('btnSubmitVote');
  const pollOpts = document.getElementById('pollOptionsGroup');
  const pollResults = document.getElementById('pollResultsBox');

  if (!submitBtn || !pollResults) return;

  // Restore if voted before
  if (state.pollVoted && pollOpts) {
    pollOpts.style.display = 'none';
    submitBtn.style.display = 'none';
    pollResults.style.display = 'block';
    setPollBarWidths();
  }

  submitBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="poll_option"]:checked');
    if (!selected) {
      alert(state.lang === 'bn' ? 'অনুগ্রহ করে একটি মতামত নির্বাচন করুন।' : 'Please select an option.');
      return;
    }

    state.pollVoted = true;
    localStorage.setItem('bd_portal_poll_voted', 'true');

    if (pollOpts) pollOpts.style.display = 'none';
    submitBtn.style.display = 'none';
    pollResults.style.display = 'block';

    setPollBarWidths();
  });
}

function setPollBarWidths() {
  setTimeout(() => {
    const yesBar = document.getElementById('pollFillYes');
    const noBar = document.getElementById('pollFillNo');
    const neuBar = document.getElementById('pollFillNeutral');

    if (yesBar) yesBar.style.width = '84%';
    if (noBar) noBar.style.width = '11%';
    if (neuBar) neuBar.style.width = '5%';
  }, 100);
}

// ==========================================================================
// 17. WELCOME / EMERGENCY ANNOUNCEMENT POPUP MODAL
// ==========================================================================
function initPopupModal() {
  const modal = document.getElementById('welcomeModal');
  const closeBtn = document.getElementById('btnCloseModal');
  const ackBtn = document.getElementById('btnModalAcknowledge');
  const dontShow = document.getElementById('chkDontShowModal');

  if (!modal) return;

  const dismissedTime = localStorage.getItem('bd_portal_welcome_dismissed');
  const now = Date.now();
  const isDismissedRecent = dismissedTime && (now - parseInt(dismissedTime, 10)) < (24 * 60 * 60 * 1000);

  if (!isDismissedRecent) {
    setTimeout(() => {
      modal.classList.add('active');
    }, 450);
  }

  function dismiss() {
    modal.classList.remove('active');
    if (dontShow?.checked) {
      localStorage.setItem('bd_portal_welcome_dismissed', Date.now().toString());
    }
  }

  closeBtn?.addEventListener('click', dismiss);
  ackBtn?.addEventListener('click', dismiss);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) dismiss();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      dismiss();
    }
  });
}

// ==========================================================================
// 18. PDF MEMORANDUM PREVIEW MODAL
// ==========================================================================
function initPdfModal() {
  const modal = document.getElementById('pdfModal');
  const closeBtn = document.getElementById('btnClosePdfModal');
  const memoLinks = document.querySelectorAll('.btn-view-memo');
  const printPdfBtn = document.getElementById('btnPrintPdf');

  if (!modal) return;

  memoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-memo-id') || '1';
      const data = memoDatabase[id] || memoDatabase[1];

      const memoEl = document.getElementById('pdfModalMemoNo');
      const dateEl = document.getElementById('pdfModalDate');
      const subEl = document.getElementById('pdfModalSubject');
      const bodyEl = document.getElementById('pdfModalBody');
      const signEl = document.getElementById('pdfModalSignatory');
      const recEl = document.getElementById('pdfModalRecipients');

      if (memoEl) {
        memoEl.innerText = state.lang === 'bn' ? `স্মারক নং: ${data.memo}` : `Memo No: ${data.memoEn || data.memo}`;
        memoEl.style.color = '#DC2626';
        memoEl.style.fontWeight = 'bold';
      }
      if (dateEl) {
        dateEl.innerText = state.lang === 'bn' ? `তারিখ: ${data.date}` : `Date: ${data.dateEn || data.date}`;
        dateEl.style.color = '#555555';
      }
      if (subEl) {
        subEl.innerText = state.lang === 'bn' ? `বিষয়: ${data.subject}` : `Subject: ${data.subjectEn || data.subject}`;
        subEl.style.color = '#008532';
      }
      if (bodyEl) {
        bodyEl.innerText = data.body;
        bodyEl.style.color = '#222222';
      }
      if (signEl) {
        signEl.innerText = data.signatory;
        signEl.style.color = '#222222';
      }
      if (recEl) {
        recEl.innerText = data.recipient;
        recEl.style.color = '#333333';
      }

      modal.classList.add('active');
    });
  });

  printPdfBtn?.addEventListener('click', () => {
    window.print();
  });

  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

// ==========================================================================
// 18.1 PHOTO GALLERY LIGHTBOX MODAL
// ==========================================================================
function initGalleryLightbox() {
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('galleryModalImg');
  const modalTitle = document.getElementById('galleryModalTitle');
  const modalDate = document.getElementById('galleryModalDate');
  const closeBtn = document.getElementById('btnGalleryClose');
  const overlay = modal?.querySelector('.gallery-modal-overlay');

  if (!modal || !modalImg) return;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-img');
      const isBn = state.lang === 'bn';
      const title = item.getAttribute(`data-title-${state.lang}`) || item.getAttribute('data-title-bn');
      const date = item.getAttribute(`data-date-${state.lang}`) || item.getAttribute('data-date-bn');

      modalImg.src = src;
      if (modalTitle) modalTitle.innerText = title;
      if (modalDate) modalDate.innerText = date;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.style.display = 'none';
    modalImg.src = '';
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}

// ==========================================================================
// 19. DYNAMIC VISITOR COUNTER
// ==========================================================================
function initVisitorCounter() {
  updateVisitorStatsDisplay();

  // Tick up visitors realistically
  setInterval(() => {
    state.visitorCountToday += Math.floor(Math.random() * 2) + 1;
    state.visitorCountTotal += Math.floor(Math.random() * 2) + 1;

    localStorage.setItem('bd_portal_visitor_today', state.visitorCountToday.toString());
    localStorage.setItem('bd_portal_visitor_total', state.visitorCountTotal.toString());

    updateVisitorStatsDisplay();
  }, 4500);
}

function updateVisitorStatsDisplay() {
  const todayEl = document.getElementById('valVisitorToday');
  const totalEl = document.getElementById('valVisitorTotal');

  if (todayEl) {
    todayEl.innerText = state.lang === 'bn' 
      ? toBanglaNumber(state.visitorCountToday) 
      : state.visitorCountToday.toLocaleString();
  }

  if (totalEl) {
    totalEl.innerText = state.lang === 'bn' 
      ? toBanglaNumber(state.visitorCountTotal) 
      : state.visitorCountTotal.toLocaleString();
  }
}

// ==========================================================================
// 20. GLOBAL SEARCH & VOICE SEARCH
// ==========================================================================
function initGlobalSearch() {
  const searchInput = document.getElementById('portalSearchInput') || document.getElementById('globalSearchInput');
  const searchBtn = document.getElementById('btnSearchSubmit') || document.getElementById('btnGlobalSearch');
  const voiceSearchBtn = document.getElementById('btnVoiceSearch');

  if (!searchInput) return;

  function executeSearch(query) {
    if (!query || !query.trim()) return;
    const q = query.trim().toLowerCase();

    if (q.includes('পাসপোর্ট') || q.includes('passport')) {
      document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
      const chatIn = document.getElementById('chatInput');
      if (chatIn) {
        chatIn.value = state.lang === 'bn' ? 'ই-পাসপোর্ট আবেদন ও ফি' : 'e-Passport Application & Fees';
        document.getElementById('btnChatSend')?.click();
      }
    } else if (q.includes('জমি') || q.includes('খতিয়ান') || q.includes('land') || q.includes('survey')) {
      const landSec = document.getElementById('land-ai') || document.getElementById('ai-services');
      landSec?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('নথি') || q.includes('পরিপত্র') || q.includes('doc') || q.includes('সারসংক্ষেপ')) {
      document.getElementById('doc-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('নোটিশ') || q.includes('notice') || q.includes('অফিস আদেশ')) {
      document.getElementById('notices')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
      const chatIn = document.getElementById('chatInput');
      if (chatIn) {
        chatIn.value = query;
        document.getElementById('btnChatSend')?.click();
      }
    }
  }

  searchBtn?.addEventListener('click', () => executeSearch(searchInput.value));
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') executeSearch(searchInput.value);
  });

  voiceSearchBtn?.addEventListener('click', () => {
    startVoiceRecognition((transcript) => {
      searchInput.value = transcript;
      executeSearch(transcript);
    });
  });
}

// ==========================================================================
// 21. NUMERICAL & TEXT UTILITIES
// ==========================================================================
function toBanglaNumber(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, d => bnDigits[d]);
}

// Global & CommonJS exports for verification and testing
if (typeof window !== 'undefined') {
  window.getChatbotResponse = getChatbotResponse;
  window.generateBotResponse = generateBotResponse;
  window.aiKnowledgeBase = aiKnowledgeBase;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    state,
    aiKnowledgeBase,
    sampleCirculars,
    memoDatabase,
    getChatbotResponse,
    generateBotResponse,
    toBanglaNumber
  };
}
