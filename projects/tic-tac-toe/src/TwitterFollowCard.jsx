import { useState } from 'react'

export const TwitterFollowCard = ({userName, children, formatUserName, initialIsFollowing}) => {
    
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    console. log('[TwitterFollowCard] render with userName: ', userName)
    
    // console.log(isFollowing ? `El usuario ${userName} está siendo seguido.` : `El usuario ${userName} no está siendo seguido.`);
    const text = (isFollowing ? "Siguiendo" : "Seguir")
    const buttonChangeColor = (isFollowing ? 'followCard-button is-following' : 'followCard-button')

    const handleClick = () => {
        setIsFollowing(!isFollowing) 
    };

    return (
        <article className='followCard'>
            <header className='followCard-header'>
                <img className='followCard-avatar' alt='la imagen' src={`https://unavatar.io/${userName}`} />
                <div className='followCard-info'>
                    <strong>{children}</strong>
                    <span className='followCard-username'> @{userName}</span>
                </div>
            </header>

            <aside>
                <button className={buttonChangeColor} onClick={handleClick}>
                    {text}
                </button>
            </aside>
        </article>
    )
};