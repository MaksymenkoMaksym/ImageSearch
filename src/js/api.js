// import { onInputRequest, nClickLoad } from './tools.js';

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