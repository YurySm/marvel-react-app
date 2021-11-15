import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';   
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';



import './charList.scss';

const CharList = (props) => {

    const [char, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    const {loading, error, getAllCharacters} =  useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharLoaded)
    }

    const onCharLoaded = async (newChar) => {


        let ended = false;
        if (newChar.length < 9) {
            ended = true;
        }

        setCharList(char => [...char, ...newChar]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);

    }

    const itemsRef = useRef([]);

    const onChangeChar = (id) => {
        itemsRef.current.forEach(item => {
            item.classList.remove('char__item_selected');
        });
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    }
        


    const renderItems = (char) => {
        const items = char.map(({id, name, thumbnail}, i) => {
                let styleImg = ''

                if(thumbnail.indexOf('image_not_available') > -1) {
                    styleImg += 'no-img';
                }
                return (
                    <li 
                        key={id} 
                        onClick={() => {
                            props.onCharSelected(id);
                            onChangeChar(i);
                        }} 
                        className="char__item" 
                        tabIndex={0}
                        ref={el => itemsRef.current[i] = el}>
                            <img src={thumbnail} alt="abyss" className={styleImg}/>
                            <div className="char__name">{name}</div>
                    </li>
                )
            })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }

    const charItems = renderItems(char);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {charItems}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )


}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;












// const CharList = () => {
//     return (
//         <div className="char__list">
//             <ul className="char__grid">
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item char__item_selected">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

// export default CharList;