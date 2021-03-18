import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    baseUrls: {
      imgUrl: "https://img.pauperbattlebox.com/images/"
    },
    decks: {},
    currentDeck: {},
    currentDecklist: {},
    deckMetas: {},
    currentDeckMetas: {}
  },
  mutations: {
    SET_DECKS(state, decks) {
      state.decks = decks;
    },
    SET_CURRENT_DECK(state, deck) {
      state.currentDeck = deck;
    },
    SET_CURRENT_DECKLIST(state, deck) {
      state.currentDecklist = deck;
    },
    SET_DECK_METAS(state, deckMetas) {
      state.deckMetas = deckMetas;
    },
    SET_CURRENT_DECK_METAS(state, meta) {
      state.currentDeckMetas = meta;
    }
  },
  actions: {
    getAllDecks({ commit }) {
      axios.get("http://127.0.0.1:5000/listofdecks").then(response => {
        commit("SET_DECKS", response.data);
      });
    },
    getCurrentDeck({ commit }, deckID) {
      axios.get("http://127.0.0.1:5000/decks/" + deckID).then(response => {
        commit("SET_CURRENT_DECK", response.data);
      });
    },
    getCurrentDecklist({ commit }, deckID) {
      axios
        .get("http://127.0.0.1:5000/decks/decklist/" + deckID)
        .then(response => {
          commit("SET_CURRENT_DECKLIST", response.data);
        });
    },
    getAllDeckMetas({ commit }) {
      axios.get("http://127.0.0.1:5000/decks/meta").then(response => {
        commit("SET_DECK_METAS", response.data);
      });
    },
    getCurrentDeckMetas({ commit }, deckID) {
      axios.get("http://127.0.0.1:5000/decks/meta/" + deckID).then(response => {
        commit("SET_CURRENT_DECK_METAS", response.data);
      });
    }
  },
  getters: {
    allDecks: state => state.decks,
    currentDeck: state => state.currentDeck
  }
});
