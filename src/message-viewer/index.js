import UI from '../ui';
import styles from './style.scss';

const fps = 60;
const screenSpeed = 2; // it will take 1 second for a character to cross the screen

customElements.define(
    'message-viewer',
    class SignView extends UI {
        static get observedAttributes() {
            return ['textcontent'];
        }

        get content() {
            return this.getAttribute('textcontent');
        }

        get template() {
            return (
                <div id="sign">
                    <style>{styles.toString()}</style>
                    <h1>{this.content}</h1>
                </div>
            );
        }

        update() {
            const el = this.shadow.getElementById('sign');
            const elWidth = el.clientWidth;
            const windowWidth = window.innerWidth;
            let left = windowWidth;
            el.style.position = 'absolute';
            const distance = (windowWidth/screenSpeed)/fps;
            this.animation = setInterval(() => {
                left = el.offsetLeft > elWidth * -1
                    ? left - distance
                    : windowWidth;
                el.style.left = `${left}px`;
            }, 1000/fps);
        }
    }
);
