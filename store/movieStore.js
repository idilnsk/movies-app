import { create } from 'zustand';

const useMovieStore = create((set) => ({
  movies: [],
  currentPage: 1,
  searchInput:"",
  maxResults: 0,
  movieData:(null),
  setMovieData: (data) => set({ movieData: data }),
  setSearchInput:(value)=>set({searchInput:value}),
  setMovies: (movies) => set({ movies }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setMaxResults: (maxResults) => set({ maxResults }),
  setMovieData: (data) => set({ movieData: data }),
}));

export default useMovieStore;