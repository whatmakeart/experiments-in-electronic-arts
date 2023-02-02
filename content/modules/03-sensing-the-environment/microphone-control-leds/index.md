---
title: "3.0 - Microphone - Control LED Levels"
date: 2020-01-26T23:11:13Z
draft: false
---

```C
/*
This is the code to make a LED blink with the music.
You have to set the threshold so it' sensible enough to make the led blink.
You connect an LED to PIN13 and the Sound Sensor to Analog Pin 0
 */

const int potPin = A2; // pin for the potentiometer
int potValue = 0; // value of the potentiometer

const int micPin = A0; // pin for the microphone

const int sampleWindow = 50; // milliseconds of microphone sample
unsigned int sample; // sample value
const long samplePotInterval = 500; // time between reading and printing Potentiometer value for testing

unsigned long currentMilliseconds = 0;
unsigned long previousMillisecondsPot = 0; // Time track for potentiometer

int handsAndEyesLEDs = 4;
int mouthLEDs = 6;
int bumbleLEDs1 = 5;
int bumbleLEDs2= 7;

int threshold = 425; //Change This
int micVolume;

void setup() {
  Serial.begin(9600); // For debugging
  pinMode(handsAndEyesLEDs, OUTPUT);
  pinMode(mouthLEDs, OUTPUT);
  pinMode(bumbleLEDs1, OUTPUT);
  pinMode(bumbleLEDs2, OUTPUT);
}
void loop() {
  blueMicBlink();
  //readMicVoltRange()
  //printPot();
}

void blueMicBlink() {
    micVolume = analogRead(micPin); // Reads the value from the Analog PIN A0
    potValue = analogRead(potPin);
    threshold = potValue/1.2;
    threshold = potValue;

   // Serial.println(threshold);

  if (potValue <= 100){
   turnOffLights();
  }

  else if (potValue >= 101) {

  if(micVolume >= threshold){
    turnOnLights();
  }
  else {
  turnOffLights();
  }
  }
}


void readMicVoltRange() {
  unsigned long startMillis = millis();
  unsigned int peakToPeak = 0;
  unsigned int signalMax = 0;
  unsigned int signalMin = 1024;

  while (millis() - startMillis < sampleWindow)
  sample = analogRead(micPin);
  if (sample < 1024)
  {
    if (sample > signalMax)
    {
      signalMax = sample;
    }
    else if (sample < signalMin)
    {
      signalMin = sample;
    }
  }
peakToPeak = signalMax - signalMin;
double volts = (peakToPeak * 5.0) / 1024;

Serial.println(volts);
}

void printPot() {
  if (currentMilliseconds - previousMillisecondsPot >= samplePotInterval) {
    // save the last time you checked the potentiometer
    previousMillisecondsPot = currentMilliseconds;
    Serial.println("Potentiometer Voltage: " + analogRead(potPin));   // serial print the voltage output from the analog read of the potentiometer pin
  }

}

void turnOffLights (){
    digitalWrite(handsAndEyesLEDs, LOW); // Turn OFF Led
    digitalWrite(mouthLEDs, LOW); // Turn OFF Led
    digitalWrite(bumbleLEDs1, LOW); // Turn OFF Led
    digitalWrite(bumbleLEDs2, LOW); // Turn OFF Led
}

void turnOnLights (){
    digitalWrite(handsAndEyesLEDs, HIGH); //Turn ON Led
    digitalWrite(mouthLEDs, HIGH); //Turn ON Led
    digitalWrite(bumbleLEDs1, HIGH); //Turn ON Led
    digitalWrite(bumbleLEDs2, HIGH); //Turn ON Led
}




```
