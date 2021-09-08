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
  // your code here
}

function addSong(title, album, artist, duration, id) {
  // your code here
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
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
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
  return "Wrong ID";
}

function getPlaylistLocationByID (id) {
  for (let i = 0; i < player.playlists.length ; i++){
    if (player.playlists[i].id === id){
      return i;
    }
  }
  return undefined;
}

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
