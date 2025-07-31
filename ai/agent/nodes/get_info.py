from langchain_core.messages import SystemMessage
from agent.tools import filter_books_tool
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
load_dotenv()
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
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

def get_info(state):
    messages = get_info_prompt(state["messages"])
    response = llm_with_tools.invoke(messages)
    return {"messages": state["messages"] + [response]}