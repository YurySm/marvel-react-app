import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './comicsList.scss';


const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState();

    const {loading, error, getAllComics} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setComicsEnded(ended);
    }

    const renderComics = (comics) => {
        const items = comics.map(({id, title, thumbnail, price}, i) => {
            let styleImg = 'comics__item-img';

            if(thumbnail.indexOf('image_not_available') > -1) {
                styleImg += ' no-img';
            }


            return (
                <li 
                    key={i} 
                    className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="ultimate war" className={styleImg}/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
               {items}
            </ul>
        )
    }

    const comicsList = renderComics(comics);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    


    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {comicsList}
            <button 
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;