# LetterTune ✉️🌿
A multi-model, style-mimicking cover letter generator built with Flask + LangChain.

LetterTune creates a tailored cover letter using:
1) Company + job offer info  
2) Applicant background / resume  
3) A previous cover letter (style reference)  
4) Optional extra instructions (language, length, tone)

It supports 5 AI backends:
- LLaMA (IBM watsonx)
- Granite (IBM watsonx)
- Mistral (IBM watsonx)
- OpenAI
- DeepSeek

It also includes a global generation limit stored persistently in Postgres.

---

## Features
- Modern responsive UI (mobile-friendly)
- Style imitation based on a previous cover letter
- Five selectable AI providers
- Structured JSON output
- Global usage counter with env-based limit
- Works locally and on Render

---

## Project Structure
```
lettertune/
├─ app.py
├─ model.py
├─ usage_counter.py
├─ mockup_data.py
├─ requirements.txt
├─ runtime.txt
└─ templates/
   └─ index.html
```

---

## Requirements
- Python 3.11+ / 3.12.7
- Postgres (recommended for persistence)

---

## Local Setup

### 1. Clone
```
git clone https://github.com/jonas-developer/lettertune-v1.git
cd lettertune-v1
```

### 2. Virtual environment
```
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies
```
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

### 4. Create .env (local only)
```
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL_ID=gpt-4o-mini

DEEPSEEK_API_KEY=your_deepseek_key
DEEPSEEK_MODEL_ID=deepseek-chat
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1

WATSONX_CREDENTIALS=your_watsonx_key

MAX_GENERATIONS=500
DATABASE_URL=postgresql://user:password@localhost:5432/lettertune
```

### 5. Run
```
python app.py
```

Open http://127.0.0.1:5000

---

## API Endpoints
- GET / – UI
- GET /health – health check
- GET /usage – usage counter
- POST /generate – generate cover letter

---

## /generate Payload
```
{
  "model": "openai",
  "company_job_info": "...",
  "applicant_background": "...",
  "previous_cover_letter": "...",
  "additional_instructions": "..."
}
```

---

## Generation Limit
Controlled by env var:
```
MAX_GENERATIONS=500
```

Persisted in Postgres.

---

## Deploy on Render

1. Create a Postgres DB on Render
2. Attach it to your Web Service
3. Set env vars in Render (OPENAI_API_KEY, DATABASE_URL, etc.)
4. Use these commands:

Build:
```
pip install -r requirements.txt
```

Start:
```
gunicorn -b 0.0.0.0:$PORT app:app
```

### PYTHON_VERSION as Environment Variable
```
python-3.12.7
```

---

## Security
- Do not commit .env (keep it in .gitignore)
- Use Render Environment Variables when deploying on Render
- Set MAX_GENERATIONS Environmental Variable to a number of your choice to limit AI Model generations

---

## Live Demo

A hosted version of LetterTune is available at:

🌐 **https://lettertune.com**

This public demo showcases the full end-to-end workflow, including model selection and style-based cover letter generation.


## License
MIT
