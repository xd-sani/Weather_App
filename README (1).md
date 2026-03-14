# 🌤️ Weather App

> A full-stack weather forecast application — **Spring Boot REST API** backend with a sleek **HTML/CSS/JavaScript** frontend featuring animated SVG weather icons and a dark atmospheric UI.

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)

---

## ✨ Features

- 🔍 **Search any city** in the world by name
- 📅 **Multi-day forecast** support (1 – 7 days)
- 🌡️ Current temperature, max, min & average per day
- 🎨 **8 animated SVG weather icons** — Sunny, Cloudy, Partly Cloudy, Rainy, Thunder, Snow, Fog, Windy
- 🌌 **Dark glassmorphism UI** with star background and floating animations
- 📱 Fully **responsive** — works on mobile & desktop
- ⚡ Live data via REST API call on page load
- 🛡️ CORS-enabled for cross-origin requests

---

## 📁 Project Structure

```
Weather_App/
│
├── WeatherApp/                              # ☕ Spring Boot Backend
│   └── src/main/java/com/yourpackage/
│       ├── controller/
│       │   └── WeatherController.java       # REST endpoint
│       ├── service/
│       │   └── WeatherService.java          # Business logic
│       ├── model/
│       │   ├── WeatherResponse.java         # Current weather model
│       │   └── DayTemp.java                 # Daily forecast model
│       └── config/
│           └── CorsConfig.java              # CORS configuration
│   └── src/main/resources/
│       ├── static/                          # Frontend files served here
│       └── application.properties
│
└── WeatherAppUI/                            # 🎨 Frontend
    ├── index.html                           # HTML structure
    ├── style.css                            # All styles & animations
    └── app.js                               # API calls & rendering logic
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+**
- **Maven 3.6+**
- A free **Weather API key** from [WeatherAPI.com](https://www.weatherapi.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/xd-sani/Weather_App.git
cd Weather_App
```

---

### 2. Configure API Key

Open `WeatherApp/src/main/resources/application.properties`:

```properties
weather.api.key=YOUR_API_KEY_HERE
weather.api.base-url=http://api.weatherapi.com/v1
server.port=8080
```

---

### 3. Run the Backend

```bash
cd WeatherApp
mvn spring-boot:run
```

✅ Backend starts at: `http://localhost:8080`

---

### 4. Launch the Frontend

**Option A — Serve from Spring Boot (Recommended)**

Copy the `WeatherAppUI` files into:
```
WeatherApp/src/main/resources/static/
```
Then open in browser:
```
http://localhost:8080/index.html
```

**Option B — Open directly**

Make sure CORS is configured (see below), then open `index.html` directly in any browser.

---

## 📡 API Reference

### `GET /weather/forecast`

Fetch weather forecast for a city.

| Parameter | Type     | Required | Description             |
|-----------|----------|----------|-------------------------|
| `city`    | `string` | ✅ Yes   | City name (e.g. `agra`) |
| `days`    | `int`    | ✅ Yes   | Forecast days (1–7)     |

### Example Request

```http
GET http://localhost:8080/weather/forecast?city=agra&days=2
```

### Example Response

```json
{
  "weatherResponse": {
    "city": "Agra",
    "region": "Uttar Pradesh",
    "country": "India",
    "condition": "Partly Cloudy",
    "temp": 28.2
  },
  "dayTemp": [
    {
      "date": "2026-03-14",
      "avgtemp": 29.2,
      "maxtemp": 36.7,
      "mintemp": 21.6
    },
    {
      "date": "2026-03-15",
      "avgtemp": 27.3,
      "maxtemp": 36.4,
      "mintemp": 20.6
    }
  ]
}
```

---

## 🔧 CORS Configuration

To allow the frontend to communicate with the backend from a different origin, add this to your Spring Boot project:

```java
// src/main/java/com/yourpackage/config/CorsConfig.java

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
```

---

## 🛠️ Tech Stack

| Layer       | Technology                       |
|-------------|----------------------------------|
| Backend     | Java 17, Spring Boot, Maven      |
| Frontend    | HTML5, CSS3, Vanilla JavaScript  |
| Icons       | Custom inline SVG (8 conditions) |
| Fonts       | Bebas Neue, DM Sans, Space Mono  |
| Weather API | WeatherAPI.com                   |

---

## 🌐 Weather Icon Mapping

The UI automatically maps the API `condition` string to one of 8 animated SVG icons:

| Condition Keywords       | Icon Shown      |
|--------------------------|-----------------|
| `sun`, `clear`           | ☀️ Sunny        |
| `partly`                 | ⛅ Partly Cloudy |
| `cloud`, `overcast`      | ☁️ Cloudy       |
| `rain`, `drizzle`        | 🌧️ Rainy        |
| `thunder`, `storm`       | ⛈️ Thunder      |
| `snow`, `sleet`, `ice`   | ❄️ Snow         |
| `fog`, `mist`, `haze`    | 🌫️ Foggy        |
| `wind`, `breezy`         | 💨 Windy        |

---

## ☁️ Keep Backend Always Running

**Windows — using NSSM (runs on every boot):**
```bash
nssm install WeatherApp
# Set Path: java.exe | Arguments: -jar C:\path\to\WeatherApp.jar
nssm start WeatherApp
```

**Linux — using systemd:**
```ini
# /etc/systemd/system/weatherapp.service
[Unit]
Description=Weather App Backend
After=network.target

[Service]
ExecStart=/usr/bin/java -jar /path/to/WeatherApp.jar
Restart=always

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl enable weatherapp
sudo systemctl start weatherapp
```

---

## 🔄 Development Workflow

```bash
# After making changes
git add .
git commit -m "describe your changes"
git push
```

---

## 🤝 Contributing

1. Fork the project
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a **Pull Request**

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**xd-sani**  
GitHub: [@xd-sani](https://github.com/xd-sani)

---

> ⭐ If you found this project useful, please give it a star on GitHub!
