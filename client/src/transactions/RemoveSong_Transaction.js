import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that deletes a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, playlist, initIndex, initSong) {
        super();
        this.store = initStore;
        this.playlist = playlist
        this.index = initIndex;
        this.song = initSong;
    }

    doTransaction() {
        this.store.removeSong(this.playlist, this.index);
    }
    
    undoTransaction() {
        this.store.createSong(this.playlist, this.index, this.song);
    }
}