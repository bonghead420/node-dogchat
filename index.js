const Chat = require('./Chat')
const Dog = require('./Dog')

new Chat(new Dog(), {
  delay: 1000
})
