<template>
  <div>
    MODIFY SELECTED DECK <br />
    <label for="deckName">Deck Name:</label>
    <input
      type="text"
      id="deckName"
      v-model="currentDeck.name"
      placeholder="Deck Name"
    />
    <br />

    <label for="strategy">Strategy:</label>
    <textarea
      id="strategy"
      v-model="currentDeck.strategy"
      rows="5"
      cols="30"
      placeholder="Do the win"
    >
    </textarea>
    <br />
    <label for="mana">Mana ID:</label>
    <select id="color_id" v-model="currentDeck.mana">
      <option value="Black">Black</option>
      <option value="Blue">Blue</option>
      <option value="Green">Green</option>
      <option value="Red">Red</option>
      <option value="White">White</option>
      <option value="Izzet">Izzet</option>
      <option value="Boros">Boros</option>
      <option value="Rakdos">Rakdos</option>
      <option value="Gruul">Gruul</option>
      <option value="Golgari">Golgari</option>
      <option value="Selesnya">Selesnya</option>
      <option value="Simic">Simic</option>
      <option value="Dimir">Dimir</option>
      <option value="Orzhov">Orzhov</option>
      <option value="Azorius">Azorius</option>
      <option value="Colorless">Colorless</option>
      <option value="Bant">Bant</option>
      <option value="Esper">Esper</option>
      <option value="Grixis">Grixis</option>
      <option value="Jund">Jund</option>
      <option value="Naya">Naya</option>
      <option value="Abzan">Abzan</option>
      <option value="Jeskai">Jeskai</option>
      <option value="Sultai">Sultai</option>
      <option value="Mardu">Mardu</option>
      <option value="Temur">Temur</option>
    </select>

    <br />
    <label for="box">Box:</label>
    <select id="box" v-model="currentDeck.box">
      <option value="Beginner">Beginner</option>
      <option value="Budget">Budget</option>
      <option value="Game Night">Game Night</option>
      <option value="Almost There">Almost There</option>
      <option value="Competitive Meta">Competitive Meta</option>
    </select>

    <br />

    <label for="tag-line">Tag Line:</label>
    <input
      type="text"
      id="tag-line"
      v-model="currentDeck.tag_line"
      size="50"
      placeholder="The clouds will part the sky, The sun shines on my face"
    />

    <br />

    <label for="author">Author:</label>
    <input
      type="text"
      id="author"
      v-model="currentDeck.author"
      placeholder="Yer mum"
    />

    <br />

    <label for="source">Source:</label>
    <input
      type="text"
      id="source"
      v-model="currentDeck.source"
      placeholder="Yer mum's butt"
    />

    <br />

    <label for="price">Price:</label>
    <input type="text" id="price" v-model="currentDeck.price" placeholder="$" />

    <br />

    <label for="rating">Rating:</label>
    <input
      type="text"
      id="rating"
      v-model="currentDeck.rating"
      placeholder="1000"
    />

    <br />

    <label for="core">Core?</label>
    <input
      type="checkbox"
      id="checkbox"
      v-model="currentDeck.core"
      value="true"
    />
    {{ deck.core }}

    <br />

    <label for="key_card1">Key Card 1:</label>
    <input type="text" id="key-card1" v-model="currentDeck.key_card1" />

    <br />

    <label for="key_card2">Key Card 2:</label>
    <input type="text" id="key-card2" v-model="currentDeck.key_card2" />

    <br />

    <label for="key_card3">Key Card 3:</label>
    <input type="text" id="key-card3" v-model="currentDeck.key_card3" />

    <br />

    <label for="key_card4">Key Card 4:</label>
    <input type="text" id="key-card4" v-model="currentDeck.key_card4" />

    <br />
    <button type="submit" @click="modifyDeck">Modify</button>
  </div>
  <br />
</template>

<script>
import axios from "axios";
export default {
  name: "DeckContentModify",
  data() {
    return {
      deck: {
        id: "",
        name: "",
        strategy: "",
        mana: "",
        box: "",
        tag_line: "",
        author: "",
        source: "",
        price: "",
        rating: "",
        core: "false",
        game_losses: "0",
        game_wins: "0",
        match_losses: "0",
        match_wins: "0",
        key_card1: "",
        key_card2: "",
        key_card3: "",
        key_card4: ""
      }
    };
  },
  methods: {
    changeDecklist() {
      axios
        .get("http://127.0.0.1:5000/decks/" + this.deckSelect)
        .then(response => {
          this.deck = response.data;
        });
    },
    modifyDeck() {
      axios
        .put(
          "http://127.0.0.1:5000/decks/" + this.currentDeck.id,
          this.currentDeck
        )
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log(this.currentDeck.name + "logged malto bueno");
          this.$store.dispatch("getAllDecks");
        });
    }
  },
  computed: {
    imgUrl() {
      return this.$store.state.baseUrls.imgUrl;
    },
    currentDeck() {
      return this.$store.state.currentDeck;
    }
  }
};
</script>

<style scoped></style>
