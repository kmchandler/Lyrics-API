/* eslint-disable no-unused-expressions */
// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

// API CALL
const getLyrics = (artist, song) => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// UI PRESENTATION (HTML ON THE DOM)
// const lyricsOnDom = (artist, song) => {
//   getLyrics(artist, song).then((response) => {
//     document.querySelector('#lyricsDiv').innerHTML = response.lyrics;
//   });
// };

const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

const eventListeners = () => {
  const artistValue = document.querySelector('#artistInput').value;
  const songValue = document.querySelector('#songInput').value;
  document.querySelector('#lyricForm').addEventListener('submit', (e) => {
    e.preventDefault();
    getLyrics(artistValue, songValue).then((response) => {
      renderToDom('#lyricsDiv', response.lyrics);
    });
  });
};

const form = `
  <form id='lyricForm' type='submit'>
    <div class='mb-3'>
      <label for='artistInput' class='form-label'>Artist Name</label>
      <input type='text' class='form-control' id='artistInput' placeholder='Artist / Band Name'>
      <label for='songInput' class='form-label'>Song Title</label>
      <input type='text' class='form-control' id='songInput' placeholder='Title'>
    </div>
    <button id='submitButton' type='submit' class='btn btn-primary'>Submit</button>
  </form>`;

const startApp = () => {
  renderToDom('#filterInput', form);
  eventListeners();
};

startApp();
