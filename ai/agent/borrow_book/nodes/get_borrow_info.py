from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI
from agent.borrow_book.tools.borrow_book import borrow_book_tool
from dotenv import load_dotenv
load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
llm_with_tools = llm.bind_tools([borrow_book_tool])

get_borrow_info_template = """Your job is to help users borrow books.
You should try to extract:
- Book ID or name
- Quantity the user wants to borrow
If information is sufficient, call the tool. Otherwise, ask for clarification."""

def get_borrow_info_prompt(messages):
    return [SystemMessage(content=get_borrow_info_template)] + messages

def get_borrow_info(state):
    messages = get_borrow_info_prompt(state["messages"])
    response = llm_with_tools.invoke(messages)
    return {"messages": state["messages"] + [response]}