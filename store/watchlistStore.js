import create from 'zustand';

const useWatchlistStore = create((set) => ({
  watchlist: [],
  setWatchlist: (watchlist) => set({ watchlist }),
  addToWatchlist: (movieId) => (state) => set({ watchlist: [...state.watchlist, movieId] }),
  removeFromWatchlist: (movieId) => (state) => set({ watchlist: state.watchlist.filter(id => id !== movieId) }),
}));

export default useWatchlistStore;