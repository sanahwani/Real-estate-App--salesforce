public with sharing class propertiesMap {
    @AuraEnabled(cacheable=true)
    public static List<Properties__c> getRecords() {
        List<Properties__c> propsList = new List<Properties__c>();  // Initialize the list
        try {
            // Create a list of House records from a SOQL query
            propsList = [
                SELECT
                    Id,
                    Name,
                    State__c, 
                    City__c,
                    Zip__c,
                    Location__c
                FROM Properties__c
                ORDER BY CreatedDate
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return propsList;  // Ensure the list is always returned
    }
}



