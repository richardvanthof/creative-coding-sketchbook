# Lab 5

Make a `[threshold]` abstraction that copies part of the behaviour of the `[threshold~]` object but fully works in the domain of messages (and not the domain of signals). You have to implement the trigger and rest values but you don't have to implement the debounce times.

- When the numbers on the left inlet have been below the rest level and currently exceed the trigger level a bang is produced on the trigger output.
- When the numbers on the left inlet have been above the trigger level and reach a value below the rest level a bang is produced on the rest level.
- A new trigger can only be produced after a rest has occurred.
- A new rest can only be produced after a trigger has occurred.
- The abstraction should have three inlets (not like `[threshold~]` that has two):
    - the left inlet receives the floats that are being checked against the trigger and rest values.
    - the middle inlet sets the trigger level.
    - the right inlet sets the rest level.

The object has two outlets:

- the left outlet gives a bang for the trigger
- the right outlet gives a bang for the rest

Use the `[adc~ 1 2]` object and the `[env~]` object to capture the sound of the microphone.

Connect your `[threshold]` abstraction to the output of `[env~]`.

Use the 5 sounds patch and connect a sound to the trigger outlet and another sound to the rest outlet.

Adjust the trigger and rest levels in such a way that the sound gets triggered at the moment you clap your hands in front of the microphone.

Submit both your main patch and your abstraction using brightspace.