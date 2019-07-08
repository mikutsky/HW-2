//Деструктурирующее присваивание. ЗАДАНИЕ №1.1
//Используя rest оператор и деструктуризацию, создать функцию, которая
//принимает любое количество аргументов и возвращает объект, содержащий первый
//аргумент и массив из остатка:
//func('a', 'b', 'c', 'd') → { first: 'a', other: ['b', 'c', 'd'] }

const func = (first, ...others) => ({ first, others });
console.log(func("a", "b", "c", "d"));

//Деструктурирующее присваивание. ЗАДАНИЕ №1.2
//Организовать функцию getInfo, которая принимает объект вида
//{ name: ..., info: { employees: [...], partners: [ … ] } }
//и выводит в консоль имя (если имени нет, показывать "Unknown") и первые две
//компании из массива partners:
//const organisation = { name: 'Google', info: { employees: ['Vlad', 'Olga'],
//                       partners: ['Microsoft', 'Facebook', 'Xing'] } };
//getInfo(organisation); →
//Name: Google
//Partners: Microsoft Facebook

const organisation = {
  name: "Google",
  info: {
    employees: ["Vlad", "Olga"],
    partners: ["Microsoft", "Facebook", "Xing"]
  }
};

const getInfo = ({
  name = "Unknown",
  info: { partners: [partner1 = "Unknown", partner2 = "Unknown"] = [] } = {}
} = {}) => console.log(`Name: ${name}\nPartners: ${partner1} ${partner2}`);

getInfo(organisation);

//Функции стрелки. ЗАДАНИЕ №2.1
//Переделать функцию с использованием функции-стрелки (в методе reduce тоже использовать arrow function):
//function sum() {
//  const params = Array.prototype.slice.call(arguments);
//  if (!params.length) return 0;
//  return params.reduce(function (prev, next) { return prev + next; });
//}
//sum(1, 2, 3, 4); // 10
//sum(); // 0

const sum = (...arr) =>
  !arr.length ? 0 : arr.reduce((prev, next) => prev + next);

console.log(sum(1, 2, 3, 4));
console.log(sum());

//Функции высшего порядка. ЗАДАНИЕ №3.1
//Создать две функции и дать им осмысленные названия:
//- первая функция принимает массив и колбэк (одна для всех вызовов)
//- вторая функция (колбэк) обрабатывает каждый элемент массива (для каждого
//вызова свой callback)
//Первая функция возвращает строку “New value: ” и результат обработки:
//firstFunc(['my', 'name', 'is', 'Trinity'], handler1) →
//“New value: MyNameIsTrinity”
//firstFunc([10, 20, 30], handler2) → “New value: 100, 200, 300,”
//firstFunc([{age: 45, name: 'Jhon'}, {age: 20, name: 'Aaron'}], handler3) →
//“New value: Jhon is 45, Aaron is 20,”
//firstFunc(['abc', '123'], handler4) → “New value: cba, 321,”
//строки инвертируются
//Подсказка: secondFunc должна быть представлена функцией, которая принимает
//один аргумент (каждый элемент массива) и возвращает результат его обработки

const modifyEllUpChar = value =>
  String(value)[0].toUpperCase() + String(value).slice(1);

const modifyEllMult10 = value => String(value * 10) + ", ";

const modifyEllNameAge = ({ name, age }) => name + " is " + age + ", ";

const modifyEllReverse = value =>
  Array.prototype.slice
    .call(value)
    .reverse()
    .join("") + ", ";

const getStringFromArr = (arr, func) => {
  let result = "New value: ";
  for (const value of arr) result += func(value);
  return result;
};

console.log(getStringFromArr(["my", "name", "is", "Trinity"], modifyEllUpChar));
console.log(getStringFromArr([10, 20, 30], modifyEllMult10));
console.log(
  getStringFromArr(
    [{ age: 45, name: "Jhon" }, { age: 20, name: "Aaron" }],
    modifyEllNameAge
  )
);
console.log(getStringFromArr(["abc", "123"], modifyEllReverse));

//Функции высшего порядка. ЗАДАНИЕ №3.2
//Написать аналог метода every. Создайте функцию every, она должна принимать
//первым аргументом массив чисел (обязательно проверьте что передан массив)
//вторым аргументом callback (обязательно проверьте что передана функция)
//функция должна возвращать true или false в зависимости от результата вызова
//callback (проверить число больше 5). Callback  должен принимать один элемент
//массива, его индекс в массиве и весь массив.

const analogEvery = (arr, func) => {
  if (!Array.isArray(arr) || typeof func !== "function")
    return console.error("Some types of arguments is not avaliable.");
  for (let i = 0; i < arr.length; i++) if (!func(arr[i], i, arr)) return false;
  return true;
};

console.log(analogEvery([1, 2, 3, 4, 5], value => value > 5));
console.log(analogEvery([6, 7, 8, 9], value => value > 5));
