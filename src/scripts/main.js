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

const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

const eventListeners = () => {
  document.querySelector('#lyricForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const artistValue = document.querySelector('#artistInput').value;
    const songValue = document.querySelector('#songInput').value;
    const notFound = 'Song not found';
    getLyrics(artistValue, songValue).then((response) => {
      if (response.lyrics) {
        renderToDom('#lyricsDiv', response.lyrics);
        // not working at the moment
      } else if (!response.lyrics) {
        renderToDom('#lyricsDiv', notFound);
      }
    });
  });
};

const form = `
  <form id='lyricForm' type='submit'>
    <div class='mb-3'>
      <p></p>
      <input type='text' class='form-control' id='artistInput' placeholder='Artist / Band Name'>
      <p></p>
      <input type='text' class='form-control' id='songInput' placeholder='Title'>
    </div>
    <p></p>
    <button id='submitButton' type='submit' class='btn btn-primary'>SEARCH</button>
  </form>`;

const startApp = () => {
  renderToDom('#filterInput', form);
  eventListeners();
};

startApp();
