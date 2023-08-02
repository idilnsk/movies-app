import { useState, useEffect } from "react";

async function fetchYourCommentsData() {
  // Fetch comments from your server/database
  const response = await fetch("/api/comments"); // Adjust this to your actual API endpoint
  if (!response.ok) {
    console.error(`Error: ${response.status}`);
    return;
  }
  const updatedComments = await response.json();
  return updatedComments;
}

const Comments = ({ commentData, onDeleteComment }) => {
  console.log("Data type of comments:", commentData);
  const [comments, setComments] = useState([]);

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
      <h3>User comments:</h3>
      <ul>
        {commentData &&
          commentData.map((comment, index) => (
            <li key={index}>
              <div>
                <strong>Name:</strong> {comment.name}
              </div>
              {<br></br>}
              <div>
                <strong>Comment:</strong> {comment.comment}
              </div>
              <br />
              <button onClick={() => handleDeleteComment(comment._id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Comments;
