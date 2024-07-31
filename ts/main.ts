/* global data */
const $imgPreview = document.querySelector('.img-to-add');
const originalSrc = '/images/placeholder-image-square.jpg';
const $titleInput = document.querySelector('#title') as HTMLInputElement;
const $imgInput = document.querySelector('#photo') as HTMLInputElement;
const $notesInput = document.querySelector('#notes') as HTMLTextAreaElement;
const $form = document.querySelector('form');
const $submitRow = document.querySelector('#submit-row');
const $deleteButton = document.querySelector('#delete-button');
const $ulForEntries = document.querySelector('#ul-for-entries');
const $noEntries = document.querySelector('.no-entries');
const $main = document.querySelector('main');
if (!$main) throw new Error('$main not found!');
const $entriesView = $main.querySelector('[data-view="entries"]');
const $FormView = $main.querySelector('[data-view="entry-form"]');
const allViews = [$entriesView, $FormView];
const $navBar = document.querySelector('.nav-bar');
const $newButton = document.querySelector('#new-button');
const $entryFormTitle = document.querySelector('#entry-form-title');

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

function previewPhotoByString(previewUrl: string): void {
  if (!$imgPreview) throw new Error('$imgPreview not found!');
  $imgPreview.setAttribute('src', previewUrl);
}

if (!$form) throw new Error('$form not found!');
$form.addEventListener('submit', submitHandler);

function submitHandler(event: Event): void {
  event.preventDefault();
  if (!$form) throw new Error('$form not found!');
  if (!$ulForEntries) throw new Error('$ulForEntries not found!');
  const elements = $form.elements as JournalEntryPieces;
  const newEntry: Entry = {
    title: elements.title.value,
    imgUrl: elements.photo.value,
    notes: elements.notes.value,
    entryId: data.nextEntryId,
  };
  if (data.editing === null) {
    data.entries.unshift(newEntry);
    data.nextEntryId++;
    const $liToAppend = renderEntry(newEntry);
    $ulForEntries.prepend($liToAppend);
  } else {
    newEntry.entryId = data.editing.entryId;
    const currentEntryId = data.editing.entryId;
    const indexOfEntriesToReplace = data.entries.findIndex(
      (v) => v.entryId === currentEntryId,
    );
    data.entries[indexOfEntriesToReplace] = newEntry;
    const $liToAppend = renderEntry(newEntry);
    const queryString = '[data-entry-id="' + String(currentEntryId) + '"]';
    const $liToReplace = $ulForEntries.querySelector(queryString);
    if (!$liToReplace) throw new Error('$liToReplace not found!');
    $liToReplace.replaceWith($liToAppend);
    if (!$entryFormTitle) throw new Error('$entryFormTitle not found!');
    $entryFormTitle.textContent = 'New Entry';
    data.editing = null;
    if (!$submitRow) throw new Error('$submitRow not found!');
    $submitRow.classList.remove('space-between');
    $submitRow.classList.add('right');
    if (!$deleteButton) throw new Error('$deleteButton not found!');
    $deleteButton.classList.add('hidden');
  }
  viewSwap('entries');
  storeData(); // This is after viewSwap because viewSwap changes data.view
  toggleNoEntries();
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
  eventTarget.classList.add('value-changed');
}

function resetBgs(): void {
  if (!$titleInput) throw new Error('$titleInput not found!');
  if (!$imgInput) throw new Error('$titleInput not found!');
  $titleInput.classList.remove('value-changed');
  $imgInput.classList.remove('value-changed');
}

function renderEntry(entry: Entry): HTMLElement {
  const $li = document.createElement('li');
  $li.dataset.entryId = String(entry.entryId);
  const $row1 = document.createElement('div');
  $row1.className = 'row';
  $li.appendChild($row1);
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.className = 'column-half';
  $row1.appendChild($columnHalf1);
  const $entryImg = document.createElement('img');
  $entryImg.className = 'entry-img bor-rad-6';
  $entryImg.setAttribute('src', entry.imgUrl);
  $columnHalf1.appendChild($entryImg);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.className = 'column-half';
  $row1.appendChild($columnHalf2);
  const $row2 = document.createElement('div');
  $row2.className = 'row space-between align-items-center';
  $columnHalf2.appendChild($row2);
  const $entryH2 = document.createElement('h2');
  $entryH2.textContent = entry.title;
  $row2.appendChild($entryH2);
  const $pencil = document.createElement('i');
  $pencil.className = 'fa-solid fa-pencil';
  $pencil.dataset.entryId = String(entry.entryId);
  $row2.appendChild($pencil);
  const $entryP = document.createElement('p');
  $entryP.textContent = entry.notes;
  $columnHalf2.appendChild($entryP);
  return $li;
}

document.addEventListener('DOMContentLoaded', generatePastEntries);

function generatePastEntries(): void {
  if (!$ulForEntries) throw new Error('$ulForEntries not found!');
  for (const entry of data.entries) {
    const $liToAppend = renderEntry(entry);
    $ulForEntries.appendChild($liToAppend);
  }
  toggleNoEntries();
  viewSwap(data.view);
}

function toggleNoEntries(): void {
  if (!$noEntries) throw new Error('$noEntries not found!');
  if (!$ulForEntries) throw new Error('$ulForEntries not found!');
  if (
    $ulForEntries.childNodes.length > 1 &&
    !$noEntries.classList.contains('hidden')
  )
    $noEntries.classList.toggle('hidden');
}

function viewSwap(newView: string): void {
  data.view = newView;
  for (const container of allViews) {
    if (!container) throw new Error('container (with a data-view) not found!');
    if (container.getAttribute('data-view') === newView) {
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
    }
  }
}

if (!$navBar) throw new Error('navBar not found!');
$navBar.addEventListener('click', handleNavBarClick);

function handleNavBarClick(event: Event): void {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.dataset.view) {
    viewSwap(eventTarget.dataset.view);
  }
}

if (!$newButton) throw new Error('$newButton not found!');
$newButton.addEventListener('click', () => viewSwap('entry-form'));

if (!$ulForEntries) throw new Error('$ulForEntries not found!');
$ulForEntries.addEventListener('click', HandleUlClick);

function HandleUlClick(event: Event): void {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.matches('.fa-pencil')) {
    const match = data.entries.find(
      (v) => v.entryId === Number(eventTarget.dataset.entryId),
    );
    if (!match) return;
    data.editing = match;
    const currentEntry = data.editing;
    if (!$titleInput) throw new Error('$titleInput not found!');
    $titleInput.value = currentEntry.title;
    if (!$imgInput) throw new Error('$imgInput not found!');
    $imgInput.value = currentEntry.imgUrl;
    previewPhotoByString($imgInput.value);
    if (!$notesInput) throw new Error('$notesInput not found!');
    $notesInput.value = currentEntry.notes;
    if (!$entryFormTitle) throw new Error('$entryFormTitle not found!');
    $entryFormTitle.textContent = 'Edit Entry';
    if (!$submitRow) throw new Error('$submitRow not found!');
    $submitRow.classList.remove('right');
    $submitRow.classList.add('space-between');
    if (!$deleteButton) throw new Error('$deleteButton not found!');
    $deleteButton.classList.remove('hidden');
    viewSwap('entry-form');
  }
}
