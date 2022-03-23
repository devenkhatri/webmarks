import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import { RowItem } from '../data/rowitem';
import './RowItemList.css';
import Avatar from 'react-avatar';

interface RowItemListProps {
  rowItem: RowItem;
  searchText: string;
}
var randomColor = require('randomcolor');
const RowItemList: React.FC<RowItemListProps> = ({ rowItem, searchText }) => {  
  if(rowItem && rowItem?.name?.toLowerCase().indexOf(searchText?.toLowerCase())<0) return <></>;  
  var color = randomColor({luminosity: 'dark'}); 
  return (
    <IonItem lines={'full'} detail={true} href={rowItem.url} target="_blank">
      <div slot="start"><Avatar name={rowItem.name} round={true} size="30px" style={{paddingLeft: '1rem'}} color={color} /></div>
      <IonLabel className="ion-text-wrap">
        <h2>          
          <span>{rowItem.name}</span>
          <span className="date">
            <IonNote>{rowItem.source}</IonNote>
          </span>
        </h2>
        {/* <h3><i>{rowItem.url}</i></h3> */}
      </IonLabel>
    </IonItem>
  );
};

export default RowItemList;
