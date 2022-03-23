import { getAirtableData } from "./helper";

export interface RowItem {
  name: string;
  enddate: string;
  id: number;
  remainingdays: string;
  remainingdays_n?: number;
}

const rowItems: RowItem[] = [];

export const getRowItems = async () => {
  const airtableRecords:any = await getAirtableData(process.env.REACT_APP_AIRTABLE_KEY, process.env.REACT_APP_AIRTABLE_BASE, process.env.REACT_APP_AIRTABLE_TABLE,'Grid view','',[{field: 'End Date'}])
  airtableRecords.forEach(function (record: any) {
    const item = {
      name: record.get('Name'),
      enddate: record.get('End Date'),
      remainingdays: record.get('Remaining Days'),
      remainingdays_n: record.get('Remaining Days N'),
      id: record.id
    }    
    console.log('Retrieved', item);
    rowItems.push(item);
  });  
  return rowItems;
};

export const getRowItem = (id: number) => rowItems.find(r => r.id === id);
