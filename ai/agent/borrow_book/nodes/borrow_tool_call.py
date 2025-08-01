# agent/nodes/borrow_tool_call.py

from langchain_core.messages import ToolMessage
from agent.borrow_book.tools.borrow_book import borrow_book_tool
from agent.borrow_book.tools.borrow_book import BorrowInfo

def borrow_tool_call(state):
    tool_call = state["messages"][-1].tool_calls[0]
    name = tool_call["name"]
    args = tool_call["args"]
    print(f"🔧 Borrow Tool: {name}, args: {args}")

    tool_msg = ToolMessage(content="", tool_call_id=tool_call["id"])

    if name == "borrow_book":
        borrow_info = BorrowInfo(**args)
        result = borrow_book_tool.run(borrow_info.dict(exclude_none=True))
        return {"messages": [tool_msg], "borrow_result": result}

    return {"messages": [tool_msg]}
