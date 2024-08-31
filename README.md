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

## 🖼 Screenshot
![quran app cover](/assets/cover.png)

## 💡 Overview

A web Quran application built using [NextJs](https://github.com/vercel/next.js). In this app you can view the Quran in different languages, including English and more. You can also listen to the Quran with up to eight different readers. A bookmark option is also available for easy navigation to specific AYA, but it requires logging in. Additionally, you can search for chapters and verses by keyword and view the Quran's translation. The app also offers a statistics section where you can track your reading time and set daily reading goals.

## ✨ Features

- 🔐 **User Authentication**: Secure sign-up and login with Auth JS.
- 🌍 Multi Languages
- 🔍 Find verses and chapters by using the search feature.
- ☀ Light and Dark Mode
- 🔊 Listening to many Readers
- 📄 Read the Tafseer
- 🎯 Reading Time and Daily Reading Goal
- 📊 Statistics Graphs

## 👩‍💻 Tech Stack

- **Next.js**: A React framework for building server-side rendering and static web applications.
- **Auth.js**: Free and open source Authentication for the Web.
- **Hono**: A lightweight web framework for building server-side applications with TypeScript.
- **Drizzle ORM**: TypeScript-first ORM for type-safe database access.
- **React Query**: Data-fetching library for managing server-state in React applications.
- **Bun**: A fast JavaScript runtime that includes a package manager, task runner, and more.

## 📖 Sources and external API's

- [quran-json](https://github.com/risan/quran-json) to get the text of the quran in different languages
- [everyayah](https://everyayah.com) to get the audio each aya
- [quran-tafseer](http://api.quran-tafseer.com/en/docs) to get the tafseer
- [explorequran](https://www.explorequran.org) random ayah source


## 💻 Getting Started

To get a local copy of this project up and running, follow these steps.

### ✔ Prerequisites

- **Bun**: Ensure you have Bun installed. Follow the [official Bun installation guide](https://bun.sh/docs/installation).
- PostgreSQL (or another supported SQL database)


## 🛠️ Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mo-hassann/nextjs-quran-app.git
    cd nextjs-quran-app
    ```

2. **Install dependencies:**

    Using Bun:

    ```bash
    bun install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    
    #database
    DATABASE_URL=your_database_url
    DATABASE_SECRET=your_database_secret
    DRIZZLE_DATABASE_URL=your_database_url_for_drizzle

    #auth
    AUTH_SECRET=any_random_secret
    ```

4. **Run database migrations:**

    Ensure your database is running and then run:

    ```bash
    bun run drizzle-kit migrate
    ```

5. **Start the development server:**

    ```bash
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### ✔ Running the app

- **Development mode:** `bun dev`
- **Production mode:** `bun run build && bun start`

## 💚 Contributing

We welcome contributions to this project. Please follow these steps to contribute:

1. **Fork the repository.**
2. **Create a new branch** (`git checkout -b feature/your-feature-name`).
3. **Make your changes** and commit them (`git commit -m 'Add some feature'`).
4. **Push to the branch** (`git push origin feature/your-feature-name`).
5. **Open a pull request**.

Please make sure to update tests as appropriate.

## 🐛 Issues

If you encounter any issues while using or setting up the project, please check the [Issues](https://github.com/mo-hassann/nextjs-quran-app/issues) section to see if it has already been reported. If not, feel free to open a new issue detailing the problem.

When reporting an issue, please include:

- A clear and descriptive title.
- A detailed description of the problem.
- Steps to reproduce the issue.
- Any relevant logs or screenshots.
- The environment in which the issue occurs (OS, browser, Node.js version, etc.).

## 📜 License

Distributed under the MIT License. See [License](/LICENSE) for more information.
