from langchain_core.messages import HumanMessage
from agent.router.route_to_graph import route_to_graph

config = {"configurable": {"thread_id": "1"}}

def run_agent(user_input: str):
    graph = route_to_graph(user_input)
    events = graph.stream({"messages": [HumanMessage(content=user_input)]}, config=config)

    for event in events:
        final = event
    return final