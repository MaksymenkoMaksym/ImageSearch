import { refs } from './refs.js';
import { onInputRequest, onClickLoad, OnClickSearch } from './tools.js';

const { searchForm, loadMoreBtn } = refs;

searchForm.searchQuery.addEventListener('input', onInputRequest);

loadMoreBtn.addEventListener('click', onClickLoad);

searchForm.searchButton.addEventListener('click', OnClickSearch)


