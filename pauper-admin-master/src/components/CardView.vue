<template>
  <div>
    {{ card }}
    {{ card.card_name }} - <i v-for="i in manaArray" :class="i" :key="i"></i>
  </div>
  <div>
    <p>
      <img :src="imgUrl + card.card_name + '.jpg'" />
    </p>
  </div>
</template>

<script>
import axios from "axios";

const makeManaArray = mana => {
  let manaArray = mana.split(",");
  let convertedMana = [];
  manaArray.forEach(obj => {
    let convertMana = "ms ms-" + obj + " ms-cost";
    convertedMana.push(convertMana);
  });
  return convertedMana;
};

export default {
  name: "card",
  computed: {
    imgUrl() {
      return this.$store.state.baseUrls.imgUrl;
    }
  },
  data() {
    return {
      card: {},
      class: "ms ms-r",
      manaArray: Array
    };
  },
  created() {
    axios.get("http://127.0.0.1:5000/cards/Abrade").then(response => {
      this.card = response.data;
      this.manaArray = makeManaArray(response.data.mana_cost);
    });
  },
  methods: {
    makeManaArray
  }
};
</script>
