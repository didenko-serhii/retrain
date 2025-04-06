# 🚄 Retrain – Real-Time Train Tracker

A real-time train tracker for Finland using **Next.js 15**, **Leaflet**, **Tailwind CSS 4**, **Bun**, and the [DigiTraffic GraphQL API](https://rata.digitraffic.fi/).

## ⚡ Quick Start (Bun)

> Make sure [Bun](https://bun.sh/) is installed on your system.

### 🔁 Clone the Repository

```bash
git clone https://github.com/didenko-serhii/retrain.git
cd retrain
```

## 📦 Install Dependencies
```bash
bun install
```

## ⚙️ Create Environment File
```.env
NEXT_PUBLIC_URL=https://rata.digitraffic.fi/api/v2/graphql/graphql
```

## 🚀 Start the Development Server
```bash
bun dev
```
Visit `http://localhost:3000` in your browser to view the app.

# 🐳 Run with Docker (Pull from Docker Hub)

> Make sure [Docker](https://www.docker.com/) is installed on your system.

## 📥 Pull the Image

```bash
docker pull srgdd0/retrain:latest
```

## ▶️ Run the Container
```bash
docker run -p 3000:3000 srgdd0/retrain:latest
```
Visit `http://localhost:3000` in your browser to view the app.

# 📚 Tech Stack
- ⚙️ Next.js 15
- 🚅 Bun
- 🗺 React Leaflet & OpenStreetMap
- 🎨 Tailwind CSS 4
- 🔮 DigiTraffic GraphQL API
- 🐳 Docker

# 👤 Author
Made by [Serhii Didenko](https://github.com/didenko-serhii) with 💻
