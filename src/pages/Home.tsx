import RowItemList from '../components/RowItemList';
import { useState } from 'react';
import { RowItem, getRowItems } from '../data/rowitem';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import SkeletonItem from '../components/SkeletonItem';

const Home: React.FC = () => {

  const [rowItems, setRowItems] = useState<RowItem[]>([]);
  const [searchText, setSearchText] = useState('');

  useIonViewWillEnter(async () => {
    console.log("****** REACT_APP_AIRTABLE_KEY", process.env.REACT_APP_AIRTABLE_KEY)
    const items = await getRowItems();
    setRowItems(items);
  }, []);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Subscription Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
            Subscription Tracker
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="never" animated placeholder="Filter Items"></IonSearchbar>
        <IonList>
          {rowItems && rowItems.length>0 && rowItems.map(r => <RowItemList key={r.id} rowItem={r} searchText={searchText} />)}
          {rowItems && rowItems.length<=0 && 
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
