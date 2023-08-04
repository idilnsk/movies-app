import { useState, useEffect } from "react";

const Comments = ({ commentData, onDeleteComment }) => {
  console.log("Data type of comments:", commentData);
  const [comments, setComments] = useState([]);
  const [editComment, setEditComment] = useState(null);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/comments?commentId=${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });
      if (response.ok) {
        onDeleteComment(commentId);
      } else console.error(`Error: ${response.status}`);
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };
  return (
    <>
      <div className="relative w-full pl-8">
        <h3 className="opacity-50">
          <span className="p-2">Comments</span>
        </h3>
        <div className="mx-2 border-b-2 border-purple-500 opacity-50"></div>
      </div>
      <div className=" opacity-50 w-100">
        <ul className="space-y-4 text-black p-4 antialiased flex flex-col w-full max-w-md mx-auto">
          {commentData &&
            commentData.map((comment, index) => (
              <li
                key={index}
                className="group text-lg text-white dark:bg-gray-700 rounded-3xl px-4 py-2 flex items-center justify-between relative"
              >
                <div className="flex-grow">
                  <div className="font-semibold text-normal leading-relaxed">
                    {comment.name}
                  </div>
                  <hr className="border-purple-500 mb-4" />
                  <div className="text-sm leading-snug md:leading-normal">
                    {comment.comment}
                  </div>
                </div>
                <div className="flex items-center absolute right-0 top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="bg-red-400 text-white px-1 py-0.5 rounded ml-2 text-s "
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Comments;
