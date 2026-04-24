# ThinkTutor AI: A Thought-Adaptive AI Tutor

An adaptive AI tutor that personalizes explanations in real time based on how you respond and not just what you ask.

---

## What is ThinkTutor AI?

Most AI tools explain things the same way to everyone. ThinkTutor AI behaves like a real tutor:

1. You enter a topic (e.g. "Python loops")
2. The AI explains it clearly and asks you a follow-up question
3. You answer
4. **Answer wrong** → AI simplifies the explanation
5. **Answer correctly** → AI goes deeper
6. The loop repeats, adapting to you in real time

---

## Features

- **Adaptive explanation engine** — difficulty adjusts based on your responses
- **Follow-up question every turn** — keeps you actively learning
- **Level indicator** — shows your current depth (🟢 Beginner → 🟡 Intermediate → 🔴 Advanced)
- **Any topic** — not limited to CS, works for anything you want to learn
- **Lightweight memory** — full conversation history passed each turn, no database needed

---

## Tech Stack

| Layer | Tool |
|---|---|
| Backend | Python + Flask |
| AI | Groq API (LLaMA model) |
| Frontend | HTML / CSS / JavaScript |
| Deployment | Render |

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/thinktutor-ai.git
cd thinktutor-ai
```

### 2. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up your environment variables

Create a `.env` file in the root directory:
```
GROQ_API_KEY=your_groq_api_key_here
```

> Get your free Groq API key at [console.groq.com](https://console.groq.com) — no billing required.

### 5. Run the app
Live link: https://thinktutor-ai.onrender.com

---

## Project Structure

```
THINKTUTOR-AI/
├── app.py                  # Flask backend + adaptive logic
├── templates/
│   └── index.html          # Chat UI
├── static/
│   └── style.css           # Styling
├── .env                    # API key 
├── .gitignore
├── requirements.txt
└── README.md
```

---

## Future Features

- User accounts + persistent learning history
- Subject-specific tutors (Math, CS, Language)
- Automatic confusion detection
- Voice-based interaction
- Export session as PDF study guide

---