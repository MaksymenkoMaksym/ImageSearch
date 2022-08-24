import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { ImgApi } from "./api_ASINC";

import { refs } from './refs_ASINC';

const END_OF_RESULTS = "We're sorry, but you've reached the end of search results.";
const API_RATE_LIMIT = "API rate limit exceeded";
const NO_RESULTS = "Sorry, there are no images matching your search query. Please try again.";
const RESULTS = "Hooray! We found totalHits images.";

const imgCollecion = new ImgApi();
let gallery = new SimpleLightbox('.photo-card a');



// зберігання даних з сервера////////////
const ww2 = localStorage.getItem("ww");//
const dataFromStorage = JSON.parse(ww2);////////////
const promise = Promise.resolve(dataFromStorage);//
//зберігання даних з сервера//////////////////////


export function onInputRequest() {
    imgCollecion.setQuery(this.value)
}



export async function onClickLoad() {
    try {
        imgCollecion.setNextPage();
        const { hits, totalHits } = await imgCollecion.getData();

        document.querySelector('.gallery_list')
            .insertAdjacentHTML("beforeend", requiredObjects(hits)
                .map((el) => { return renderMarkup(el) })
                .join(''));
        await gallery.refresh();
        await endOfResults.call(this, totalHits);
        await scroll();
    } catch (err) {
        if (err.message === API_RATE_LIMIT) {
            Notify.warning(API_RATE_LIMIT)
        }
        console.log('Name:', err.name, 'Message', err.message);
    }


}

export async function OnClickSearch(event) {
    event.preventDefault();
    imgCollecion.setPage(1);
    refs.gallery.innerHTML = '';
    try {
        const { hits, totalHits } = await imgCollecion.getData();
        const isEmpty = hits.length === 0;
        if (isEmpty) {
            throw new Error(NO_RESULTS)
        }
        Notify.success(`Hooray! We found ${totalHits} images.`);

        if (totalHits > imgCollecion.getItemsPerPage()) {
            // refs.loadMoreBtn.style.display = "block";
        }

        refs.gallery.innerHTML = `<ul class="gallery_list list">
            ${requiredObjects(hits).map((el) => renderMarkup(el)).join('')}
            </ul>`

        gallery.refresh();
    } catch (err) {
        if (err.message === API_RATE_LIMIT) {
            Notify.warning(API_RATE_LIMIT)
        }
        if (err.message === NO_RESULTS) {
            Notify.failure(NO_RESULTS)
        }
        console.log('Name:', err.name, 'Message', err.message);
    }
}



function requiredObjects(dataArray) {
    const requiredObjects = dataArray.map(hit => {
        return {
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
            tags: hit.tags,
            likes: hit.likes,
            views: hit.views,
            comments: hit.comments,
            downloads: hit.downloads,
        }
    });
    return requiredObjects
}

const renderMarkup = ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `<li class="list_item">
   
    <div class="photo-card">
     <a  href="${largeImageURL}">
  <img class= "photo-card_img" src="${webformatURL}" alt="${tags}" loading="lazy" />
     </a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <span>${downloads}</span>
    </p>
  </div> 
</div>
</li>`
}

function endOfResults(totalHits) {
    const pageNum = imgCollecion.getPage();
    const perPageNum = imgCollecion.getItemsPerPage();
    const maxPages = Math.ceil(totalHits / perPageNum);
    if (pageNum === maxPages) {
        refs.loadMoreBtn.style.display = "none";
        return Notify.info(END_OF_RESULTS);
    }
}


function scroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery_list")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}


export async function onScrollLoad() {
    if (window.scrollY + window.innerHeight >= (document.body.scrollHeight)) {
        await onClickLoad();
    }
}