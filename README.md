# WorkLab

![WorkLab Logo](assets/images/worklab%20logo.png)

WorkLab is a simple mobile application designed to help you log your work hours locally and view summaries. It's built with Expo and React Native, focusing on a straightforward user experience without the need for a backend, storing all data directly on your device.

## ✨ Features

*   **Log Work Sessions:**
    *   **Automatic Timer:** Start and stop a timer to automatically record your work sessions.
    *   **Project Name:** Assign a project or description to each session.
*   **View Logs:**
    *   Daily lists of all logged sessions.
    *   Each entry displays project name, start-end time, and duration.
*   **Summary:**
    *   Total hours worked per day.
    *   Simple weekly total overview.
*   **Edit/Delete Logs:**
    *   Ability to remove individual log entries.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd work-lab
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the App

#### On Android

1.  **Start the Expo development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
2.  **Open on Android device/emulator:**
    *   Scan the QR code displayed in your terminal with the Expo Go app on your Android device.
    *   Or, press `a` in the terminal to open it on an Android emulator.

#### On iOS

1.  **Start the Expo development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
2.  **Open on iOS device/simulator:**
    *   Scan the QR code displayed in your terminal with the Expo Go app on your iOS device.
    *   Or, press `i` in the terminal to open it on an iOS simulator.

## 🏗️ Architecture

WorkLab follows a simple, local-only architecture.

```
+-------------------+
|                   |
|   Mobile Device   |
|                   |
| +-----------------+---+
| | React Native App    |
| |                   |
| | +---------------+ |
| | | UI Components | |
| | | (React Native | |
| | |   Paper)      | |
| | +-------+-------+ |
| |         |         |
| | +-------v-------+ |
| | | WorkSession   | |
| | |   Context     | |
| | | (State Mgmt)  | |
| | +-------+-------+ |
| |         |         |
| | +-------v-------+ |
| | | AsyncStorage  | |
| | | (Local Storage)| |
| | +---------------+ |
| +-------------------+
|                   |
+-------------------+
```

**Explanation:**

*   **UI Components:** The user interface is built using React Native components, styled with React Native Paper for a consistent look and feel.
*   **WorkSession Context:** This acts as the central state management for all work session data, providing functions to add, update, and delete sessions.
*   **AsyncStorage:** All work session data is persistently stored locally on the device using `AsyncStorage`, ensuring data is saved even when the app is closed. There is no external backend or cloud storage involved.