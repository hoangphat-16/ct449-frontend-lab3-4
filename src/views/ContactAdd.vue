<template>
  <div class="page">
    <h4>Thêm Liên hệ mới</h4>
 
    <ContactForm 
      :contact="{}" 
      @submit:contact="addContact" 
    />

    <p>{{ message }}</p>
  </div>
</template>

<script>

import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {

    async addContact(data) {
      try {
    
        await ContactService.create(data);
        this.message = "Liên hệ đã được thêm thành công.";
        

        setTimeout(() => {
          this.$router.push({ name: "contactbook" });
        }, 1500);

      } catch (error) {
        console.log(error);
        this.message = "Đã xảy ra lỗi khi thêm liên hệ.";
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 400px;
  margin: auto;
}

p {
  color: green;
  font-weight: bold;
}
</style>