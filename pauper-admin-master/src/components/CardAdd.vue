<template>
  <label for="cardName">Card to Look Up: </label>
  <input type="text" placeholder="Card Name" v-model="card.card_name" />
  <button type="submit" @click="lookUpCard()">Look Up</button>

  <br />

  <label for="cardName">Card Name: </label>
  <input
    type="text"
    id="cardName"
    v-model="card[0].name"
    placeholder="Card Name"
  />
  <br />
  <label for="cardType">Card Type: </label>
  <select id="card_type" v-model="card.card_type">
    <option value="Creature">Creature</option>
    <option value="Artifact">Artifact</option>
    <option value="Sorcery">Sorcery</option>
    <option value="Instant">Instant</option>
    <option value="Land">Land</option>
    <option value="Enchantment">Enchantment</option>
  </select>

  <br />
  <label for="manaCost">Mana Cost: </label>
  <input type="text" id="manaCost" v-model="card[0].manaCost" />

  <br />
  <label for="cs_id">CS ID: </label>
  <input type="text" id="cs_id" v-model="card.cs_id" placeholder="CS ID" />

  <br />
  <label for="price">Price: </label>
  <input type="text" id="price" v-model="card.price" placeholder="Price" />

  <br />
  <label for="color">Color ID: </label>
  <select id="color_id" v-model="card.color_id">
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
    <option value="Grizis">Grixis</option>
    <option value="Jund">Jund</option>
    <option value="Naya">Naya</option>
    <option value="Abzan">Abzan</option>
    <option value="Jeskai">Jeskai</option>
    <option value="Sultai">Sultai</option>
    <option value="Mardu">Mardu</option>
    <option value="Temur">Temur</option>
  </select>

  <br />
  <label for="cmc">CMC: </label>
  <input type="text" id="cmc" v-model="card[0].convertedManaCost" />

  <br />
  <button type="submit" v-on:click="addCardMethod">Add</button>
  {{ card[0] }}
</template>

<script>
//import apiService from '@/services/apiService.js'
import axios from "axios";
export default {
  name: "CardAdd",
  computed: {
    imgUrl() {
      return this.$store.state.baseUrls.imgUrl;
    }
  },
  data() {
    return {
      card: [{ manaCost: "" }, { convertedManaCost: "" }, { name: "" }]
    };
  },
  methods: {
    addCardMethod() {
      let cardToPost = {};
      cardToPost.card_name = this.card[0].name;
      cardToPost.card_type = this.card.card_type;
      cardToPost.mana_cost = this.card[0].manaCost;
      cardToPost.cs_id = parseInt(this.card.cs_id);
      cardToPost.price = parseFloat(this.card.price);
      cardToPost.color_id = String(this.card.color_id);
      cardToPost.cmc = String(this.card[0].convertedManaCost);

      axios
        .post("http://127.0.0.1:5000/cards", cardToPost)
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log(this.card.card_name + " logged successfully!");
          this.card.card_name = "";
          this.card.card_type = "";
          this.card.mana_cost = "";
          this.card.cs_id = "";
          this.card.price = "";
          this.card.color_id = "";
          this.card.cmc = "";
        });
    },
    lookUpCard() {
      axios
        .get(
          'https://mtgjson.com/graphql?query=query{cards(input:{name:"' +
            this.card.card_name +
            '"},page:{take: 1,skip: 0},order:{order:ASC}){name,convertedManaCost,manaCost,types,colors,colorIdentity}}',
          {
            headers: {
              Authorization: MTGJSON_GRAPHQL_AUTH_TOKEN
            }
          }
        )
        .then(response => {
          console.log(response.data);
          this.card = response.data.data.cards;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
