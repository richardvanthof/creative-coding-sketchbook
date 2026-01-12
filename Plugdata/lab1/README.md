
# Lab 1
> Create rock, paper, scissors

### Assignment 1.1
Make a patch in which the computer generates a random number and you have to guess which random number it is.

The generated random numbers should only have three possibilities: 0, 1, en 2.

Use a bang GUI object to trigger the generation of the number.

Use another three bang GUI objects for the player to guess whether it is 0, 1 or 2 (one bang for each number).

After guessing the number the patch should print 'right!' or 'wrong!' in the Pd window (console).

Use the following GUI objects: Bang

Use a.o. the following regular objects: [== ], [select ], [random ], [print].

Optionally you can use: [trigger ] and [float ].

Use message boxes.

Add comments to your patch to explain its functioning.

Download and use the

[lab-1_template (1).zip](attachment:10cbf3d7-a37e-4822-8e67-ffe163694bdc:lab-1_template_(1).zip)

[template](https://www.evdh.net/crit/creative_programming/lab_1/lab-1_template.zip)

for the assignment.

Tip: it is important to choose what you connect to the left inlet of [== ] and what to the right inlet.

### Assignment 1.2

Extend the patch in such a way that it becomes a Rock Paper Scissors game.

The patch should print what the computer 'chose', what you chose and whether you 'win', 'loose' or have a 'tie' as result.

Inside the patch rock corresponds to a value of 0, paper to 1 and scissors to 2.

```
User: choose rock (0), paper (1) or scissors (2);
Computer randomly selects rock (0), paper (1) or scissors (2);

if user-computer = 0: draw
rock + paper = paper wins; 
paper + scissors = scissors wins;
rock + scissors = rock wins; 

c.    u.    
Rock	Rock	Tie: 0-0=0
Paper	Paper	Tie; 1-1=0;

Paper	Scissors	Player 2 wins; 1-2=-2
Scissors	Rock	Player 2 wins; 2-0=2
Rock	Paper	Player 2 wins; 0-1=-1;

Paper	Rock	Player 1 wins; 1-0=1;
Scissors	Paper	Player 1 wins; 2-1=1
Rock	Scissors	Player 1 wins; 0-2=-2;

Scissors	Scissors	Tie; 2-2=0
```

In addition to the above objects, use the [trigger ], [float] and the [- ] object.

Where the above patch had a separate bang object to generate the number and three bangs to guess the number, this patch should only have three bang objects for the choice that you make. When any of these bangs is pressed the choice of the computer should be generated (as well).

For this assignment it's important to really make sure that things happen in the right order.

Add comments to your patch to explain its functioning.

Tip: The [- ] object is used to substract the computer generated value and the user given value form each other. Use a [select ] object after the [- ] object.

Download and use the

[lab-1_template (2).zip](attachment:e460b446-014c-4bd5-a95c-4a4760a3a781:lab-1_template_(2).zip)

[template](https://www.evdh.net/crit/creative_programming/lab_1/lab-1_template.zip)

for the assignment.

Tip: You could use the [mod ] object after the [- ] object to make things simpler but there is no need to do so.