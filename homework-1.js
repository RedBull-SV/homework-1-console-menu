const readline = require('node:readline');

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  // Защита от бесконечного цикла при нулевой цене.
  if (!Number.isFinite(budget) || budget < 0 || !Number.isFinite(price) || price <= 0) {
    return 0;
  }

  let remainingBudget = budget;
  let count = 0;

  while (remainingBudget >= price) {
    remainingBudget -= price;
    count += 1;
  }

  return count;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);

  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const count = maxTickets(budget, price);
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

function deliveryPrice(distance, total) {
  if (total >= 3000 || distance <= 3) {
    return 0;
  }
  if (distance <= 10) {
    return 200;
  }
  return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

function printSteps(height) {
  let count = 0;

  for (let step = 1; step <= height; step += 1) {
    if (step === 4) {
      continue;
    }

    console.log(`Ступень ${step}`);
    count += 1;

    if (step === 10 && height > 10) {
      console.log('Дальше лестница не построена');
      break;
    }
  }

  console.log(`Всего построено: ${count}`);
}

// Пустая строка не должна превращаться в допустимый ноль.
function readNumber(answer) {
  return answer.trim() === '' ? NaN : Number(answer);
}

function isNonNegativeNumber(value) {
  return Number.isFinite(value) && value >= 0;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Выберите задачу:');
console.log('1 — билетная касса');
console.log('2 — доставка заказа');
console.log('3 — лестница');

rl.question('Ваш выбор: ', (answer) => {
  const choice = answer.trim();

  switch (choice) {
    case '1':
      rl.question('Категория билета: ', (categoryAnswer) => {
        const category = readNumber(categoryAnswer);
        rl.question('Бюджет: ', (budgetAnswer) => {
          const budget = readNumber(budgetAnswer);
          if (ticketPrice(category) === 0) {
            printTicketResult(category, budget);
          } else if (!isNonNegativeNumber(budget)) {
            console.log('Некорректное число');
          } else {
            printTicketResult(category, budget);
          }
          rl.close();
        });
      });
      break;
    case '2':
      rl.question('Расстояние: ', (distanceAnswer) => {
        const distance = readNumber(distanceAnswer);
        rl.question('Сумма заказа: ', (totalAnswer) => {
          const total = readNumber(totalAnswer);
          if (!isNonNegativeNumber(distance) || !Number.isInteger(distance) || !isNonNegativeNumber(total)) {
            console.log('Некорректное число');
          } else {
            printDelivery(distance, total);
          }
          rl.close();
        });
      });
      break;
    case '3':
      rl.question('Высота лестницы: ', (heightAnswer) => {
        const height = readNumber(heightAnswer);
        if (!isNonNegativeNumber(height) || !Number.isInteger(height)) {
          console.log('Некорректное число');
        } else {
          printSteps(height);
        }
        rl.close();
      });
      break;
    default:
      console.log('такой задачи нет');
      rl.close();
  }
});
