# Comprehensive Analysis of Bangladesh Government Websites & Portals

**Conducted across 50+ Verified Active Official Government Domains (`.gov.bd` / `.org.bd`)**  
*Date of Assessment: November 2026*  
*Reference Portals Analyzed:* Bangladesh National Portal (`bangladesh.gov.bd`), Cabinet Division (`cabinet.gov.bd`), Ministry of Public Administration (`mopa.gov.bd`), ICT Division (`ictd.gov.bd`), Bangladesh Computer Council (`bcc.gov.bd`), National Board of Revenue (`nbr.gov.bd`), Ministry of Home Affairs (`mha.gov.bd`), Bangladesh Police (`police.gov.bd`), Supreme Court (`supremecourt.gov.bd`), BRTA (`brta.gov.bd`), Ministry of Land (`minland.gov.bd`), Directorate General of Health Services (`dghs.gov.bd`), and others.

---

## 1. Common Theme & Architectural Template

### The National Portal Framework (NPF / জাতীয় তথ্য বাতায়ন)
Over 85% to 90% of all Bangladesh ministry, division, directorate, and district portals run on a single standardized platform known as the **National Web Portal of Bangladesh (NPF)**, originally developed and maintained under the **a2i (Aspire to Innovate)** programme in collaboration with the Cabinet Division and the ICT Division.

