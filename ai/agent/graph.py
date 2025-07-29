from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import SystemMessage, AIMessage, ToolMessage
from langchain_openai import ChatOpenAI
from typing_extensions import TypedDict
from typing import Annotated
from agent.tools import filter_books_tool, BookInfo
from dotenv import load_dotenv
load_dotenv()
# Define model
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# Define state
class State(TypedDict):
    messages: Annotated[list, add_messages]
    books: list

# Add tools
llm_with_tools = llm.bind_tools([filter_books_tool])

# Define get_info node
get_info_template = """Your job is to help the user search for books using whatever information they provide.
You can use any of the following fields if available:
- Name of the book
- Author
- Description
- ISBN
- Publisher
- Category
- Year
If you think there’s enough information to filter, go ahead and call the tool. Otherwise, ask the user for clarification or more details."""

def get_info_prompt(messages):
    return [SystemMessage(content=get_info_template)] + messages

def get_info(state: State):
    messages = get_info_prompt(state["messages"])
    response = llm_with_tools.invoke(messages)
    return {"messages": state["messages"] + [response]}

# Tool handler node
def tool_call(state: State):
    tool_call = state["messages"][-1].tool_calls[0]
    args = tool_call["args"]
    print("📦 Tool args:", args)

    # Parse args -> BookInfo
    book_info = BookInfo(**args)
    books = filter_books_tool.run(book_info.dict(exclude_none=True))

    return {
        "messages": [
            ToolMessage(
                content="",  # Trống là chuẩn
                tool_call_id=tool_call["id"]
            )
        ],
        "books": books
    }

def make_response(state: State):
    books = state["books"]
    if not books:
        content = "Sorry, I couldn't find any matching books."
    else:
        content = f"I found {len(books)} books that match your request."
    return {"messages": [AIMessage(content=content)]}


# Control logic
def should_call_tool(state: State):
    if isinstance(state["messages"][-1], AIMessage) and state["messages"][-1].tool_calls:
        return "tool_call"
    return END

# Build graph
graph = StateGraph(State)
graph.add_node("get_info", get_info)
graph.add_node("tool_call", tool_call)
graph.add_node("make_response", make_response)

graph.set_entry_point("get_info")
graph.add_conditional_edges("get_info", should_call_tool, ["tool_call", END])
graph.add_edge("tool_call", "make_response")
graph.add_edge("make_response", END)

agent = graph.compile(checkpointer=MemorySaver())

config = {"configurable": {"thread_id": "1"}}

def run_agent(user_message):
    result = agent.invoke({"messages": [user_message], "books": []}, config=config)
    messages = result["messages"]
    response = ""
    for msg in reversed(messages):
        if isinstance(msg, AIMessage):
            response = msg.content
            break
    return {"response": response, "books": result["books"]}
