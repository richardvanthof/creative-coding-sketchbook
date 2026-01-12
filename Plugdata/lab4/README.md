# Lab 4
- [x]  4.1
    
    Make a patch that uses the a s d f and g keys on the keyboard to trigger the five sounds provided in the [five_sounds](https://www.evdh.net/crit/creative_programming/lab_4/five_sounds.zip) template.
    
    [five_sounds .zip](attachment:aa0e2e95-b51f-4c3b-be00-b1507c8aba69:five_sounds_.zip)
    
    Use the following objects: [key] and [select]
    
    Include comments in your patch.
    
    Save the patch as lab#4.1.pd
    
- [x]  4.2
    
    Make a patch that uses [key] and [keyup] to measure the duration of the keypress for each of the following keys: a s d f and g and displays these in separate number boxes (one for each key).
    
    Use the following objects: [key], [keyup], [select], [timer] and number boxes.
    
    Include comments in your patch.
    
    Save the patch as lab#4.2.pd
    
- [x]  4.3
    
    Combine the patches #4.1 and #4.2 in such a way that once the key has been released the corresponding sound gets played over and over again with a time interval that corresponds to the duration of the keypress. Use a [spigot] object to be able to interrupt the repetition of the sound.
    
    Please make sure that each of the five sounds has its own repetition mechanism in the patch so that each sound can repeat at its own tempo.
    
    Use a.o. the following object(s): [delay] [spigot] [trigger]
    
    Include comments in your patch.
    
    Save the patch as lab#4.3.pd
    
- [x]  4.4
    
    Extend patch #4.3 in such a way that each of the sounds only repeats 4 times.
    
    Use a.o. the following object(s): [float] [>] [select] [trigger]
    
    Include comments in your patch.
    
    Save the patch as lab#4.4.pd
    
- [x]  4.5
    
    Go back to patch #4.3 and extend it in such a way that the repetition time gets multiplied by 0.9 for each time the sound repeats. By multiplying the time by 0.9 (over and over) the repetition goes faster and faster. The repetition should stop (use [spigot]) when the repetition time becomes shorter than 10 ms.
    
    As above each sound should have its own repetition time and its own repetition mechanism.
    
    Don't forget to use [trigger] and [float] objects where needed.
    
    Include comments in your patch.
    
    Save the patch as lab#4.5.pd
    
    As usual, submit your patches through brightspace.