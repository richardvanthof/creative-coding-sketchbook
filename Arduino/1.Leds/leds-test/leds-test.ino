/**
Simple test program that operates 3 LEDs.
*/

int btn = 2;

int leds[] = {10, 11, 12};
int length = sizeof(leds) / sizeof(leds[0]);
int ledIdx = 0;

int ledDelay = 500;
unsigned long myTime;


int btnVal = 0;

void setup() {
  // put your setup code here, to run once:
    for(int i = 0; i < length; i++) {
      pinMode(leds[i], OUTPUT);  // sets the pin as output
    }
    pinMode(btn, INPUT);

    // Init serial messages
    Serial.begin(9600); 
    Serial.println("Hello from Arduino!");
} 

void loop() {
  // put your main code here, to run repeatedly:
  myTime = millis();
  for(int i = 0; i < length; i++) {
    for(int j = 0; j < 3; j++) {
      digitalWrite(leds[i], HIGH); // analogRead values go from 0 to 1023, analogWrite values from 0 to 255
      delay(ledDelay);
      digitalWrite(leds[i], LOW); // analogRead values go from 0 to 1023, analogWrite values from 0 to 255
      delay(ledDelay);
    }
  }
  btnVal = digitalRead(btn);
  Serial.println(btnVal);
}
