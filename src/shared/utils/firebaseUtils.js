export const extractDocs = response => response.docs;

export const extractFirstDoc = response => response.docs[0]?.data();

export const extractDataFromDoc = doc => doc.data();

export const getDocByIndex = index => docs => docs[index];
