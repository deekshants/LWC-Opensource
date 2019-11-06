/* eslint-disable no-alert */
import LightningElementSLDS from '../../../utils/LightningElementSLDS';
import { track, api } from 'lwc';

export default class DataTable extends LightningElementSLDS {
    @track accounts = [];
    @api accountRecord;
    error;
    constructor() {
        super();
        fetch('/accounts')
            .then(response => {
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then(jsonResponse => {
                this.accounts = jsonResponse;
            })
            .catch(err => {
                this.error = err;
            });
    }

    handleEditClick(event) {
        const selectEvent = new CustomEvent('editaccount', {
            // eslint-disable-next-line @lwc/lwc/no-inner-html
            detail: event.path[3].firstChild.innerHTML
        });
        this.dispatchEvent(selectEvent);
    }

    handleDelete(event) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure that you want to delete this account?')) {
            // eslint-disable-next-line @lwc/lwc/no-inner-html
            fetch('/deleteaccount/' + event.path[3].firstChild.innerHTML)
                .then(response => {
                    if (!response.ok) this.error = response;
                    console.log(response.json());
                    this.accountRecord = null;
                })
                .catch(err => {
                    this.error = err;
                });
        }
    }
}
