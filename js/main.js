'use strict';
/* global */
const $imgPreview = document.querySelector('.img-to-add');
const $imgInput = document.querySelector('#photo');
if (!$imgInput) throw new Error('$imgInput not found!');
$imgInput.addEventListener('input', previewPhoto);
function previewPhoto(event) {
  const eventTarget = event.target;
  if (!$imgPreview) throw new Error('$imgPreview not found!');
  $imgPreview.setAttribute('src', eventTarget.value);
}
