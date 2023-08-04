import Link from "next/link";
import Image from "next/image";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function MovieDetail({ movie, movieName }) {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const [editComment, setEditComment] = useState(null);
  const { data: session } = useSession();
  const commentsForCurrentMovie = comments.filter(
    (comment) => comment.movieName === movie.original_title
  );

  const handleAddComment = (savedComment) => {
    console.log(
      "New comment received:",
      savedComment.comment[savedComment.comment.length - 1]
    );
    const lastComment = savedComment.comment[savedComment.comment.length - 1];
    setComments((prevComments) => [lastComment, ...prevComments]);
  };
  console.log("Comments state:", comments);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/comments/`);
        if (response.ok) {
          const data = await response.json();
          console.log("data in FETCH COMMENTS:", data, movie);
          setComments(
            data.filter((comment) => comment.movieName === movie.original_title)
          );
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, [movie]);

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  };

  //console.log("comment:", comment);
  if (!movie) {
    return <h3>loading...</h3>;
  }

  const handleUpdateComment = async (updatedComment) => {
    try {
      const response = await fetch(`/api/comments/${updatedComment._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment),
      });

      if (response.ok) {
        const data = await response.json();
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === updatedComment._id ? data : comment
          )
        );
        setEditComment(null); // exit edit mode
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const {
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    slug,
  } = movie;
  console.log("data!!!!!", movie);
  return (
    <>
      <Link href="/">
        <button className="pb-4 pl-6 text-purple-500 text-2xl">
          <BsArrowLeftCircle />
        </button>
      </Link>
      <ul className="m-0 max-w-5xl mx-auto">
        <li className="flex justify-between pr-10 pl-20 border-purple-200 rounded-lg">
          <div>
            <p className="text-left pb-4 pr-20">
              <span className="font-bold">Title: </span>
              {original_title}
            </p>
            <p className="text-left pb-4 pr-6">
              <span className="font-bold">Overview: </span>
              {overview}
            </p>
            <p className="text-left pb-4 pr-6">
              <span className="font-bold">Popularity: </span>
              {popularity}
            </p>
            <p className="text-left pb-4 pr-6">
              <span className="font-bold">Release Date: </span>
              {release_date}
            </p>
            <p className="text-left pb-4 pr-6">
              <span className="font-bold">Vote Average: </span>
              {vote_average}
            </p>
            <p className="text-left pb-4 pr-6 ">
              <span className="font-bold">Vote Count: </span>
              {vote_count}
            </p>
          </div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="Movie Poster"
            width={200}
            height={20}
            className=" rounded-lg"
          />
        </li>
      </ul>

      <Comments
        commentData={comments}
        onDeleteComment={handleDeleteComment}
        className="w-screen"
      />
      <CommentForm
        onAddComment={handleAddComment}
        movieName={original_title}
        movie={movie}
        className="w-screen"
      />
    </>
  );
}
