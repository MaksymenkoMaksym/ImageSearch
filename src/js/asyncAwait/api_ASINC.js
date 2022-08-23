import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";

export const searchParams = new URLSearchParams({
    key: '29404006-95afa3b6414bbb36dd662a5bf',
    lang: 'ru',
    lang: 'en',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
});



export function fetchData(searchParams) {
    return fetch(`${BASE_URL}?${searchParams}`).then(
        response => {
            // if (!response.ok) {
            //     throw new Error(response.status);
            // }
            if (response.status === 429) {
                throw new Error("Error - 429");
            }
            return response.json()
        }
    )
}





/*
key - твой уникальный ключ доступа к API.
q - термин для поиска. То, что будет вводить пользователь.
image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
orientation - ориентация фотографии. Задай значение horizontal.
safesearch - фильтр по возрасту. Задай значение true.

*/

/*
webformatURL - ссылка на маленькое изображение для списка карточек.
largeImageURL - ссылка на большое изображение.
tags - строка с описанием изображения. Подойдет для атрибута alt.
likes - количество лайков.
views - количество просмотров.
comments - количество комментариев.
downloads - количество загрузок.
*/



export class ImgApi {
    config = {
        // `url` is the server URL that will be used for the request
        url: '',
        // `method` is the request method to be used when making the request
        method: 'get', // default

        // `baseURL` will be prepended to `url` unless `url` is absolute.
        // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
        // to methods of that instance.
        baseURL: BASE_URL,


        // `params` are the URL parameters to be sent with the request
        // Must be a plain object or a URLSearchParams object
        // NOTE: params that are null or undefined are not rendered in the URL.
        params: {
            key: '29404006-95afa3b6414bbb36dd662a5bf',
            lang: 'ru',
            lang: 'en',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
            page: 1,
        },


        // `timeout` specifies the number of milliseconds before the request times out.
        // If the request takes longer than `timeout`, the request will be aborted.
        timeout: 1000, // default is `0` (no timeout)

    };
    constructor() { };

    async getData() {
        const response = await axios.request(this.config);
        console.log(response);
        if (response.status === 429) {
            throw new Error("API rate limit exceeded");
        }
        return response.data;
    }
    setNextPage() {
        this.config.params.page += 1;
    };
    setPage(numPage) {
        this.config.params.page = numPage;
    };
    setQuery(query) {
        this.config.params.q = query;
    };
    getItemsPerPage() {
        return this.config.params.per_page;
    };
    getPage() {
        return this.config.params.page;
    };
}
