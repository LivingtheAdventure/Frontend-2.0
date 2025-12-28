import Event from '../Event/Event';
import Slider from '../Slider/Slider';
function MainPage({ heroType, heroContent }) {
    return (
        <div>
            <Slider heroContent={heroContent} />
            <Event heroType={heroType} />

        </div>
    );
}
export default MainPage;