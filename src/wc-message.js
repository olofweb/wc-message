class WcMessage extends HTMLElement {
    static get observedAttributes() {
        return ['message', 'type'];
    }

    static get template() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                #divContent {
                    position: fixed;
                    width: 20%;
                    text-align: center;
                    margin-left: 35%;
                    color: white;
                    font-weight: bold;
                }
                #divMessage {
                    padding: 5px 5px 5px 5px;
                    border-radius: 5px;
                }
            </style>
            <div id="divContent" style="display: none;">
                <div id="divMessage"></div>
            </div>
        `;
        return template;
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(WcMessage.template.content.cloneNode(true));

        this._divContent = this.shadowRoot.querySelector('#divContent');
        this._divMessage = this.shadowRoot.querySelector('#divMessage');

        this._isVisible = false;
        this._timer = null;
    }

    set message(value) {
        this.setAttribute('message', value);
    }
    get message() {
        return this.getAttribute('message');
    }

    set type(value) {
        this.setAttribute('type', value);
    }
    get type() {
        return this.getAttribute('type');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const hasValue = newValue !== null;
        switch(name) {
            case 'message' :
                this._message.innerHTML = newValue;
                break;
            case 'type' :
                this._setType(newValue);
                break;
        }
    }

    _setType(type) {
        if (type !== 'info' && type !== 'success' && type !== 'error') {
            console.log('Le type \'' + type + '\' n\'est pas reconnu');
        }
        var color = '5b6db0';
        switch(type) {
            case 'error' :
                color = 'ff7773';
                break;
            case 'success' :
                color = '58c370';
                break;
            case 'info' :
                color = '5b6db0';
                break;
        }

        this._divMessage.style.backgroundColor = color;
    }

    showWithTimeout(message, type, timeout) {
        //if (this._isVisible) return;

        if (timeout === null || timeout === undefined) timeout = 2500;

        this._setType(type);
        this._divMessage.innerText = message;
        this._divContent.style.display = 'block';

        clearTimeout(this._timer);
        this._timer = setTimeout(this._hide.bind(this), timeout);

        this._isVisible = true;
    }

    _hide() {
        this._divContent.style.display = 'none';
        this._isVisible = false;
    }
}

customElements.define('wc-message', WcMessage);
