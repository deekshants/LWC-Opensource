import { LightningElement } from 'lwc';

export default class LightningElementSLDS extends LightningElement {
    constructor() {
        super();
        let _sldsPath = "../resources/slds/assets/styles/salesforce-lightning-design-system.css";
        const styles = document.createElement("link");
        styles.href = _sldsPath;
        styles.rel = "stylesheet";
        this.template.appendChild(styles);
    }
}