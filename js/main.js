'use strict';
/* global data */
const $imgPreview = document.querySelector('.img-to-add');
const originalSrc = '/images/placeholder-image-square.jpg';
const $titleInput = document.querySelector('#title');
const $imgInput = document.querySelector('#photo');
const $form = document.querySelector('form');
const $ulForEntries = document.querySelector('#ul-for-entries');
const $noEntries = document.querySelector('.no-entries');
const $main = document.querySelector('main');
if (!$main) throw new Error('$main not found!');
const $entriesView = $main.querySelector('[data-view="entries"]');
const $FormView = $main.querySelector('[data-view="entry-form"]');
const allViews = [$entriesView, $FormView];
const $navBar = document.querySelector('.nav-bar');
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
  const $liToAppend = renderEntry(data.entries[0]);
  if (!$ulForEntries) throw new Error('$ulForEntries not found!');
  $ulForEntries.prepend($liToAppend);
  viewSwap('entries');
  storeData(); //Is after viewSwap because viewSwap changes data.view
  if (!$noEntries) throw new Error('$noEntries not found!');
  if (
    $ulForEntries.childNodes.length > 1 &&
    !$noEntries.classList.contains('hidden')
  ) {
    toggleNoEntries();
  }
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
}
function resetBgs() {
  if (!$titleInput) throw new Error('$titleInput not found!');
  if (!$imgInput) throw new Error('$titleInput not found!');
  $titleInput.classList.remove('value-changed');
  $imgInput.classList.remove('value-changed');
}
function renderEntry(entry) {
  const $li = document.createElement('li');
  const $row = document.createElement('div');
  $row.className = 'row';
  $li.appendChild($row);
  const $entryImg = document.createElement('img');
  $entryImg.className = 'entry-img';
  const $entryH2 = document.createElement('h2');
  const $entryP = document.createElement('p');
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
  return $li;
}
document.addEventListener('DOMContentLoaded', generatePastEntries);
function generatePastEntries() {
  if (!$ulForEntries) throw new Error('$ulForEntries not found!');
  for (const entry of data.entries) {
    const $liToAppend = renderEntry(entry);
    $ulForEntries.appendChild($liToAppend);
  }
  if (!$noEntries) throw new Error('$noEntries not found!');
  if (
    $ulForEntries.childNodes.length > 1 &&
    !$noEntries.classList.contains('hidden')
  )
    toggleNoEntries();
  viewSwap(data.view);
}
function toggleNoEntries() {
  if (!$noEntries) throw new Error('$noEntries not found!');
  $noEntries.classList.toggle('hidden');
}
function viewSwap(newView) {
  data.view = newView;
  for (const container of allViews) {
    if (!container) throw new Error('container not found!');
    if (container.getAttribute('data-view') === newView) {
      if (container.classList.contains('hidden')) {
        container.classList.toggle('hidden');
      }
    } else if (!container.classList.contains('hidden')) {
      container.classList.toggle('hidden');
    }
  }
}
if (!$navBar) throw new Error('navBar not found!');
$navBar.addEventListener('click', handleClick);
function handleClick(event) {
  const eventTarget = event.target;
  if (eventTarget.dataset.view) {
    console.log(eventTarget);
    console.log(typeof eventTarget.dataset.view);
    viewSwap(eventTarget.dataset.view);
  }
}
