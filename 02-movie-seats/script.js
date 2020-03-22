const container  =  document.querySelector('.container');
const seats  =  document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const numberSelect = document.getElementById('number');

let ticketPrice =  +movieSelect.value; //value atribut

populateUI();

//Save selected Movie index and Price
function setMovieData(movieIndex, moviePrice) {
  //salvam un string
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total , count and number seats
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  console.log('selectedSeats:', selectedSeats);

  // punem valorile din Node list
  const selectedSeatsCount = selectedSeats.length;
  console.log('selectedSeatsCount:', selectedSeatsCount);

  //Copy selected Seats into Arr
  //spred, copy Nodelist into Array
  //Map through  array
  // return an array of indexes
  const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));
  console.log('seatsIndex: ', seatsIndex ); //seatsIndex:  (4) [8, 9, 11, 12]


  //Seat number
  //transform Nodelist in Array
  let selectedSeatsNumber = Array.from(selectedSeats);
  console.log('selectedSeatsNumber::', selectedSeatsNumber);

  //Loop through Array
  let seatNumbers = selectedSeatsNumber.map(item => item.attributes[1].value);
  console.log('seatNumbers', seatNumbers);

  //LOCAL STORAGE
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  localStorage.setItem('numberSeats', JSON.stringify(seatNumbers));
  
  //show the places number, cout tseats and palce
  numberSelect.innerText = seatNumbers;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice; 

}

// get Data from local storage and populate ui

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log('selectedSeats', selectedSeats);

  //show selected seats
  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  //show movie
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie select event
movieSelect.addEventListener('change', e=> {
  ticketPrice = +e.target.value;
  console.log('e.target.selectedIndex', e.target.selectedIndex, e.target.value);
  //luam indexul filmului si valoarea lui
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat click Events
container.addEventListener('click', (e)=> {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
      e.target.classList.toggle('selected');
      updateSelectedCount();
  }
});

//Initial count and total 
updateSelectedCount();