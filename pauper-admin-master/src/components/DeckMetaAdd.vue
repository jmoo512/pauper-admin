<template>
  <div>
    <p v-for="i in deckMetas" :key="i.meta_tag">{{ i.meta_tag }}</p>
  </div>
</template>

<script>
export default {
  name: "DeckMetaAdd",
  data() {
    return {
      hi: ""
    };
  },
  computed: {
    deckMetas() {
      return this.$store.state.deckMetas;
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}</style>
