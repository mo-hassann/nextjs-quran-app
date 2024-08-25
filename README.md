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

## Screenshot
![quran app cover](/assets/cover.png)

## Overview
A web quran application built using <a href="https://github.com/vercel/next.js">NextJs</a> as Fullstack Framework build on top of <a href="https://github.com/facebook/react">ReactJs</a> and <a href="https://github.com/honojs/hono">Hono</a> in the backend.
In this app you can view the Quran in different languages, including English and more.You can also listen to the Quran with up to eight different readers. A bookmark option is also available for easy navigation to specific aya, but it requires logging in. Additionally, you can search for chapters and verses by keyword and view the Quran's translation. The app also offers a statistics section where you can track your reading time and set daily reading goals.

### Features

- 🌍 Multi Languages
- ☀ Light and Dark Mode
- 🔊 Listening to many Readers
- 📄 Read the Tafseer
- 🎯 Reading Time and Daily Reading Goal
- 📊 Statistics Graphs

## Getting Started

<strong>Make sure you have <a href="https://bun.sh">bun</a> instaled and do the following:</strong>

Run the following commands to clone the repository:

```bash
git clone https://github.com/mo-hassann/nextjs-quran-app.git
cd quraany-app
```

Add `.env.local` file. A sample file is provided at `.env.sample`

Run this command To run the app locally

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sources

- [quran-json](https://github.com/risan/quran-json) to get the text of the quran in different languages
- [everyayah](https://everyayah.com) to get the audio each aya
- [quran-tafseer](http://api.quran-tafseer.com/en/docs) to get the tafseer
- [explorequran](https://www.explorequran.org) random ayah source

## License

[MIT](/LICENSE)
