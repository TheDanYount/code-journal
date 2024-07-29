'use strict';
/* global data*/
const $imgPreview = document.querySelector('.img-to-add');
const originalSrc = '/images/placeholder-image-square.jpg';
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
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  if (!$imgPreview) throw new Error('$imgPreview not found!');
  $imgPreview.setAttribute('src', originalSrc);
  $form.reset();
}
