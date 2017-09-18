const Chat = require('./Chat')
const Dog = require('./Dog')

new Chat({
  bot: new Dog(),
  delay: 1000,
})
