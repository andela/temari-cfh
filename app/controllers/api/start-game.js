/*
* Module dependencies.
*/
const mongoose = require('mongoose');

const GameRecords = mongoose.model('Records');


/*
* Find Game Records by Gameid
*/
exports.getGameRecords = (req, res) => {
  const gameID = req.params.id;
  GameRecords.findOne({
    gameID
  }, (err, savedGame) => {
    if (err) {
      return res.send(err);
    }
    if (!savedGame) {
      return res.status(400).json({
        success: false,
        message: 'Game Record Not Found!!'
      });
    }
    return res.status(200).json(savedGame);
  });
};
/*
* Store Game Record
*/
exports.saveRecords = (req, res) => {
  const gameID = req.body.gameID,
    players = req.body.players,
    completed = req.body.completed,
    winner = req.body.winner,
    rounds = req.body.rounds;

  const gameRecord = new GameRecords({
    gameID,
    players,
    completed,
    rounds,
    winner
  });

  gameRecord.save((err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.status(201).json({
      success: true,
      data,
      message: 'Your game is being saved!'
    });
  });
};

/*
 * Update Game Record
*/
exports.updateRecords = (req, res) => {
  const gameID = req.body.gameID;
  const completed = req.body.completed;
  const winner = req.body.winner;
  const rounds = req.body.rounds;

  GameRecords.update({
    gameID
  }, {
    $set: {
      completed,
      winner,
      rounds
    }
  }, (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.status(201).json({
      success: true,
      message: 'Game Record Updated!',
      data
    });
  });
};
