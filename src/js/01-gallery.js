// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

// Opisany w dokumentacji
import SimpleLightbox from 'simplelightbox';
// Dodatkowy import stylów
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      ` <a class="gallery__item" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"        
        alt="${description}"
     
      />
      </a>`
  )
  .join('');

gallery.insertAdjacentHTML('afterbegin', markup);
let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
});
