<template>
  <div>
    ADD NEW DECKLIST <br />
    <textarea
      id="decklist"
      cols="50"
      rows="30"
      placeholder="YOLO"
      v-model="textareaDecklist"
    ></textarea>
    <button type="submit" @click="addDecklistMethod">Add</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "deckListAdd",
  data() {
    return {
      textareaDecklist: {},
      decklist: {},
      active: "True",
      deckListContsructed: []
    };
  },
  methods: {
    addDeckList(card_name, qty, active, deck_id) {
      this.deckListContsructed.push({
        card_name: card_name,
        card_qty: qty,
        active: active,
        deck_id: deck_id
      });
    },
    addDecklistMethod() {
      let decklistArray = this.textareaDecklist.split("\n");

      let cardQty = [];
      let cardName = [];

      decklistArray.forEach(obj => {
        let qty = obj.substr(0, obj.indexOf(" "));
        cardQty.push(qty);

        let card = obj.substr(obj.indexOf(" ") + 1);
        cardName.push(card);
      });

      cardQty.forEach((i, index) => {
        let j = cardName[index];
        this.addDeckList(j, i, this.active, this.currentDeck.id);
      });

      let stringify = JSON.parse(JSON.stringify(this.deckListContsructed));

      this.decklist = stringify;
      console.log(this.decklist);

      axios
        .post(
          "http://127.0.0.1:5000/decks/" + this.currentDeck.id,
          this.decklist
        )
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("this was logged malto bueno");
          this.textareaDecklist = "";
        });
    }
  },
  computed: {
    currentDeck() {
      return this.$store.state.currentDeck;
    }
  }
};
</script>
