'use strict';
/* global data */
const $imgPreview = document.querySelector('.img-to-add');
const originalSrc = '/images/placeholder-image-square.jpg';
const $titleInput = document.querySelector('#title');
const $imgInput = document.querySelector('#photo');
const $form = document.querySelector('form');
if (!$imgInput) throw new Error('$imgInput not found!');
$imgInput.addEventListener('input', previewPhoto);
function previewPhoto(event) {
  const eventTarget = event.target;
  if (!$imgPreview) throw new Error('$imgPreview not found!');
  $imgPreview.setAttribute('src', eventTarget.value);
}
if (!$form) throw new Error('$form not found!');
$form.addEventListener('submit', submitHandler);
function submitHandler(event) {
  event.preventDefault();
  if (!$form) throw new Error('$form not found!');
  const elements = $form.elements;
  const newEntry = {
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
function handleChange(event) {
  const eventTarget = event.target;
  if (!eventTarget) throw new Error('change event target not found!');
  eventTarget.setAttribute(
    'class',
    eventTarget.getAttribute('class') + ' value-changed',
  );
  console.log(eventTarget.getAttribute('class'));
}
function resetBgs() {
  if (!$titleInput) throw new Error('$titleInput not found!');
  if (!$imgInput) throw new Error('$titleInput not found!');
  $titleInput.classList.remove('value-changed');
  $imgInput.classList.remove('value-changed');
}
function renderEntry(entry) {
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
