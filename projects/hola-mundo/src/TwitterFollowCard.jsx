export const TwitterFollowCard = ({userName, children, isFollowing, formatUserName}) => {
    const imgScr = `https://unavatar.io/${userName}`;
    console.log(isFollowing ? `El usuario ${userName} está siendo seguido.` : `El usuario ${userName} no está siendo seguido.`);

    return (
        <article className='followCard'>
            <header className='followCard-header'>
                <img className='followCard-avatar' alt='la imagen' src={imgScr} />
                <div className='followCard-info'>
                    <strong>{children}</strong>
                    <span className='followCard-username'> {formatUserName(userName)}</span>
                </div>
            </header>

            <aside>
                <button className='followCard-button'>
                    Seguir
                </button>
            </aside>
        </article>
    )
};