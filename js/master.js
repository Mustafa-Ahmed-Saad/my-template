/* check if there is local storage color option */
let mainColors = localStorage.getItem('color_option');
if (mainColors !== null) {
  document.documentElement.style.setProperty('--main-color', mainColors);

  document.querySelectorAll('.colors-list li').forEach((ele) => {
    ele.classList.remove('active');

    if (ele.dataset.color === mainColors) {
      ele.classList.add('active');
    }
  });
}

/* for change background randomly */
let backgroundOption = true;
let backgroundInterval;

/* check if local storage has yes random back ground or no */
let backgroundLocalItem = localStorage.getItem('background_option');
if (backgroundLocalItem !== null) {
  document.querySelectorAll('.random-backfrounds span').forEach((elem) => {
    elem.classList.remove('active');
  });
  if (backgroundLocalItem === 'true') {
    /* خلي بالك مينفع تحط القيمة كدا علي طول لانها مش بوليان فاليو بل استرنج و انت المفروض القيمة اللي هتحطلها للمتغير تكون بوليان فالية مش استرنج و انا عملت الاف و الالس دول علاشن القيمة اللي متخزنة في اللوكال ستوريج دي استرنج مش بوليانفاليو */
    backgroundOption = true;
    document.querySelector('.random-backfrounds .yes').classList.add('active');
  } else {
    backgroundOption = false;
    document.querySelector('.random-backfrounds .no').classList.add('active');
    if (localStorage.getItem('last_img')) {
      document.querySelector('.landing-page').style.backgroundImage = localStorage.getItem('last_img');
    }
  }
}
/* check if there is local storage class_open and if cog is run or not */
if (localStorage.class_open) {
  document.querySelector('.setting-box').classList.add('open');
  if (!document.querySelector('.toggle-setting .fa-cog').classList.contains('fa-spin')) {
    document.querySelector('.toggle-setting .fa-cog').classList.add('fa-spin');
  }
}

/* start toggle spin class on */
let toggleSetting = document.querySelector('.toggle-setting .fa-cog');
let settingBox = document.querySelector('.setting-box');

toggleSetting.onclick = function () {
  this.classList.toggle('fa-spin');
  settingBox.classList.toggle('open');
  if (this.parentElement.parentElement.classList.contains('open')) {
    localStorage.setItem('class_open', 'open');
  } else {
    if (localStorage.class_open) {
      localStorage.removeItem('class_open');
    }
  }
};

/* start switch colors */
const colorsLi = document.querySelectorAll('.colors-list li');

colorsLi.forEach((li) => {
  li.addEventListener('click', (e) => {
    /* علشان نغير قيمة الفاريابول او البروبيرتي اللي في الروت */
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color); /* كدا احنا بنجيب الكاستم اتربيوت اللي في العنصر دا و بيكون مكتوب زي ما احنا كاتبين بس بدل ما بعد الداتا دوت هيكون بعدها شرطة */
    localStorage.setItem('color_option', e.target.dataset.color);

    handeleActive(e);
    // e.target.parentElement.querySelectorAll('.active').forEach((element) => {
    //   element.classList.remove('active');
    // });
    // // or
    // // let arra = Array.from(e.target.parentElement.children);
    // // arra.forEach((bollit) => {
    // //   bollit.classList.remove('active');
    // // });
    // e.target.classList.add('active');
  });
});

/* start switch random background option */
const randomBackEl = document.querySelectorAll('.random-backfrounds span');

randomBackEl.forEach((span) => {
  span.addEventListener('click', (e) => {
    handeleActive(e);
    // e.target.parentElement.querySelectorAll('.active').forEach((element) => {
    //   element.classList.remove('active');
    // });

    // e.target.classList.add('active');

    if (e.target.dataset.backfround === 'yes') {
      clearInterval(backgroundInterval);
      backgroundOption = true;
      localStorage.setItem('background_option', true); /* خلي بالك الترو دي هتتخزم ك استرنج مش كبولينا فاليو */
      randomizeImages();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem('background_option', false); /* الفولس دي برضو هتتخزن ك استرنج مش ك بوليان فاليو */
      localStorage.setItem('last_img', document.querySelector('.landing-page').style.backgroundImage);
    }
  });
});

