const express = require('express')
const app = express();
const cors = require('cors')
const { Room } = require('./models')
const port = process.env.PORT || 3000

app.use(cors())

const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(port, () => {
  console.log('Listening on port', port)
})

app.get('/', function(req, res) {
  res.send('masup pak')
})

app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))

let scores = []
let playerList = []
let scoreList = []

io.on('connection', socket => {

  socket.on('createRoom', payload => {
    Room.create({
      name: payload.roomName
    })
      .then(room => {
        socket.join(room.id, err => {
          if (err) {
            console.log(err)
          } else {
            io.emit('roomCreated', room)
          }
        })
      })
      .catch(err => console.log(err))
  })

  socket.on('fetchRoom', () => {
    Room.findAll()
      .then(rooms => {
        socket.emit('showRooms', rooms)
      })
      .catch(err => console.log(err))
  })

  socket.on('joinRoom', payload => {
    socket.join(payload.id, () => {
      io.to(payload.id).emit('joined', payload)
      scores = []
      playerList = []
      scoreList = {
        player1: [undefined, 0],
        player2: [undefined, 0]
      }
    })
  })

  socket.on('inGame', payload => {
    socket.join(payload.id.id, () => {
      if (payload.status === 'round') {
        scores.push(payload)
        if(scores.length > 1){
          if (!scoreList.player1[0]) {
            scoreList.player1[0] = scores[0].username
            scoreList.player2[0] = scores[1].username
          }

          if (scores[0].score === scores[1].score) {
            io.to(payload.id.id).emit('roundScore', scores[0].username, 'draw')
          } else if 
            (
              (scores[0].score === 1 && scores[1].score === 2) ||
              (scores[0].score === 2 && scores[1].score === 3) ||
              (scores[0].score === 3 && scores[1].score === 1) 
            ) 
          {
            if (scoreList.player1[0] === scores[1].username) {
              scoreList.player1[1] += 1
            } else {
              scoreList.player2[1] += 1
            }
            data = {
              username: scores[1].username,
              winner: scores[1].score,
              loser: scores[0].score
            }
            io.to(payload.id.id).emit('roundScore', data, 'pemenangnya')
          } else {
            if (scoreList.player1[0] === scores[0].username) {
              scoreList.player1[1] += 1
            } else {
              scoreList.player2[1] += 1
            }
            data = {
              username: scores[0].username,
              winner: scores[0].score,
              loser: scores[1].score
            }
            io.to(payload.id.id).emit('roundScore', data, 'pemenangnya')
          }
          scores = []
        }
      } else {
        scores.push(payload)
        if(scores.length > 1) {
          if (scoreList.player1[1] === scoreList.player2[1]) {
            io.to(payload.id.id).emit('finalScore', scoreList, 'draw')
          } else if (scoreList.player1[1] > scoreList.player2[1]) {
            io.to(payload.id.id).emit('finalScore', scoreList.player1, 'pemenangnya')
          } else {
            io.to(payload.id.id).emit('finalScore', scoreList.player2, 'pemenangnya')
          }
        }
      }
    })
  })

  socket.on('startTheGame', payload => {
    socket.join(payload.id, () => {
      if (playerList.length === 0 || !playerList.includes(payload.username)) {
        playerList.push(payload.username)
      }
      io.to(payload.id).emit('gameIsStarted', playerList)
    })
  })
});