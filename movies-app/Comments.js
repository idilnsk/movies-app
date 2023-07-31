const Comments = ({ comments }) => {
  return (
    <>
      <h3>User comments:</h3>
      <ul>
        {comments &&
          comments.map((comment) => (
            <li key={comment._id}>
              <div>
                <strong>Name:</strong> {comment.name}
              </div>
              {<br></br>}
              <div>
                <strong>Comment:</strong> {comment.comment}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Comments;
