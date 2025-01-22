// Scroll based navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};
// Menu icon function
const menuIconElem=document.getElementById('menuIcon');
const navBarElem=document.getElementById('navBar');

menuIconElem.addEventListener('click',function(){
    if(navBarElem.classList.contains('showTopNav')){
        navBarElem.classList.add('hideTopNav');
        navBarElem.classList.remove('showTopNav');
    }
    else{
        navBarElem.classList.add('showTopNav');
        navBarElem.classList.remove('hideTopNav');
    }
    console.log("Hi")
})

// Home section
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove the "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeDot", "");
  }

  // Increment slideIndex, reset if it exceeds the total number of slides
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  
  // Display the current slide and mark the corresponding dot as active
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " activeDot";

  // Auto-slide every 2 seconds
  setTimeout(showSlides, 4000);
}

// Next/previous controls
function plusSlides(n) {
  showCurrentSlide(slideIndex += n);
}

// Dot controls
function currentSlide(n) {
  showCurrentSlide(slideIndex = n);
}

function showCurrentSlide(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Ensure index is within bounds
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove the "activeDot" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeDot", "");
  }

  // Display the current slide and mark the corresponding dot as active
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " activeDot";
}


// Sensor Data
function fetchSensorData() {
    const url = 'https://api.thingspeak.com/channels/2705751/feeds.json?api_key=AKRX1TODJL8HDAFQ&results=1';
    const offlineThreshold = 60000; // 60 seconds threshold to determine if the device is offline

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.feeds.length > 0) {
                const gasLevel = parseFloat(data.feeds[0].field1); // Get gas level
                const smokeLevel = parseFloat(data.feeds[0].field2); // Get smoke level
                const lastUpdatedTime = new Date(data.feeds[0].created_at).getTime();
                const currentTime = new Date().getTime();

                // Check if the device is online
                if ((currentTime - lastUpdatedTime) <= offlineThreshold) {
                    document.getElementById('gasLevel').innerText = gasLevel;
                    document.getElementById('smokeLevel').innerText = smokeLevel;

                    // Set danger or safe status
                    document.getElementById('gasLevel').style.color = gasLevel > 1000 ? "red" : "#5AA603";
                    document.getElementById('smokeLevel').style.color = smokeLevel > 500 ? "red" : "#5AA603";
                } else {
                    setOffline();
                }
            } else {
                setOffline();
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setOffline();
        });
}

// Set sensor data as offline
function setOffline() {
    document.getElementById('gasLevel').innerText = "offline";
    document.getElementById('gasLevel').style.color = "white";
    document.getElementById('smokeLevel').innerText = "offline";
    document.getElementById('smokeLevel').style.color = "white";
}

// Fetch data every 15 seconds (15000 milliseconds)
setInterval(fetchSensorData, 8000);

// Fetch data immediately after the page loads
window.onload = fetchSensorData;


//Reset form after submission
const submitBtnElem=document.getElementById('submitBtn');
const contactFormElem=document.getElementById('contactForm');
contactFormElem.addEventListener('submit',(e)=>{
    e.preventDefault();
    contactFormElem.reset();
})



