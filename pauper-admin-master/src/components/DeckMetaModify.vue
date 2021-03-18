<template>
  <div>
    MODIFY META TAGS
    <ul>
    <li v-for="meta in currentDeckMetas" :key="meta.meta_tag">
      {{meta.meta_tag }}<input type="checkbox" v-model="meta.active">
      <button type="submit" @click="updateMetaInDeck(meta.meta_tag)">Modify</button>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "DeckMetaModify",
  data() {
    return {
      hi: ""
    };
  },
  computed: {
    currentDeckMetas() {
      return this.$store.state.currentDeckMetas;
    },
    currentDeck() {
      return this.$store.state.currentDeck;
    }
  },
  methods: {
    updateMetaInDeck(meta_tag) {
      const metaToUpdate = this.currentDeckMetas.find(i => i.meta_tag === meta_tag);
      metaToUpdate.deck_id = this.currentDeck.id
      
      // const updatedMeta = {};
      // updatedMeta.meta_tag = metaToUpdate.meta_tag;
      // updatedMeta.active = metaToUpdate.active;
      // updatedMeta.deck_id = this.currentDeck.id

      axios
      .put("http://127.0.0.1:5000/decks/meta/" + this.currentDeck.id, metaToUpdate)
      .catch(error => {
        console.log(error)})
      .finally(() => {
        console.log(metaToUpdate.meta_tag + " updated")
      })
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}</style>
