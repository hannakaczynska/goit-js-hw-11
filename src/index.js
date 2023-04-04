import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '35000498-2935018b21b8b3d2f50cbcb0f';

const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});

let searchedPhoto = 'cat';
const url = `${BASE_URL}?key=${MY_KEY}&q=${searchedPhoto}&${params}`;

const gallery = document.querySelector('.gallery');

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

const getPhotosData = async () => {
  try {
    const response = await axios.get(url);
    const photos = await response.data.hits;
    managePhotosData(photos);
  } catch (error) {
    console.log(error);
  }
};

getPhotosData();

//FETCH WITHOUT ASYNC/AWAIT
// fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//     return response.json();
//   })
//   .then(data => {
//     if (data.hits.length === 0) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//     console.log(data.hits);
//   });

// const fetchPhotos = async () => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?key=${MY_KEY}&q=${searchedPhoto}&${params}`
//     );
//     const photos = await response.json();
//     // return photos;
//     console.log(photos);
//   } catch (error) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// };

// fetchPhotos();
