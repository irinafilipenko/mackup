

/*
  5. Создать класс Worker у которого есть 
  свойства name, surname, age, position, salary.
     У класса Worker есть метод getSalary.
     Создать класс TopLevelWorker у которого есть 
     свойство hierarchyLevel и который 
     наследует класс Worker, добавляя метод getHierarchyLevel
     Реализовать задачу с помощью ES5 прототипов и ES6 классов
*/

//ES5
// Переделать вызов родительского конструктора с call на apply
// Добавить в TopLevelWorker новый метод getSalary, важно не дать
// экземпляру класса TopLevelWorker вызвать getSalary из прототипа родительского класса
// Создать новый класс BottomLevelWorker который тоже наследует класс Worker, у данного класса
// будет новое свойство experience(количество лет работы) и новый метод класса getLoyaltyLevel
// который будет проверять свойство experience: в зависимости от количества выводить сообщение
//     - У ${ User } уровень преданности ${ LOYALTY_LEVEL }.LOYALTY_LEVEL может быть заранее заготовленным объектом констант

// const HIERARCHY_LEVEL = {
//   TOP: "top",
//   BOTTOM: "bottom"
// };

// const LOYALTY_LEVEL = {
//     HIGH: 'высокий',
//     LOW: 'низкий'
// };

// // ES5

// const Worker = function (name, surname, age, position, salary) {
//   this.name = name;
//   this.surname = surname;
//   this.age = age;
//   this.position = position;
//   this.salary = salary;
// };

// Worker.prototype.getSalary = function () {
//   return this.salary;
// };

// const TopLevelWorker = function (
//   name,
//   surname,
//   age,
//   position,
//   salary,
//     hierarchyLevel
//   ) {
//   Worker.apply(this, [name, surname, age, position, salary]);
//   this.hierarchyLevel = hierarchyLevel;
// };

// TopLevelWorker.prototype = Object.create(Worker.prototype);
// TopLevelWorker.prototype.constructor = TopLevelWorker;

// TopLevelWorker.prototype.getSalary = function () {
//   return this.salary;
// };

// const BottomLevelWorker = function (
//     name,
//     surname,
//     age,
//     position,
//     salary,
//     experience
// ) {
//     Worker.apply(this, [name, surname, age, position, salary]);
//     this.experience = experience;
// };

// BottomLevelWorker.prototype = Object.create(Worker.prototype);
// BottomLevelWorker.prototype.constructor = BottomLevelWorker;

// BottomLevelWorker.prototype.getLoyaltyLevel = function (experience) {
//     const user = this.name + ' ' + this.surname;
//     if (this.experience > 5) {
//         return ` У ${user} уровень преданности ${LOYALTY_LEVEL.HIGH}`
//     };
//     return ` У ${user} уровень преданности ${LOYALTY_LEVEL.LOW}`;
// };



// const worker1 = new TopLevelWorker('Наталья', 'Тоцкая', 28, 'Junior', 100, HIERARCHY_LEVEL.BOTTOM);
//  console.log(worker1);
//  console.log(worker1.getSalary());
// const worker2 = new BottomLevelWorker('Наталья', 'Тоцкая', 28, 'Junior', 100, 10);
//  console.log(worker2);
//   console.log(worker2.getLoyaltyLevel());

// // ES6

// Переделать объект HIERARCHY_LEVEL (строка 202) в статичную функцию родительского класса которая будет возвращать данный объект
// Удалить свойство salary и метод getSalary, в классе Worker1 создать новое приватное свойство #salary(минимальное значение 500),
//     доступ и изменение свойства salary будет возможно только через getter и setter.До того как можно будет добавить зарплату
// для TopLevelWorker1, надо проверять что параметр это цифра и #salary не превышает 5000, если зарплата снижается то надо проверить
// параметр на число и чтобы зп не была ниже 500.
// TopLevelWorker1 добавить метод setHierarchyLevel, которое принимает количество лет проведенные в компании и определяет значение
// свойства hierarchyLevel, если меньше года то функция пишет сообщение об этом
// Создать новый класс BottomLevelWorker который наследует TopLevelWorker1, в экземпляре BottomLevelWorker прибавить ему зарплату
// и определить hierarchyLevel с помощью метода setHierarchyLevel




class Worker1 {
    #salary;
    static HIERARCHY_LEVEL() {
        return {
            TOP: 'top',
            BOTTOM: 'bottom'
        }
    }
    constructor(salary, name, surname, age, position) {
       
        this.#salary = salary;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.position = position;
     
    }
    
    get salary() {
      if (typeof this.#salary === 'number' ) {
      return this.#salary;
    } else {
      return  `Текущая зарплата указана неверно`;
          }
      }
  
    set salary(value) {
        if (this.#salary > 500 && this.#salary < 5000) {
            return this.#salary;
        }
        this.#salary = value;
    }
 }
    
    
class TopLevelWorker1 extends Worker1 {
    
    constructor(salary, name, surname, age, position, hierarchyLevel) {
        super(salary, name, surname, age, position);
        this.hierarchyLevel = hierarchyLevel;
        
    }

   
    
     
    setHierarchyLevel(hierarchyLevel) {
        const user = this.name + ' ' + this.surname;
        if (this.hierarchyLevel < 1) {
            return `${user} работает меньше года ваша позиция ${this.position} `;
        }
         return `  ${user} работает больше года ваша позиция ${this.position}`;
    }
}
     
     
 
class BottomLevelWorker extends TopLevelWorker1 {
   
    constructor(salary,name, surname, age, position,hierarchyLevel) {
        super(salary, name, surname, age, position, hierarchyLevel);
        this.salary = salary;
    }
     
    newSalary(newsalar) {
        return this.salary += newsalar;
    }
        }


 const worker2 = new TopLevelWorker1(
       500,
    "Рейчел",
     "Гринн",
     25,
   "Developer",
   2,
)
 
const worker3 = new BottomLevelWorker(
         1200,
      "Джоуи",
      "Трибиани",
      23,
    "Junuor",
      0,
 )
 


console.log(worker2.salary);
worker2.salary = 800;
console.log(worker2.salary);

console.log(Worker1.HIERARCHY_LEVEL());
console.log(worker2.setHierarchyLevel());
console.log(worker3.salary);

console.log(worker3.setHierarchyLevel());
console.log(worker3.salary);
worker3.salary = 600;
console.log(worker3.salary);
console.log(worker3.newSalary(1000));



 
