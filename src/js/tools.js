import { Notify } from "notiflix";

import { searchParams, fetchData } from "./api.js";

import { refs } from './refs.js';
const END_OF_RESULTS = "We're sorry, but you've reached the end of search results.";
const API_RATE_LIMIT = "API rate limit exceeded";
const NO_RESULTS = "Sorry, there are no images matching your search query. Please try again.";
const RESULTS = "Hooray! We found totalHits images.";

// зберігання даних з сервера////////////
const ww2 = localStorage.getItem("ww");//
const dataFromStorage = JSON.parse(ww2);////////////
const promise = Promise.resolve(dataFromStorage);//
//зберігання даних з сервера//////////////////////

export function onInputRequest() {
  searchParams.set("q", this.value)
}

export function onClickLoad() {
  const pageNum = +searchParams.get("page");
  searchParams.set("page", (pageNum + 1));
  searchParams.get("q") === this.value
  console.log(searchParams.get("q") === this.value);

  fetchData(searchParams)
    .then(data => {
      endOfResults.call(this, data);
      return requiredObjects(data.hits)
    })
    .then((requiredObjects) => document.querySelector('.gallery_list')
      .insertAdjacentHTML("beforeend", requiredObjects.map((el) => {
        return renderMarkup(el)
      }).join(''))).catch(err => {
        Notify.failure(NO_RESULTS);
        return console.log('err.name, err.message', err.name, err.message);
      });
}

export function OnClickSearch(event) {
  event.preventDefault();

  fetchData(searchParams).then(data => {
    //promise.then(data => {
    // localStorage.setItem("ww", JSON.stringify(data));
    console.log(data);
    if (!data.hits.length) {
      throw new Error("777")
    }
    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    if (data.totalHits > +searchParams.get("per_page")) {
      refs.loadMoreBtn.style.display = "block";
    }
    return requiredObjects(data.hits)
  })
    .then((requiredObjects) => refs.gallery.innerHTML = `<ul class="gallery_list list">${requiredObjects.map((el) => {
      return renderMarkup(el)
    }).join('')}</ul>`
    )
    .catch((err) => {
      if (err.name === 429) {
        Notify.warning(API_RATE_LIMIT)
      }
      if (err.message === "777") {
        refs.gallery.innerHTML = '';
        Notify.failure(NO_RESULTS)
      }
      console.log('err.name, err.message', err.name, err.message);
    }
    );

}

function endOfResults(data = {}) {
  const pageNum = +searchParams.get("page");
  const perPageNum = +searchParams.get("per_page");
  const maxPages = Math.ceil(data.totalHits / perPageNum);
  if (pageNum === maxPages) {
    refs.loadMoreBtn.style.display = "none";
    return Notify.info(END_OF_RESULTS);
  }
}

function requiredObjects(dataArray) {
  const requiredObjects = dataArray.map(hit => {
    return {
      webformatURL: hit.webformatURL,//
      largeImageURL: hit.largeImageURL,
      tags: hit.tags,
      likes: hit.likes,//
      views: hit.views,//
      comments: hit.comments,//
      downloads: hit.downloads,//
    }
  });
  return requiredObjects
}

const renderMarkup = ({ webformatURL, tags, likes, views, comments, downloads }) => {
  return `<li class="list_item">
    <div class="photo-card">
  <img class= "photo-card_img" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
</div></li>`
}




/*
<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>
*/