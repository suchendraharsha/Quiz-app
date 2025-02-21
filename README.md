
# Quiz Application

This React-based quiz application allows users to attempt time based quiz and track their quiz results.This application is accessible in desktop and mobile versions, under development for tab version.

## Summary of Features

* **User Profile Management(avialable in desktop version):**
  * Customize name, ID, and profile picture.
  * Local storage using IndexedDB for persistent data.
  * Desktop editing via double-click.
* **Score Tracking:**
  * Displays the total number of tests taken.
  * Display the results of each and every attempted quiz when user clicks on the quizzes avialable in recent activity section.
* **Navigation:**
  * enabled smooth and consistent navigation through all pages.
* **Responsive Design:**
  * Works seamlessly on desktop and mobile devices.
* **Local Data Storage:**
  * User data persists through page refreshes using IndexedDB.
* **Quiz content page:**
  * It is rendered when user clicks on any of two available quizzes in quiz page.
  * It contains the questions of quiz which are to be answered by user witha span of 30 seconds for a question.
  * Instant feed back for both multiple choice questions and fill in the blanks questions is given.
  * After completion of quiz result page with detailed analysis of user performance in quiz is displayed.
  * A quiz can be attempted multiple times by a user.

## Instructions to Run the App Locally

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/suchendraharsha/Quiz-app.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd quiz-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

5. **Open the application in your browser:**

  ```
    http://localhost:3000
    ```

## Link to Deployed App

[Deployed Quiz App](https://quiz-app-dun-five.vercel.app/)

## Technologies Used

* React
* React Router
* IndexedDB (idb library)
* CSS
* JavaScript

## Project Structure

quiz-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── QuizNavbar.js
│   │   └── ... (other components)
│   ├── Images/
│   │   └── diamond.png
│   ├── App.js
│   ├── index.js
│   └── QuizNavbar.css
├── package.json
├── package-lock.json
└── README.md