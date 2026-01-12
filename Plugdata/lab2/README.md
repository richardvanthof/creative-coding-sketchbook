# Lab #2

Make an audio [looper~] abstraction that is based on a signal delay line (a combination of [delwrite~] and [delread4~]) with feedback from the output of [delread4~] to the input of [delwrite4~]. When the audio is fed back from the output to the input of the delay line the audio will keep on repeating (= looping).

Use the following

[download](https://www.evdh.net/crit/creative_programming/lab_2/crpr_lab2_basis.zip)

that gives you a draft for the looper~ abstraction and the main patch using the abstraction.

The object has 4 inlets:

- inlet~ 1 is the audio input of the looper~ abstraction. The audio input is the signal that can be recorded / captured in the loop.
- inlet 2 sets the delay time of the delay line. Since we use feedback between the input and the output of the delay line the delay time corresponds to the duration of the loop.
- inlet 3 enables the audio input at inlet~ 1. A value of 0 mutes the audio input and a value of 1 enables the audio to be captured in the loop.
- inlet 4 enables the feedback between the output and the input of the delay (the [delwrite~] and [delread4~] pair). A value of 1 results in a situation where the output is fed back to the input, resulting in a situation of permanent repetition. A value of 0 mutes the feedback and thereby it stops the repetition.

Use the main patch to play around with the possibilities of the looper(s). Extend the main patch in different creative directions.

Include comments in both your abstraction and your main patch.

Submit both your main patch and your looper~ abstraction.