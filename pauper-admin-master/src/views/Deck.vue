<template>
  <div>
    <p>
      <select
        id="deckSelect"
        v-model="deckSelect"
        @change="changeDeck(), changeDecklist(), changeDeckMetas()"
      >
        <option disabled value="">Select a Deck</option>
        <option v-for="deck in allDecks" :key="deck.id" :value="deck.id">{{
          deck.name
        }}</option>
      </select>
    </p>
  </div>
  <div class="top">
    <div class="col">
      <deckContentAdd />
      <deckListAdd />
    </div>
    <div class="col">
      <deckContentModify />
      <deckListView />
    </div>
  </div>
  <div class="top">
    <div class="tag">
      <deckMetaAdd />
    </div>
    <div class="tag">
      <deckMetaModify />
    </div>
  </div>
</template>

<script>
import DeckContentAdd from "@/components/DeckContentAdd.vue";
import DeckContentModify from "@/components/DeckContentModify.vue";
import DeckListAdd from "@/components/DeckListAdd.vue";
import DeckListView from "@/components/DeckListView.vue";
import DeckMetaAdd from "@/components/DeckMetaAdd.vue";
import DeckMetaModify from "@/components/DeckMetaModify.vue";

export default {
  name: "deck",
  components: {
    DeckContentAdd,
    DeckContentModify,
    DeckListAdd,
    DeckListView,
    DeckMetaAdd,
    DeckMetaModify
  },
  mounted() {
    this.$store.dispatch("getAllDecks");
    this.$store.dispatch("getAllDeckMetas");
  },
  computed: {
    allDecks() {
      return this.$store.state.decks;
    }
  },
  methods: {
    changeDeck() {
      this.$store.dispatch("getCurrentDeck", this.deckSelect);
    },
    changeDecklist() {
      this.$store.dispatch("getCurrentDecklist", this.deckSelect);
    },
    changeDeckMetas() {
      this.$store.dispatch("getCurrentDeckMetas", this.deckSelect);
    }
  }
};
</script>
<style scoped>
.top {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.col {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  border: solid 2px black;
}
.tag {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  border: solid 2px black;
}
</style>
