document.addEventListener("DOMContentLoaded", () => {
  // array of cards
  const cardArray = [
    {
      name: "num0",
      img: "images/num0.png",
    },
    {
      name: "num1",
      img: "images/num1.png",
    },
    {
      name: "num2",
      img: "images/num2.png",
    },
    {
      name: "num3",
      img: "images/num3.png",
    },
    {
      name: "num4",
      img: "images/num4.png",
    },
    {
      name: "num5",
      img: "images/num5.png",
    },
    {
      name: "num0",
      img: "images/num0.png",
    },
    {
      name: "num1",
      img: "images/num1.png",
    },
    {
      name: "num2",
      img: "images/num2.png",
    },
    {
      name: "num3",
      img: "images/num3.png",
    },
    {
      name: "num4",
      img: "images/num4.png",
    },
    {
      name: "num5",
      img: "images/num5.png",
    },
    // Possibility to add more cards in the future
    //   {
    //     name: "num6",
    //     img: "images/num6.png",
    //   },
    //   {
    //     name: "num7",
    //     img: "images/num7.png",
    //   },
    //   {
    //     name: "num8",
    //     img: "images/num8.png",
    //   },
    //   {
    //     name: "num9",
    //     img: "images/num9.png",
    //   },
    //   {
    //     name: "Q1",
    //     img: "images/Q1.png",
    //   },
    //   {
    //     name: "Q2",
    //     img: "images/Q2.png",
    //   },
    //   {
    //     name: "num6",
    //     img: "images/num6.png",
    //   },
    //   {
    //     name: "num7",
    //     img: "images/num7.png",
    //   },
    //   {
    //     name: "num8",
    //     img: "images/num8.png",
    //   },
    //   {
    //     name: "num9",
    //     img: "images/num9.png",
    //   },
    //   {
    //     name: "Q1",
    //     img: "images/Q1.png",
    //   },
    //   {
    //     name: "Q2",
    //     img: "images/Q2.png",
    //   },
  ];

  // Intro pop up (popupContainer)
  const popupIntroOne = document.getElementById("popupContainerOne");
  const closeButtonOne = document.getElementById("closeButtonOne");

  // Match pair pop up
  const popsupContainerTwo = document.getElementById("popupContainerTwo");
  const closeButtonTwo = document.getElementById("closeButtonTwo");

  // Incorrect pair pop up
  const popsupContainerThree = document.getElementById("popupContainerThree");
  const closeButtonThree = document.getElementById("closeButtonThree");

  // Win game + restart pop up
  const popsupContainerFour = document.getElementById("popupContainerFour");
  const closeButtonFour = document.getElementById("closeButtonFour");

  // creating function for window.onload
  window.onload = function () {
    setTimeout(function () {
      popupIntroOne.style.display = "block";
    }, 200);

    // close popup by pressing button
    closeButtonOne.addEventListener("click", () => {
      popupIntroOne.style.display = "none";
    });
  };

  // shuffle, random array using sort
  cardArray.sort(() => 0.5 - Math.random());

  // initialising gridBox
  const gridBox = document.getElementById("grid");

  // intialising with result ID
  const result = document.getElementById("result");

  // array for chosen card to be pushed to
  let chosenCard = [];

  // array for chosenCard id to be pushed to
  let chosenCardIds = [];

  // array of winning matches
  const cardsWon = [];

  // using forEach to create a loop
  const createGrid = () => {
    cardArray.forEach((i, index) => {
      if (index < cardArray.length) {
        // create img element for every card, store in card
        const card = document.createElement("img");

        // set source attribute to every card
        card.setAttribute("src", "images/blank.png");
        card.setAttribute("data-id", index);

        // add event listener with callback
        card.addEventListener("click", flipCard);

        // append grid with card(show image)
        grid.appendChild(card);
      }
    });
  };

  // call back funct
  createGrid();

  // check for match func
  function checkCard() {
    // initialising cards
    const cards = document.querySelectorAll("#grid img");

    // create variable for chosen cards IDs
    const firstCardId = chosenCardIds[0];
    const secondCardId = chosenCardIds[1];
    // console.log(cards);
    // console.log("Matched?");

    // check if first card match second card
    if (chosenCard[0] == chosenCard[1]) {
      setTimeout(function () {
        popsupContainerTwo.style.display = "block";
        rightAudio.play();
      }, 100);

      // close popup by pressing button
      closeButtonTwo.addEventListener("click", () => {
        console.log("Changed containerTwo to block & reset image on click");
        popsupContainerTwo.style.display = "none";

        // set blank_ png if a match
        cards[firstCardId].setAttribute("src", "images/blank_.png");
        cards[secondCardId].setAttribute("src", "images/blank_.png");

        // stop click event listener on card if already matched
        cards[firstCardId].removeEventListener("click", flipCard);
        cards[secondCardId].removeEventListener("click", flipCard);
      });

      // record how many matches made
      cardsWon.push(chosenCard);
    } else {
      // chosenCard[0] === !chosenCard[1];
      setTimeout(function () {
        popsupContainerThree.style.display = "block";
        // alert("wrong");
        wrongAudio.play();
      }, 100);

      setTimeout(function () {
        cards[firstCardId].setAttribute("src", "images/blank.png");
        cards[secondCardId].setAttribute("src", "images/blank.png");
      }, 1000);

      // close popup by pressing button
      closeButtonThree.addEventListener("click", () => {
        console.log("Changed containerThree to block & reset image on click");
        popsupContainerThree.style.display = "none";
      });
    }

    // restart
    result.textContent = cardsWon.length;
    chosenCard = [];
    chosenCardIds = [];

    if (cardsWon.length === cardArray.length / 2) {
      // result.textContent = "Congrats! You found them all!";
      setTimeout(function () {
        popsupContainerTwo.style.display = "none";
      }, 00);
      setTimeout(function () {
        popsupContainerFour.style.display = "block";
        winAudio.play();
      }, 50);
      // close popup by pressing button
      closeButtonFour.addEventListener("click", () => {
        console.log("Changed containerFour to block & reset game on click");
        popsupContainerFour.style.display = "none";
        cards.forEach((x) => {
          x.setAttribute("src", "images/blank.png");
        });
        // add reset button
        window.location.reload();
        return false;
      });
    }
  }
  // flip card func
  function flipCard() {
    // after shuffle, show array
    // console.log(cardArray);
    // store data id into cardId when clicked
    const cardId = this.getAttribute("data-id");
    // .push name of card into chosenCard array
    chosenCard.push(cardArray[cardId].name);
    // .push data id into chosenCardIds array
    chosenCardIds.push(cardId);
    console.log(chosenCard);
    console.log(chosenCardIds);
    // log "clicked", data Id
    // console.log("clicked", cardId);
    // console.log(chosenCard);
    // add src to card, to show image
    this.setAttribute("src", cardArray[cardId].img);
    // if clicked card is 2, wait 500ms then checkCard
    if (chosenCard.length === 2) {
      setTimeout(checkCard, 500);
    }
  }

  // play background music
  // const backgroundAudio = new Audio("music/8bittownthemesong-59266.mp3");
  // const backgroundAudioButton = document.getElementById("backgroundMusic");

  // // Play the audio automatically
  // backgroundAudioButton.play();

  // Sound Effect
  const wrongAudio = new Audio("music/negative_beeps-6008.mp3");
  wrongAudio.volume = 0.4;

  const rightAudio = new Audio("music/correct-6033.mp3");
  rightAudio.volume = 0.4;

  const winAudio = new Audio("music/magical-hit-45356.mp3");
  winAudio.volume = 0.4;

  const backgroundAudio = new Audio("music/8bittownthemesong-59266.mp3");
  backgroundAudio.volume = 0.2;
  backgroundAudio.autoplay = true;
  backgroundAudio();
  backgroundAudio.loop = true;

  //DOM
});
