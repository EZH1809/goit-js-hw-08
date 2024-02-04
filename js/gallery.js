'use strict';

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const gallery = document.querySelector('.gallery');
let currentLightboxInstance = null;

// Отрисовка галереи, добавляем элементы галереи на основе массива изображений

function createGalleryItem({ preview, original, description }) {
  const galleryItemHTML = `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img class="gallery-image"
        src="${preview}" 
        data-source="${original}" 
        alt="${description}">
      </a>
    </li>
  `;

  const galleryItem = document.createElement('li');
  galleryItem.insertAdjacentHTML('beforeend', galleryItemHTML);

  return galleryItem;
}


// Добавляем все элементы галереи в ul.gallery
function renderGallery(images) {
  const galleryItems = images.map(createGalleryItem);
  gallery.append(...galleryItems);
}

renderGallery(images);


// Добавляем делегирование событий для открытия модального окна
gallery.addEventListener('click', handleGalleryClick);

function handleGalleryClick(event) {
  event.preventDefault();

  const { target } = event;

  if (target.classList.contains('gallery-image')) {
    const largeImageSrc = target.dataset.source;

    // Используем basicLightbox для создания модального окна для создания модального окна
    currentLightboxInstance = basicLightbox.create(`
      <img src="${largeImageSrc}" alt="Large Image">
    `, {
      onShow: () => {
        document.addEventListener('keydown', handleKeyDown);
      },
      onClose: () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
    });

    currentLightboxInstance.show();
  }
}

//Функция для обработки нажатия клавиши "Escape"
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    if (currentLightboxInstance) {
      currentLightboxInstance.close();
    }
  }
}

