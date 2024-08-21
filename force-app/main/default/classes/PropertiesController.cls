public with sharing class PropertiesController {
    @AuraEnabled(cacheable=true)
    public static List<Properties__c> getProps() {
        List<Properties__c> properties = [
            SELECT Id, Name, State__c, Country__c, Beds__c, Price__c, Area__c, Baths__c
            FROM Properties__c
            WHERE Name != null AND State__c != null AND Country__c != null
        ];
        
        return properties;
    }

    @AuraEnabled
    public static void addPropertyToFavorite(Id propertyId) {
        Favorite__c favorite = new Favorite__c();
        favorite.Properties__c = propertyId;
        insert favorite;
    }

    @AuraEnabled
    public static void removePropertyFromFavorite(Id propertyId) {
        Favorite__c favorite = [SELECT Id FROM Favorite__c WHERE Properties__c = :propertyId LIMIT 1];
        delete favorite;
    }
}




// public with sharing class PropertiesController {
//     @AuraEnabled(cacheable=true)
//     public static List<Properties__c> getProps() {
//         return [SELECT Id, Name, State__c, Country__c, Beds__c,Rooms__c,	Price__c from Properties__c];

//     }
// }

