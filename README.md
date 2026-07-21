# ✈️ Aviation Destinations - Test & Table Generator

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## 📖 Opis projektu

Aplikacja została stworzona z myślą o branży lotniczej, aby ułatwić i zautomatyzować proces weryfikacji wiedzy oraz nauki kierunków lotów. Głównym zadaniem aplikacji jest **generowanie testów do druku z destynacji lotniczych**. Dodatkowo projekt służy jako kompleksowe narzędzie dla szkoleniowców zajmujących się wdrażaniem nowych pracowników.

## ✨ Główne funkcjonalności

- **Dla użytkowników / nowych pracowników:**
  - **Generowanie testów:** Tworzenie gotowych do wydruku, losowych arkuszy sprawdzających znajomość destynacji lotniczych.
- **Dla szkoleniowców (Zabezpieczony Panel):**
  - **Uwierzytelnianie:** Bezpieczne logowanie do panelu administracyjnego za pośrednictwem Firebase.
  - **Zarządzanie bazą danych:** Możliwość szybkiego dodawania nowych i usuwania nieaktualnych destynacji lotniczych.
  - **Materiały szkoleniowe (Print Tables):** Generowanie przejrzystych, sformatowanych pod wydruk tabel z listą destynacji, które ułatwiają naukę nowym pracownikom przed przystąpieniem do testów.

## 🛠️ Technologie

Projekt został zbudowany przy użyciu nowoczesnych narzędzi ułatwiających skalowanie i szybki rozwój:

- **Frontend:** React w połączeniu z Vite dla maksymalnej wydajności deweloperskiej.
- **Backend & Auth:** Firebase (Baza danych w czasie rzeczywistym/Firestore oraz zarządzanie użytkownikami).
- **Routing:** React Router DOM (Zabezpieczanie ścieżek przez Protected Routes).
- **Styling:** CSS3

## 📂 Struktura katalogów

Zoptymalizowana struktura plików (`src/`) wspierająca przejrzystość:

```text
src/
├── assets/             # Zasoby statyczne
├── components/         # Mniejsze, reużywalne kawałki UI (np. ProtectedRoute)
├── contexts/           # Logika stanów (np. AuthContext)
├── pages/              # Główne widoki aplikacji
│   ├── AdminPanel.jsx  # Zarządzanie destynacjami
│   ├── Generator.jsx   # Kreator testów do druku
│   ├── Login.jsx       # Ekran logowania szkoleniowców
│   └── PrintTables.jsx # Generowanie tabel do nauki
├── services/           # Usługi zewnętrzne (firebase.js)
├── App.jsx             # Centrum zarządzania (routing i wrappery)
└── main.jsx            # Główny punkt wejścia
```
