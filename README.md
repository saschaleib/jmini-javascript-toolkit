# jMini – a smaller JavaScript Toolbox

JavaScript frameworks only become larger and heavier over time. This is an attempt to go the other direction: making a lightweight toolbox that can be tailored to contain *only* the functions you really need.

This is still "work in progress", so it might not be ready for your upcoming project, but if this interests you, have a look anyway.

The design goals here are:
  * Keep it small and simple – and modular!
  * Don't force users to download large files with functions that aren’t actually in use!
  * Code against the standard, not implementation details.
  * Support standard-compliant browsers, not some exotic half-botched implementations that nobody uses anyway.
  * Remove all functions for which there is now a usable equivalent built-in to JavaScript
    * Exceptions for improved syntax (e.g. chaining support) and/or if plain JS code would be overly verbose.
  * Minimal error checking and failsafes. You are responsible for checking that your code is safe and that exceptions are caught!

For more information, head over to the project page at [code.kolmio.com/jmini](http://code.kolmio.com/jmini/), where you can find the full documentation and a nifty [download tool](http://code.kolmio.com/jmini/download.html) that allows you to tailor exactly which functions you want included. This repository contains the entire web site that you can also find over there.

Alternatively, you can also [download the full library](https://github.com/saschaleib/jMini/blob/main/jmini.js) here.
