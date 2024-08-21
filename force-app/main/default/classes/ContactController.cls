// public with sharing class ContactController {
    
//     @AuraEnabled(cacheable=true)
//     public static List<Contact> getContacts(String searchKey, Integer maxAccounts) {
//         // Construct SOQL query to fetch accounts
//         String query = 'SELECT Id, Name FROM Contact';
        
//         // Apply search criteria if searchKey is provided
//         if (String.isNotBlank(searchKey)) {
//             query += ' WHERE Name LIKE \'%' + searchKey + '%\'';
//         }
        
//         // Limit the number of accounts based on maxAccounts
//         query += ' LIMIT ' + maxAccounts;
        
//         // Execute the query
//         return Database.query(query);
//     }
// }

public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Title, Email from Contact];

    }
}