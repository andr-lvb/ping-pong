

const map = document.querySelector("#game"); //  ищем функцию с классом Game  и сохраняем в переменную map
const leftcounter = document.querySelector("#leftcounter");
const rigtcounter = document.querySelector("#rightcounter");
const canvas = map.getContext('2d');// переменая конвас  равна тому что карта бдует отрриосвываться в  2д как на холсте
canvas.fillStyle = 'rgb(228, 164, 87)'; // заливка будет такого цвета


leftcounter.textContent = '0';
rightcounter.textContent = '0';

const grid = 15; // игровой квадрат будет 15пикселей
const paddleHeight = grid * 9; // ракетка будет 75 пикселей в высоту то есть 5 клеток
const maxPaddleY = map.height - grid - paddleHeight; // 

let ballSpeed = 4; // скорость мяча
let paddleSpeed = 4;// скорость ракетки
let rightscore = 0;
let leftscore = 0;

const leftPaddle = {//списочек создаем для левой ракетки
    x: grid * 2, // 
    y: map.height / 2 - paddleHeight / 2, /// корордината у это высота карьты деленая на 2 и высота ракетки 75пх деленая на 2 а это положение ракетки что бы она была поередине
    width: grid, //толщина ракетки будет 15пх
    height: paddleHeight, //высота бдует высоте ракетки
    dy: 0,//скорость пока на 0
}

const rightPaddle = {//списочек для правой ракетки
    x: map.width - grid * 3, //
    y: map.height / 2 - paddleHeight / 2, //делает положение ракетки посередине типо ширина карты 600/2 =300- 75/2=300-37,5 = 262 это и будет центр для положения ракетки
    width: grid, // что и для левой
    height: paddleHeight, // что и для левой
    dy: 0,//на 0 скоррсть
}

const ball = {// списочек для мячика 
    x: map.width / 2, // положение его по оси х (право лево) это ширина карты деленая на 2 по центу короче
    y: map.height / 2,// тут тоже по центру делаент по тому же принципу
    width: grid,// толщина будет в 15пх   квадрат это будет короче
    height: grid, //это его высота тоже 15пх
    dx: ballSpeed, // ода скорость его 7 это в право лево положительная
    dy: -ballSpeed, // скорость по оси у верх низ отрицательная
   resetting:false,//
    isResetted: false//
   

}

function renderMap() {//функция с названием  отрисовывания карты
    canvas.fillRect(0, 0, map.width, grid); //  филлрект заполняет короче протрасство как заливка(координата 0 по х и 0 по у это вроде центр и заливает он по ширине всей карты(у нас есть канвас и оно 750пх и высота 585пх и короче рисовать эту границу верхнюю на всю эту длинну будет
    canvas.fillRect(0, map.height - grid, map.width, grid); // это нижняя граница координата по х в центре хз зачем и заливает по высоте минус ширина квадратика( это 585-15 =570) хз зачем  это и по ширине короче все делает по квадратику 15 пх

    for (let i = grid; i < map.height - grid; i += grid * 2) { //цикл для отрисовки пунктирной линии короче i это теперь грид в 15 пх и пока i менше высоты карты минус грид , i плюсает к себе грид * 2 ( то есть15 < 585пх; 15+30)
        canvas.fillRect(map.width / 2, i, grid, grid); //  
    }
}


function clearMap() {//функция для отчищения карты чтобы слой на слой не наколажывался 
    canvas.clearRect(0, 0, map.width, map.height);// отчищае всю карту всю карту   каждый цикл
}

function renderGameObjects() {///функция что бы отрисовать ракетки  и мяч
    // Рисуем левую ракетку
    canvas.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);//
    // Рисуем правую ракетку
    canvas.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);//
    // Рисуем мяч
    canvas.fillRect(ball.x, ball.y, ball.width, ball.height);//
}

// // 4. Движение платформ
// function movePaddles() {
//     // Двигаем левую платформу
//     leftPaddle.y += leftPaddle.dy;//  к левая платформа  по оси у (низ верх )движется со скоростью dy
//     // rightPaddle.y += rightPaddle.dy;

//     const rightPaddleCenter = rightPaddle.y + rightPaddle.height / 2;
//     if (rightPaddleCenter < ball.y - 10) {
//         rightPaddle.dy = paddleSpeed;
//     } else if (rightPaddleCenter > ball.y + 10) {
//         rightPaddle.dy = -paddleSpeed;
//     } else {
//         rightPaddle.dy = 0;
//     }
//     rightPaddle.y += rightPaddle.dy;
    
