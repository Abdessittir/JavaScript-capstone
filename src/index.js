import './styles/global.css';

import footer from './modules/footer';
// list of movies: `${process.env.MOVIES_URL}?api_key=${process.env.API_KEY}`

// movie detail: `${process.env.MOVIES_URL}/${movieId}?api_key=${process.env.API_KEY}`

// movie image: `${process.env.IMAGE_URL}/imageId.jpg`

const render = () => {
  const footerEle = document.querySelector('.footer');
  footerEle.replaceChildren('');
  footerEle.insertAdjacentHTML('beforeend', footer());
};

render();