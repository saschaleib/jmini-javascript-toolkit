# jMini – the minimalistic JavaScript Toolbox

This is an attempt to create a JS toolbox with minimal impact on page download size and performance. This is work in progress, so it is currently not very useful for most purposes.

Design goals:
  * Keep it small and simple and modular!
  * Don't force developers to download large files with functions that they never use!
  * Ignore old browsers and specia setups that nobody uses anyway.
    * Target it Firefox, Chrome, Edge and Safari in modern versions. Because that's what users, er, use.
  * Remove all functions for which there is now a usable equivalent built-in to JavaScript
    * Unless the plain JS code would eb overly verbose and we can safe a few bytes by providing a wrapper
  * Minimal error checking and failsafes. You are responsible for checking that your code is safe!

The ultimate goal is to provide all or most functionality that jQuery offers (plus a few other useful helpers and tools) at a *significantly* smaller file size. At this time (just starting the project) it is not clear if this can be achieved. It is still worth trying...
