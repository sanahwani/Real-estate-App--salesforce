public with sharing class UserLocationController {
    @AuraEnabled(cacheable=true)
    public static List<Properties__c> getRecords() { 
        try {
            List<Properties__c> props = [
                SELECT
                   Id,
                   Name,
                   State__c, 
                   Location__c,
                   CreatedDate
                FROM Properties__c
                WITH SECURITY_ENFORCED
                ORDER BY CreatedDate DESC
                LIMIT 20
            ];
            return props;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}




// public with sharing class UserLocationController {
//     // To allow an Apex method to be used in an LWC, you annotate it with the @AuraEnabled annotation
//     @AuraEnabled(cacheable=true)
//     public static List<Properties__c> getRecords() { 
//         try {
//             // Create a list of House records from a SOQL query
//             List<Properties__c> props = [
//                 SELECT
//                    Id,
//                    Name,
                   
//                    State__c, 
//                    Location__c,
//                    City__c,
//                    Zip__c,
//                    CreatedDate
//                    FROM Properties__c
//                    WITH SECURITY_ENFORCED
//                    ORDER BY CreatedDate DESC
//                    Limit 20
                   
//                 ];
//                   return props;
//         }
//         // Code to handle exception
//         catch (Exception e) {
//            throw new AuraHandledException(e.getMessage());
//         }
//     }
// }