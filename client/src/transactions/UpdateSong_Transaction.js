import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * UpdateSong_Transaction
 * 
 * This class represents a transaction that updates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class UpdateSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, playlist, initIndex, initOldSongData, initNewSongData) {
        super();
        this.store = initStore;
        this.playlist = playlist
        this.index = initIndex;
        this.oldSongData = initOldSongData;
        this.newSongData = initNewSongData;
    }

    doTransaction() {
        this.store.updateSong(this.playlist, this.index, this.newSongData);
    }
    
    undoTransaction() {
        this.store.updateSong(this.playlist, this.index, this.oldSongData);
    }
}