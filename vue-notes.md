# Vue

## Data Binding
In my html, I have a div with some elements inside. I also just have a connection to the script files I need.
```html
<body>
  <div id='root'>
    <input type="text" id="input" v-model="message">
    <p>The value of the input is: {{ message }} with an outcome of {{outcome}}</p>
  </div>
  {{message}}

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="script.js"></script>
</body>
```
In my script file, I do the following:
* create a new instance of Vue
* tell Vue which element in html to pay attention to
* define data I want to pass through (as an object)
```js
var app = new Vue({
  el: '#root',
  data: {
    message: 'Hello World',
    outcome: 'good work!'
  }
})
```
Once I've done that, I can reference the data in the html either with {{curlies}} or by using the v-model="var name" syntax in an element

## Vue Console
If you install the Vue web extension (link in the console), you get access to another console tab called Vue. It has the root object which shows the data.  
In the console, you can also make changes like so:
```
$vm0
// > This will show the object
$vm0.message
// > This will return the message variable you set in the data object
$vm0.message = "I have been changed"
// > This will update and change the data object immediately and display it on the page in new form. 
```

## Two way Reactivity
There is a __single source of truth__:
* If you change the input on the html side, it automatically changes the data source and the display
* If you change something from the data side of things, it also automatically changes it on the html view

## Arrays
Let's say I had an array coming into my Vue and I want to display it. There's a lot I could do:  
```js
var app = new Vue({
  el: '#root',
  data: {
    names: ['Joe', 'Mary', 'Jane', 'Jack']
  }
})
```
Iterate:
```html
<ul>
  <li v-for="name in names">{{name}}</li>
</uk>
```
* This will create a 4 bullet list and put each name in a bullet
But in this example, instead of using {{name}} we use the v-text label to tell Vue to automatically fill in the name into each bullet. However, when we do this, it does not allow us to change the text at all, even if we try to hard code over it. 
```html
<ul>
  <li v-for="name in names" v-text="name"></li>
</ul>
```
* As with all things with Vue, if we add anything or take anything off this list, it will automatically update. 
Let's add an input:
```html
<ul>
  <li v-for="name in names" v-text="name"></li>
</ul>
<input type="text" v-model="newName">
<button @click="addName">Add Name</button>
```

```js
var app = new Vue({
  el: '#root',
  data: {
    names: ['Joe', 'Mary', 'Jane', 'Jack'],
    newName: ""
    // set the newName variable to empty to start. The user can update this with the input
  },
  methods: {
    addName () {
      this.names.push(this.newName)
    }
    // this method will take the newName variable and push it. It is invoked on the click event
  }
})
```

## Attributes
```html
<button :title="titleVar">Hover Over Me</button> 
<h1 :class="{ 'red': true }">H1 here</h1>
```
* ```:title="titleVar"``` will change the title attribute to match the variable called titleVar in your data object
* ```:class="{ 'red': true }"``` will change the class to 'red' if the statement evaluates to true. You can replace 'true' with a method that evaluates instead

## Computed values
Establish an array in the data and add a computed value to filter for only the completed tasks. 
```js
var app = new Vue({
  el: '#root',
  data: {
   tasks: [
      {description: "go to store", completed: true},
      {description: "make bed", completed: false},
      {description: "workout", completed: false},
      {description: "do homework", completed: true},
      {description: "go swimming", completed: false}
    ]
  },
  computed: {
    completedTasks () {
      return this.tasks.filter(task => task.completed)
    }
```
In the html, show a list of all the tasks and show a list of only completed tasks:
```html
    <h2>All Tasks</h2>
    <ul>
      <li v-for="task in tasks" v-text="task.description"></li>
    </ul>
    <h2>Complete tasks</h2>
    <ul>
      <li v-for="task in completedTasks" v-text="task.description"></li>
    </ul>
```

## Components
In your Script file, create a new component and a new Vue instance. 
```js
Vue.component('task', {
  template: '<li><slot></slot>{{message}}</li>',
    // has to be in quotes. Slot allows us to pass in information hard-coded from the html
  data() {
    return {
      message: "hello"
    }
  }
    // data for components has to be a function that returns an object
})

new Vue({
  el: '#second'
})
```
In your html, write semantic code:
```html
  <div id="second">
    <task>Call Mom</task>
    <task>Call Dad</task>
  </div>
```

Now let's try doing a component within a component. Remember that a template can only be a single element, so you may need to wrap it in a div. Also, the data has to be a function.:
```js
Vue.component('task-list', {
  template: `
    <div>
      <task v-for="task in tasks">{{task.description}}</task>
    </div>`,
  data() {
    return {
      tasks: [
        {description: "go to store", completed: true},
        {description: "make bed", completed: false},
        {description: "workout", completed: false},
        {description: "do homework", completed: true},
        {description: "go swimming", completed: false}
      ]
    }
  }
})

Vue.component('task', {
  template: '<li><slot></slot></li>',
})

new Vue({
  el: '#second'
})
```
Now in the html, invoke that task-list component you created:
```html
  <div id="second">
    <task-list></task-list>
  </div>
```

