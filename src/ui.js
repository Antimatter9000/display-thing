export default class UI extends HTMLElement {
    static jsx2dom(tag, attrs, ...children) {
        // Custom Components will be functions
        if (typeof tag === 'function') { return tag() }
        // regular html tags will be strings to create the elements
        if (typeof tag === 'string') {
            const element = document.createElement(tag);
            if (children) {
                const fragments = UI.convertChildren(children);
                element.appendChild(fragments);
            }

            if (attrs) {
                Object.keys(attrs).forEach(attr => {
                    if (typeof attrs[attr] === 'string') {
                        element.setAttribute(attr, attrs[attr]);
                    } else if (typeof attrs[attr] === 'function') {
                        element[attr] = attrs[attr];
                    }
                });
            }
            return element
        }
    }

    static convertChildren(children) {
        const fragments = document.createDocumentFragment();
        children.forEach(child => {
            if (child) {
                fragments.appendChild(UI.convertChild(child));
            }
        })
        return fragments;
    }

    static convertChild(child) {
        if (child instanceof HTMLElement) { 
            return child;
        } else if (typeof child === 'string'){
            return document.createTextNode(child);
        } else if (child.length > 0) {
            return UI.convertChildren(child);
        } else {
            // later other things could not be HTMLElement not strings
            console.log('not appendable', child);
        }
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        if (this.template) {
            this.shadow.appendChild(this.template); // babel transpiles this.template into UI.dom(this.template)
            this.prevTemplate = this.template.cloneNode();
        }
    }

    updateTemplate() {
        this.shadow.innerHTML = '';
        this.shadow.appendChild(this.template);
    }

    attributeChangedCallback() {
        console.log('updating template');
        if (this.template) {
            this.updateTemplate();
        }
        if (this.update) {
            this.update();
        }
    }
}
