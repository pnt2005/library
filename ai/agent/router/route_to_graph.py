from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from agent.find_book.find_book_graph import build_find_book_graph
from agent.borrow_book.borrow_book_graph import build_borrow_book_graph
from dotenv import load_dotenv
load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

router_prompt = PromptTemplate.from_template("""
Bạn là một AI assistant định tuyến tác vụ.

Các hành động:
- find_book: nếu người dùng đang tìm sách
- borrow_book: nếu người dùng muốn mượn sách
- fallback: nếu không xác định được

Dữ liệu người dùng: {input}
Trả lời duy nhất bằng tên hành động.
""")

find_book_graph = build_find_book_graph()
borrow_book_graph = build_borrow_book_graph()

def route_to_graph(user_input: str):
    intent = llm.invoke(router_prompt.format(input=user_input)).content.strip()

    if intent == "find_book":
        return find_book_graph
    elif intent == "borrow_book":
        return borrow_book_graph
    else:
        return find_book_graph  # fallback