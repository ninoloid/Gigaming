<template>
  <div>
    <h1 v-if="!result">Waiting another player to finish the game</h1>
    <Win v-if="isWinner && result !== 'draw' && result" />
    <Lose v-if="!isWinner && result !== 'draw' && result" :winner="winner"/>
    <Draw v-if="result === 'draw'"></Draw>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Lose from '@/components/lose'
import Win from '@/components/win'
import Draw from '@/components/draw'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'winner',
      'result',
      'userName'
    ]),
    isWinner () {
      return this.userName === this.winner.username
    }
  },
  components: {
    Lose,
    Win,
    Draw
  }
}
</script>

<style>

</style>
