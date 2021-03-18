import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import deck from "@/views/Deck.vue";
import card from "@/views/Card.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/deck",
    name: "deck",
    component: deck
  },
  { path: "/card",
    name: "card",
    component: card
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
