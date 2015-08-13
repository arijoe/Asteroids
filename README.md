## Asteroids
[Live](http://ariweitzman.com/asteroids)

A browser game that gives you, the player, the thrill of drifting aimlessly in cold and lifeless space, through an infinite asteroid field that is becoming increasingly unnavigable, armed with only a few regenerating bullets and an upbeat attitude for self-preservation.

## Dependencies
This project requires a modern browser supporting HTML5 and canvas, a keyboard, and a minimum of one phelange (two hands of at least three digits for best gameplay). Libraries required in development are [jquery](https://github.com/jquery/jquery) for some information rendering, [keymaster](https://github.com/madrobby/keymaster) to bind game controls, [keymaster.sequence](https://github.com/chevalric/keymaster-sequence) for a few easter-eggs--both incorporated and ultimately tossed aside, and lastly [Goggle Fonts](https://github.com/jquery/jquery) for the beautiful text-rendering. The game logic is written in JavaScript.

## How to Play

Gameplay has optional features, allowing both intuitive old-fashioned ship controls with the arrow keys
that propel the ship relative to its own direction, and 'slide controls' that propel it relative to the
screen.

Key/Sequence | Action
-------------|-------
Left         | Rotate Counter-Clockwise
Right        | Rotate Clockwise
Up           | Move Forward
Down         | Move Backward/Brake
Spacebar / 'q' | Fire bullet
'a'/'s'/'w'/'d'    | Advanced optional slide controls
'r'          | Restart game, at any time
'p'          | Pause/play
Number Keys  | Jump to Level (single-digit only)
'a', 'b'     | Jump to Level 19 with 19 lives

## Features
Every feature of this project is personally calculated, coded, or drawn.
- Ship, bullet, asteroid, and star animations were all written with canvas-rendering operations.
- Trajectories are calculated using trigonometry and vector mathematics.
- Data-preservation and rendering are handled with JavaScript and Backbone.
- Style and scaling are all handled with good old CSS.

---------------------


*Created 2015 by Ari Weitzman*
