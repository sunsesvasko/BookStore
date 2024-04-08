import { useState, useEffect } from "react";
import BackButton from "./../components/BackButton";
import Spinner from "./../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        enqueueSnackbar("Book updated successfully!", { variant: "success" });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error!", { variant: "error" });
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .patch(`http://localhost:3000/api/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error!");
        setLoading(false);
      });
  };

  return (
    <div className="p-4 ">
      <BackButton />
      <h1 className="my-4 text-3xl">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4 ">
          <label className="mr-4 text-xl text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-500"
          />
        </div>
        <div className="my-4 ">
          <label className="mr-4 text-xl text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-500"
          />
        </div>
        <div className="my-4 ">
          <label className="mr-4 text-xl text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-500"
          />
        </div>
        <button className="p-2 m-8 bg-sky-300" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
