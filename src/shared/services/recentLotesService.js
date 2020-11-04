import AsyncStorage from '@react-native-community/async-storage';

export async function addLoteToStorage(session, lote) {
  return transformRecent(arrayOfLotes => {
    const arrayWithoutLote = arrayOfLotes.filter(
      prev => prev.lote.id !== lote.ref.id,
    );
    lote.date = lote.creationDate.toDate();
    arrayWithoutLote.push({
      session: {id: session.docRef.id},
      lote: {id: lote.ref.id},
    });
    arrayWithoutLote.map(console.log);
    return arrayWithoutLote.slice(-10);
  });
}

export async function removeLoteFromArray(id) {
  return transformRecent(arrayOfLotes =>
    arrayOfLotes.filter(prev => prev.lote.id !== id),
  );
}

export async function removeSetOfLotes(ids) {
  return transformRecent(arrayRecents => {
    const recentsWithOutLote = arrayRecents.filter(
      item => ids.findIndex(id => id == item.lote.id) < 0,
    );
    return recentsWithOutLote;
  });
}
export async function transformRecent(fn) {
  return AsyncStorage.getItem('recentLotes').then(recent => {
    const arrayRecents = JSON.parse(recent) || [];
    const transformedArray = fn(arrayRecents);
    AsyncStorage.setItem('recentLotes', JSON.stringify(transformedArray));
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