//     // Ограничение движения платформ в пределах экрана
//     leftPaddle.y = Math.max(grid, Math.min(leftPaddle.y, maxPaddleY));//
//     rightPaddle.y = Math.max(grid, Math.min(rightPaddle.y, maxPaddleY));//
// }

// // 5. Движение мяча
// function moveBall() {
//     // Двигаем мяч
//     ball.x += ball.dx;//мячик двигается  по оси х (право лево)  со соростью движения dx
//     ball.y += ball.dy;//тоже самое только движется по оси х со скорость dx
    
//     // Отскок от верхней и нижней стенки
//     if (ball.y < grid) {//   если стенка коснулась мяча то есть вепхняяя сторона мяча коснулась стенки 
//         ball.y = grid;// то мы помещаем верхнюю сторону мяча прямо на стенку
//         ball.dy *= -1;// тут мы меняем направление что бы она летела противоположно
//     } else if (ball.y + ball.height > map.height - grid) {//тут мы выбирем нижнюю сторону мяча и если она коснулась нижней стенки то
//         ball.y = map.height - grid - ball.height;//помещаем мяч на верхнюю сторону нижней стенки
//         ball.dy *= -1;// тоже меняем напр
//     }
    
//     // Отскок от ракеток
//     // Левая ракетка
//     if (ball.x < leftPaddle.x + leftPaddle.width &&//если левый край мяча докоснулся до правой стороны рактеки
//         ball.x + ball.width > leftPaddle.x &&// если правая часть мяча докоснулась до левой части ракеетки
//         ball.y < leftPaddle.y + leftPaddle.height &&//елси верхняя часть мячика докоснулась до нижней части рокетки
//         ball.y + ball.height > leftPaddle.y) {// если нижняя часть мяча докоснулась до верхней части рокетки
//         ball.dx = Math.abs(ball.dx); //  то мы направление мяча делаем всегда в право (Двигаем мяч вправо) abs убирает минус
//         // Увеличиваем угол отскока в зависимости от места удара
//         const hitPosition = (ball.y - leftPaddle.y) / leftPaddle.height;//
//         ball.dy = (hitPosition - 0.5) * 10;//
//     }
    
//     // Правая ракетка
//     if (ball.x < rightPaddle.x + rightPaddle.width &&// тоже самое
//         ball.x + ball.width > rightPaddle.x &&// тоже самое
//         ball.y < rightPaddle.y + rightPaddle.height &&// тоже самое
//         ball.y + ball.height > rightPaddle.y) {// тоже самое 
//         ball.dx = -Math.abs(ball.dx); // Двигаем мяч влево ,  влево идет потому что впреди math стоит -
//         const hitPosition = (ball.y - rightPaddle.y) / rightPaddle.height;///
//         ball.dy = (hitPosition - 0.5) * 10;//
//     }
    
//     // Сброс мяча при выходе за границы
//     if ((ball.x < 0 || ball.x > map.width) && !ball.resetting) {// если  положенте мчика лево право вышло за левую сторону х меньше 0 и если мячк вылетел в право х больше всей ширины
//         ball.resetting = true;// то мяч можно обновлять
//         setTimeout(() => {// делаем анон функцию
//             ball.x = map.width / 2;// возвращаем в центр
//             ball.y = map.height / 2;
//             ball.dx = ball.x > map.width / 2 ? -ballSpeed : ballSpeed;
//             ball.dy = -ballSpeed;
//             ball.resetting = false;// все теперь сбрасывание не правдиво до  след вылета
//         }, 1000);// задержка этого в 1 секунду
//     }
// }

// // 6. Обработка управления (клавиатура)
// function setupInput() {// функцию делаем для левой ракетки
//     window.addEventListener('keydown', function(e) { //  слушатель вешаем на клаву
//         // Вверх (W)
//         if (e.key === 'w' || e.key === 'W'|| e.key === 'ц'|| e.key === 'Ц') {// нажата даблю то
//             leftPaddle.dy = -paddleSpeed; // скорость ракеточки идет вверх
//         }
//         // Вниз (S)
//         else if (e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы') {//ели нажата ес
//             leftPaddle.dy = paddleSpeed;// то ракеточка идет вниз
//         }
//     });
    
//     window.addEventListener('keyup', function(e) {// это функция если мы отпустили кнопку
//         if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S' || e.key === 'ц'|| e.key === 'Ц'|| e.key === 'ы'|| e.key === 'Ы') {// если отпустили одну из этих кнопочек (если нажимали на нее )
//             leftPaddle.dy = 0;// то скорость на нолик
//         }
//     });
// }
// // function setupInput2() {// функцию делаем для правой ракетки
// //     window.addEventListener('keydown', function(e) { //  слушатель вешаем на клаву
// //         // Вверх (W)
// //         if (e.key === 'e' || e.key === 'E') {// нажата даблю то
// //             rightPaddle.dy = -paddleSpeed; // скорость ракеточки идет вверх
// //         }
// //         // Вниз (S)
// //         else if (e.key === 'D' || e.key === 'd') {//ели нажата ес
// //             rightPaddle.dy = paddleSpeed;// то ракеточка идет вниз
// //         }
// //     });
    
