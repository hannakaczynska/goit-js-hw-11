// getPhotosData();
// function hi() {
//   console.log('hi');
// }

// searchInput.addEventListener();
// searchButton.addEventListener('click', hi);

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
