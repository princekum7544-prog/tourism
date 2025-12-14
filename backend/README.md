# EmoTravel Backend

Node.js + Express backend for the Emotion-Driven Travel Platform.
Powered by a rule-based Emotion Engine and Google Gemini API.

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in this directory:
    ```env
    PORT=5000
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    Server starts at `http://localhost:5000`.

## Deployment (Render/Railway)

1.  Push code to GitHub.
2.  Connect repository to Render/Railway.
3.  Set **Root Directory** to `backend`.
4.  Set **Build Command**: `npm install`
5.  Set **Start Command**: `npm start`
6.  Add `GEMINI_API_KEY` in the service environment variables.
