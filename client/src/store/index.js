import { createContext, useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    SET_LIST_PLAYING: "SET_LIST_PLAYING",
    PUBLISH: "PUBLISH",
    UNPUBLISH: "UNPUBLISH",
    DUPLICATE: "DUPLICATE",
    CHANGE_DISPLAY: "CHANGE_DISPLAY",
    SET_SEARCH_TEXT: "SET_SEARCH_TEXT",
    SET_SORT_TYPE: "SET_SORT_TYPE",
    DISPLAY_AND_SEARCH: "DISPLAY_AND_SEARCH"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
// const tps = new jsTPS();

const CurrentModal = {
    NONE: "NONE",
    DELETE_LIST: "DELETE_LIST",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    PUBLISH_LIST: "PUBLISH_LIST",
    UNPUBLISH_LIST: "UNPUBLISH_LIST",
    DUPLICATE_LIST: "DUPLICATE_LIST"
}

const ScreenType = {
    HOME: "HOME",
    ALLLISTS: "ALLLISTS",
    USERS: "USERS"
}

const SortType = {
    NAME: "NAME",
    DATE: "DATE",
    LISTENS: "LISTENS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const { auth } = useContext(AuthContext);

    const [store, setStore] = useState({
        currentModal: CurrentModal.NONE,
        screenType: ScreenType.HOME,
        idNamePairs: [],
        currentList: null,
        currentSongIndex: -1,
        currentSong: null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        transactionList: {},
        listCurrentlyPlaying: null,
        searchText: null,
        sortType: SortType.NAME
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE

    // useEffect(() => {
    //     if (auth && !auth.notGuest) {
    //         setStore({...store, screenType: ScreenType.ALLLISTS})
    //     } 
    // }, [])

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: [],
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: {},
                    listCurrentlyPlaying: null,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                let newTransactionsList = store.transactionList
                newTransactionsList[payload._id] = new jsTPS()
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: newTransactionsList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal: CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }

            case GlobalStoreActionType.SET_LIST_PLAYING: {
                // console.log(payload)
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: payload,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }

            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal: CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal: CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }
            case GlobalStoreActionType.PUBLISH: {
                return setStore({
                    currentModal: CurrentModal.PUBLISH_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    transactionList: store.transactionList,
                    listCurrentlyPlaying: store.listCurrentlyPlaying,
                    screenType: store.screenType,
                    searchText: store.searchText,
                    sortType: store.sortType
                });
            }

            case GlobalStoreActionType.UNPUBLISH: {
                return setStore({ ...store, currentList: payload, currentModal: CurrentModal.UNPUBLISH_LIST })
            }

            case GlobalStoreActionType.CHANGE_DISPLAY: {
                return setStore({ ...store, screenType: payload })
            }

            case GlobalStoreActionType.SET_SEARCH_TEXT: {
                return setStore({ ...store, searchText: payload })
            }

            case GlobalStoreActionType.SET_SORT_TYPE: {
                return setStore({ ...store, sortType: payload })
            }

            case GlobalStoreActionType.DISPLAY_AND_SEARCH: {
                return setStore({ ...store, screenType: payload.screen, searchText: payload.text })
            }

            case GlobalStoreActionType.DUPLICATE: {
                // let newTransactionsList = store.transactionList
                // newTransactionsList[payload._id] = new jsTPS()
                return setStore({ ...store, currentList: payload, currentModal: CurrentModal.DUPLICATE_LIST })
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                store.loadIdNamePairs()
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        if (auth.notGuest) {
            asyncChangeListName(id);
        }
    }

    store.closeCurrentList = function () {
        // storeReducer({
        //     type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
        //     payload: {}
        // });
        history.push("/");
    }

    store.publishPlaylist = function () {
        const data = new Date()
        const str = data.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
        const list = { ...store.currentList, publishInfo: { isPublished: true, publishDate: { dateString: str, dateData: data }, publisher: auth.user.username } }
        store.updateCurrentList(list)

    }

    store.duplicatePlaylist = function () {
        const asyncDuplicate = async () => {
            const { name, songs } = store.currentList
            console.log(songs)
            let publishInfo = { isPublished: false, publishDate: null, publisher: auth.user.username }
            const response = await api.createPlaylist(store.checkDuplicateName(name), songs, auth.user.email, 0, 0, 0, publishInfo, [], [], [])
            if (response.status === 201) {
                // tps.clearAllTransactions();
                let newList = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                }
                );
                store.loadIdNamePairs()
            }
        }
        asyncDuplicate()
    }

    store.unpublishPlaylist = function () {
        let publishInfo = { isPublished: false, publishDate: null, publisher: auth.user.username }
        const list = { ...store.currentList, likes: 0, dislikes: 0, listens: 0, likedUsers: [], dislikedUsers: [], publishInfo: publishInfo }
        store.updateCurrentList(list)
    }

    store.likePlaylist = function (playlist) {
        const dislikeActive = playlist.dislikedUsers.includes(auth.user.username)
        const likeActive = playlist.likedUsers.includes(auth.user.username)
        if (dislikeActive) {
            playlist.dislikedUsers.splice(playlist.dislikedUsers.indexOf(auth.user.username), 1)
            playlist.dislikes -= 1
            playlist.likedUsers.push(auth.user.username)
            playlist.likes += 1
        }

        else if (likeActive) {
            playlist.likedUsers.splice(playlist.likedUsers.indexOf(auth.user.username), 1)
            playlist.likes -= 1
        } else {
            playlist.likedUsers.push(auth.user.username)
            playlist.likes += 1
        }
        store.updateCurrentList(playlist)

    }

    store.listenPlaylist = function (playlist) {
        const temp = async (playlist) => {
            if (playlist.publishInfo.isPublished && (store.listCurrentlyPlaying === null || playlist._id !== store.listCurrentlyPlaying._id)) {
                playlist.listens += 1
            }
            let response = await api.updatePlaylistById(playlist._id, playlist)
            if (response.data.success) {
                store.setListPlaying(playlist)
            }
        }
        temp(playlist)
    }

    store.dislikePlaylist = function (playlist) {
        const dislikeActive = playlist.dislikedUsers.includes(auth.user.username)
        const likeActive = playlist.likedUsers.includes(auth.user.username)
        if (likeActive) {
            playlist.likedUsers.splice(playlist.likedUsers.indexOf(auth.user.username), 1)
            playlist.likes -= 1
            playlist.dislikedUsers.push(auth.user.username)
            playlist.dislikes += 1
        }

        else if (dislikeActive) {
            playlist.dislikedUsers.splice(playlist.dislikedUsers.indexOf(auth.user.username), 1)
            playlist.dislikes -= 1
        }

        else {
            playlist.dislikedUsers.push(auth.user.username)
            playlist.dislikes += 1
        }

        store.updateCurrentList(playlist)

    }


    store.getTPS = async () => {
        if (auth.notGuest) {
            let response = await api.getPlaylistPairs()
            if (response.data.success) {
                let playlists = response.data.playlists
                let obj = {}
                playlists.forEach(({ _id }) => {
                    obj[_id] = new jsTPS()
                })
                setStore({ ...store, screenType: ScreenType.HOME, idNamePairs: playlists, transactionList: obj })
            }
        } else {
            setStore({ ...store, screenType: ScreenType.ALLLISTS })
        }
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = store.checkDuplicateName("Untitled");
        console.log(auth.user.username)
        let publishInfo = { isPublished: false, publishDate: null, publisher: auth.user.username }
        const response = await api.createPlaylist(newListName, [], auth.user.email, 0, 0, 0, publishInfo, [], [], []);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            // tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // history.push("/playlist/" + newList._id);
            store.loadIdNamePairs()
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.displayAndSearch = function (screen, text) {
        storeReducer({
            type: GlobalStoreActionType.DISPLAY_AND_SEARCH,
            payload: { screen: screen, text: text }
        })
    }

    store.displayHome = function () {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_DISPLAY,
            payload: ScreenType.HOME
        })
    }

    store.displayAllLists = function () {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_DISPLAY,
            payload: ScreenType.ALLLISTS
        })
    }

    store.displayUsers = function () {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_DISPLAY,
            payload: ScreenType.USERS
        })
    }

    store.setSearchText = function (text) {
        storeReducer({
            type: GlobalStoreActionType.SET_SEARCH_TEXT,
            payload: text
        })
    }

    store.setSortType = function (type) {
        storeReducer({
            type: GlobalStoreActionType.SET_SORT_TYPE,
            payload: type
        })
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.playlists;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        if (auth.notGuest) {
            asyncLoadIdNamePairs();
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: { id: id, playlist: playlist }
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            console.log(response.data)
            if (response.data.success) {
                store.loadIdNamePairs();
            }
        }
        processDelete(id);
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }

    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (playlist, songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: { currentList: playlist, currentSongIndex: songIndex, currentSong: songToEdit }
        });
    }
    store.showRemoveSongModal = (playlist, songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: { currentList: playlist, currentSongIndex: songIndex, currentSong: songToRemove }
        });
    }

    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });
    }

    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    store.isPublishListModalOpen = () => {
        return store.currentModal === CurrentModal.PUBLISH_LIST
    }

    store.isUnpublishListModalOpen = () => {
        return store.currentModal === CurrentModal.UNPUBLISH_LIST
    }

    store.isDuplicateListModalOpen = () => {
        return store.currentModal === CurrentModal.DUPLICATE_LIST
    }

    store.sortByName = () => {
        return store.sortType === SortType.NAME
    }

    store.sortByDate = () => {
        return store.sortType === SortType.DATE
    }

    store.sortByListens = () => {
        return store.sortType === SortType.LISTENS
    }

    store.sortByLikes = () => {
        return store.sortType === SortType.LIKES
    }

    store.sortByDislikes = () => {
        return store.sortType === SortType.DISLIKES
    }

    store.isHome = () => {
        return store.screenType === ScreenType.HOME
    }

    store.isAllLists = () => {
        return store.screenType === ScreenType.ALLLISTS
    }

    store.isUsers = () => {
        return store.screenType === ScreenType.USERS
    }


    store.checkDuplicateName = (newName) => {

        const nameList = store.idNamePairs.map(playlist => playlist.name)
        if (!nameList.includes(newName)) {
            return newName
        }
        const tempList = []
        const match = newName.match(/(.*)(\s\((\d)\))$/)
        let tempName = match ? match[1] : newName
        console.log(tempName)
        nameList.forEach(name => {
            let temp = name.match(/(.*)(\s\((\d)\))$/)
            console.log(temp)
            if (temp && temp[1] === tempName) {
                tempList.push(parseInt(temp[3]))
            }
        })
        console.log(tempList)
        return tempList.length !== 0 ? `${tempName}(${Math.max(...tempList) + 1})` : tempName + "(1)"
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = (playlist) => {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: playlist
        });
    }

    store.openPublishModal = (playlist) => {
        storeReducer({
            type: GlobalStoreActionType.PUBLISH,
            payload: playlist
        })
    }

    store.openUnpublishModal = (playlist) => {
        storeReducer({
            type: GlobalStoreActionType.UNPUBLISH,
            payload: playlist
        })
    }

    store.openDuplicateModal = (playlist) => {
        storeReducer({
            type: GlobalStoreActionType.DUPLICATE,
            payload: playlist
        })
    }

    store.setListPlaying = (playlist) => {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_PLAYING,
            payload: playlist
        });
    }

    store.getCurrentList = async (id) => {
        let response = await api.getPlaylistById(id)
        if (response.data.success) {
            return response.data.playlist
        }
    }

    store.getAllLists = async () => {
        let response = await api.getPlaylists()
        if (response.data.success) {
            return response.data.playlists
        } else {
            return []
        }
    }

    store.getPlaylistSize = function () {
        return store.currentList.songs.length;
    }

    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function (playlist, index, song) {
        playlist.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        const temp = async () => {
            let response = await api.updatePlaylistById(playlist._id, playlist)
            if (response.data.success && playlist._id === store.listCurrentlyPlaying?._id) {
                store.setListPlaying(playlist)
            }
            store.loadIdNamePairs()
        }
        temp()
        // store.updateCurrentList(playlist);
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function (playlist, start, end) {
        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = playlist.songs[start];
            for (let i = start; i < end; i++) {
                playlist.songs[i] = playlist.songs[i + 1];
            }
            playlist.songs[end] = temp;
        }
        else if (start > end) {
            let temp = playlist.songs[start];
            for (let i = start; i > end; i--) {
                playlist.songs[i] = playlist.songs[i - 1];
            }
            playlist.songs[end] = temp;
        }
        // NOW MAKE IT OFFICIAL
        const temp = async () => {
            let response = await api.updatePlaylistById(playlist._id, playlist)
            if (response.data.success && playlist._id === store.listCurrentlyPlaying?._id) {
                store.setListPlaying(playlist)
            }
            store.loadIdNamePairs()
        }
        temp()

    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function (playlist, index) {
        playlist.songs.splice(index, 1);
        // NOW MAKE IT OFFICIAL
        const temp = async () => {
            let response = await api.updatePlaylistById(playlist._id, playlist)
            if (response.data.success && playlist._id === store.listCurrentlyPlaying?._id) {
                store.setListPlaying(playlist)
            }
            store.loadIdNamePairs()
        }
        temp()
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function (playlist, index, songData) {
        let song = playlist.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        const temp = async () => {
            let response = await api.updatePlaylistById(playlist._id, playlist)
            if (response.data.success && playlist._id === store.listCurrentlyPlaying?._id) {
                store.setListPlaying(playlist)
            }
            store.loadIdNamePairs()
        }
        temp()
    }
    store.addNewSong = (playlist) => {
        store.addCreateSongTransaction(playlist,
            playlist.songs.length, "Untitled", "?", "dQw4w9WgXcQ");
    }

    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (playlist, index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, playlist, index, song);
        store.transactionList[playlist._id].addTransaction(transaction);
    }
    store.addMoveSongTransaction = function (playlist, start, end) {
        let transaction = new MoveSong_Transaction(store, playlist, start, end);
        store.transactionList[playlist._id].addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let playlist = store.currentList
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, playlist, index, song);
        store.transactionList[playlist._id].addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let playlist = store.currentList
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, playlist, index, oldSongData, newSongData);
        store.transactionList[playlist._id].addTransaction(transaction);
    }
    store.updateCurrentList = function (list) {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(list._id, list);
            if (response.data.success) {
                console.log("playlist updated")
                store.loadIdNamePairs()
            }
        }
        asyncUpdateCurrentList();
    }

    store.addCommentToPlaylist = function (comment) {
        store.listCurrentlyPlaying.comments.push({ commenter: auth.user.username, comment: comment })
        async function asyncAddComment() {
            const response = await api.updatePlaylistById(store.listCurrentlyPlaying._id, store.listCurrentlyPlaying)
            if (response.data.success) {
                store.loadIdNamePairs()
            }
        }
        asyncAddComment()
    }

    store.clear = function (playlist) {
        store.transactionList[playlist._id].clearAllTransactions()
    }

    store.undo = function (playlist) {
        store.transactionList[playlist._id].undoTransaction();
    }
    store.redo = function (playlist) {
        store.transactionList[playlist._id].doTransaction();
    }
    store.canAddNewSong = function () {
        return (store.currentList !== null);
    }
    store.canUndo = function (playlist) {
        return store.transactionList[playlist._id].hasTransactionToUndo();
    }
    store.canRedo = function (playlist) {
        return store.transactionList[playlist._id].hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.getCurrentList = async (id) => {
        let response = await api.getPlaylistById(id)
        if (response.data.success) {
            return response.data.playlist
        }
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };