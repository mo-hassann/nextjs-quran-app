<div align="center">
  <a href="./">
    <img src="/assets/logo-1.png" height="128">
  </a>
  <h1 align="center">
    Quraany  
  </h1>
  <p align="center"><strong>Quran application where you can read, listen, see the tafseer, track your reading and more.</strong></p>
  <a href="https://quraany-app.vercel.app">
    <strong>Demo</strong>
  </a> 
</div>

## Overview
A quran application built using <a href="https://github.com/vercel/next.js">NextJs</a> as Fullstack Freamwork build on top of <a href="https://github.com/facebook/react">ReactJs</a> and <a href="https://github.com/honojs/hono">Hono</a> in the backend.

### Features
- 🌍 Multi Languges
- ☀ Light and Dark Mode
- 🔊 Lesting to many Readers
- 📄 Read the Tafseer
- 🎯 Daily Reading Goal
- 📊 Statistics Graphs


## Getting Started
<strong>Make sure you have <a href="https://bun.sh">bun</a> instaled and do the following:</strong>

Run the following comands to clone the repositry:
```bash
git clone https://github.com/mo-hassann/quraany-app.git
cd quraany-app
```
Add `.env.local` file. A sample file is provided at `.env.local.sample`

Run this command To run the app localy
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sourses
- [quran-json](https://github.com/risan/quran-json) to get the text of the quran in different languages
- [everyayah](https://everyayah.com) to get the audio each aya
- [quran-tafseer](http://api.quran-tafseer.com/en/docs) to get the tafseer
- [explorequran](https://www.explorequran.org) random ayat sourse
