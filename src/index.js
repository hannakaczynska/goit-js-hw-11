import axios, { isCancel, AxiosError } from 'axios';
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

//PROBLEM WITH AXIOS!!!!!!!!!!!!

// const fetchPhotos = async () => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?key=${MY_KEY}&q=${searchedPhoto}&${params}`
//     );
//     const photos = await response.json();
//     return photos;
//     console.log(photos);
//   } catch (error) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// };

// fetchPhotos();

fetch(`${BASE_URL}?key=${MY_KEY}&q=${searchedPhoto}&${params}`)
  .then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response.json();
  })
  .then(data => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    console.log(data.hits);
  });

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

// fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       Notiflix.Notify.failure('OOPS, there is no country with that name');
//     }
//     return response.json();
//   })
//   .then(data => console.log(data));
