// realEstate.js
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const LATITUDE = 'Properties__c.Location__Latitude__s';
const LONGITUDE = 'Properties__c.Location__Longitude__s';

const propertyField = [LATITUDE, LONGITUDE];

export default class RealEstate extends LightningElement {
    @api recordId;
    @api propertiesData;
    @api markers = [];

    @wire(getRecord, { recordId: '$recordId', fields: propertyField })
    wiredPropertyData({ error, data }) {
        if (data) {
            const latitude = getFieldValue(data, LATITUDE);
            const longitude = getFieldValue(data, LONGITUDE);

            // Construct the marker using latitude and longitude values
            this.markers = [{
                location: {
                    Latitude: latitude,
                    Longitude: longitude
                },
                title: 'Property Location' // Title for the marker
            }];

            this.propertiesData = data;
        } else if (error) {
            console.error(error);
        }
    }
}






// // realEstate.js
// import { LightningElement, api, wire } from 'lwc';
// import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// const STATE = 'Properties__c.State__c';
// const COUNTRY = 'Properties__c.Country__c';

// const propertyField = [STATE, COUNTRY];

// export default class RealEstate extends LightningElement {
//     @api recordId;
//     @api propertiesData;
//     @api markers = [];

//     @wire(getRecord, { recordId: '$recordId', fields: propertyField })
//     wiredPropertyData({ error, data }) {
//         if (data) {
//             const state = getFieldValue(data, STATE);
//             const country = getFieldValue(data, COUNTRY);
            
//             // You can use state and country values here to customize marker locations accordingly
//             this.markers = [{
//                 location: {
//                     State: state,
//                     Country: country
//                 },
//                 title: 'Property Location' // Title for the marker
//             }];
            
//             this.propertiesData = data;
//         } else if (error) {
//             console.error(error);
//         }
//     }
// }