---
title: "05.06 Break Project Code into Separate Functions"
date: 2020-01-26T23:11:13Z
draft: false
---

## Assignment Deliverables

1. Arduino .ino sketch file with:
   1. `setup();` function with a `serialBegin(9600);` and a a `serialPrint("Your Program Name is Starting");` to indicate the sketch is on the Arduino.
   2. `loop();` function with all of your named function calls listed.
   3. After the loop, function delcarations `void mySuperFunction() { }` make sure to include `void` and the `{ }` curly braces.

## Assignment Overview

Now that you wrote a "Prototype Triangle", you have most of the information you need to separate your code into functions. Most if not all of these functions will not exist yet. You also will likely not have any code in the functions yet. That is ok.

The first step is to translate the software components from your Prototype Triangle into function names. Then you will list them in order of operation in the `loop();`. Some functions may be listed more than once. Then after the loop's lat `}` you declare each of the functions.

## Process

Let's continue to use the toaster example. In the toaster Prototype Triangle software list, we have the following:

- Check if toast is inserted and lever is pressed down
- Check if toaster knob is set to light or dark
- Set timer based on the toast setting
- If time is set, then turn on the toaster heater
- If heater is on, then turn on LED
- Check if the timer is finished
- If timer is finished, then turn off the toaster heater
- If heater is off, then turn of LED
- If the heating element and the timer are finished, then pop up the toast
- Standby mode waiting for a new piece of toast

If we look at the first one we can change that to a function so "Check if toast is inserted and lever is pressed down" becomes
