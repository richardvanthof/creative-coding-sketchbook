/**
*Concept: Elias Ilmari Liinamaa*

**The game goes as follows:**

1. A random LED lights up and stays lit. The player memorises it’s location (location A).
2. The player presses the button to start the game.
3. LEDs light up in a random sequence. When the LED at location A lights up, the player needs to press the button. If they miss, the sequence continues until the player clicks the button at the right time.
4. Once the player *catches* the right LED, all the LEDs flash twice together.
5. After the two flashes, we return to step 1. However, as the player keeps playing the game, the speed at which the LEDs light up speeds up.
*/

int btn = 2;  // Button pin
int leds[] = {10, 11, 12};  // LED pins
int length = sizeof(leds) / sizeof(leds[0]);  // Number of LEDs

int gameState = 0;  // 0 = waiting, 1 = target shown, 2 = sequence, 3 = flash
int startingSpeed = 1000;  // Starting speed in ms
unsigned long previousTime = 0;
unsigned long interval = startingSpeed;
int rounds = 1;

int currentLed = 0;  
int targetLed = 0;

// Debounce variables
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;
int lastButtonState = LOW;
int buttonState = LOW;

void setAllLEDs(int state) {
  for (int i = 0; i < length; i++) {
    digitalWrite(leds[i], state);
  }
}

bool readDebouncedButton() {
  int reading = digitalRead(btn);

  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;

      if (buttonState == HIGH) {
        lastButtonState = reading;
        return true;
      }
    }
  }

  lastButtonState = reading;
  return false;
}

void setup() {
  for (int i = 0; i < length; i++) {
    pinMode(leds[i], OUTPUT);
  }
  pinMode(btn, INPUT);
  randomSeed(analogRead(A0));
  Serial.begin(9600);
}

void loop() {

  switch (gameState) {

    // -------------------------
    // 0 — Select random target
    // -------------------------
    case 0:
      targetLed = random(0, length);
      setAllLEDs(LOW);

      Serial.print("Target LED: ");
      Serial.println(targetLed);
      digitalWrite(leds[targetLed], HIGH);
      gameState = 1;
      break;

    // -------------------------
    // 1 — Show target LED until button press
    // -------------------------
    case 1:
      

      if (readDebouncedButton()) {
        setAllLEDs(LOW);
        Serial.println("Start button!");
        gameState = 2;
        previousTime = millis();  // reset LED timer
      }
      break;

    // -------------------------
    // 2 — Random sequence + wait for correct hit
    // -------------------------
    case 2: {
      unsigned long currentTime = millis();

      if (currentTime - previousTime >= interval) {
        previousTime = currentTime;

        setAllLEDs(LOW);
        currentLed = random(0, length);
        digitalWrite(leds[currentLed], HIGH);
      }

      if (readDebouncedButton()) {
        Serial.println("button clicked!");

        if (currentLed == targetLed) {
          Serial.println("Correct LED caught!");
          gameState = 3;
        }
      }
      break;
    }

    // -------------------------
    // 3 — Flash all LEDs (you can expand this)
    // -------------------------
    case 3:
      for (int i = 0; i < 2; i++) {        // flash twice
        setAllLEDs(HIGH);
        delay(300);
        setAllLEDs(LOW);
        delay(300);
      }
      rounds =+ 1;
      interval *= 0.90;  // 5% faster every round
      gameState = 0;
      // TODO: Add flashing logic, then go back to state 0
      break;
  }
}
