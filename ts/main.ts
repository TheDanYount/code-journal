/* global data */
const $imgPreview = document.querySelector('.img-to-add');
const originalSrc = '/images/placeholder-image-square.jpg';
const $titleInput = document.querySelector('#title');
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
  resetBgs();
}

if (!$titleInput) throw new Error('$titleInput not found!');
$titleInput.addEventListener('input', handleChange);
$imgInput.addEventListener('input', handleChange);

function handleChange(event: Event): void {
  const eventTarget = event.target as HTMLElement;
  if (!eventTarget) throw new Error('change event target not found!');
  eventTarget.setAttribute(
    'class',
    eventTarget.getAttribute('class') + ' value-changed',
  );
  console.log(eventTarget.getAttribute('class'));
}

function resetBgs(): void {
  if (!$titleInput) throw new Error('$titleInput not found!');
  if (!$imgInput) throw new Error('$titleInput not found!');
  $titleInput.classList.remove('value-changed');
  $imgInput.classList.remove('value-changed');
}

function renderEntry(entry: Entry): HTMLElement {
  const $entryImg = document.createElement('img');
  $entryImg.className = 'entry-img';
  const $entryH2 = document.createElement('h2');
  const $entryP = document.createElement('p');
  const $row = document.createElement('div');
  $row.className = 'row';
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.className = 'column-half';
  $row.appendChild($columnHalf1);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.className = 'column-half';
  $row.appendChild($columnHalf2);
  $entryImg.setAttribute('src', entry.imgUrl);
  $columnHalf1.appendChild($entryImg);
  $entryH2.textContent = entry.title;
  $columnHalf2.appendChild($entryH2);
  $entryP.textContent = entry.notes;
  $columnHalf2.appendChild($entryP);
  return $row;
}

renderEntry(data.entries[2]);
