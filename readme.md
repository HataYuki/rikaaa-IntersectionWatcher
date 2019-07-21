# rikaaa-IntersectionWatcher.js
The plugin surveil intersection of elements and viewport.

[:heavy_exclamation_mark:] The plugin is copying the IntersectionObserver, however it is not perfect system, but minimamaize the function.

## Description
- This is the plugin in order to supply similar function of IntersectionObserver with brower of without IntersectionObserver.
- [:heavy_exclamation_mark:] This plugin is not perfect system. Therefor it is not recomended to use as polyfill. Please be carefull, in case you use the plugin as polyfill.
- Although the plugin is not utilize the whole function of the IntersectionObserver, It is recomended to use simiar function simple plugin, for example IE11.
- This plugin is copying the methodorogy of the IntersectionObserver.
- [:heavy_exclamation_mark:]The plugin is only applicable to the vertical intersection.

## Usage
```bash
import rikaaaIntersectionWatcher from 'rikaaa-IntersectionWatcher.js'
```

```bash
var callBack = function (entries) {
    entries.forEach(function (entry) {

        console.log(entry.target);
        console.log(entry.isIntersecting);

    });
};

var option = {
    root: document.querySelector('.scroll-area-1'),
    rootMargin:'100px',
}

var riw = new rikaaaIntersectionWatcher(callBack, option);

riw.observe(document.querySelector('.scroll-area-target-1'));
```

## Constractor arguments
| argument | require | type | description |
---- | ---- | ---- | ----
| callback | require | Function | Set the callback|
| option | | Object | Please see below|

#### option
| key | type | description |
---- | ---- | ----
| root | Element | Set the element as viewport. default value is documentElement. |
| rootMargin | String | set the margin. The unit is percentage and pixel.|



## Methods
| method | type |description |
---- | ---- | -----
| rikaaaIntersectionWatcher.observe(targetElement) | Element | set the target of observed. |
| rikaaaIntersectionWatcher.unobserve(targetElement) | Element |　set the target of unobserverd. | 
| rikaaaIntersectionWatcher.disconnect() | none | Ends the moniter of observed. |


## Callback arguments
| argument | type　| description |
---- | ---- | ----
| entry.target | Element | ElementNode of observed. |
| entry.isIntersecting | boolean | The parameter of intersection. |

## Browser Support
- Google Chrome
- Safari
- Firefox
- Edge
- IE11 +

## License
MIT  © [rikaaa.org](http://rikaaa.org)