<template>
  <b-card @click.prevent="joinRoom(room.id)">
    <b-card-title>{{room.name}}</b-card-title>
  </b-card>
</template>

<script>
export default {
  props: {
    room: Object
  },
  methods: {
    joinRoom (id) {
      this.$emit('joinRoom', id)
    }
  }
}
</script>

<style scoped>
.card-title {
  margin: 0.5rem 0;
}
</style>
