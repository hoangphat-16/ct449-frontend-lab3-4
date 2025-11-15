<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      contact: null, 
      message: "",
    };
  },
  methods: {
    async getContact(id) {
      try {
        this.contact = await ContactService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển về trang NotFound nếu không tìm thấy contact
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },

    async updateContact(data) {
      try {
        // SỬA LỖI: Dùng 'this.id' (từ prop) thay vì 'this.contact._id'
        await ContactService.update(this.id, data);
        
        this.message = "Liên hệ được cập nhật thành công.";
        setTimeout(() => {
          this.$router.push({ name: "contactbook" });
        }, 1500);

      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi cập nhật.";
      }
    },

    async deleteContact() {
      try {
        // SỬA LỖI: Dùng 'this.id' (từ prop) thay vì 'this.contact._id'
        await ContactService.delete(this.id);
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi xóa.";
      }
    },
  },

  created() {
    this.getContact(this.id);
    this.message = ""; 
  },
};
</script>

<style scoped>
.page {
  max-width: 400px;
  margin: auto;
}
.message {
  color: green;
  font-weight: bold;
}
</style>