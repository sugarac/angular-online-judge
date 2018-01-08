var redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
    // collaboration sessions
    var collaborations = [];
    // map from socketId to sessionId
    var socketIdToSessionId = [];

    var sessionPath = "/temp_sessions";

    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];

        socketIdToSessionId[socket.id] = sessionId;
        // add socket.id to corresponding collaboration session participants
        if (sessionId in collaborations) {
          collaborations[sessionId]['participants'].push(socket.id);
        } else {
          redisClient.get(sessionPath + '/' + sessionId, function(data) {
            if (data) {
              console.log("session terminiated previsouly; pulling back from Redis.");
              collaborations[sessionId] = {
                'cachedChangeEvents': JSON.parse(data),
                'participants': []
              };
            } else {
              console.log("creating new session");
              collaborations[sessionId] = {
                'cachedChangeEvents': [],
                'participants': []
              };
            }
            collaborations[sessionId]['participants'].push(socket.id);
          });
        }


        // socket event listeners
        socket.on('change', delta => {
            console.log( "change " + socketIdToSessionId[socket.id] + " " + delta ) ;
            let sessionId = socketIdToSessionId[socket.id];

            if (sessionId in collaborations) {
              collaborations[sessionId]['cachedChangeEvents'].push(["change", delta, Date.now()]);
            }

            forwardEvents(socket.id, 'change', delta);
        });

        // handle cursorMove events
        socket.on('cursorMove', cursor => {
            console.log( "cursorMove " + socketIdToSessionId[socket.id] + " " + cursor ) ;
            cursor = JSON.parse(cursor);
            cursor['socketId'] = socket.id;

            forwardEvents(socket.id, 'cursorMove', JSON.stringify(cursor));
        });

        socket.on('restoreBuffer', () => {
          let sessionId = socketIdToSessionId[socket.id];
          console.log('restoring buffer for session: ' + sessionId + ', socket: ' + socket.id);
          if (sessionId in collaborations) {
            let changeEvents = collaborations[sessionId]['cachedChangeEvents'];
            for (let i = 0; i < changeEvents.length; i++) {
              socket.emit(changeEvents[i][0], changeEvents[i][1]);
            }
          }
        });

        socket.on('disconnect', function() {
          let sessionId = socketIdToSessionId[socket.id];
          console.log('socket ' + socket.id + 'disconnected.');

          if (sessionId in collaborations) {
            let participants = collaborations[sessionId]['participants'];
            let index = participants.indexOf(socket.id);
            if (index >= 0) {
              participants.splice(index, 1);
              if (participants.length == 0) {
                console.log("last participant left. Storing in Redis.");
                let key = sessionPath + "/" + sessionId;
                let value = JSON.stringify(collaborations[sessionId]['cachedChangeEvents']);
                redisClient.set(key, value, redisClient.redisPrint);
                redisClient.expire(key, TIMEOUT_IN_SECONDS);
                delete collaborations[sessionId];
              }
            }
          }
        });

        function forwardEvents(socketId, eventName, dataString) {
            let sessionId = socketIdToSessionId[socketId];

            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i = 0; i < participants.length; i++) {
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit(eventName, dataString);
                    }
                }
            } else {
                console.log("WARNING: could not tie socket_id to any collaboration");
            }
        }
    });
}
