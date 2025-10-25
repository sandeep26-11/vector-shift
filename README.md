🚀 Node Pipeline Builder

A full-stack pipeline builder with a React frontend and FastAPI backend, featuring dynamic node creation, real-time validation, and DAG analysis.

✨ Key Features
🎨 Frontend

Node System – Create nodes with minimal code

Enhanced Text Node – Variable detection ({{variable}}), auto-resize, live validation

9 Node Types – Input, Output, LLM, Text, Math, Filter, Transform, Delay, Validator

Modern UI – Responsive design, styled-components, animations

🔧 Backend

FastAPI REST APIs with Pydantic validation

DAG Detection using Kahn’s algorithm

Pipeline Analysis – Node/edge count, cycle detection

CORS enabled for frontend integration

⚙️ Setup
Prerequisites

Node.js 16+

Python 3.8+

Frontend
cd frontend
npm install
npm start   # http://localhost:3000

Backend
cd backend
pip install -r requirements.txt
python run.py   # http://localhost:8000


Test DAG:

python test_dag.py

🧠 Usage

Add & Connect Nodes from toolbar

Edit Properties and use variables like {{var}}

Submit Pipeline for DAG validation and results

🏗️ Architecture

React + FastAPI full-stack structure

Node Abstraction → Add new node types in a few lines

Type Safety → Pydantic models

Docs Available → Documentation/ folder

🔮 Future Enhancements

Pipeline execution & templates

Collaboration & versioning

Database storage & WebSockets

Authentication & deployment setup

🛡️ Security

Pydantic input validation

Restricted CORS (localhost)

Safe error handling
