# agent/tools/borrow_book.py

from langchain_core.tools import tool
from pydantic import BaseModel

class BorrowInfo(BaseModel):
    book_id: str
    quantity: int

@tool
def borrow_book_tool(data: BorrowInfo):
    """
    Borrow a book with specified quantity. Expects book_id and quantity.
    """
    # 🧪 Đây chỉ là mock
    return {
        "message": f"Bạn đã mượn {data.quantity} cuốn sách (ID: {data.book_id}) thành công!",
        "book_id": data.book_id,
        "quantity": data.quantity
    }
