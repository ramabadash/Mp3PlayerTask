const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${durationToMMSS(song.duration)}.`);
  },
}
/*START MAIN FUNCTIONS*/

function playSong(id) {
  for (let song of player.songs){
    if (song.id === id)
    {
      return player.playSong(song);
    }
  }
  throw new Error("Error - Wrong ID");
}

function removeSong(id) {
  //remove from songs
  let songIndex = getSongLocationByID(id);
  if (songIndex === undefined){
    throw new Error("Error - Wrong ID");
  }
  player.songs.splice(songIndex ,1);
  //remove from playlists
  for (let i = 0; i < player.playlists.length; i++){
    if (player.playlists[i].songs.includes(id)){
      removeSongFromPlaylist(id , i);
    }
  }
}
  
function addSong(title, album, artist, duration, id) {
  let newID = findAvailableID ("songs" , id);
  if (newID === undefined){
    throw  new Error("Error - Wrong ID");
  }
  let durationInSeconds = durationFromMMSS(duration) ; 
  let newSong = {"id" :newID, title, album, artist, "duration" : durationInSeconds};
  player.songs.push(newSong);
  return newID;
}

function removePlaylist(id) {
  let playlistLocation = getPlaylistLocationByID(id);
  if (playlistLocation === undefined){
    throw new Error("Error - Wrong ID");
  } else {
    player.playlists.splice(playlistLocation, 1);
  } 
}

function createPlaylist(name, id) {
  id = findAvailableID("playlists", id) ; 
  if (id === undefined){
    throw new Error("Error - Reserved ID");
  }
  player.playlists.push({"id": id, "name": name, "songs": []})
  return id;
}

function playPlaylist(id) { 
  let playlistLocation = getPlaylistLocationByID(id);
  if (id === undefined || playlistLocation === undefined){
    throw new Error("Error - Can't find playlist");
  }
  let playlistSongsArray = player.playlists[playlistLocation].songs;
  for (let song of playlistSongsArray){
    playSong(song);
  }
}

function editPlaylist(playlistId, songId) {
  let playlistLocation = getPlaylistLocationByID(playlistId);
  let correctID = findAvailableID ("songs" , songId);
  //  Did not receive input    || There isn'n playlist matches   || The song exists - did not need another id  
  if (playlistId === undefined || playlistLocation === undefined || songId === correctID){
    throw new Error("Error - Can't find playlist / song");
  }
  let playlistSongsArray = player.playlists[playlistLocation].songs;
  if (playlistSongsArray.includes(songId)){
    for (let i = 0; i < playlistSongsArray.length; i++){
      if (songId === playlistSongsArray[i]){
        playlistSongsArray.splice(i, 1);
      }
    }
  } else {
    playlistSongsArray.push(songId);
  }
  if (playlistSongsArray.length === 0){
    player.playlists.splice(playlistLocation, 1);
  }
}

function playlistDuration(id) {
  let playlistLocation = getPlaylistLocationByID(id);
  if (playlistLocation === undefined){
    return new Error ("Error - Can't find playlist");
  }
  let playlistSongsArray = player.playlists[playlistLocation].songs;
  let totalDuration = 0;
  for (let songID of playlistSongsArray){
    let song = getSongByID(songID)
    totalDuration += song.duration;
  }
  return totalDuration;
}

function searchByQuery(query) {
  const result = {"songs": [] , "playlists": []};
  // search in songs
  for (let song of player.songs){
    if (SearchSongByQuery (query , song)){
      result.songs.push(song);
    }
  }
  //search in playlists
  for (let playlist of player.playlists){
    if (SearchPlaylistByQuery (query, playlist)) {
      result.playlists.push(playlist);
    }
  }
  //the sort - song by title , playlist by name
  result.songs.sort((song1 , song2) => { return song1.title > song2.title ? 1 : -1});
  result.playlists.sort((playlist1 , playlist2) => { return playlist1.name > playlist2.name ? 1 : -1});
  return result;
}

function searchByDuration(duration) {
  // your code here
}

/*END MAIN FUNCTIONS*/

/* START ASSIST FUNCTIONS */
function durationFromMMSS(duration) {
  const splitDuration = duration.split(":");
  let durationMinutes = splitDuration[0]; 
  let durationSeconds = splitDuration[1];
  return durationMinutes*60 + durationSeconds*1;
}

function durationToMMSS (duration){
  let durationMinutes = Math.floor(duration/60);
  let durationSeconds = duration % 60;
  if (durationMinutes < 10){
    durationMinutes =  "0" + durationMinutes;
  }
  if (durationSeconds < 10){
    durationSeconds = "0" + durationSeconds;
  }
  return durationMinutes+":" +durationSeconds;
}

function getSongByID (id) {
  for (let song of player.songs){
    if (song.id === id){
      return song;
    }
  }
  return undefined;
}
// return the playlist index of the playlist with the id in the player.playlists array
function getPlaylistLocationByID (id) {
  for (let i = 0; i < player.playlists.length ; i++){
    if (player.playlists[i].id === id){
      return i;
    }
  }
  return undefined;
}

// return the song index of the song with the id in the player.songs array
function getSongLocationByID (id) {
  for (let i = 0; i < player.songs.length ; i++){
    if (player.songs[i].id === id){
      return i;
    }
  }
  return undefined;
}

// create an array of the reserved ID's sort him and return the array
function reservedID (key){
  const arrayOfID = [];
  for (let obj of player[key]){
    arrayOfID.push(obj["id"]);
  }
  arrayOfID.sort((a,b)=>a-b);
  return arrayOfID;
}

function findAvailableID (key , id) {
  const arrayOfID = reservedID(key);
  if (id === undefined){
    for (let i = 0 ; i < arrayOfID.length; i++){
      if (i+1 !== arrayOfID[i]){ //uses i+1 for ID bigger then 0.
        return i+1;
      }
    }
  } else {
    for (let value of arrayOfID){
      if (value === id){
        return undefined;
      }
    }
    return id;
  } 
}

function removeSongFromPlaylist(songId , index){
  const songsArray = player.playlists[index].songs;
  for (let j = 0; j < songsArray.length; j++){
    if (songsArray[j] === songId){
      songsArray.splice(j, 1);
    }
  } 
}

function SearchSongByQuery (query , song){
  query = query.toLowerCase();
  let lowercaseTitle = song.title.toLowerCase();
  let lowercaseAlbum = song.album.toLowerCase();
  let lowercaseArtist = song.artist.toLowerCase();
  return (lowercaseTitle.includes(query) || lowercaseArtist.includes(query) || lowercaseArtist.includes(query) );
}

function SearchPlaylistByQuery (query , playlist){
  query = query.toLowerCase();
  let lowercaseName = playlist.name.toLowerCase();
  return lowercaseName.includes(query);
}


/* END ASSIST FUNCTIONS */
module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
