const API_TOKEN: string = "f64b1ed757ab2bf22ec89a56014c6893"

export function getFilmsFromApiWithSearchedText(text: string, page: number) {
    const url: string = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN +
    '&language=fr&query=' + text + '&page' + page
    return fetch(url).then(response => response.json())
    .catch(error => console.error(error))
}

export function getImageFromApi(name: string) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi(id: number) {
    const url: string = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN +
        '&language=fr'
    return fetch(url).then(response => response.json())
        .catch(error => console.error(error))
}

export function getLastNewFilms() {
    const url: string = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN +
    '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=1'
    return fetch(url).then(response => response.json())
        .catch(error => console.log(error))
}