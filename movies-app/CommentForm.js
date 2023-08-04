import { useState } from "react";
import { useSession } from "next-auth/react";

const CommentForm = ({ onAddComment, movieName, movie }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { data: sessionData } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("Name:", name);
    console.log("Comment:", comment);
    const newComment = {
      comment: comment,
      movieName: movieName,
      name:name,
    };
    try {
      const response = await fetch(`/api/comments`, {
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
      <div  className=" py-4 px-4 border-purple-600">
        <form
          id="comment-form"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 max-w-lg mx-auto">
            <label htmlFor="comment-name" className="block font-semibold">
              Title:
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md"
              id="comment-name"
              cols="30"
              rows="5"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 max-w-lg mx-auto">
            <label htmlFor="comment-message" className="block font-semibold">
              Add a comment:
            </label>
            <textarea
              className="w-full p-2 rounded-md h-20"
              id="comment-message"
              rows="5"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
          <button
            className=" bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            type="submit"
          >
            SUBMIT
          </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
