### Lightweight, cross-browser infinite scroll. This is jQuery version. Angular version you can view [this](https://github.com/AzatKhalilov/azScrollAngular)

#Get Started
**1.** Get azScroll in one of the following ways:

+ or clone this repository
+ or [download by link](https://github.com/AzatKhalilov/azScroll/blob/master/src/js/azScroll.js)
+ or via [Bower](http://bower.io/) by running: bower install azScroll

**2.** Include azScroll.js in your index.html

**3.** azScroll method is called on the selector for which you want to scroll to check

`$('selector').azScroll()`

azScroll method can takes an optional object that override default settings.

`$('selector').azScroll({
  direction:'top',
  distanceTop:10
})`

**4.**   Event "reach.scroll" is triggered when the scroll reach the top or bottom

`$('selector').on('reach.scroll',function(){
})`

#Options

+ **direction** (default:'top') (values:"top|bottom|topbottom") - the boundary which must be checked
+ **distanceTop**(default:1) - offset from top border
+ **distanceBottom** (default:1) - offset from bottom border
+ **debounce** (default:250) - The delay (in milliseconds) after which the event will be triggered

#Methods

Disable trigger event

`$('selector').azScroll('disable')`

Enable trigger event

`$('selector').azScroll('enable')`

Destroy azScroll's data and unsubscribe from scroll event

`$('selector').azScroll('destroy')`


#License
azScroll is licensed under the MIT license. See the LICENSE file for more details.
