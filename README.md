# React Notes
## by Mihovil Mandic for Lab 3, CS52, Spring 2019

The project is live [here](http://mihovilm-cs52-lab3.surge.sh)!

## What is this
A simple React app for notes. The notes contain Markdown content and can be dragged across the screen (and over each other). The database used is Firebase.
I implemented zIndex (bring to front) on clicking and dragging. The newest note will be on top by default. 
Expanding the textareas for title or content resizes the note. 
The zIndexing is done by iterating over the Map of objects and then finding the maximum zIndex. After that I just increase it on the one currently being dragged.
Also I'm randomizing the initial position of the notes between 40px and about 50% of the viewport height/width.

## Future plans
Remodify to support Hooks.

## Screenshots
![](./img/screen0.png)
![](./img/screen1.png)
![](./img/screen2.png)
![](./img/screen3.png)
![](./img/screen4.png)
![](./img/screen5.png)
![](./img/screen6.png)
