import {
  setSearchFocus,
  showClearTextButton,
  clearSearchText,
  clearPushListener,
} from './searchBar.js';
import {
  deleteSearchResults,
  buildOpenResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from './searchResults.js';
import { getSearchTerm, retrieveSearchResults, retriveOpenResults } from './dataFunctions.js';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    init();
  }
});

const init = () => {
  setSearchFocus();
  const search = document.getElementById('search');
  search.addEventListener('input', showClearTextButton);
  const clear = document.getElementById('clear');
  clear.addEventListener('click', clearSearchText);
  clear.addEventListener('keydown', clearPushListener);
  const form = document.getElementById('searchBar');
  form.addEventListener('submit', submitTheSearch);
};

const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === '') return;
  const resultOpen = await retriveOpenResults(searchTerm);
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultOpen.cod == 404) {
    setStatsLine(0, 0);
    return;
  }
  buildOpenResults(resultOpen);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(searchTerm, resultArray.length);
};
