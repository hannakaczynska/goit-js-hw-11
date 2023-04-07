import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import debounce from 'lodash.debounce';

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '35000498-2935018b21b8b3d2f50cbcb0f';

let page = 1;

const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

const addHTML = (() => {
  let innerHTML = '';
  return function (data, reset = false) {
    if (reset) {
      innerHTML = '';
    }
    innerHTML += data;
    return innerHTML;
  };
})();

const createPhotosList = photos => {
  try {
    const photosList = photos
      .map(
        photo => `<div class="photo-card">
  <a href="${photo.largeImageURL}">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${photo.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${photo.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${photo.downloads}
    </p>
  </div>
</div>`
      )
      .join('');
    gallery.innerHTML = addHTML(photosList);
    new SimpleLightbox('.photo-card a').refresh();
  } finally {
    loadMoreButton.classList.remove('is-hidden');
  }
};

const add = (() => {
  let counter = 0;
  return function (data, reset = false) {
    if (reset) {
      counter = 0;
    }
    counter += data;
    return counter;
  };
})();

const managePhotosData = (photos, totalNumberOfPhotos, page) => {
  if (page === 1 && totalNumberOfPhotos > 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalNumberOfPhotos} images.`);
  }
  if (totalNumberOfPhotos === 0) {
    gallery.innerHTML = addHTML('', true);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  } else {
    createPhotosList(photos);
    const amountOfPages = add(photos.length);
    if (amountOfPages === totalNumberOfPhotos) {
      loadMoreButton.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }
};

const getPhotosData = async searchedPhoto => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${MY_KEY}&q=${searchedPhoto}&${params}&page=${page}`
    );
    const photos = await response.data.hits;
    const totalNumberOfPhotos = await response.data.totalHits;
    managePhotosData(photos, totalNumberOfPhotos, page);
  } catch (error) {
    console.log(error);
  }
};

const submitFunction = e => {
  e.preventDefault();
  add(0, true);
  loadMoreButton.classList.add('is-hidden');
  page = 1;
  addHTML('', true);
  let searchedPhoto = searchInput.value;
  if (!searchedPhoto) {
    return;
  } else {
    getPhotosData(searchedPhoto);
  }
};

// Dodawanie większej ilości zdjęc za pomocą przycisku
const loadMorePhotos = () => {
  loadMoreButton.classList.add('is-hidden');
  page = page + 1;
  let searchedPhoto = searchInput.value;
  getPhotosData(searchedPhoto);
};

//scroll
// const scroll = () => {
//   const scrollable = document.documentElement.scrollHeight - window.innerHeight;
//   const scrolled = window.scrollY;
//   if (scrolled > scrollable - 1500) {
//     page = page + 1;
//     let searchedPhoto = searchInput.value;
//     getPhotosData(searchedPhoto);
//   }
// };

// window.addEventListener('scroll', debounce(scroll, 200));
searchForm.addEventListener('submit', submitFunction);
loadMoreButton.addEventListener('click', loadMorePhotos);
