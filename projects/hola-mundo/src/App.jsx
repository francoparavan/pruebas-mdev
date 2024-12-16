import './app.css';
import {TwitterFollowCard} from './TwitterFollowCard';

export const App = () => {
    const formatName = (userName) => `@${userName}`;
    return (
        <section className="App">
        <TwitterFollowCard formatUserName={formatName} isFollowing={false} userName='kikobeats'>
            Miguel Angel
        </TwitterFollowCard>
        <TwitterFollowCard formatUserName={formatName} isFollowing={true} userName='midudev'>
            Elon Musk
        </TwitterFollowCard>
        {/* <TwitterFollowCard formatUserName={formatName} isFollowing={true} userName='midudev' name='Elon Musk' />
        <TwitterFollowCard formatUserName={formatName} isFollowing={false} userName='pepo' name='Pedro Marmol' />
        <TwitterFollowCard formatUserName={formatName} isFollowing={true} userName='gorillaz' name='Carlos Agro' /> */}
        </section>
    )
};