/* start change background in order */
// let landingPage = document.querySelector('.landing-page');
// let imgArray = [
//   '1.jpg',
//   '2.jpg',
//   '3.jpg',
//   '4.jpg',
//   '5.jfif',
//   '6.jfif',
//   '7.jfif',
// ];
// let index = 0;

// setInterval(() => {
//   if (index < imgArray.length) {
//     landingPage.style.backgroundImage = `url(../images/${imgArray[index]})`;
//     //landingPage.style.transition = '2s'; /* or bdal ma a3mel da kolwo aroh fe el css we a5aly transition ykon le elbak grawend fakat keda transition: background-image 3s; */ /* لو عاوز اول ما الصفحة تغتح ميكونش في نعومة علشان تفتح علي طول و يكون فية نعومة فقط لما الصورة تتغير فهتشيل من السي اس اس الخاصية دي اللي في العنصر دا و تكتبها هنا في السطر دا علشان لما تكون الصفحة حملت و محصلش تاثسر و لما بقي تبدا تغير الصور يحصل التاثير الناعم */
//     index++;
//   } else if (index === imgArray.length) {
//     index = 0;
//   }
// }, 1000);

/* start change background randomly */
let landingPage = document.querySelector('.landing-page');
let imgArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jfif', '6.jfif', '7.jfif'];
let randomNumber;

function randomizeImages() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage = `url('../images/${imgArray[randomNumber]}')`;
      //or // 'url("images/' + imgArray[randomNumber] + '")';
      //landingPage.style.transition = '2s'; /* or bdal ma a3mel da kolwo aroh fe el css we a5aly transition ykon le elbak grawend fakat keda transition: background-image 3s; */ /* لو عاوز اول ما الصفحة تغتح ميكونش في نعومة علشان تفتح علي طول و يكون فية نعومة فقط لما الصورة تتغير فهتشيل من السي اس اس الخاصية دي اللي في العنصر دا و تكتبها هنا في السطر دا علشان لما تكون الصفحة حملت و محصلش تاثسر و لما بقي تبدا تغير الصور يحصل التاثير الناعم */
    }, 3000);
  }
}

randomizeImages();

// animation scroll
let ourSkills = document.querySelector('.skills');
// console.log(ourSkills);
window.onscroll = function () {
  //skills offset top
  // الاوفسيت توب بيجيب المسافة اللي بين العنصر دا و الدوكيومينت من فوق
  let skillsoffsetTop = ourSkills.offsetTop; // علشان اجيب الزء اللي فوق السكشن بتاع السكلز و بتجبلك الطول   // الاوف سيت توب دي هتجبلك الجزء اللي فوق السكشن بتاع السكلز
  //skills outer height
  // كدا انا بجيب الطول المرئي بتاع العنصر دا كلو بالبادنج بالبوردر بكل حاجة ماعدا المارجين
  let skillsOuterHeight = ourSkills.offsetHeight; // هيجبلك طول السكشن دا كلو شامل البوردر و البادنج و كل حاجة
  // window height
  // كدا انا بجيب المساحة المرئية الحالية اللي قدامي في شاشة البروزر يعني لو النا عملت زوم او ظهرت الكونسول او كدا المساجة المرئية بتعت الطول اللي انا شايفة دي هتتغير
  let windowHeight = this.innerHeight; // بيجبلك الطول الحالي بتاع الويندو اللي انت جواها حتي لو عملت زوم اوت هتلاقية زودلك الهايت لانك عملت زوم اوت
  // window scrollTop
  // بجيب السكرول بتاعي الحالي اللي انا بعملو دلوقتي في الويندو
  let windowScrollTop = this.pageYOffset; // البكسيل اللي خاص بالسكرول الجزء اللي انت بتعملة سكرول

  if (windowScrollTop > skillsoffsetTop + skillsOuterHeight - windowHeight) {
    // المعادلة دي يعني بقولو لو السكرول وصل لمكان العنصر اللي بالظبط
    let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with the image
let ourGallery = document.querySelectorAll('.gallery img');
ourGallery.forEach((img) => {
  img.addEventListener('click', function (e) {
    let overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    let popupBox = document.createElement('div');
    popupBox.className = 'popup-box';

    if (img.alt !== null) {
      let imgHeading = document.createElement('h3');
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);

      popupBox.appendChild(imgHeading);
    }

    let popupIamge = document.createElement('img');
    popupIamge.src = img.src;
    popupBox.appendChild(popupIamge);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement('span');
    let closeButtonText = document.createTextNode('x');
    closeButton.appendChild(closeButtonText);
    closeButton.className = 'close-button';

    popupBox.appendChild(closeButton);
  });
});

document.addEventListener('click', (e) => {
  if (e.target.className === 'close-button') {
    e.target.parentElement.remove(); // or // e.target.parentNode.remove()
    document.querySelector('.popup-overlay').remove();
  }
});

// click bollet to move to
const allbullet = document.querySelectorAll('.nav-bullets .bullet');

// click links to move to
const allLinks = document.querySelectorAll('.links a');

function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth',
      });
      if (document.querySelector('.links').classList.contains('open')) {
        document.querySelector('.links').classList.remove('open');
        document.querySelector('.toggle-menu').classList.remove('menu-active');
      }
    });
  });
}

