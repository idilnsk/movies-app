import { useState } from "react";

const CommentForm = ({ onAddComment,movieId, movie }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Comment:", comment);
    const newComment = {
      name,
      comment,
      movieId,
      movieName:movie.original_title
    };
    try {
      const response = await fetch(`/api/comments?movieId=${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const savedComment = await response.json();
        console.log("Comment saved:", savedComment);
        onAddComment(savedComment.savedComment); // Update the comments with the new comment
        setName(""); // Reset the name input field
        setComment(""); // Reset the comment textarea
        document.getElementById("comment-name").value = "";
        document.getElementById("comment-message").value = "";
        document.getElementById("comment-name").focus();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <div className="my-4">
        <form
          id="comment-form"
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded-lg"
        >
          <div className="mb-4">
            <label htmlFor="comment-name" className="block font-semibold">
              Name:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md"
              id="comment-name"
              cols="30"
              rows="5"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment-message" className="block font-semibold">
              Add a comment:
            </label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded-md"
              id="comment-message"
              rows="5"
              required
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
