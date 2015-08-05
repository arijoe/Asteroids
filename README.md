## Asteroids
An HTML5 Canvas browser game that gives you, the player, the thrill of drifting through an infinite asteroid field that is becoming increasingly hostile to life armed with only five regenerating bullets for self-defense.

## Dependencies
This project requires the [colorize gem](https://github.com/fazibear/colorize) to render from the command line. Otherwise, all the game requires to play is a working command line, ruby version 2.1 or higher, and two players.

## How to Use
To begin a game, clone the repo and navigate to its path in your terminal window. First, you'll need to install the colorize gem, which is done simply:
```linux
$ gem install colorize
```

Then to load the game in your terminal, type:
```linux
$ ruby index.rb
```

Choose a name for each player and then begin playing! Moves take the format of "start move-end move" (i.e. "A2-A4").

The game also allows users to save one board state for future use. To save a game state at any time, when prompted for a move just type "save":
```linux
A (white): Enter start and end position, divided by a dash: save
```
To load a previously saved board, type "load":
```linux
T (black): Enter start and end position, divided by a dash: load
```

## Technologies
This rendition of Chess is written entirely in Ruby. To add color to the board, we employed the colorize gem.

To simplify movement among the pieces, we created a base Piece class from which all other pieces inherited. This allowed us to avoid redundancy in our code, keep our code dry, and avoid redundancy in our code.

In order to evaluate whether a move is valid or not, the program simulates future board states based on the proposed move. If the move would put the moving player in check, or does not obey the rules of movement for the moving piece, we reject the move. To accomplish the future board simulation, we deep dup the board and raise an error to alert the user that the proposed move is not a valid one.

To save board states, we used YAML. The program converts the Board's grid attribute object to YAML and saves it as a text file. When the user loads a game, the program reconstitutes this grid from YAML and passes it to the Game instance.
