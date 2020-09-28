//@ts-check
import React, {useState, useEffect, useCallback} from 'react';
import {withFirebase, GridWithNewButton} from '../../../shared';

function LotesDetail({
  loteId,
  firebaseService: firebase,
  alertService: alerts,
  navigation,
}) {
  const [pasturas, setPasturas] = useState([]);

  const mock = useCallback(() => {}, loteId);

  useEffect(() => {
    firebase.getPasturasFromLote(loteId).then(setPasturas);
  });
  return (
    <>
      <GridWithNewButton
        title="Pasturas"
        data={pasturas}
        onDeleteEntry={mock}
        onNewClick={mock}
        onEntryClick={mock}
      />
    </>
  );
}

export default withFirebase(LotesDetail);
