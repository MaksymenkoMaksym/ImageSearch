import throttle from 'lodash.throttle';

import { refs } from './refs_ASINC';
import { onInputRequest, onClickLoad, OnClickSearch, onScrollLoad } from './tools_ASINC';

const { searchForm, loadMoreBtn } = refs;

searchForm.searchQuery.addEventListener('input', onInputRequest);

loadMoreBtn.addEventListener('click', onClickLoad);

searchForm.searchButton.addEventListener('click', OnClickSearch);

window.addEventListener('scroll', throttle(() => { onScrollLoad() }, 1000));

