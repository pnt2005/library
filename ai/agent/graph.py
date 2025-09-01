from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import AIMessage
from agent.types import State
from agent.nodes.get_info import get_info
from agent.nodes.tool_call import tool_call
from agent.nodes.make_response import make_response

def should_call_tool(state: State):
    last = state["messages"][-1]
    return "tool_call" if isinstance(last, AIMessage) and last.tool_calls else END

graph = StateGraph(State)
graph.add_node("get_info", get_info)
graph.add_node("tool_call", tool_call)
graph.add_node("make_response", make_response)

graph.set_entry_point("get_info")
graph.add_conditional_edges("get_info", should_call_tool, ["tool_call", END])
graph.add_edge("tool_call", "make_response")
graph.add_edge("make_response", END)

agent = graph.compile(checkpointer=MemorySaver())