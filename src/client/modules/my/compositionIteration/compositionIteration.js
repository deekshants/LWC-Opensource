import { track } from 'lwc';
import LightningElementSLDS from '../../../utils/LightningElementSLDS'
export default class CompositionIteration extends LightningElementSLDS {
    @track accounts = [];
    error;
    connectedCallback(){
        fetch('/accounts')
        .then(response => {
            if (!response.ok) {
                this.error = response;
            }
            return response.json()
        })
        .then(jsonResponse => {
            this.accounts = jsonResponse;
            console.log(this.accounts);
        })
        .catch(err => {
            this.error = err;
        });
    }
}