// //     window.addEventListener('keyup', function(e) {// это функция если мы отпустили кнопку
// //         if (e.key === 'e' || e.key === 'E' || e.key === 'D' || e.key === 'd') {// если отпустили одну из этих кнопочек (если нажимали на нее )
// //             rightPaddle.dy = 0;// то скорость на нолик
// //         }
// //     });
// // }


     function movePaddles(){
        leftPaddle.y += leftPaddle.dy;
        rightPaddle.y += rightPaddle.dy;
     }
     function moveball(){
        ball.x += ball.dx;
        ball.y +=ball.dy;
     }
    
   function resetGame() {
    if ((ball.x < 0 || ball.x > map.width) && !ball.isResetted) {
        ball.isResetted = true;
        if(ball.x < 0){
            rightscore = 0;
            rightcounter.textContent =  rightscore;
            
        
        }else {
            leftscore = 0;
            leftcounter.textContent =  leftscore;
        }
        setTimeout(() => {
            ball.x = map.width / 2;
            ball.y = map.height / 2;
            ball.isResetted = false;
        }, 1000);
    }
}

function collideWallsWithPaddle(paddle) {
    if (paddle.y < grid) {
        paddle.y = grid;
    
    }
    else if (paddle.y > maxPaddleY) {
        paddle.y = maxPaddleY;
    }
}
function collideWallsWithPaddles(){
    collideWallsWithPaddle(rightPaddle);
    collideWallsWithPaddle(leftPaddle);
}

     
function collideWallsWithBall() {
    if (ball.y < grid) {
        ball.y = grid;
        ball.dy = -ball.dy;
    }
    else if (ball.y > map.height - grid) {
        ball.y = map.height - grid;
        ball.dy = -ball.dy;
    }
}

function isCollides(object1, object2) {
    const width1 = object1.x + object1.width;
    const width2 = object2.x + object2.width;
    const height1 = object1.y + object1.height;
    const height2 = object2.y + object2.height;
    return object1.x < width2
        && object2.x < width1
        && object1.y < height2
        && object2.y < height1;
}

function collidePaddlesWithBall() {
    if (isCollides(ball, rightPaddle)) {
        ball.dx = -ball.dx;
        ball.x = rightPaddle.x - ball.width;
        rightscore++;
        rigtcounter.textContent = rightscore;
    }
    else if (isCollides(ball, leftPaddle)) {
        ball.dx = -ball.dx;
        ball.x = leftPaddle.x + leftPaddle.width;
         leftscore++;
        leftcounter.textContent =  leftscore;
    }
}
function aiControl() {
    let direction = 0;

    if (ball.y < rightPaddle.y) {
        direction = -1;
    }
    else if (ball.y > rightPaddle.y + paddleHeight) {
        direction = 1;
    }

    rightPaddle.y += paddleSpeed * direction;
}
 
    
     window.addEventListener('keydown', function(e) { //  слушатель вешаем на клаву
        // Вверх (W)
        if (e.key === 'w' || e.key === 'W'|| e.key === 'ц'|| e.key === 'Ц') {// нажата даблю то
            leftPaddle.dy = -paddleSpeed; // скорость ракеточки идет вверх
        }
        // Вниз (S)
        else if (e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы') {//ели нажата ес
            leftPaddle.dy = paddleSpeed;// то ракеточка идет вниз
        }
    });
    
    window.addEventListener('keyup', function(e) {// это функция если мы отпустили кнопку
        if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S' || e.key === 'ц'|| e.key === 'Ц'|| e.key === 'ы'|| e.key === 'Ы') {// если отпустили одну из этих кнопочек (если нажимали на нее )
            leftPaddle.dy = 0;// то скорость на нолик
        }
    });
    

    
    function loop() {//циклик который будет крутиться то есть
        clearMap(); // Очищаем экран
        collideWallsWithPaddles();
        renderGameObjects(); // Рисуем объекты
        moveball();
        movePaddles();
        aiControl();
        collideWallsWithBall();
        collidePaddlesWithBall();

        
        resetGame();
        renderMap(); // Рисуем поле
        requestAnimationFrame(loop); // следущий кадр делаем это типо делает по циклу что бы было  для игр по 60 кадров в сек
}

requestAnimationFrame(loop);// запускает все наше добро