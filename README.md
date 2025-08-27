# User Authentication App (React Native + Expo)

A simple authentication flow using **React Context API** with **Login**, **Signup**, and **Home** screens. Auth state is **persisted** with `AsyncStorage`. Navigation is implemented with **React Navigation**. Includes a **password visibility toggle**.

> ⚠️ Demo-only: Credentials are stored in AsyncStorage in plaintext for simplicity. Do not use this approach in production.

## Features
- AuthContext with `login`, `signup`, `logout`, `user`
- Login / Signup validation and error messages
- Home shows user's name & email; Logout
- Persisted session (auto-login after restart)
- React Navigation (Native Stack)
- Password show/hide toggle (eye icon)
- Clean, minimal UI

## Tech
- Expo (React Native)
- @react-navigation/native + native-stack

## Getting Started

### 1) Prerequisites
- Node.js 18+ and npm or yarn
- Expo Go app (for iOS/Android testing) or a simulator

### 2) Install
## Credentials & Usage

This app uses email and password authentication. Users must sign up with a valid email and password (minimum 6 characters). If an email is already registered, you will see an error message.

### Example Credentials
- **Name:** Adrin
- **Email:** adrnzhrf@gmail.com
- **Password:** (your chosen password, at least 6 characters)

### Screenshots
- Signup: Shows error if email is already registered.
- Login: Requires correct email and password. Shows error for invalid credentials or short password.
- Home: Displays logged-in user's name and email.

See the screenshots above for the user flow and error messages.
```bash
npm install
# or
yarn
```

### 3) Run
```bash
npm start
# then press i for iOS, a for Android, or scan the QR with Expo Go
```

## Project Structure
```
user-auth-app/
├─ App.js
├─ app.json
├─ package.json
├─ babel.config.js
├─ assets/
├─ src/
   ├─ context/
   │  └─ AuthContext.js
   ├─ navigation/
   │  └─ AppNavigator.js
   ├─ components/
   │  ├─ PrimaryButton.js
   │  ├─ LoginScreen.js
   │  └─ SignupScreen.js
   ├─ utils/
   │  └─ validators.js
   └─ screenStyles.js
```

## Notes
- In a real app, replace AsyncStorage with a secure backend and token-based auth.
- Add form libraries (e.g., react-hook-form) and stronger validation if needed.
- The app is intentionally lightweight for assignment/demo purposes.