### More Components
In your js:
```js
Vue.component('message', {
  props: ['title', 'body'],
  // props is what you're passing in
  data() {
    return {
      isVisible: true
    }
  },
  // data is data that is set and dynamic
  template: `
  <article class="message" v-show="isVisible">
  <div class="message-header">
    {{title}}
    <button type="button" @click="hideModal">x</button>
    </div>
  <div class="message-body">
    {{body}}
  </div>
  `,
  // template is pretty much just html with handlebars-style tags
  methods: {
    hideModal() {
      this.isVisible = false
    }
  }
  // this method does a toggle on the isVisible. Note the v-show is how we toggle appearance.
})

new Vue({
  el: '.container'
})
```

Meanwhile, in the html, all we have is:
```html
    <message title="Hello World" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.">
    </message>
```

## Modals
Start with the basic html:
```html
<modal v-show="showModal" @close="showModal = false">Any text here</modal>
<button @click="showModal = true">Show Modal</button>
```
The above HTML will have a modal and a button to bring in the modal

In the JS:
```js
Vue.component('modal', {
  template: `
  <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    <p class=box><slot></slot></p>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  </div>
  `
})
// @click="$emit('close')" is like a custom event, emiting "close" instead of click. That is picked up by the html @close.

new Vue({
  el: '.container',
  data: {
    showModal: false
  }
  // this data is defined globally for the container. That's bc the button is on it
})
```

## Parent-Child communication
In the html, set up a parent and child element. The child will have a listener that will invoke a change on something else in the root element (a sibling in this case).:
```html
<div id="root">
  <coupon></coupon>
  <h1 v-if="couponApplied">You used a coupon!<h1>
</div>
```

In the js, write the template for the coupon and the methods:
```js
Vue.component('coupon' {
  template: `<input placeholder"input coupon here" @blue="couponApplied">`,

  methods: {
    couponApplied() {
      this.$emit('applied')
    }
  }
})

new Vue({
  el: '#root', 

  methods: {
    onCouponApplied() {
      this.couponApplied = true
    }
  }
  data {
    couponApplied: false
  }
})
```

## All component communication
```js
window.Event = new Vue()

Vue.component('coupon', {
  template: `<a></a>`,
  methods: {
    onCouponApplied() {
      Event.$emit('applied')
    }
    // this will emit the status across all components and siblings
  }
})

new Vue({
  el: '#root',
  created() {
    event.$on('applied', () => {
      alert('handling event')
    })
    // this is listening for the event applied anywhere
  }
})
```

## Named Slots
This allows you to pass from html to the js multiple different sets of text 
```html
<modal>
  <template slot="header">My Title</template>
  <template slot="footer">My footer</template>
</modal>
```
```js
//all the html here with multiple slots:
<slot name="header"></slot>
<slot name="footer"></slot>
```

## Single-use Templates
Use these when you don't want to makea full template that will be reused throughout the HTML. Use the inline-template tag in the html to label the html as the template.
```html
<progress-view inline-template>
  <div>
    <h1>Your progress through this course is {{ completionRate }}</h1>
  </div>
</progress-view>
```
```js
Vue.component('progress-view', {
  data() {
    return { completionRate: 50 }
  }
})
```



## V-vocab
```v-model="varName"```: I think this sets the value to that variable content  
```v-on:event="methodName"```: Adds an event listener on a specified event, e.g., click, and then runs the specified method  
```@event="methodName"```: This is the shorthand syntax for the v-on. Just replace with a @ symbol. 
```v-for="a in list"```: Does a for loop for each item in a specified list  
```v-text="a"```: sets the text to the variable name. In this case, a is passed from a for loop. 
```v-bind:attribute="title"```:   
```:attribute="title"```:  
```v-if="task.completed === true"```: Will only render if the conditional evaluates to true
```$event```: refers to the DOM event wherever it is.



## Vue JS object
```el: '#div'```: Adds defines an element to operate with this Vue instance  
```data: {}```: Data object that has variables you can reference to be used in the html view  
```methods: {}```: Defines methods to be used. Can be invoked with v-on:click or @click or other ways
```mounted() {}```: Defines anything you want to run on startup
### Mounted
You can use Mounted to tell Vue to do something immediately after starting up, like adding an event listener or displaying an alert. 
```js
var app = new Vue({
  mounted() {
    // anything you want to run on startup
  }
})
```