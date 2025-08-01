from langchain_core.messages import AIMessage

def make_response(state):
    if state.get("books"):
        content = f"I found {len(state['books'])} books that match your request."
    else:
        content = "Sorry, I couldn't find any matching books."

    return {"messages": [AIMessage(content=content)]}
