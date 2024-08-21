// import { LightningElement, wire } from 'lwc';
// import { NavigationMixin } from 'lightning/navigation';
// import getProps from '@salesforce/apex/PropertiesController.getProps';
// import addPropertyToFavorite from '@salesforce/apex/PropertiesController.addPropertyToFavorite';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// export default class FilteringAndSorting extends NavigationMixin(LightningElement) {
//     headings = ["Id", "Name", "State", "Country", "Price", "Beds", "Area", "Baths"];
//     fullTableData = [];
//     filteredData = [];
//     timer;
//     filterByName = "";
//     filterByPrice = "";
//     filterByBeds = "";
//     filterByArea = "";
//     filterByBaths = "";
//     filterByCountry = "";
//     filterByState = "";
//     sortOrder = 'asc';
//     sortOptions = [
//         { label: 'Low to High', value: 'asc' },
//         { label: 'High to Low', value: 'desc' }
//     ];

//     @wire(getProps)
//     contactHandler({ data, error }) {
//         if (data) {
//             this.fullTableData = data;
//             this.filteredData = data;
//             this.countryOptions = this.extractUniqueValues(data, 'Country__c');
//             this.stateOptions = this.extractUniqueValues(data, 'State__c');
//             this.sortProperties();
//         }
//         if (error) {
//             console.error(error);
//         }
//     }

//     extractUniqueValues(data, key) {
//         let values = [...new Set(data.map(item => item[key]))];
//         return values.map(value => ({ label: value, value }));
//     }

//     filterByNameHandler(event) {
//         this.filterByName = event.target.value.toLowerCase();
//         this.applyFilters();
//     }

//     filterByPriceHandler(event) {
//         this.filterByPrice = event.target.value;
//         this.applyFilters();
//     }

//     filterByBedsHandler(event) {
//         this.filterByBeds = event.target.value;
//         this.applyFilters();
//     }

//     filterByAreaHandler(event) {
//         this.filterByArea = event.target.value;
//         this.applyFilters();
//     }

//     filterByBathsHandler(event) {
//         this.filterByBaths = event.target.value;
//         this.applyFilters();
//     }

//     filterByCountryHandler(event) {
//         this.filterByCountry = event.target.value;
//         this.applyFilters();
//     }

//     filterByStateHandler(event) {
//         this.filterByState = event.target.value;
//         this.applyFilters();
//     }

//     filterHandler(event) {
//         const { value } = event.target;
//         window.clearTimeout(this.timer);
//         this.timer = window.setTimeout(() => {
//             this.applyFilters(value.toLowerCase());
//         }, 500);
//     }

//     applyFilters(searchValue = "") {
//         this.filteredData = this.fullTableData.filter(item => {
//             const matchesName = this.filterByName ? item.Name.toLowerCase().includes(this.filterByName) : true;
//             const matchesPrice = this.filterByPrice ? item.Price__c == this.filterByPrice : true;
//             const matchesBeds = this.filterByBeds ? item.Beds__c == this.filterByBeds : true;
//             const matchesArea = this.filterByArea ? item.Area__c == this.filterByArea : true;
//             const matchesBaths = this.filterByBaths ? item.Baths__c == this.filterByBaths : true;
//             const matchesCountry = this.filterByCountry ? item.Country__c === this.filterByCountry : true;
//             const matchesState = this.filterByState ? item.State__c === this.filterByState : true;
//             const matchesSearch = searchValue ? Object.values(item).some(val => val.toString().toLowerCase().includes(searchValue)) : true;
//             return matchesName && matchesPrice && matchesBeds && matchesArea && matchesBaths && matchesCountry && matchesState && matchesSearch;
//         });
//         this.sortProperties();
//     }

//     handleSort(event) {
//         this.sortOrder = event.detail.value;
//         this.sortProperties();
//     }

//     sortProperties() {
//         this.filteredData = [...this.filteredData];
//         this.filteredData.sort((a, b) => {
//             if (this.sortOrder === 'asc') {
//                 return a.Price__c - b.Price__c;
//             } else {
//                 return b.Price__c - a.Price__c;
//             }
//         });
//     }

//     handleMenuSelect(event) {
//         const action = event.detail.value;
//         const propertyId = event.target.dataset.id;

//         if (action === 'addToFavorite') {
//             this.addToFavorite(propertyId);
//         }
//     }

//     navigateToRecord(event) {
//         const propertyId = event.target.dataset.recordid;
//         this[NavigationMixin.Navigate]({
//             type: 'standard__recordPage',
//             attributes: {
//                 recordId: propertyId,
//                 objectApiName: 'Properties__c',
//                 actionName: 'view'
//             }
//         });
//     }

