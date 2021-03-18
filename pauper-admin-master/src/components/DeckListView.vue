<template>
  <div>
    MODIFY SELECTED DECKLIST <br />
    <ul>
      <li v-for="card in currentDecklist" :key="card.id">
        <input type="text" length="2" size="2" v-model="card.card_qty" />
        <input type="text" v-model="card.card_name" />
        <input type="checkbox" v-model="card.active" />
        <button type="submit" @click="updateCardInDeck(card.id)">Modify</button>
      </li>
      <input
        type="text"
        length="2"
        size="2"
        id="newQty"
        placeholder="4"
        v-model="newCard.card_qty"
      />
      <input
        type="text"
        id="newCard"
        placeholder="New Card"
        v-model="newCard.card_name"
      />
      <input type="checkbox" checked v-model="newCard.active" />
      <button type="submit" @click="addCard">Add</button>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "deckListView",
  data() {
    return {
      deck: Object,
      decklist: Array,
      deckSelect: "",
      newCard: {
        card_qty: "",
        card_name: "",
        active: true
      }
    };
  },
  methods: {
    updateCardInDeck(id) {
      const cardToUpdate = this.currentDecklist.find(i => i.id === id);

      const updatedCard = {};
      updatedCard.card_name = cardToUpdate.card_name;
      updatedCard.active = cardToUpdate.active;
      updatedCard.card_qty = cardToUpdate.card_qty;
      updatedCard.deck_id = this.currentDeck.id;

      axios
        .put(
          "http://127.0.0.1:5000/decks/decklist/single/" + this.currentDeck.id,
          updatedCard
        )
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log(this.currentDeck.id + " updated");
          this.$store.dispatch("getCurrentDecklist", this.currentDeck.id);
        });
    },
    addCard() {
      const cardToAdd = {};

      cardToAdd.card_qty = this.newCard.card_qty;
      cardToAdd.card_name = this.newCard.card_name;
      cardToAdd.active = this.newCard.active;
      cardToAdd.deck_id = this.currentDeck.id;

      axios
        .post(
          "http://127.0.0.1:5000/decks/decklist/single/" + this.currentDeck.id,
          cardToAdd
        )
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log(this.currentDeck.id + " updated");
          this.newCard = {};
          this.cardToAdd = {};
          this.$store.dispatch("getCurrentDecklist", this.currentDeck.id);
        });
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:5000/decks/decklist/" + this.currentDeck.id)
      .then(response => {
        this.deck = response.data;
      });
  },
  computed: {
    imgUrl() {
      return this.$store.state.baseUrls.imgUrl;
    },
    currentDeck() {
      return this.$store.state.currentDeck;
    },
    currentDecklist() {
      return this.$store.state.currentDecklist;
    }
  }
};
</script>
<style scoped>
li {
  list-style: none;
}
</style>
