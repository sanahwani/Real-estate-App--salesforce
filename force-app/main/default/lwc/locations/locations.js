import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getRecords from '@salesforce/apex/UserLocationController.getRecords';

export default class Location extends NavigationMixin(LightningElement) {
    mapMarkers;
    error;

    @wire(getRecords)
    wiredHouses({ error, data }) {
        if (data) {
            this.mapMarkers = data.map((element) => {
                // Check if Location__c field is populated with latitude and longitude values
                if (element.Location__c && element.Location__c.latitude && element.Location__c.longitude) {
                    return {
                        location: {
                            Latitude: element.Location__c.latitude,
                            Longitude: element.Location__c.longitude
                        },
                        title: element.Name,
                        value: element.Id  // Adding Id here for navigation
                    };
                }
                return null; // Skip adding marker for records without location information
            })
            .filter(marker => marker !== null); // Filter out null markers
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.mapMarkers = undefined;
        }
    }

    handleMarkerClick(event) {
        // Retrieve the property Id from the selected marker
        const propertyId = event.target.selectedMarkerValue;

        // Navigate to the property detail page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: propertyId,
                objectApiName: 'Properties__c',
                actionName: 'view'
            }
        });
    }
}



// import { LightningElement, wire } from 'lwc';
// import { NavigationMixin } from 'lightning/navigation';
// import getRecords from '@salesforce/apex/UserLocationController.getRecords';

// export default class Location extends NavigationMixin(LightningElement) {
//     mapMarkers;
//     error;

//     @wire(getRecords)
//     wiredHouses({ error, data }) {
//         if (data) {
//             this.mapMarkers = data.map((element) => {
//                 return {
//                     location: {
//                         Street: element.Address__c,
//                         City: element.City__c,
//                         State: element.State__c
//                     },
//                     title: element.Name,
//                     value: element.Id  // Adding Id here for navigation
//                 };
//             });
//             this.error = undefined;
//         } else if (error) {
//             this.error = error;
//             this.mapMarkers = undefined;
//         }
//     }

//     handleMarkerClick(event) {
//         // Retrieve the property Id from the selected marker
//         const propertyId = event.target.selectedMarkerValue;

//         // Navigate to the property detail page
//         this[NavigationMixin.Navigate]({
//             type: 'standard__recordPage',
//             attributes: {
//                 recordId: propertyId,
//                 objectApiName: 'Properties__c',
//                 actionName: 'view'
//             }
//         });
//     }
// }




// import { LightningElement, wire } from 'lwc';
// import { NavigationMixin } from 'lightning/navigation';
// import getRecords from '@salesforce/apex/UserLocationController.getRecords';

// export default class Location extends NavigationMixin(LightningElement) {
//     mapMarkers;
//     error;

//     @wire(getRecords)
//     wiredHouses({ error, data }) {
//         if (data) {
//             this.mapMarkers = data.map((element) => {
//                 return {
//                     location: {
//                         Street: element.Address__c,
//                         City: element.City__c,
//                         State: element.State__c
//                     },
//                     title: element.Name,
//                     value: element.Id  // Adding Id here for navigation
//                 };
//             });
//             this.error = undefined;
//         } else if (error) {
//             this.error = error;
//             this.mapMarkers = undefined;
//         }
//     }

//     handleMarkerClick(event) {
//         // Retrieve the property Id from the selected marker
//         const propertyId = event.target.selectedMarkerValue;

//         // Navigate to the property detail page
//         this[NavigationMixin.Navigate]({
//             type: 'standard__recordPage',
//             attributes: {
//                 recordId: propertyId,
//                 objectApiName: 'Properties__c',
//                 actionName: 'view'
//             }
//         });
//     }
// }





// import { LightningElement, wire } from "lwc";
// import getRecords from "@salesforce/apex/UserLocationController.getRecords";
// export default class Location extends LightningElement {
//     mapMarkers;
//     error;

//     // retrieve data by invoking an Apex method using the @wire decorator.
//     @wire(getRecords)  //usimg wire to read data frm apex class
//     wiredHouses({ error, data }) {
//         if (data) {
//     // We are using Javascript Map function to transform the
//       this.mapMarkers = data.map((element) => {
//         return {
//           location: {
//             Street: element.Addres__c,
//             City: element.City__c,
//             State: element.State__c
//           },
//           title: element.Name
//         };
//       });
//       this.error = undefined;
//     } else if (error) {
//       this.error = error;
//       this.mapMarkers = undefined;
//     }
//   }
// }

