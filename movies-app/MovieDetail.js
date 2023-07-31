import Link from "next/link";
import Image from "next/image";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import Comment from "./Comments";
import {useRouter} from "next/router";

export default function MovieDetail({ movie }) {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const{id}= router.query;

  const commentsForCurrentMovie=comments.filter((comment)=>comment.movieName === movie.original_title);

  const handleAddComment = (savedComment) => {
    console.log("New comment received:", savedComment);
    setComments((prevComments) => [savedComment, ...prevComments]);
  };
  console.log("Comments state:", comments);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch("/api/comments/");
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, []);
  console.log("Movie data:", movie);
  if (!movie) {
    return <h3>loading...</h3>;
  }

  
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
        <button>Back</button>
      </Link>
      <ul>
        <li className="flex justify-between pr-20 pl-20 border border-gray-300">
          <div>
            <p className="text-left pb-4 pr-20">
              <span className="font-bold">Title:</span>
              {original_title}
            </p>
            <p className="text-left pb-4 pr-6">
              <span className="font-bold">Overview:</span>
              {overview}
            </p>
            <p className="text-left pb-4 pr-6">
              <span className="font-bold">Popularity:</span>
              {popularity}
            </p>
            <p className="text-left pb-4 pr-6">
              <span className="font-bold">Release Date:</span>
              {release_date}
            </p>
            <p className="text-left pb-4 pr-6">
              <span className="font-bold">Vote Average:</span>
              {vote_average}
            </p>
            <p className="text-left pb-4 pr-6 ">
              <span className="font-bold">Vote Count:</span>
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
      <Comment comments={commentsForCurrentMovie} />
      <CommentForm onAddComment={handleAddComment} movieId={id} movie={movie}/>
    </>
  );
}
