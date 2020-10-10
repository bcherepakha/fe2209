// Function Expression
const ask = function(message, yesHandler, noHandler) {
  const response = confirm(message);

  if (response) {
    yesHandler();
  } else {
    noHandler();
  }

  return ; // undefined
}

ask(
    'Все понятно?',
    function yesHandler() { return console.log('Великолепно!'); },
    () => {
      return console.log('Надо бы повторить материал...');
    }
    // () => console.log('Надо бы повторить материал...')
  );

ask(
  'А может не понятно?',
  function() { console.log('Может!'); /* return undefined; */ },
  () => { console.log('Не может...'); /* return undefined; */ }
);