//     addToFavorite(propertyId) {
//         addPropertyToFavorite({ propertyId })
//             .then(() => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'Property added to Favorites',
//                         variant: 'success'
//                     })
//                 );
//             })
//             .catch(error => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Error',
//                         message: 'Error adding property to Favorites: ' + error.body.message,
//                         variant: 'error'
//                     })
//                 );
//             });
//     }
// }



import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getProps from '@salesforce/apex/PropertiesController.getProps';
import addPropertyToFavorite from '@salesforce/apex/PropertiesController.addPropertyToFavorite';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FilteringAndSorting extends NavigationMixin(LightningElement) {
    headings = ["Id", "Name", "State", "Country", "Price", "Beds", "Area", "Baths"];
    fullTableData = [];
    filteredData = [];
    timer;
    filterByName = "";
    filterByPrice = "";
    filterByBeds = "";
    filterByArea = "";
    filterByBaths = "";
    filterByCountry = "";
    filterByState = "";
    sortOrder = 'asc';
    sortOptions = [
        { label: 'Low to High', value: 'asc' },
        { label: 'High to Low', value: 'desc' }
    ];

    @wire(getProps)
    contactHandler({ data, error }) {
        if (data) {
            this.fullTableData = data;
            this.filteredData = data;
            this.countryOptions = this.extractUniqueValues(data, 'Country__c');
            this.stateOptions = this.extractUniqueValues(data, 'State__c');
            this.sortProperties();
        }
        if (error) {
            console.error(error);
        }
    }

    extractUniqueValues(data, key) {
        let values = [...new Set(data.map(item => item[key]))];
        return values.map(value => ({ label: value, value }));
    }

    filterByNameHandler(event) {
        this.filterByName = event.target.value.toLowerCase();
        this.applyFilters();
    }

    filterByPriceHandler(event) {
        this.filterByPrice = event.target.value;
        this.applyFilters();
    }

    filterByBedsHandler(event) {
        this.filterByBeds = event.target.value;
        this.applyFilters();
    }

    filterByAreaHandler(event) {
        this.filterByArea = event.target.value;
        this.applyFilters();
    }

    filterByBathsHandler(event) {
        this.filterByBaths = event.target.value;
        this.applyFilters();
    }

    filterByCountryHandler(event) {
        this.filterByCountry = event.target.value;
        this.applyFilters();
    }

    filterByStateHandler(event) {
        this.filterByState = event.target.value;
        this.applyFilters();
    }

    filterHandler(event) {
        const { value } = event.target;
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            this.applyFilters(value.toLowerCase());
        }, 500);
    }

    applyFilters(searchValue = "") {
        this.filteredData = this.fullTableData.filter(item => {
            const matchesName = this.filterByName ? item.Name.toLowerCase().includes(this.filterByName) : true;
            const matchesPrice = this.filterByPrice ? item.Price__c <= this.filterByPrice : true;
            const matchesBeds = this.filterByBeds ? item.Beds__c == this.filterByBeds : true;
            const matchesArea = this.filterByArea ? item.Area__c == this.filterByArea : true;
            const matchesBaths = this.filterByBaths ? item.Baths__c == this.filterByBaths : true;
            const matchesCountry = this.filterByCountry ? item.Country__c === this.filterByCountry : true;
            const matchesState = this.filterByState ? item.State__c === this.filterByState : true;
            const matchesSearch = searchValue ? Object.values(item).some(val => val.toString().toLowerCase().includes(searchValue)) : true;
            return matchesName && matchesPrice && matchesBeds && matchesArea && matchesBaths && matchesCountry && matchesState && matchesSearch;
        });
        this.sortProperties();
    }

    handleSort(event) {
        this.sortOrder = event.detail.value;
        this.sortProperties();
    }

    sortProperties() {
        this.filteredData = [...this.filteredData];
        this.filteredData.sort((a, b) => {
            if (this.sortOrder === 'asc') {
                return a.Price__c - b.Price__c;
            } else {
                return b.Price__c - a.Price__c;
            }
        });
    }

    handleMenuSelect(event) {
        const action = event.detail.value;
        const propertyId = event.target.dataset.id;

        if (action === 'addToFavorite') {
            this.addToFavorite(propertyId);
        }
    }

    navigateToRecord(event) {
        const propertyId = event.target.dataset.recordid;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: propertyId,
                objectApiName: 'Properties__c',
                actionName: 'view'
            }
        });
    }

    addToFavorite(propertyId) {
        addPropertyToFavorite({ propertyId })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Property added to Favorites',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error adding property to Favorites: ' + error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}

