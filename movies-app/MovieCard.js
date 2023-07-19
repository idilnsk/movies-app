import styled from "styled-components";
import Link from "next/link";

export default function MovieCard({ movie, setMovies }) {
  const {
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    slug,
    id,
  } = movie;
  //console.log("movie", movie);
  console.log("HOMEPAGE");
  return (
    <StyledSection>
      <Link href={`/movie-detail/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="Movie Poster"
        />
      </Link>
    </StyledSection>
  );
}
const StyledSection = styled.section`
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  max-width: 800px;
  height: 100%;
  max-height: 300px;
  display: block;
  margin: 2vh auto;
  border-radius: 8px;
  position: relative;
  display: flex;
  img {
    width: 200px;
  }

  @media screen and (max-width: 800px) {
    width: 95%;
    max-width: 95%;
  }
`;
