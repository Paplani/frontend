import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
};

const BookJsonFetcher = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const loadBookData = async () => {
    const response = await fetch("../public/data/books.json");
    const data: Book[] = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchBookData = async () => {
      const bookData = await loadBookData();
      setBooks(bookData);
    };
    fetchBookData();
  }, []);

  return (
    // min-h-[calc(100vh-4rem)]: 화면 높이에서 상단 메뉴 높이(h-16, 4rem)를 뺀 만큼 확보
    //  w-150: 표 너비를 600px로 지정
    <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center py-5">
      <table className="w-150 [&_th]:p-4 text-lg text-center [&_td]:p-4 border-collapse [&_th]:border [&_th]:border-pink-400 [&_td]:border [&_td]:border-stone-700">
        <thead>
          <tr>
            <th>아이디</th>
            <th>제목</th>
            <th>저자</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookJsonFetcher;
