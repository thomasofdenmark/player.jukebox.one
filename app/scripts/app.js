/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  app.addTrackToQueue = function(track) {
    // Add score and vote system to track
    track.score = 1000;
    track.voteup = 0;
    track.votedown = 0;
    // Insert track to jukebox queue on firebase
    Polymer.dom(document).querySelector('#jukeboxQueue').add(track);
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  document.addEventListener('jukebox-created', function(e) {
    console.log('jukebox-created: ', e.detail);
    window.open('http://player.jukebox.one/'+e.detail);
    window.open('http://dj.jukebox.one/'+e.detail);
  });

  window.addEventListener('youtube-lookup-track-selected', function(e) {
    console.log('youtube-lookup-track-selected', e.detail);
    app.addTrackToQueue(e.detail);
    // if first track added then send it to the player
    if(Polymer.dom(document).querySelector('#youtubePlayer')) {
      Polymer.dom(document).querySelector('#youtubePlayer').videoId = e.detail.id.videoId;
    }
  });


  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    // app.params.jukeboxid is set in routing.html
    app.jukeboxRootPath = 'https://deejay.firebaseio.com/jukeboxes/'+app.params.jukeboxid;
    app.jukeboxQueuePath = 'https://deejay.firebaseio.com/jukeboxes/'+app.params.jukeboxid+'/queue';
    app.youtubeApiKey = 'AIzaSyC5W5GMXFVJ-QUMATDg5pkVEU3updcep1s';
  });

})(document);
