import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import NotFound from "@/views/NotFound.vue";


const ContactAdd = () => import("@/views/ContactAdd.vue");
const ContactEdit = () => import("@/views/ContactEdit.vue");

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    name:"notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/contacts/:id", 
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true,
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;