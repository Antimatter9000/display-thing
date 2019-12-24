import UI from '../ui';
import style from './style.scss';

customElements.define(
    'message-editor',
    class MessageEditor extends UI {
        static get observedAttributes() {
            return ['visible', 'closeable', 'textset'];
        }

        constructor() {
            super();
            this.text = this.getAttribute('textset') || '';
        }

        setText(e) {
            this.setAttribute('closeable', 'false');
            this.text = e.target.value;
        }

        handleSubmit(e) {
            document.querySelector('message-viewer')
                .setAttribute('textcontent', this.text);
            this.setAttribute('closeable', 'true');
            this.setAttribute('visible', 'false');
            this.setAttribute('textset', this.text);
            e.preventDefault();
        }

        get show() {
            return this.getAttribute('visible') === 'true';
        }

        get template() {
            console.log('show should update:', this.show);
            return (
                <form class={this.show ? 'visible' : 'hidden'} onsubmit={this.handleSubmit.bind(this)}>
                    <style>{style.toString()}</style>
                    <input type="text"
                      value={this.text}
                      placeholder="Enter your message here"
                      onkeypress={this.setText.bind(this)} />
                </form>
            );
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'visible' && oldValue !== newValue) {
                if (this.getAttribute('visible') === 'true' || this.getAttribute('closeable') === 'true') {
                    this.updateTemplate();
                }
            }
        }
    }
);
