---
title: "6.10 Arduino Long Distance Communication"
date: 2020-01-26T23:11:13Z
draft: false
---

## Long Wires

### RS422 or RS485

Use RS422 or RS485 and twisted pair
need MAX485 TTL to RS-485 Interface Module
https://ipc2u.com/articles/knowledge-base/the-main-differences-between-rs-232-rs-422-and-rs-485/
https://www.omega.com/en-us/resources/rs422-rs485-rs232
http://www.rs485.com/rs485spec.html

[Voltage Drop Calculator](https://www.calculator.net/voltage-drop-calculator.html)

### Cat 5 with long wires and capacitors for noise

Use Cat 5 and one pair for power / GND and the other pair for signal and gnd. A 100 nf ceramic capacitor from the arduino input pin to ground can help filter out RF interferance

bypass capacitors

- part 1 https://www.allaboutcircuits.com/technical-articles/clean-power-for-every-ic-part-1-understanding-bypass-capacitors/
- part 2 https://www.allaboutcircuits.com/technical-articles/clean-power-for-every-ic-part-2-choosing-and-using-your-bypass-capacitors/

decoupling capacitors - http://www.thebox.myzen.co.uk/Tutorial/De-coupling.html

Difference between capacitors bypass / decoupling - https://www.circuitbread.com/ee-faq/what-is-the-difference-between-coupling-decoupling-and-bypass-capacitors

without using specific module - [debouncing](https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce) may help with just plain twisted pair wires

## Wireless Communication

- nRF24L01+ by Nordic Semi

Make is small by burning the arduino bootloader to a stand alone microcontroller to recieve the signals
https://docs.arduino.cc/built-in-examples/arduino-isp/ArduinoToBreadboard
