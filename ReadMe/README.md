# My-ToDo-App
-------------
This is a new [*React Native*](https://reactnative.dev) project, bootstrapped using [@react-native-community/cli](https://github.com/react-native-community/cli).

# Getting Started

> *Note*: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run *Metro*, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

sh
# Using npm
npm start

# OR using Yarn
yarn start


## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

sh
# Using npm
npm run android

# OR using Yarn
yarn android


## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open App.tsx in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- *Android: Press the <kbd>R</kbd> key twice or select **"Reload"* from the *Dev Menu*, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).


## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an *overview* of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a *guided tour* of the React Native *basics*.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native *Blog* posts.
- [@facebook/react-native](https://github.com/facebook/react-native) - the Open Source; GitHub *repository* for React Native.

---------------------------------------------------------------------------

# React Native To-Do List App

## Description
A simple To-Do List application built with React Native that allows users to create, delete, and mark tasks as complete. The app includes persistent storage using AsyncStorage to save tasks locally.

## Features
- Add new tasks with title and description
- Delete existing tasks
- Mark tasks as complete/incomplete
- Persistent storage using AsyncStorage
- Clean UI with Material Design principles

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- React Native CLI

### Installation Steps
1. Clone the repository

git clone <repository-url>
cd todo-list-app


2. Install dependencies

npm install


3. Run the application

# For iOS
npx react-native run-ios

# For Android
npx react-native run-android


## Technologies Used
- React Native
- TypeScript
- Zustand (for state management)
- AsyncStorage (for local storage)
- Material Design principles

## Project Structure
- src/components: UI components like TaskItem
   ├── TaskInput.tsx
   ├── TaskItem.tsx
   └── TaskList.tsx
- src/store: Zustand store for state management
   └── taskStore.ts
- src/types:export interface 
   └── task.ts
- src/App.tsx: Main application file

------------------------------------------------------------------------
# DemoVideo
 Link:https://drive.google.com/file/d/13IzdSiiK3XHvTkkKXRzFOku9MSegSyiB/view?usp=sharing

# image
C:\Users\Keerthi Gopalavannan\Desktop\Language\React native\My-ToDo-App\ReadMe\image

# Figma
link:https://www.figma.com/design/XTzGDKFvSY5nDdugX1PktU/Untitled?node-id=0-1&t=zymLurlTjmk5wbBU-1