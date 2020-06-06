<template>
  <div style="display: grid; justify-content: center; align-items: center; height: 90vh; margin-top: 5vh;">
    <b-card style="width: 800px; background: #ffcd38;">
      <h3 style="margin-bottom: 0;">LOOSEEER</h3>
    </b-card>
    <div style="background-image: url('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/handsBanner.jpg'); width: 800px; height: 500px; border-radius: 0.2rem;">
      <b-card class="resultBox">
        <b-card-text>THE WINNER IS</b-card-text>
        <b-card-text>{{ winner.username }}</b-card-text>
        <b-card-text>Win: {{ winner.score }} Time(s)</b-card-text>
      </b-card>
    </div>
    <button class="btn btn-danger" style="position: absolute; bottom: 2rem; right: 2rem;" @click.prevent="toHome">HOME</button>
  </div>
</template>

<script>
export default {
  name: 'lose',
  props: {
    winner: Object
  },
  methods: {
    toHome () {
      // this.$router.push('/')
      this.$router.go('/')
    }
  }
}
</script>

<style scoped>
  .card-text {
    margin-bottom: 0;
  }
  .resultBox {
    width: 100px;
    position: relative;
    top: 310px;
    left: 424px;
    background: none; border: none;
    transform: skewY(20deg);
    width: 150px;
    font-size: 0.9rem;
    font-weight: bold;
  }
</style>
