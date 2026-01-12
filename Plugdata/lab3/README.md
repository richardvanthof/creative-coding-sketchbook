# Lab 3
**Assignment 3.1**
- [x]  Make a patch that records the live audio input into an array (table) of 4 seconds.
    
    It should be a real-time recording from the built-in microphone or line input. The recording should start when you press the 'r' key.
    
    Use amongst others the following objects:
    
    - key
    - array (from the Put menu)
    - tabwrite~
    - sel
    - adc~
- [x]  Extend the patch with a playback function.
    
    The patch should playback the sound in the array when you press the 'p' key on the keyboard. It should stop playing back when you release the 'p' key.
    
    Use amongst others the following objects:
    
    - key
    - keyup
    - tabplay~ (or tabread~ (or tabread4~) in combination with line~)
    - dac~
- [x]  **Assignment 3.2**
    
    Download the [lab_3_2_template](https://www.evdh.net/crit/creative_programming/lab_3/lab_3_2_template.zip). It contains the lab_3_2_main patch that uses the my_soundfiler abstraction.
    
    When you press the bang to 'load a file' you get an open file dialogue that lets you choose which audio file (.wav or .aiff) you want to open and load into the 'my_array' array. The size of the array scales automatically and adapts to the length of the chosen audio file.
    
    After loading the file, [my_soundfiler] outputs the duration of the file in milliseconds on the right outlet and the length of the audio file expressed in samples on the left outlet.
    
    Extend the patch in such a way that the file is played forwards when pressing the 'play forwards' bang and played in reverse (from the end to the beginning) when pressing the 'play backwards' bang.
    
    Use amongst others [trigger], [pack] and [float].