/* global data */
const $imgPreview = document.querySelector('.img-to-add');
const originalSrc = '/images/placeholder-image-square.jpg';
const $imgInput = document.querySelector('#photo');
const $form = document.querySelector('form');

interface Entry {
  title: string;
  imgUrl: string;
  notes: string;
  entryId: number;
}

interface JournalEntryPieces extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

if (!$imgInput) throw new Error('$imgInput not found!');
$imgInput.addEventListener('input', previewPhoto);

function previewPhoto(event: Event): void {
  const eventTarget = event.target as HTMLInputElement;
  if (!$imgPreview) throw new Error('$imgPreview not found!');
  $imgPreview.setAttribute('src', eventTarget.value);
}

if (!$form) throw new Error('$form not found!');
$form.addEventListener('submit', submitHandler);

function submitHandler(event: Event): void {
  event.preventDefault();
  if (!$form) throw new Error('$form not found!');
  const elements = $form.elements as JournalEntryPieces;
  const newEntry: Entry = {
    title: elements.title.value,
    imgUrl: elements.photo.value,
    notes: elements.notes.value,
    entryId: data.nextEntryId,
  };
  data.entries.unshift(newEntry);
  data.nextEntryId++;
  storeData();
  if (!$imgPreview) throw new Error('$imgPreview not found!');
  $imgPreview.setAttribute('src', originalSrc);
  $form.reset();
}
