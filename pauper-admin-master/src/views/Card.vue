<template>
  <div>
    <cardAdd />
    <cardView />
  </div>
</template>

<script>
import CardAdd from "@/components/CardAdd.vue";
import CardView from "@/components/CardView.vue";

export default {
  name: "card",
  components: {
    CardAdd,
    CardView
  }
};
</script>
