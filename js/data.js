'use strict';
/* exported data */
/* eslint-disable @typescript-eslint/no-unused-vars */
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function storeData() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}
function retrieveData() {
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
data = retrieveData();
