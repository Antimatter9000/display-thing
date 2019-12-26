import UI from '../ui';
import style from './style.scss';

customElements.define(
    'app-header', 
    class AppHeader extends UI {
        static get observedAttributes() {
            return ['visible'];
        }

        fs() {
            if (this.isFullScreen) {
                this.closeFullScreen();
                this.isFullScreen = false;
            } else {
                this.openFullScreen(document.querySelector('main'));
                this.isFullScreen = true;
            }
        }

        openFullScreen(el) {
            if (el.requestFullscreen) {
                el.requestFullscreen();
            } else if (el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            }
        }

        closeFullScreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        get visible() {
            return this.getAttribute('visible') === 'true';
        }

        get template() {
            return (
                <header class={this.visible ? 'visible' : 'hidden'}>
                    <style>{style.toString()}</style>
                    <big>Sign</big>
                    <button onclick={this.fs.bind(this)}>FS</button>
                </header>
            );
        }
    }
);
