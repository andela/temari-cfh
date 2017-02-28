angular.module('mean.system')
  .controller('OnboardController', ['$scope', '$window', ($scope, $window) => {
    $scope.$on('$locationChangeSuccess', () => {
      if ($scope.gameTour) {
        $scope.gameTour.exit();
      }
    });

    $scope.gameTour = introJs();
    $scope.gamePlayerLength = 1;
    $scope.playerScore = 0;
    $scope.gameTour.setOption('showBullets', true);
    $scope.gameTour.setOption('showStepNumbers', false);
    $scope.gameTour.setOptions({
      steps: [{
        intro: `This tour will serve as a shepherd, guiding you through
        the process of playing Cards For Humanity. For navigation, use
        the arrow keys. You can use the skip option if you wish to continue
        directly into the game.`
      },
      {
        element: '#question-container-outer',
        intro: `You need a maximum of 11 and a minimum of 3 people to play.
        When there are 3 people, you can proceed.`
      },
      {
        element: '#social-bar-container',
        intro: `The avatar you chose is displayed here, you also find info
        about yourself and the game in progress, scores for each game round.
        When a player wins 5 rounds he/she becomes the winner.`
      },
      {
        element: '#question-container-outer',
        intro: `When you have the minimum required number of players for
        a game, any player can start by clicking the START GAME button.
        The questions are displayed here in the game.`
      },
      {
        element: '#cardsShow',
        intro: `Different answers are shown here. Pick an answer most
        suitable for the question. Despicably too!`
      },
      {
        element: '#timer-container',
        intro: `The timer is displayed here. It counts down while players
        choose their answers, it also counts down as the CZAR decides
        the winner for that round.`
      },
      {
        element: '#social-bar-container',
        intro: 'Here, you get to know who the next CZAR is.'
      },
      {
        element: '#join-new-game',
        intro: `This allows you to join a new game because too many players
        left yours, or someone won the last game, and you wish to play another.`
      },
      {
        element: '#game-end-container',
        intro: `This allows you to go back to the lobby, join a new game
        or make some children happy and survive by donating to their welfare.`
      },
      {
        element: '.chatpanel',
        intro: `Here as a player you can chat with other players
        in an ongoing game`,
        position: 'top'
      },
      {
        element: '#abandon-game-button',
        intro: `If you don't wish to continue, click on this button, you
        would be taken out of the game.`
      },
      {
        element: '#tweet-container',
        intro: `You can share your experience on twitter here, and invite
        your friends to play with you.`
      }
      ]
    });
    const isGameCustom = () => {
      const custom = $window.location.href.indexOf('custom') >= 0;
      return (custom);
    };

    const tourComplete = () => {
      if (isGameCustom()) {
        $window.location = '/play?custom';
      } else {
        $window.location = '/play';
      }
    };

    const beforeTourChange = (targetElement) => {
      switch (targetElement.id) {
        case 'find-players':
          {
            $scope.$apply(() => {
              $scope.awaitingPlayers = true;
              $scope.gameEnd = false;
              $scope.questionShow = true;
            });
            break;
          }
        case 'player-score':
          {
            $scope.$apply(() => {
              $scope.awaitingPlayers = true;
              $scope.showOtherPlayers = true;
              $scope.gameEnd = false;
              $scope.showStartButton = false;
            });
            break;
          }
        case 'start-game-button':
          {
            $scope.$apply(() => {
              $scope.awaitingPlayers = false;
              $scope.showOtherPlayers = true;
              $scope.showStartButton = true;
              $scope.showTime = false;
              $scope.gameEnd = false;
              $scope.showQuestion = false;
            });
            break;
          }
        case 'question-container-outer':
          {
            $scope.$apply(() => {
              $scope.showStartButton = false;
              $scope.showTime = true;
              $scope.showQuestion = true;
              $scope.gameEnd = false;
              $scop.showOtherPlayers = false;
            });
            break;
          }
        case 'cardsShow':
          {
            $scope.$apply(() => {
              $scope.showCzar = false;
              $scope.gameEnd = false;
            });
            break;
          }
        case 'time-card':
          {
            $scope.$apply(() => {
              $scope.showQuestion = true;
              $scope.gameEnd = false;
              $scope.playerScore = 0;
            });
            break;
          }
        case 'is-czar':
          {
            $scope.$apply(() => {
              $scope.showCzar = true;
              $scope.gameEnd = false;
              $scope.playerScore = 1;
            });
            break;
          }
        case 'game-end-container':
          {
            $scope.$apply(() => {
              $scope.showQuestion = false;
              $scope.gameEnd = true;
              $scope.showChatBody = false;
              $scope.expandChat = 'expand_less';
            });
            break;
          }
        case 'join-new-game':
          {
            $scope.$apply(() => {
              $scope.showQuestion = false;
              $scope.gameEnd = true;
              $scope.showChatBody = false;
              $scope.expandChat = 'expand_less';
            });
            break;
          }
        case 'chatpanel':
          {
            $scope.$apply(() => {
              $scope.showQuestion = false;
              $scope.gameEnd = false;
              $scope.showChatBody = false;
              $scope.expandChat = 'expand_less';
            });
            break;
          }
        case 'abandon-game-button':
          {
            $scope.$apply(() => {
              $scope.showQuestion = false;
              $scope.gameEnd = false;
              $scope.showChatBody = false;
              $scope.expandChat = 'expand_less';
            });
            break;
          }
        default:
          {
            // we don't want to do anything on the default cases
          }
      }
    };

    $scope.gameTour.start()
      .oncomplete(tourComplete)
      .onexit(tourComplete)
      .onbeforechange(beforeTourChange);
  }]);
