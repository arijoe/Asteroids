## Asteroids
[Live](http://ariweitzman.com/asteroids)

An browser game that gives you, the player, the thrill of drifting aimlessly in cold and lifeless space, through an infinite asteroid field that is becoming increasingly unnavigable, armed with only five regenerating bullets and an upbeat attitude for self-preservation.

## Dependencies
This project requires a modern browser supporting HTML5 and canvas, a keyboard, and a minimum of one phelange. Libraries required in development were [jquery](https://github.com/jquery/jquery) for some information rendering, [keymaster](https://github.com/madrobby/keymaster) to bind game controls, [keymaster.sequence](https://github.com/chevalric/keymaster-sequence) for a few easter-egg--both incorporated and ultimately tossed aside, and lastly [Goggle Fonts](https://github.com/jquery/jquery) for the beautiful text-rendering. The game logic is written in javascript.

## How to Play
Key/Sequence | Action
-------------|-------
Left         | Accelerate Left
Right        | Accelerate Right
Up           | Accelerate Up
Down         | Take a Guess
Spacebar / 'w' | Fire bullet
'r'          | Restart game, at any time
'p'          | Pause/play
Number Keys  | Jump to Level (single-digit only)
'a', 'b'     | Jump to Level 19 with 19 lives

## Features
Every feature of this project is personally calculated, coded, or drawn.
- Ship, bullet, asteroid, and star animations were all written with canvas-rendering operations.
- Trajectories are calculated using vector math.
- Data-preservation and rendering are handled with javascript and backbone.
- Style and scaling are all handled with good old css.

---------------------


*Created 2015 by Ari Weitzman*
