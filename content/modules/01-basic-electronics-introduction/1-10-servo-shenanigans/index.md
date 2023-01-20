---
title: "1.10 Servo Shenaigans"
date: 2020-01-26T23:11:13Z
draft: false
---

Servo motors can move in precice arcs differently than a free spinning motor like an electric drill. This control ability offers unique possibilites for projects. We will use the example Arduino Servo Sweep sketch by [BARRAGAN](http://barraganstudio.com).

This code introduces a few new concepts that we will present briefly here but will investigate in more depth later in the semester.

```C

#include <Servo.h>
```

The line at the top is including a library that has commands and functions for the servo motor. By using this include line we have access to code to control the servo that we do not have to write ourselves.

```C

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
```

One of those new commands is `Servo`. This command is like declaring a variable. It creates a new object or a new servo motor to control called `myservo`. We could call the servo `superservo` the name is not important, but if the name changes then it needs to be changed everywhere in the code.

In the next line a integer variable `pos` to indicate position is declared with an initial value of 0. This is the variable that will decide what rotational position the servo will move to.

```C

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}
```

The next section of the code is the `setup();` function. This function runs only once and it tells the Arduino what pin the servo is attached to. In this case it uses pin 9.

```C

void loop() {
  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
}
```

The next section of code is the `loop();` function. This function loops over and over again and controls the sweep of the servo motor arm. It uses two `for` loops. We will examine `for` loops later in the semester but basically they do somthing a certain ammount of times or until some condition is met. In this case they move the servo arm one direction until it gets to 180 and then they move the servo arm the other direction until it gets to zero. Then the process repeats.

There are a few parameters that you can change to control the servo.

```C

#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
}
```
