import getComment from '../api/getComment';
import '../styles/modal.css';

const closeModal = () => {
  const closeBtn = document.querySelector('.modal-close');
  const main = document.querySelector('#main');
  const body = document.querySelector('body');
  closeBtn.addEventListener('click', () => {
    body.style.overflow = 'auto';
    main.removeChild(main.lastChild);
  });
};

const injectComment = async (movieID) => {
  const comments = await getComment(movieID);
  if (!comments.data.error) {
    const list = document.querySelector('.list-of-comments');
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    comments.data.forEach((comment) => {
      const newComment = document.createElement('li');
      newComment.className = 'comment-item';
      newComment.innerHTML = `<strong>${comment.creation_date}/ <span id="commentter-name">${comment.username}</span>:</strong> ${comment.comment}`;
      list.append(newComment);
    });
  }
};

const displayModal = (details) => {
  const body = document.querySelector('body');
  body.style.overflow = 'hidden';

  const image = details.poster_path ?? details?.backdrop_path;

  return `<div class="modal-window" style="background-image: url(${process.env.IMAGE_URL}/${image})";>
  <div class="wrapper">  
  <div class="picture">
    <img src="${process.env.IMAGE_URL}/${image}" alt="${
  details.original_title
}" />
<svg class="svg-inline--fa fa-xmark fa-3x modal-close" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path></svg>
</div>
<div class="movie-information">
    <h2 id="title">${details.title}</h2>
    <div class="desc">
      <p><strong>Released:</strong> ${details.release_date}</p>
      <p><strong>Genre:</strong> ${details.genres.map(
    (genre) => genre.name,
  )}</p>
      <p><strong>Budget:</strong> ${details.budget}</p>
      <p><strong>Ratings:</strong> ${details.vote_average}</p>
    </div>
    <div class="comments">
    <h3 id="comment-title">Comments(0)</h3>
    <ul class="list-of-comments">
    How was the movie?
        </ul>
        <form id="form">
        <h3>Add a comment</h3>
        <div class="input-fields"><i class="fas fa-user-plus fa-3x"></i><input id="name" type="text" required placeholder="Your name" /></div>
        <div class="input-fields"><i class="fas fa-message fa-2x"></i><textarea
        id="insight"
        cols="30"
        rows="3"
        required
          placeholder="Your insights"
        ></textarea></div>
        <input type="submit" value="Comment" />
        </form>
      </div>
    </div>
  </div>
</div>`;
};

export { displayModal, closeModal, injectComment };