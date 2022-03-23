import {
  IonItem,
  IonLabel,
  IonNote,
  IonSkeletonText,
  } from '@ionic/react';
import './RowItemList.css';

const SkeletonItem: React.FC = () => {
  return (
    <IonItem lines={'full'}>
      <div slot="start" className={`dot dot-grey`}></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          <span><IonSkeletonText animated /></span>
          <span className="date">
            <IonNote><IonSkeletonText animated /></IonNote>
          </span>
        </h2>
        <h3><IonSkeletonText animated /></h3>
      </IonLabel>
    </IonItem>
  );
};

export default SkeletonItem;
