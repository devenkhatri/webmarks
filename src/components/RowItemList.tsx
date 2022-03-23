import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import { RowItem } from '../data/rowitem';
import './RowItemList.css';
import Moment from 'react-moment';

interface RowItemListProps {
  rowItem: RowItem;
  searchText: string;
}

const RowItemList: React.FC<RowItemListProps> = ({ rowItem, searchText }) => {
  if(rowItem && rowItem?.name?.toLowerCase().indexOf(searchText?.toLowerCase())<0) return <></>;
  let dotClass = 'dot-success';
  const daysLeft = (rowItem && rowItem?.remainingdays_n) || 0;
  if(daysLeft <= 30) dotClass = 'dot-warning';
  if(daysLeft <= 10) dotClass = 'dot-danger';
  return (
    <IonItem lines={'full'}>
      <div slot="start" className={`dot ${dotClass}`}></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          <span>{rowItem.name}</span>
          <span className="date">
            <IonNote><Moment format="DD MMM, YYYY">{rowItem.enddate}</Moment></IonNote>
          </span>
        </h2>
        <h3><i>{rowItem.remainingdays}</i> remaining</h3>
      </IonLabel>
    </IonItem>
  );
};

export default RowItemList;
