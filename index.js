import UI from './src/ui';
import './src/app-header';
import './src/message-viewer';
import './src/message-editor';

import './src/style/index.css';

let headerVisible = false;
let headerTimeout = null;

document.onmousemove = () => {
    const header = document.querySelector('app-header');
    const editor = document.querySelector('message-editor');
    header.setAttribute('visible', true);
    editor.setAttribute('visible', 'true');
    if (headerTimeout) { clearTimeout(headerTimeout); }
    headerTimeout = setTimeout(() => {
        header.setAttribute('visible', false);
        if (editor.getAttribute('closeable') === 'true') {
            editor.setAttribute('visible', false);
        }
    }, 2000);
};

// customElements.define(
//     'signage-app',
//     class SignageApp extends UI {
//         static get observedAttributes() {
//             return ['textcontent', 'headervisible'];
//         }

//         handleMouseMove() {
//             this.setAttribute('headervisible', true);
//             if (this.timeout) { clearTimeout(this.timeout); }
//             this.timeout = setTimeout(() => {
//                 this.setAttribute('headervisible', false);
//                 console.log('bye bye editor');
//             }, 2000);
//         }

//         get headerVisible() {
//             return this.getAttribute('headervisible') === 'true';
//         }

//         get textcontent() {
//             return this.getAttribute('textcontent');
//         }

//         set editorOpen(val) {
//             this.setAttribute('editoropen', val);
//         }

//         get editorOpen() {
//             return this.getAttribute('editoropen') === 'true'
//                 || !Boolean(this.textcontent);
//         }

//         get template() {
//             return (
//                 <main onmousemove={this.handleMouseMove.bind(this)}>
//                     {this.headerVisible && <fs-header />}
//                     {this.editorOpen && <sign-view content="Party time is now so it is" />}
//                     {this.editorOpen && <editor-view />}
//                 </main>
//             );
//         }
//     }
// );
