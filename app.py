import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

from flask import Flask, render_template, request, jsonify

systemPrompt = """You are ThinkTutor AI, an adaptive tutor that explains concepts clearly and personally.

When a user asks about a topic:
1. Give a concise and clear explanation
2. Ask exactly one follow-up question to test their understanding

When a user answers your question:
- If they answer incorrectly → simplify the explanation and ask a simpler question
- If they answer partially → give a small hint and ask the question again
- If they answer correctly → go deeper into the concept and ask a harder question

Always keep your explanations concise and easy to follow. Never ask more than one question per response.

Always end every response with exactly one of these on the last line:
LEVEL: Beginner
LEVEL: Intermediate
LEVEL: Advanced
"""

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

conversation_history=[]

@app.route("/chat",methods=["POST"])
def chat():
    user_message = request.json.get("message")

    conversation_history.append({
        "role":"user",
        "content": user_message
    })

    response = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages = [{"role": "system", "content": systemPrompt}] + conversation_history
    )

    ai_reply = response.choices[0].message.content

    conversation_history.append({
    "role": "assistant",
    "content": ai_reply
    })

    return jsonify({"reply":ai_reply})

    

if __name__ == "__main__":
    app.run(debug=True)