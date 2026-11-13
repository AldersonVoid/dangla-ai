# ডাংলা এআই (Dangla AI) — জাতীয় কৃত্রিম বুদ্ধিমত্তা বাতায়ন
### National Artificial Intelligence Portal of Bangladesh (`ai.gov.bd`)

[![Government of Bangladesh](https://img.shields.io/badge/Govt-People's%20Republic%20of%20Bangladesh-006A4E?style=flat-square&logo=bangladesh)](https://bangladesh.gov.bd)
[![Portal Standard](https://img.shields.io/badge/Standard-NPF%20V2%20%2F%20a2i-008532?style=flat-square)](https://a2i.gov.bd)
[![Language](https://img.shields.io/badge/Language-বাংলা%20%7C%20English-DC2626?style=flat-square)](#bilingual-engine)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

A functional, pixel-perfect realization of what the official **Government of the People's Republic of Bangladesh National AI Portal** looks like. Built in strict accordance with the **Bangladesh National Portal Framework (NPF V2)** architecture, official typography standards (SolaimanLipi & Kalpurush), government color tokens, and citizen service workflows.

---

## 🌟 Key Features

### 1. 🤖 Sovereign Citizen AI Assistant — "ডাংলা এআই" (Dangla AI)
- Fully conversational, sovereign Bangla Large Language Model assistant designed for 24/7 citizen public service assistance.
- Integrated government knowledge base for:
  - **e-Passport & Visa**: Fees breakdown (48 pages vs 64 pages), eligibility, regional RPO locator, status tracking.
  - **National ID (NID)**: Corrections, smart card distribution, and voter migration instructions.
  - **Smart Land & Survey (ই-নামজারি ও খতিয়ান)**: Automated mutation, CS/SA/RS khatian ledger verification.
  - **National Emergency Hotlines**: 999, 333, 109, 106, 16122, 1090, 3331.
  - **AI National Policy**: Government administrative circulars, guidelines, and data sovereignty compliance.
- Features real-time voice typing (Web Speech API speech recognition), text-to-speech audio playback in Bangla, quick prompt buttons, and typing indicators.

### 2. 🏛️ Authentic NPF V2 Design & Realism
- **Exact Color Palette**: Built using verified CSS tokens extracted from live government portals (`#00A63E` vibrant green, `#008532` dark green, `#DC2626` national red, and `#e0e0e0` footer).
- **Sequential Line-by-Line Leadership Cards**: Designed to match the authentic structure of [mof.gov.bd](https://mof.gov.bd/), featuring dedicated profile cards for:
  - **মাননীয় প্রধানমন্ত্রী** (*জনাব তারেক রহমান*)
  - **মাননীয় মন্ত্রী** (*ফকির মাহবুব আনাম, এমপি*)
  - **মাননীয় উপদেষ্টা (প্রতিমন্ত্রী পদমর্যাদা)** (*জনাব রেহান আসিফ আসাদ*)
  - **সচিব মহোদয়** (*জনাব মোঃ মামুনুর রশীদ ভূঞা*)
- **High-Resolution Official Portraits**: Directly sourced from the official Oracle Cloud Gazipur National Data Center object storage of the respective ministries.

### 3. 🎵 Official National Anthem Player
- Integrated studio recording of **"আমার সোনার বাংলা"** (`bd_national_anthem.mp3`, 2.88 MB stereo).
- Synchronized waveform progress bar, interactive play/pause controls, lyrics modal toggle, and Web Audio API melodic synthesizer fallback.

### 4. 📸 Official Press & Media Gallery with Lightbox
- High-resolution real event photographs from `ictd.gov.bd` and `a2i.gov.bd`:
  - Gazipur Tier-IV National Data Center AI Cluster
  - National Cyber Security and Data Protection Seminar
  - Dangla AI Platform Demonstration & Digital Access Summit
  - National AI Framework Stakeholder Consultation
  - Bilateral High-Level AI Governance Dialogue
  - Civil Service AI Workshop & EdTech Initiatives
- Interactive full-screen Lightbox viewer with bilingual captions, dates, and keyboard navigation (`ESC` to close).

### 5. 📄 D-Nothi / e-Nothi Summarizer & Official Memo Viewer
- Instant executive summary generator for lengthy government circulars and gazettes.
- Generates official secretariat memo notesheets with serial number, memo number, date, subject, body, signature token, and official recipient dispatch distribution.

### 6. 🌐 Seamless Bilingual Engine (বাংলা ⇄ English)
- Instant toggle between Bengali and English.
- Real-time Bengali calendar conversion engine displaying the exact বঙ্গাব্দ date, season (ঋতু), and Hijri equivalent alongside the Gregorian calendar.

---

## 🚀 Quick Start

Run the project locally using any static web server:

```bash
# Clone the repository
git clone https://github.com/AldersonVoid/dangla-ai.git
cd dangla-ai

# Start local server with Python
python3 -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

---

## 📁 Project Structure

```
├── index.html                  # Main markup following NPF V2 semantic guidelines
├── styles.css                  # Authentic Bangladesh Government design tokens & responsive CSS
├── app.js                      # Bilingual engine, AI assistant, D-Nothi summarizer, and players
├── bd_national_anthem.mp3      # Official studio audio of the National Anthem (2.88 MB)
├── bangladesh_govt_sites.txt   # Verified directory of 50 active .gov.bd portals
├── bangladesh_govt_analysis.md # In-depth technical and stylistic analysis report
└── assets/
    └── images/
        ├── pm.jpg              # Prime Minister official portrait
        ├── ict_minister.jpeg   # ICT Minister official portrait
        ├── ict_sub_minister.jpeg # PM's ICT Adviser official portrait
        ├── ict_secretary.png   # ICT Secretary official portrait
        └── gallery/            # Authentic press and event photographs
            ├── gallery_datacenter.jpg
            ├── gallery_seminar.jpeg
            ├── gallery_innovation.jpg
            ├── gallery_consultation.jpeg
            ├── gallery_intl_coop.jpeg
            └── gallery_edtech.jpg
```

---

## 🇧🇩 National Standards Compliance
- **Accessibility**: Includes high-contrast mode, multi-step font scaling (`A-`, `A`, `A+`), and screen reader ARIA landmarks.
- **Data Sovereignty**: Dedicated ISO 42001 verification seal and localization indicator representing data retention within the National Tier-IV Data Center in Gazipur.

---
*Created as part of the Bangladesh National Digital Public Infrastructure (DPI) & Sovereign AI Initiative.*
