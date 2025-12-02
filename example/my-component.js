import { getMyComponentCSS } from './my-component-css.js';
class MyRide extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const style = document.createElement('style');
        style.textContent = getMyComponentCSS();

        const year = this.getAttribute('year') !== "undefined" ? this.getAttribute('year') : 'Unknown Year';
        const make = this.getAttribute('make') !== "undefined" ? this.getAttribute('make') : 'Unknown Make';
        const model = this.getAttribute('model') !== "undefined" ? this.getAttribute('model') : 'Unknown Model';
        const deets = this.getAttribute('deets') !== "undefined" ? this.getAttribute('deets') : 'Older picture. Nothing to say here!';
        const imageUrl = this.getAttribute('image-url') || '';

        // Template for actual component content
        this.innerHTML = '';
        this.appendChild(style);
        this.innerHTML += `
            <div class="simple-card">
                <hgroup>
                <p class="year">${year}</p>
                <h2 class="model">${make} ${model}</h2>
                </hgroup>
                <p class="deets">${deets}</p>
                <img src="${imageUrl}" alt="${make} ${model}">
            </div>
        `;

        this.querySelector('.simple-card').addEventListener('click', () => this.bubbleUp());

    }
    bubbleUp() {
        console.log('bubbling up...');
    }
}

// Define the custom element
console.log("custom element defined");
customElements.define('my-ride', MyRide);