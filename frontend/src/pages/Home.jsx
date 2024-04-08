import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-x-4">
        <button
          className="px-4 py-1 rounded-lg bg-sky-300 hover:bg-sky-600"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="px-4 py-1 rounded-lg bg-sky-300 hover:bg-sky-600"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex flex-col items-center justify-between">
        <h1 className="my-8 text-3xl ">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-sky-800" />
        </Link>
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
