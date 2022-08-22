import { refs } from './js/refs.js';
import { onInputRequest, onClickLoad, OnClickSearch } from './js/tools.js';
// import { fetchData, searchParams } from './js/api.js';

const { searchForm, loadMoreBtn } = refs;

console.log(searchForm.searchQuery);

searchForm.searchQuery.addEventListener('input', onInputRequest);

loadMoreBtn.addEventListener('click', onClickLoad);

searchForm.searchButton.addEventListener('click', OnClickSearch)


