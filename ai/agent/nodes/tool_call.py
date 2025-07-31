from langchain_core.messages import ToolMessage
from agent.tools import filter_books_tool
from agent.tools.filter_books import BookInfo

def tool_call(state):
    tool_call = state["messages"][-1].tool_calls[0]
    name = tool_call["name"]
    args = tool_call["args"]
    print(f"🛠 Tool: {name}, args: {args}")

    tool_msg = ToolMessage(content="", tool_call_id=tool_call["id"])

    if name == "filter_books":
        book_info = BookInfo(**args)
        return {"messages": [tool_msg], "books": filter_books_tool.run(book_info.dict(exclude_none=True))}
    
    return {"messages": [tool_msg]}
