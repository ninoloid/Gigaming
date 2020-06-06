<template>
  <b-container style="justify-content: center; margin-top: 10vh;">
    <b-row style="height: 80vh;">
      <b-col cols="9" class="gameArea">
        <img
          class="target custom-cur"
          src="../assets/rock.png"
          draggable="false"
          v-if="number > -1 && roundCounter <= 5"
          @click.prevent="clickMe(1)"
        >
        <img
          class="target custom-cur"
          src="../assets/paper.png"
          draggable="false"
          v-if="number > -1 && roundCounter <= 5"
          @click.prevent="clickMe(2)"
        >
        <img
          class="target custom-cur"
          src="../assets/scissors.png"
          draggable="false"
          v-if="number > -1 && roundCounter <= 5"
          @click.prevent="clickMe(3)"
        >
        <div v-if="roundCounter > 5" style="width: 100%; text-align: center;">
          <h1 style="font-weight: bold;">Redirected to Result Page in {{ this.countdown }}</h1>
          <h1 style="font-weight: bold;">Please Wait...</h1>
          <Piplup />
        </div>
      </b-col>
      <b-col cols="3">
        <div class="scoreboard">
          <b-card class="scoreContainer">
            <b-card-title>ROOM {{this.$route.params.id}}</b-card-title>
            <b-card-body>
              <b-card-text>USERNAME</b-card-text>
              <b-card-text>{{ userName }}</b-card-text>
            </b-card-body>
            <b-card-body>
              <b-card-text>ROUND {{ this.roundCounter !== 6 ? this.roundCounter : 5 }}</b-card-text>
              <b-progress :value="roundTimer" :max="maxTimer" show-value animated></b-progress>
            </b-card-body>
            <b-card-body>
              <img src="../assets/rock.png" alt="rock" width="100px" v-if="number === 1">
              <img src="../assets/paper.png" alt="rock" width="100px" v-if="number === 2">
              <img src="../assets/scissors.png" alt="rock" width="100px" v-if="number === 3">
            </b-card-body>
            <b-button
              class="btn btn-danger"
              style="margin-top: 5vh; width: 60%"
              @click.prevent="startButtonIsClicked">
              Start
            </b-button>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
import Piplup from '@/components/piplup'

export default {
  name: 'inGame',
  components: {
    Piplup
  },
  data () {
    return {
      number: -1,
      socket: io.connect('http://localhost:3000'),
      countdown: 0,
      atas: 0,
      kiri: 0,
      maxTimer: 0,
      roundCounter: 1,
      roundTimer: 0
    }
  },
  props: {
    msg: String
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  methods: {
    mulai () {
      this.number = 0
      this.countDownTimer()
    },
    startButtonIsClicked () {
      this.socket.emit('startTheGame', {
        username: this.$store.state.userName,
        id: this.$route.params
      })
    },
    clickMe (num) {
      if (this.countdown > 0) {
        this.number = num
        const audio = new Audio('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/sharp_punch.mp3')
        audio.play()
      } else {
        this.$alertify.success("Time's Up")
      }
    },
    countDownTimer () {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1
          this.roundTimer -= 1
          this.countDownTimer()
          const audio = new Audio('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/beep_ping.mp3')
          audio.play()

          if (this.countdown % 5 === 0 && this.countdown !== 0) {
            this.roundCounter++
            this.roundTimer = 5
            this.socket.emit('inGame', {
              username: this.$store.state.userName,
              id: this.$route.params,
              score: this.setChosen(),
              status: 'round'
            })
            this.number = 0
          }
        }, 1000)
      } else {
        this.socket.emit('inGame', {
          username: this.$store.state.userName,
          id: this.$route.params,
          score: this.setChosen(),
          status: 'game'
        })
        this.$router.push('/result')
      }
    },
    setCountdown () {
      const number = 30
      this.countdown = number
      this.roundTimer = 5
      this.maxTimer = 5
      const audio = new Audio('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/electronic_chime.mp3')
      audio.play()
    },
    setChosen () {
      return this.number === 0 ? Math.floor(Math.random() * 3) + 1 : this.number
    }
  },
  created () {
    this.socket.on('finalScore', (payload, hasil) => {
      this.$store.commit('CHECK_RESULT', {
        payload,
        hasil
      })
    })
    this.setCountdown()
    this.socket.on('gameIsStarted', playerList => {
      if (playerList.length === 2) {
        this.mulai()
      } else {
        this.$alertify.error('Waiting other player to start')
      }
    })
    this.socket.on('roundScore', (payload, hasil) => {
      const winner = payload.winner === 1 ? 'Rock' : payload.winner === 2 ? 'Paper' : 'Scissors'
      const loser = payload.loser === 1 ? 'Rock' : payload.loser === 2 ? 'Paper' : 'Scissors'
      let message

      if (hasil === 'draw') {
        message = 'DRAW'
        this.$alertify.success(message)
      } else {
        if (payload.username === this.$store.state.userName) {
          message = `${winner} vs ${loser} = YOU WIN!`
          this.$alertify.success(message)
        } else {
          message = `${winner} vs ${loser} = YOU LOSE!`
          this.$alertify.error(message)
        }
      }
    })
  }
}
</script>
<style scoped>
.custom-cur {
  /* cursor: url('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/hands.png'), move; */
  cursor: pointer;
  transition: .2s;
}
.custom-cur:active {
  cursor: auto;
  /* cursor: url('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/hands_rotated.png'), move; */
  /* transition: .3s; */
}
.target {
  width: 200px;
  height: 200px;
}
.gameArea {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}
.gameArea::after {
  content: "";
  background-image: url('../assets/piplup_bg.png');
  background-size: cover;
  border-radius: 2vh;
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
.scoreboard {
  background-image: url('../assets/soil.jpg');
  height: 100%;
  border-radius: 2vh;
  background-size: cover;
  color: white;
}
.scoreContainer {
  border-radius: 2vh;
  background: rgba(0,0,0,0.5);
  height: 100%;
}
</style>
