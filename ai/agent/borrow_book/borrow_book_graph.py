from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from agent.borrow_book.nodes.get_borrow_info import get_borrow_info
from agent.borrow_book.nodes.borrow_tool_call import borrow_tool_call
from agent.find_book.nodes.make_response import make_response
from agent.types import State

def build_borrow_book_graph():
    def should_call_borrow(state: State):
        last = state["messages"][-1]
        return "borrow_tool_call" if hasattr(last, "tool_calls") and last.tool_calls else END

    graph = StateGraph(State)
    graph.add_node("get_borrow_info", get_borrow_info)
    graph.add_node("borrow_tool_call", borrow_tool_call)
    graph.add_node("make_response", make_response)

    graph.set_entry_point("get_borrow_info")
    graph.add_conditional_edges("get_borrow_info", should_call_borrow, ["borrow_tool_call", END])
    graph.add_edge("borrow_tool_call", "make_response")
    graph.add_edge("make_response", END)

    return graph.compile(checkpointer=MemorySaver())