* **Layout Structure**:
  * **Standard 2-Column Grid** (70–75% main content area on the left; 25–30% widget sidebar on the right).
  * **Top Utility Bar**: Houses citizen accessibility toggles, date in Bangla & Gregorian calendars, and bilingual switcher.
  * **Portal Header**: Features the official circular emblem of Bangladesh, official Bengali and English designations, a search bar, and national campaign emblems.
  * **Primary Navigation Menu**: Fixed or static horizontal bar with deep green background, golden hover effects, and cascading dropdown menus.
  * **Breaking News Ticker / Marquee**: Prominently sits immediately beneath the main navigation bar.
  * **Content Body**:
    * Hero slider banner with official high-level event photography.
    * Tabbed Notice Boards (`নোটিশ বোর্ড`, `অফিস আদেশ`, `বিজ্ঞপ্তি ও প্রজ্ঞাপন`).
    * Citizen Service Grids (ই-সেবাসমূহ / Citizen Charter).
  * **Right-Hand Sidebar**:
    * VIP Dignitary Portrait Card (Hon'ble Chief Adviser / Minister, Secretary).
    * National Emergency Hotlines (999, 333, 106, 109, 16122).
    * National Anthem audio player.
    * Central Portal Banners & Quick Links.
    * Dynamic Visitor Counter.
  * **Standardized a2i Footer**: Unified copyright, disclaimer, site update timestamp, planning & implementation credits, and technical assistance partner logos.

---

## 2. Style, Typography & Color Palette

### Color Palette
The aesthetic directly mirrors national symbols and civil service heritage:
* **Government Green** (`#006a4e`, `#10431C`, `#008c3a`, `#28a745`): Represents the green field of the national flag, lush greenery, and peace. Used for headers, primary navigation bars, button accents, and table headers.
* **National Red** (`#dc3545`, `#F90101`, `#C1282A`): Represents the sun in the national flag and sacrifice. Used for urgent notices, breaking news badges, hotline 999 tiles, and PDF download icons.
* **Saffron Gold / Yellow** (`#FFA500`, `#e89e00`): Used for menu borders, active tabs, and national insignia highlights.
* **Neutral Grays & Off-White** (`#F4F6F8`, `#E9ECEF`, `#202020`): Clean, utilitarian background to ensure high readability for citizens across low-bandwidth connections.

### Typography
* **Bangla Fonts**: Primary reliance on Unicode fonts such as `Kalpurush`, `SolaimanLipi`, `Nikosh`, `Siyam Rupali`, and Google's `Noto Sans Bengali` / `Hind Siliguri`.
* **English Fonts**: Clean sans-serifs including `Open Sans`, `Roboto`, `Verdana`, and `Arial`.
* **Font-Size Accessibility Controls**: Standard buttons `A-`, `A`, `A+` in the top bar to assist elderly citizens and persons with visual impairments.

---

## 3. Language & Bilingual Patterns

* **Primary Language**: Standard Formal Administrative Bengali (প্রশাসনিক প্রমিত বাংলা).
* **Bilingual Switcher**: Almost all portals offer a `বাংলা | English` toggle in the top-right corner.
* **Distinct Administrative Vocabulary**:
  * *প্রজ্ঞাপন* (Notification / Gazette)
  * *স্মারক নম্বর* (Memorandum / Reference ID)
  * *পরিপত্র ও পরিশিষ্ট* (Circulars and Annexures)
  * *সিটিজেন চার্টার* (Citizen Charter)
  * *বার্ষিক কর্মসম্পাদন চুক্তি - এপিএ* (Annual Performance Agreement - APA)
  * *শুদ্ধাচার কর্মপরিকল্পনা* (National Integrity Strategy)
  * *অভিযোগ প্রতিকার ব্যবস্থা - জিআরএস* (Grievance Redress System - GRS)
* **Translation Quirks**:
  * English interfaces are frequently incomplete; sub-menus or notice titles often remain in Bengali even when the English toggle is activated.
  * Bureaucratic jargon translated literally (e.g., "Foreign Travel GO / NOC for Passport").

---

## 4. Imagery & Visual Media

* **VIP Leadership Cards**: Formal, studio-lit official portraits of the Head of Government (Chief Adviser / Prime Minister) and the relevant Ministry Secretary or Director General, flanked by their designation, ministry, and a link to their official curriculum vitae.
* **Hero Sliders**: High-resolution photographs depicting landmark infrastructure projects (Padma Multipurpose Bridge, Dhaka Metro Rail, Bangabandhu Satellite-1, Bangabandhu Tunnel), diplomatic bilateral meetings, or large cabinet conference halls.
* **National Emblem (জাতীয় প্রতীক)**: The golden Water Lily (*শাপলা*) floating on water, flanked by two paddy sheaves, three jute leaves, and four stars.
* **Service Badges**: Round or soft-square flat vector icons denoting digital services (Smart Land, Tax return, e-TIN, Passport tracking, Pension).

---

## 5. Music & Audio Elements

* **National Anthem Audio Player (`national-anthem-audio`)**:
  * Present on a vast majority of NPF portals (e.g. MOPA, ICTD, BCC, BRTA, Ministry of Land).
  * Built as an embedded HTML5 audio widget located on the right sidebar titled **"জাতীয় সংগীত"** (Amar Shonar Bangla / আমার সোনার বাংলা).
  * Plays the full or instrumental version of the national anthem.
* **Screen Reader / Audio Narration**:
  * Modern NPF V2 implementations include a "পড়ে শুনুন" (Listen / Read Aloud) text-to-speech button on major press releases and public circulars.

---

## 6. Popups, Modals & Floating Banners

* **Welcome / Emergency Notice Modal**:
  * Automatically fires on initial homepage visit.
  * Used for national health alerts, disaster warnings, public recruitment circulars, or major milestone announcements.
  * Contains a standard *"আজ আর দেখাবেন না"* (Do not show again today) checkbox and *"বন্ধ করুন"* (Close) button.
* **Horizontal News Ticker / Marquee**:
  * Located prominently below the navigation bar (`class="news-card-widget-ticker"` or `class="scroll-text"`).
  * Displays urgent notices, tender submissions, and recent gazettes sliding horizontally across the screen, complete with a pause/play control.
* **Corner Badges / Floaters**:
  * Floating contact badges on bottom-right (e.g. "সহায়তা কল সেন্টার ৩৩৩" or "স্মার্ট নাগরিক চ্যাটবট").

---

## 7. Common Technical Quirks & Errors

During the inspection of over 50 government sites, several recurring patterns and anomalies were observed:
1. **Asset CDN / Object Storage Broken Links**:
   * Several portals reference asset paths hosted on Oracle Cloud Gazipur Data Center (`objectstorage.ap-dcc-gazipur-1.oraclecloud15.com`) with fallback error handlers like `onerror="this.onerror=null; this.src='/site-assets/images/technical-support.svg';"`.
2. **Subdomain SSL / DNS Resolution Failures**:
   * While main ministry portals have valid HTTPS certificates, specific sub-agencies (e.g. `nidw.gov.bd`, `acc.gov.bd`, `services.gov.bd`) suffer from connection timeouts, connection resets by peer, or missing DNS records.
3. **Heavy Table-based Legacy Layouts**:
   * Deeper subpages (such as gazette archives or employee seniority lists) revert to raw HTML tables with fixed pixel widths.
4. **Dynamic Timestamp Displays**:
   * Footers specifically state the exact Bengali date and second when the page was compiled (e.g., *"সাইটটি শেষ হাল-নাগাদ করা হয়েছে: বৃহস্পতিবার, ১২ নভেম্বর, ২০২৬ এ ১৫:৪৫:২২"*).
5. **Visitor Counters**:
   * Visual counter blocks displaying daily and cumulative visitor metrics (*"মোট পরিদর্শক"*).

---

## 8. Conceptualizing the Bangladesh Government AI Portal (`ai.gov.bd`)

If the Government of Bangladesh launches a flagship **National Artificial Intelligence Portal (জাতীয় কৃত্রিম বুদ্ধিমত্তা বাতায়ন)**, authentic design requirements dictate that it must:
1. Retain the **authoritative NPF aesthetic** (Government green and red theme, water lily emblem, 2-column citizen-first layout, a2i/ICTD footer credits).
2. Integrate **practical citizen-facing AI features**:
   * **"প্রজ্ঞা" (PROGNA)**: The National Sovereign Bangla AI Assistant for direct public queries (passports, pensions, land mutation, NID).
   * **Govt Document & Memo Drafter (নথি ও সারসংক্ষেপ সহকারী)**: Instant summarization of complex government circulars and gazettes into simple Bengali for rural and non-specialist citizens.
   * **National AI Frameworks & Circulars**: Direct access to responsible AI policies, data privacy guidelines, and ethical AI standards.
   * **All Classic NPF Elements**: Active language switch, hotlines (999, 333, 106, 16122, and new 3331 AI helpdesk), National Anthem audio player, emergency announcement popup, news ticker, and visitor counter.
