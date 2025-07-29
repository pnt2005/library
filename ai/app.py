
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from agent.graph import run_agent
from langchain_core.messages import HumanMessage
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask")
async def ask(request: Request):
    body = await request.json()
    message = body["message"]

    result = run_agent(HumanMessage(content=message))
    return result

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)