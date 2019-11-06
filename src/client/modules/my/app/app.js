import LightningElementSLDS from '../../../utils/LightningElementSLDS';
import { track } from 'lwc';
export default class App extends LightningElementSLDS {
    @track accountRecord = {};
    error;

    handleEditAccount(event) {
        this.template
            .querySelector('.backdrop')
            .classList.add('slds-backdrop', 'slds-backdrop_open');
        this.template.querySelector('.modal1').classList.remove('slds-hidden');
        console.log('Id:::' + event.detail);
        fetch('/getaccountforedit/' + event.detail)
            .then(response => {
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then(jsonResponse => {
                this.accountRecord = jsonResponse;
            });
    }

    removeModal() {
        this.template
            .querySelector('.backdrop')
            .classList.remove('slds-backdrop', 'slds-backdrop_open');
        this.template.querySelector('.modal1').classList.add('slds-hidden');
    }
}
