<script setup>
import { useStore } from '~/store/useStore'
const store = useStore()
</script>

<template>
  <div class="digital-delivery shadow-md" id="digital-delivery">
    <header class="admin-section-header">
      <div class="title">Digital Delivery</div>
      <div class="status">
        <FormsBaseToggle v-model="store.product.downloadable" label="Enable" />
      </div>
    </header>
    <div class="conten" v-if="store.product.downloadable">file upload dropzone goes here</div>
  </div>
</template>

<style lang="scss" scoped>
.digital-delivery {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
