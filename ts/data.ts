/* exported data */
/* eslint-disable @typescript-eslint/no-unused-vars */

interface Data {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function storeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}

function retrieveData(): Data {
  const retrievedString = localStorage.getItem('data');
  if (!retrievedString)
    return {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
  const retrievedData = JSON.parse(retrievedString);
  return retrievedData;
}
