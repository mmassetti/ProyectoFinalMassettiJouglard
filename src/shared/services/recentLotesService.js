import AsyncStorage from '@react-native-community/async-storage';

async function addLoteToStorage(session, lote) {
  return transformRecent(arrayOfLotes => {
    const arrayWithoutLote = arrayOfLotes.filter(
      prev => prev.lote.id !== lote.id,
    );
    lote.date = lote.creationDate.toDate();
    arrayWithoutLote.push({
      session: {data: session.data, id: session.docRef.id},
      lote,
    });
    return arrayWithoutLote.slice(-10);
  });
}

async function removeLoteFromArray(id) {
  return transformRecent(arrayOfLotes =>
    arrayOfLotes.filter(prev => prev.lote.id !== id),
  );
}

async function removeSetOfLotes(ids) {
  return transformRecent(arrayRecents => {
    const recentsWithOutLote = arrayRecents.filter(
      item => ids.findIndex(id => id == item.lote.id) < 0,
    );
    return recentsWithOutLote;
  });
}
async function transformRecent(fn) {
  return AsyncStorage.getItem('recentLotes').then(recent => {
    const arrayRecents = JSON.parse(recent) || [];
    AsyncStorage.setItem('recentLotes', JSON.stringify(fn(arrayRecents)));
  });
}
async function recentsLotes() {
  return AsyncStorage.getItem('recentLotes').then(recent => {
    return JSON.parse(recent);
  });
}

export const useRecentLotes = () => {
  return [
    recentsLotes,
    removeLoteFromArray,
    removeSetOfLotes,
    addLoteToStorage,
  ];
};
