import React from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';
import CSS from './GCSplashScreen.css';

    /**
     * OPTIONAL PROPS
     * backgroundImage: Image URL or file path
     * 
     * routes: an object containing routes for French and English
     * 
     */

function GCSplashScreen(props) {

    // Default background image is a random image from unsplash with the same resolution as the user's display
    const splashScreenBackground = {
        backgroundImage: `url(https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight})`
    };

    // Check for first visit, if it is then show the splash screen
    function firstVisit() {
        try {
            if (localStorage.langIsEnglish){
                // Hide screen
                splashScreenBackground.display = "none";
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    function setLang(langIsEnglish) {
        try {
            localStorage.langIsEnglish = JSON.stringify(langIsEnglish);
        } catch (error) {
            console.error(error);
        }
    }

    function getBackgroundImage() {
        try {
            if (props.backgroundImage){
                splashScreenBackground.backgroundImage = `url(${props.backgroundImage})`;
            }
        } catch (error) {
            console.log("No background image provided, using random image from unsplash");
        }
    }

    // Check if a background image is passed as a prop, and if so set it
    getBackgroundImage();

    // Run function to see if this is the user's first visit
    firstVisit();

    return (
        <ScrollLock isActive={firstVisit()}>
            <div className={CSS.splashScreen} style={splashScreenBackground}>
                <div className={CSS.splashScreenWindow}>
                    <a href={props.routes.english}><button onClick={() => {setLang(true)}}>English</button></a>
                    <a href={props.routes.french}><button onClick={() => {setLang(false)}}>Français</button></a>
                </div>
            </div>
        </ScrollLock>
    );
}

GCSplashScreen.propTypes = {
    routes: PropTypes.shape({
        english: PropTypes.string.isRequired,
        french: PropTypes.string.isRequired
    })
};

GCSplashScreen.defaultProps = {
    routes: {
        english: "/en",
        french: "/fr"
    }
};

export default GCSplashScreen;