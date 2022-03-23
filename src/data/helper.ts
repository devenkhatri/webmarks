import Airtable from 'airtable';

//Get all records from Airtable
export const getAirtableData = async (airtableApiKey?: string, airtableBaseId?: string, tableName?: string, viewName?: string, filterCriteria?: string, sortBy?: any[]) => {
    if (!airtableApiKey || !airtableBaseId || !tableName || !viewName) return;
    return new Promise(function (resolve, reject) {
        const base = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId);
        base(tableName).select({
            view: viewName,
            filterByFormula: filterCriteria ? filterCriteria : '',
            sort: sortBy ? sortBy : []
        }).eachPage(function page(airtablerecords, fetchNextPage) {
            //console.log("***** from common airtable function for table = "+tableName)
            //console.log(airtablerecords)
            resolve(airtablerecords);
            fetchNextPage();
        }, function done(err) {
            if (err) {
                const errMessage = "ERROR while fetching data from Airtable : " + err;
                console.log(errMessage);
                return false;
            }
        });
    })
};
