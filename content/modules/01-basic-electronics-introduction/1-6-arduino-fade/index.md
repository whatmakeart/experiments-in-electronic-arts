---
title: "1.6 - Arduino Fade"
date: 2020-01-26T23:11:13Z
draft: false
---

Now that we have the LED blinking with the Arduino, how can we adjust the brightness of the LED? We can varry the input into the LED very quickly over time to simulate a fading effect. Remember the Arduino is looping so fast that in most cases the program excutes instantaneously as far as human perception is concerned. Although the Arduino is a digital device it can simulate analog signal output using Pulse Width Modulation or PWM. This is like turning a switch on and off vary quickly and leaving it on or off for specific ammounts of time.

The Arduino example sketch below introduces some new coding concepts such as variables, math, and conditional statements. We will go over each of these.

## Variables

At the top of the sketch we have 3 integer (number) variables with initial values. The syntax for declaring a variable is to say what kind it is, then its name and then optionally what its initial value is. So the line `int led = 9;` says that the type of variable is an integer, the name is led, and the initial value is 9. There is also a variable called brightness with an initial value of 0 and a variable called `fadeAmount` with an intitial value of 5.

## Setup Function

Next comes the `setup();` function. This uses the same `pinMode();` function from the Blink example to set the variable `led` (which is pin 9) to be an `OUTPUT`. Nothing else happens in the `setup();` function and remember this function only runs once.

## Loop Function

Then the `loop();` function begins. It introduces a new function called `analogWrite();` this is similair to the `digitalWrite();` function from the Blink example except that it can use PWM to simulate an analog output signal. This function tells the `led` to be set at the value of the variable `brightness` rather than a simple `HIGH` or `LOW`, on or off, like in `digitalWrite();`.

### Math

Next is a math equation. After the led has been set to the brightness value, this line says to change the value of variable `brightness` to be be `brightness` plus the value of the variable `fadeAmount`. So it is 0 + 5 = 5.

### Conditional If statement

Next is one of the most useful pieces of computer logic, the conditional if statement. If something happens then do a thing. In this case the "if" is **IF**the value of `brightness` is less than or equal to zero **OR** if the value of `brightness` is greater than or equal to 255 **THEN** flip the value or direction of the fade.

### Delay

Then the `delay();` function is used to pause for 30 milliseconds. This value controls the speed of the fade.

```C

int led = 9;         // the PWM pin the LED is attached to
int brightness = 0;  // how bright the LED is
int fadeAmount = 5;  // how many points to fade the LED by

// the setup routine runs once when you press reset:
void setup() {
  // declare pin 9 to be an output:
  pinMode(led, OUTPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  // set the brightness of pin 9:
  analogWrite(led, brightness);

  // change the brightness for next time through the loop:
  brightness = brightness + fadeAmount;

  // reverse the direction of the fading at the ends of the fade:
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }
  // wait for 30 milliseconds to see the dimming effect
  delay(30);
}
```
