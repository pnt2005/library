from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from agent.find_book.nodes.get_info import get_info
from agent.find_book.nodes.tool_call import tool_call
from agent.find_book.nodes.make_response import make_response
from agent.types import State

def build_find_book_graph():
    def should_call_tool(state: State):
        last = state["messages"][-1]
        return "tool_call" if hasattr(last, "tool_calls") and last.tool_calls else END

    graph = StateGraph(State)
    graph.add_node("get_info", get_info)
    graph.add_node("tool_call", tool_call)
    graph.add_node("make_response", make_response)

    graph.set_entry_point("get_info")
    graph.add_conditional_edges("get_info", should_call_tool, ["tool_call", END])
    graph.add_edge("tool_call", "make_response")
    graph.add_edge("make_response", END)
    
    return graph.compile(checkpointer=MemorySaver())
