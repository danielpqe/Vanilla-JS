(async function load() {
// await
// action
// terror
// animation
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json()
        return data;
    }
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');
    const $featuringContainer = document.getElementById('featuring');


    function setAttributes($element, attributes) {
        for (const attribute in attributes) {
            $element.setAttribute(attribute, attributes[attribute]);
        }
    }
    const BASE_API = 'https://yts.am/api/v2/';

    function featuringTemplate(peli) {
        return (
            `
<div class="featuring">
  <div class="featuring-image">
    <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
  </div>
  <div class="featuring-content">
    <p class="featuring-title">Pelicula encontrada</p>
    <p class="featuring-album">${peli.title}</p>
  </div>
</div>
`
        )
    }

    $form.addEventListener('submit', async (event) => {
        event.preventDefault();
        $home.classList.add('search-active')
        const $loader = document.createElement('img');
        setAttributes($loader, {
            src: 'src/images/loader.gif',
            height: 50,
            width: 50,
        })
        $featuringContainer.append($loader);

        const data = new FormData($form);
        const {
            data: {
                movies: pelis
            }
        } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)

        const HTMLString = featuringTemplate(pelis[0]);
        $featuringContainer.innerHTML = HTMLString;
    })

    const actionList = await getData(`${BASE_API}list_movies.json?genre=action`)
    const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`)
    const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`)
    console.log(actionList, dramaList, animationList)
    function videoItemTemplate(movie, category) {
        return (
            `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
  <div class="primaryPlaylistItem-image">
    <img src="${movie.medium_cover_image}">
  </div>
  <h4 class="primaryPlaylistItem-title">
    ${movie.title}
  </h4>
</div>`
        )
    }
    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }
    function addEventClick($element) {
        $element.addEventListener('click', () => {
// alert('click')
            showModal($element)
        })
    }
    function renderMovieList(list, $container, category) {
// actionList.data.movies
        $container.children[0].remove();
        list.forEach((movie) => {
            const HTMLString = videoItemTemplate(movie, category);
            const movieElement = createTemplate(HTMLString);
            $container.append(movieElement);
            addEventClick(movieElement);
        })
    }
    const $actionContainer = document.querySelector('#action');
    renderMovieList(actionList.data.movies, $actionContainer, 'action');

    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList.data.movies, $dramaContainer, 'drama');

    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList.data.movies, $animationContainer, 'animation');








// const $home = $('.home .list #item');
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

    function showModal($element) {
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards';
        const id = $element.dataset.id;
        const category = $element.dataset.category;

    }

    $hideModal.addEventListener('click', hideModal);
    function hideModal() {
        $overlay.classList.remove('active');
        $modal.style.animation = 'modalOut .8s forwards';

    }
})()