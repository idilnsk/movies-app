import styled from "styled-components";

export default function MovieCard({ data }) {
  const {
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    vote_average,
    vote_count,
  } = data;

  return (
    <StyledSection>
      <div>
        <p className="title">Title:{original_title}</p>
        <p className="overview">Overview:{overview}</p>
        <p className="popularity">Popularity:{popularity}</p>
        <p className="releaseDate">Release Date:{release_date}</p>
        <p className="voteAverage">Vote Average:{vote_average}</p>
        <p className="voteCount">Vote Count:{vote_count}</p>
      </div>

      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="Movie Poster"
      />
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
