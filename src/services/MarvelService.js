import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey  = 'apikey=43a197e559a4cb5dfea99c532651d5d0';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res =  await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
        
        return _transformComics(res.data.results[0]);
    }


    const _transformCharacter = (char) => {

        let descr = char.description;
        if (descr === '') {
            descr = 'There is no Information about this Character';
        }
        if (descr.length > 170) {
            descr = descr.substr(0,170) + '...';
        }
        
        return {
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const _transformComics = (item) => {
        let descr = item.description;
        let price = item.prices[0].price;
        if (descr == null) {
            descr = 'There is no Information about this Comic';
        } 
        if ( price === 0 ) {
            price = 'NOT AVAILABLE'
        } else {
            price += '$'
        }

        if (descr.length > 170) {
            descr = descr.substr(0,170) + '...';
        }

        let language = item.textObjects[0] ? item.textObjects[0].language : 'No information';
        
        return {
            id: item.id,
            title: item.title,
            description: descr,
            price: price,
            pageCount: item.pageCount ? `${item.pageCount} pages` : 'No information about the number of pages',
            language: language,
            thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            homepage: item.urls[0].url            
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic, clearError};
}
export default useMarvelService;
