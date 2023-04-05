import axios from 'axios';
import Notiflix from 'notiflix';

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '35000498-2935018b21b8b3d2f50cbcb0f';

const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
});

let page = 1;

const createPhotosList = photos => {
  const photosList = photos
    .map(
      photo => `<div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.keys}" loading="lazy" />
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
  gallery.innerHTML = photosList;
  loadMoreButton.classList.remove('is-hidden');
};

const managePhotosData = photos => {
  if (photos.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    createPhotosList(photos);
    console.log(photos);
  }
};

const getPhotosData = async searchedPhoto => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${MY_KEY}&q=${searchedPhoto}&${params}&${page}`
    );
    const photos = await response.data.hits;
    managePhotosData(photos);
  } catch (error) {
    console.log(error);
  }
};

const submitFunction = e => {
  e.preventDefault();
  let searchedPhoto = searchInput.value;
  if (!searchedPhoto) {
    return;
  } else {
    getPhotosData(searchedPhoto);
  }
};

searchForm.addEventListener('submit', submitFunction);