scrollToSomeWhere(allbullet);
scrollToSomeWhere(allLinks);

function handeleActive(event) {
  event.target.parentElement.querySelectorAll('.active').forEach((theElement) => {
    theElement.classList.remove('active');
  });

  event.target.classList.add('active');
}

let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletLocalItem = localStorage.getItem('bullets_option');

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove('active');
  });
  if (bulletLocalItem === 'block') {
    bulletsContainer.style.display = 'block';
    document.querySelector('.bullets-option .yes').classList.add('active');
  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector('.bullets-option .no').classList.add('active');
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener('click', (e) => {
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem('bullets_option', 'block');
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem('bullets_option', 'none');
    }
    handeleActive(e);
  });
});

// reset button
document.querySelector('.reset-options').onclick = function () {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You you want to reset all setting!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      clearLocalStorage();
      Swal.fire('Deleted!', 'all setting reset successfuly. and the website will reload now', 'success');
    }
  });
};

function clearLocalStorage() {
  //localStorage.clear(); /* دي هتمسحلك كل حاجة في اللوكال ستوريج */
  localStorage.removeItem('background_option');
  localStorage.removeItem('bullets_option');
  localStorage.removeItem('class_open');
  localStorage.removeItem('color_option');
  localStorage.removeItem('last_img');

  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

// toggle menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e) {
  e.stopPropagation(); /* علشان لو دست علي الزرار دا او اي حاجة جواه ينفز الفانكشن لكن لو معملتش ستوب البروباجيشن كدا لو دست علي السبان اللي جوا الزرار مش هينفز الفانكشن و انا مش عاوز كدا انا عاوز لو دست علي السبان اللي جوا الزرار او المسافة اللي بينهم او اي حاجة في الزرار يتنفز الفانكشن دس */
  this.classList.toggle('menu-active');
  tLinks.classList.toggle('open');
};

// click anywhere  outside menu and toggke button
document.addEventListener('click', (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    /* عاوز اتاكد المكان اللي دست علية دا مش اللينكان اللي في المنيو و برضو مش زرار المينيو نفسو و هنا هيطلعلك نفس الكلام لماتدوس علي اليو ال هتلاقي فعلا كلو تمام لكن لما بتدوس علي الال اي اللي جوا المينيو بيحصل مشكلة و مش بيعتبركدست علي المينيو فالحل اناي اعمل ستوب بروبجيشن */
    if (tLinks.classList.contains('open')) {
      toggleBtn.classList.toggle('menu-active');
      tLinks.classList.toggle('open');
    }
  }
});

// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};

document.querySelector('.go-top').onclick = function () {
  document.querySelector('.landing-page .overlay').scrollIntoView({
    behavior: 'smooth',
  });
};

// ent.querySelector(e.target.dataset.section).scrollIntoView({
//   behavior: 'smooth',
// });

document.querySelectorAll('.buttom-top-option span').forEach((sp) => {
  sp.onclick = function (ev) {
    handeleActive(ev);
    if (ev.target.classList.contains('yes')) {
      document.querySelector('.go-top').style.display = 'block';
    } else {
      document.querySelector('.go-top').style.display = 'none';
    }
  };
});

// start typed.js
var options = {
  strings: ['Geniuses', 'Warriors', 'Creative'],
  typeSpeed: 150,
  backDelay: 1700,
  fadeOut: true,
  loop: true,
  loopCount: 2,
  showCursor: false,
};
var typed = new Typed('.element', options);
// end typed.js

// stat headroom.js
var myElement = document.querySelector('.header-area');
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement);
// initialise
headroom.init();
// end headroom.js
