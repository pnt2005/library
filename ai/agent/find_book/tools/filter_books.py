# tools.py
import requests
from urllib.parse import urlencode
from typing import Optional, List, Dict
from langchain_core.pydantic_v1 import BaseModel
from langchain_core.tools import StructuredTool

class BookInfo(BaseModel):
    """Information to filter books"""
    author: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    isbn: Optional[str] = None
    publisher: Optional[str] = None
    category: Optional[str] = None
    year: Optional[int] = None

def filter_books(
    author: Optional[str] = None,
    name: Optional[str] = None,
    description: Optional[str] = None,
    isbn: Optional[str] = None,
    publisher: Optional[str] = None,
    category: Optional[str] = None,
    year: Optional[int] = None,
) -> List[Dict]:
    params = {
        "author": author,
        "name": name,
        "description": description,
        "isbn": isbn,
        "publisher": publisher,
        "category": category,
        "year": year
    }
    params = {k: v for k, v in params.items() if v is not None}
    query = urlencode(params)
    url = f"http://localhost:8080/books?{query}"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return [{"error": str(e)}]


# ✅ Define the tool with args_schema
filter_books_tool = StructuredTool.from_function(
    name="filter_books",
    description="Call the book API and return a list of matching books.",
    func=filter_books,
    args_schema=BookInfo,
)
