function displayDate() {
   var getElementList = document.getElementById('list-infos');
   var createList = document.createElement('li');
   var currentDate = new Date().toLocaleDateString();
   createList.innerHTML = currentDate;
   getElementList.appendChild(createList);
}

function displayTime() {
   var getElementList = document.getElementById('list-infos');
   var createList = document.createElement('li');
   var currentTime = new Date().toLocaleTimeString();
   createList.innerHTML = currentTime;
   getElementList.appendChild(createList);
}

function randomText() {
   var text = [
      '💭 J\'ai eu l\'idée du site en naviguant sur mon Macbook',
      '🎉 Pour le secret, voici mon discord MessN#2500'
   ];

   document.getElementById('footer-text').addEventListener('click', () => {
      document.getElementById('footer-text').innerHTML = text[Math.floor(Math.random() * text.length)];;
   });
}

displayTime();
displayDate();
randomText();