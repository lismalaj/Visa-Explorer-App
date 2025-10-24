Here’s a **comprehensive README** for your mobile app project — **Visa Explorer App (for MultiNationals Inc.)**, built from all the uploaded `.tsx` files:

---

# 🌍 Visa Explorer App

### 📱 A Multinational Mobile App for Global Visa Guidance and Recommendations

**Visa Explorer App** is a cross-platform React Native mobile application that helps users explore visa requirements, fees, and processing times for destinations worldwide. Designed for **MultiNationals Inc.**, it simplifies global travel planning by integrating Firebase authentication, a personalized profile system, and dynamically rendered visa data — all in an elegant, animated UI.

---

## 🚀 Features

### 🧭 Core Functionality

* **Destination Explorer**
  Interactive grid of destinations with detailed visa data for each country.
  Uses modal overlays with fade and slide-in animations (`DestinationModal.tsx`).

* **Personalized Recommendations**
  The app provides visa recommendations and access to visa requirements based on user queries.

* **Global Database Integration (Placeholder)**
  `DisplayVisasPage.tsx` and `SearchVisaPage.tsx` provide scaffolding for backend integration (e.g. REST API or Firebase Cloud Firestore).

---

### 🔐 User Authentication

* **Firebase Auth Integration**
  Implemented in `App.tsx` and `Login.tsx`.
  Supports email/password login and persistent session via `AsyncStorage`.

* **Custom Drawer Menu**
  `CustomDrawer.tsx` provides a navigation drawer with integrated sign-out functionality.

---

### 👤 User Profile

* **Profile Management** (`Profile.tsx`)
  Displays and updates user information stored in **Firebase Firestore**.

  * Name, email, date of birth, and country
  * Editable name and country (dropdown picker)
  * Data persistence via `AsyncStorage` (userId)
  * Real-time update to Firestore using `updateDoc()`

---

### ⚙️ Settings & Security

* **Settings Screen** (`Settings.tsx`)

  * “Password & Security” section (navigates to the `Security` page)
  * Clean layout using `react-native-paper`’s `TouchableRipple`
  * Extensible for future settings (e.g., notifications, themes)

---

### 🏠 Home Screen

* **Home.tsx Highlights:**

  * Dynamic sections rendered via a `FlatList`:

    * Welcome banner
    * Popular Destinations (carousel)
    * Visa Recommendations
    * About Section
    * Travel Tips
    * Footer with company contact info and social links
  * Rich data integration for 15+ destinations including:

    * 🇺🇸 USA — EB-5 Visa
    * 🇨🇦 Canada — Start-Up Visa
    * 🇨🇳 China — M Visa
    * 🇩🇪 Germany — D Visa
    * 🇳🇬 Nigeria — N3A Visa
    * 🇦🇺 Australia — Business Innovation Visa
  * Animated modals (`DestinationModal.tsx`) showing:

    * Region
    * GDP Rank
    * Visa Name
    * Processing Time
    * Government Fees
    * Source links (opens external government visa sites)

---

### 🧩 Supporting Components

* **DismissKeyboard.tsx**
  Higher-order component to hide the keyboard when users tap outside input fields.

* **DestinationModal.tsx**
  Animated modal for displaying detailed visa data. Includes linkable sources and polished fade-in/slide-up transitions.

* **CustomDrawer.tsx**
  Navigation drawer layout styled with Ionicons and integrated Firebase sign-out button.

---

## 🧠 Architecture Overview

**Framework:** React Native
**State Management:** React Hooks (`useState`, `useEffect`)
**Navigation:** `@react-navigation/native`
**Auth & Storage:** Firebase Authentication, Firestore, AsyncStorage
**UI Library:** React Native Paper + Ionicons
**Animation:** `Animated` API
**Networking (Planned):** Axios / REST API scaffolding

---

## 📂 File Structure

```
Visa-Explorer-App/
│
├── App.tsx                   # Root app entry, navigation setup, auth logic
│
├── app/
│   ├── components/
│   │   ├── CustomDrawer.tsx  # Drawer UI & sign-out
│   │   ├── DestinationModal.tsx
│   │   └── DismissKeyboard.tsx
│   │
│   └── screens/
│       ├── Home.tsx          # Main dashboard with destinations
│       ├── Login.tsx         # Firebase login page
│       ├── Profile.tsx       # Editable profile page
│       ├── Settings.tsx      # Settings screen
│       ├── DisplayVisasPage.tsx # API placeholder
│       └── SearchVisaPage.tsx   # Search/filter API placeholder
│
└── FirebaseConfig.ts         # Firebase initialization (not included in upload)
```

---

## 🧩 Tech Stack

| Category                  | Technology                                           |
| ------------------------- | ---------------------------------------------------- |
| **Frontend**              | React Native (TypeScript)                            |
| **Navigation**            | React Navigation (Drawer + Stack)                    |
| **UI**                    | React Native Paper, Ionicons, MaterialCommunityIcons |
| **Auth**                  | Firebase Authentication                              |
| **Database**              | Firestore                                            |
| **Storage**               | AsyncStorage                                         |
| **Animation**             | React Native Animated API                            |
| **Networking (planned)**  | Axios / REST API                                     |
| **Testing (recommended)** | Jest / React Native Testing Library                  |

---

## ⚙️ Setup & Installation

### Prerequisites

* Node.js ≥ 16
* Expo CLI or React Native CLI
* Firebase project credentials

### 1. Clone the repository

```bash
git clone https://github.com/lismalaj/Visa-Explorer-App.git
cd Visa-Explorer-App
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Firebase

Create a `FirebaseConfig.ts` in the project root:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const FIRESTORE_DB = getFirestore(app);
```

### 4. Run the App

```bash
npm start
# or
expo start
```

---

## 🧭 Future Enhancements

* ✅ Backend integration for visa data (Spring Boot / Node.js API)
* ✅ Multi-language support (i18n)
* ✅ User photo upload & document storage via Firebase Storage
* ✅ Offline caching for frequent destinations
* ✅ Dynamic filtering and AI visa recommendation (planned ML module)

---

## 🏢 About MultiNationals Inc.

**MultiNationals Inc.** empowers global professionals by providing seamless immigration, relocation, and business visa solutions.
Visit [multinationals.co](https://www.multinationals.co) for more information.

---

## 📄 License

This project is licensed under the **MIT License** — free for educational and commercial modification with attribution.
