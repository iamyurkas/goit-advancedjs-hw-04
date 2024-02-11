import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

iziToast.settings({
  timeout: 2000,
  position: 'topRight',
  transitionIn: 'fadeInRight',
  transitionOut: 'fadeOutLeft',
  maxWidth: 350,
});

var lightbox = new SimpleLightbox('.photo-card a', {});

let cardHeight;
const perPage = 40;
let page = 1;
let tag;

refs.form.addEventListener('submit', handlerSearchPhoto);
refs.loadBtn.addEventListener('click', handlerLoadMore);

async function handlerSearchPhoto(evt) {
  evt.preventDefault();
  tag = refs.form[0].value.trim().toLowerCase();
  refs.loadBtn.classList.add('hidden');
  if (tag) {
    page = 1;

    refs.form.reset();

    try {
      const data = await servicePhoto(tag, page, perPage);
      if (!data.hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again.',
        });
        refs.gallery.innerHTML = '<div></div>';
        return;
      }

      iziToast.success({
        message: `Hooray! We found ${data.totalHits} images.`,
      });
      refs.gallery.innerHTML = createMarkupGallary(data.hits);
      lightbox.refresh();
    } catch {
      err => console.log(err);
    }
  } else {
    iziToast.warning({
      message: 'Fill in the search field!',
    });
    refs.gallery.innerHTML = '<div></div>';
  }
}

async function handlerLoadMore() {
  page += 1;

  try {
    const data = await servicePhoto(tag, page, perPage);
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      createMarkupGallary(data.hits)
    );
    lightbox.refresh();
    cardHeight = refs.gallery.firstElementChild.getBoundingClientRect();
    scrollBy({
      top: cardHeight.height * 3,
      behavior: 'smooth',
    });

    if (page >= data.totalHits / perPage) {
      refs.loadBtn.classList.add('hidden');
    }
  } catch {
    err => console.log(err);
  }
}

function createMarkupGallary(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
            <div class="thumb">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360" />
            </div>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${downloads}
                    </p>
            </div>
        </a>
    </div>
    `
    )
    .join('');
}

async function servicePhoto(q, page = 1, per_page) {
  const options = {
    params: {
      key: '42322545-3f83537899e903f7192654afe',
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page,
    },
  };

  const { data } = await axios.get('https://pixabay.com/api/', options);

  if (page <= data.totalHits / per_page) {
    refs.loadBtn.classList.remove('hidden');
  } else if (data.totalHits) {
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
    });
  }

  return data;
}
