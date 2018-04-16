
// var app = new Vue({
//   el: '#root',
//   data: {
//     names: ['Joe', 'Mary', 'Jane', 'Jack'],
//     newName: '',
//     title: 'now the title is set by javascript',
//     className: 'red',
//     tasks: [
      // {description: "go to store", completed: true},
      // {description: "make bed", completed: false},
      // {description: "workout", completed: false},
      // {description: "do homework", completed: true},
      // {description: "go swimming", completed: false}
//     ]
//   },
//   computed: {
//     completedTasks () {
//       return this.tasks.filter(task => task.completed)
//     }
//   },
//   methods: {
//     addName () {
//       this.names.push(this.newName)
//       this.newName = ''
//     }
//   }
// })

// Vue.component('task-list', {
//   template: `
//     <div>
//       <task v-for="task in tasks">{{task.description}}</task>
//     </div>`,
//   data() {
//     return {
//       tasks: [
//         {description: "go to store", completed: true},
//         {description: "make bed", completed: false},
//         {description: "workout", completed: false},
//         {description: "do homework", completed: true},
//         {description: "go swimming", completed: false}
//       ]
//     }
//   }
// })

// Vue.component('task', {
//   template: '<li><slot></slot></li>',
// })

Vue.component('message', {
  props: ['title', 'body'],
  data() {
    return {
      isVisible: true
    }
  },
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
  methods: {
    hideModal() {
      this.isVisible = false
    }
  }
})

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

new Vue({
  el: '.container',
  data: {
    showModal: false
  }
})

// el is an element (usually a div or semantic element) in the html where you want the vue to operate
// data are the variables you want to be able to manipulate and pass through to the html
// the data can be defined outside the new Vue instance or can be defined inside
