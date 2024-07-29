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
