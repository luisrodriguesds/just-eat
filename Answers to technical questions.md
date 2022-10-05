
1. How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.\
I spent something around 2h to finish the coding test. I'd like to add the tests end-to-end using the cypress library because you can do the automatic tests using less code, and you can implement it on your deployment pipeline easily.

2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.\
One feature really useful that come from the last ECMAScript version it's the method **at()** because when you need to get the last item of the array you don't need this anymore 
```js
const array = ['a', 'b', 'c'];
console.log(array[array.length - 1])
``` 
Now you just need 
```js
const array = ['a', 'b', 'c'];
console.log(array.at(-1))
``` 
simple and less code.

3. How would you track down a performance issue in production? Have you ever had to do this?
I have never needed to do this before, but I saw one tool nice tool to do it called Dynatrace however it's just for react applications