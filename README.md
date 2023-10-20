# jMini
Minimalistic JavaScript Library, as a replacement for jQuery

Why yet another JavaScript library?

There are certainly more than enough JS libraries out there already, there is little reason to create yet another one. 
And let's be clear: this is a library for my specific needs, most likely it is not the one you are looking for.

Are you still there? Good. Because this library is different. This is an alternative for those who use jQuery, but found that it became bloated and slows down your page load times. True, jQuery is still a lot lighter than most other modern JS libraries, but that's not an excuse to add a few dozen kB to every project. So this is where I started to think about making a more lightweight alternative.

Design goals:
  * Provide the same core functionalitiy of jQuery
  * Ignore old browsers and specia setups that nobody uses anyway.
    * Target it Firefox, Chrome, Edge and Safari in modern versions. Because that's what users, er, use.
  * Remove all functions for which there is now a usable equivalent built-in to JavaScript
    * Unless the plain JS code would eb overly verbose and we can safe a few bytes by providing a wrapper
  * Minimal error checking and failsafes. You are responsible for checking that your code is safe!

The target is to create a library that is *significantly* smaller than jQuery. At this time (just starting the project) it is not clear if this can be achieved. It is still worth trying...
