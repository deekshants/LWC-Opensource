import LightningElementSLDS from '../../../utils/LightningElementSLDS';
import { track } from 'lwc';
export default class App extends LightningElementSLDS {
    @track accountRecord = {
        name: '',
        sfid: '',
        phone: '',
        industry: '',
        website: ''
    };
    error;

    handleEditAccount(event) {
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
        this.showModal();
    }

    showModal() {
        this.template
            .querySelector('.backdrop')
            .classList.add('slds-backdrop', 'slds-backdrop_open');
        this.template.querySelector('.modal1').classList.remove('slds-hidden');
    }

    removeModal() {
        this.template
            .querySelector('.backdrop')
            .classList.remove('slds-backdrop', 'slds-backdrop_open');
        this.template.querySelector('.modal1').classList.add('slds-hidden');
        this.accountRecord = {
            name: '',
            sfid: '',
            phone: '',
            industry: '',
            website: ''
        };
    }
}
