import React, { useEffect, useRef, useState } from 'react';
import {BsList, BsSearch} from 'react-icons/bs';
import useArticles from '../../hooks/useArticles';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

function NavBar(){

    const inputRef = useRef<HTMLInputElement | null>(null);
    const {onSetQuery} = useArticles();
    const [search, setSearch] = useState('');
    const [boxFlag, setBoxFlag] = useState(false);
    let history = useHistory();

    const changeInputBox = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setSearch(e.target.value);
    }

    const toggleBoxFlag = () =>{
        setBoxFlag(!boxFlag);
    }

    useEffect(()=>{
        if(inputRef.current){
            const keyupFunc = (e:KeyboardEvent)=>{
                if(e.key === 'Enter'){
                    console.log('search', search);
                    history.push('/');
                    onSetQuery({query: search});
                    setSearch('');
                    toggleBoxFlag();
                }
            }
            inputRef.current.addEventListener('keyup', keyupFunc);

            return () => {
                inputRef.current?.removeEventListener('keyup', keyupFunc);
            }
        }
    });

    return (
        <header className="orbis-docs__head-section">
            <nav className="orbis-nav__nav-tag">
                <div className="orbis-nav__nav-wrapper">
                    {/* <div>
                        <BsList className="orbis-nav__list-icon" />
                    </div> */}
                    <div>
                        <Link to="/">
                            <h1>Orbis</h1>
                        </Link>
                    </div>
                    <div>
                        <Link to="/bookmark">
                            <div className="text-bold">BookMark</div>
                        </Link>
                        <BsSearch onClick={toggleBoxFlag} className="orbis-nav__search-icon" />
                    </div>
                </div>
                <div className={`orbis-nav__search-space ${boxFlag ? 'on' : ''}`}>
                    <input type="text" className="orbis-nav__input-box" value={search} ref={inputRef} onChange={changeInputBox} />
                </div>
            </nav>
        </header>
        
    )
}

export default NavBar;