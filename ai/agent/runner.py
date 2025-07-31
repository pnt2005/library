from langchain_core.messages import HumanMessage, AIMessage
from agent.graph import agent
from agent.types import State

config = {"configurable": {"thread_id": "1"}}

def run_agent(user_input: str) -> dict:
    initial_state: State = {
        "messages": [HumanMessage(content=user_input)],
        "books": []
    }

    result = agent.invoke(initial_state, config=config)

    # Trích nội dung phản hồi AI
    response = next(
        (m.content for m in reversed(result["messages"]) if isinstance(m, AIMessage)),
        "Sorry I don't understand your request."
    )

    return {
        "response": response,
        "books": result.get("books", [])
    }
