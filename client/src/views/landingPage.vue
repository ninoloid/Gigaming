<template>
  <b-container>
    <b-row>
      <b-col cols="12" style="margin: 1rem 0;">
        <b-card>
          <b-card-title>ROOM LIST</b-card-title>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="9">
        <b-row>
          <b-col cols="4" style="margin-bottom: 1rem" v-for="room in rooms" :key="room.id">
            <!-- room card here -->
            <RoomCard :room="room" @joinRoom="joinRoom"/>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3">
        <b-card>
          <b-card-body>
            <b-form @submit.prevent="addRoom">
              <label for="playerName">Player Name</label>
              <b-form-input id="playerName" v-model="userName" placeholder="Enter your name" style="margin-bottom: 0.5rem;"></b-form-input>
              <hr>
              <label for="createRoom">Create Room</label>
              <b-form-input id="createRoom" v-model="roomName" placeholder="Enter room name" style="margin-bottom: 0.5rem;"></b-form-input>
              <b-button class="btn btn-success" style="width:100%" type="submit">ADD ROOM</b-button>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import io from 'socket.io-client'
import RoomCard from '@/components/RoomCard'

export default {
  name: 'landingPage',
  components: {
    RoomCard
  },
  data () {
    return {
      socket: io.connect('http://localhost:3000'),
      roomName: '',
      rooms: [],
      userName: ''
    }
  },
  methods: {
    joinRoom (id) {
      if (this.userName) {
        this.socket.emit('joinRoom', {
          id,
          username: this.userName
        })
      } else {
        this.$alertify.error('Please enter the username')
      }
    },
    addRoom () {
      if (this.userName && this.roomName) {
        this.socket.emit('createRoom', {
          roomName: this.roomName,
          username: this.userName
        })
      } else {
        this.$alertify.error('Username or room name cannot be blank')
      }
    },
    fetchRoom () {
      this.socket.emit('fetchRoom')
    },
    setUsername (username) {
      this.$store.commit('setUsername', username)
    }
  },
  created () {
    this.socket.on('roomCreated', room => {
      console.log(room)
      this.rooms.push(room)
    })

    this.fetchRoom()

    this.socket.on('showRooms', room => {
      this.rooms = room
    })

    this.socket.on('joined', payload => {
      this.$router.push(`/inGame/${payload.id}`)
    })
  },
  watch: {
    userName (username) {
      this.setUsername(username)
    }
  }
}
</script>

<style scoped>
.card-title {
  margin: 0.5rem 0;
}
</style>
