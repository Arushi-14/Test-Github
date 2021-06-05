import { LightningElement, wire, api, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import updateAcc from '@salesforce/apex/RefreshController.updateAccount';

export default class refreshWhenChangesOccurs extends NavigationMixin(LightningElement){
    @api recordId;
    @track account;
    @api prop1;
    @track accountRec;

    @wire(getRecord, {
        recordId: '$recordId',
        layoutTypes: ['Full']
        
    })
    accountRec;

    
    get name() {
        console.log(this.accountRec.data.fields);
        var name = this.accountRec.data.fields.Name.value;
        console.log("Field Updated");
        return name;
        
    }

    get Website() {
        console.log(this.accountRec.data.fields.Website.value);
        return this.accountRec.data.fields.Website.value;
    }

    get phone() {
        return this.accountRec.data.fields.Phone.value;
    }

    changeButton(){
        updateAcc({recordId:this.recordId}).then(result=>{
            console.log(result);
            window.location.reload();
        })
        
        
    }

}
