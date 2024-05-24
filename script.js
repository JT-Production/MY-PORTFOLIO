
/*Nav bar*/ 

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
    fixedBlurNav();
});

function fixedBlurNav() {
    if (window.pageYOffset >= 250) {
        navbar.classList.add("new-navbar");
        navbar.classList.add("fixed-top");
    } else {
        navbar.classList.remove("new-navbar");
        navbar.classList.remove("fixed-top");
    }
}
fixedBlurNav();



/* Textimonial */

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;
          // Ensure the scrollbar thumb stays within bounds
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }
      // Remove event listeners on mouse up
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }
      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });
  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });
   // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }
  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }
  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);


/* Projects done*/

//counter

let section_counter = document.querySelector('.counter')
let counters = document.querySelectorAll('.col');

let speed = 200;


//scroll anmation
let CounterObserver = new IntersectionObserver((entries, observer) => {
  let [entry] = entries;
  if (!entry.isIntersecting) return;
  
  let speed = 200;
  counters.forEach((counter,index) => {
    function UpdateCounter(){
        const targetNumber = +counter.dataset.target;
        const initialNumber = +counter.innerText;
        const incPerCount = targetNumber / speed;

        if (initialNumber < targetNumber) {
          counter.innerText = Math.ceil(initialNumber + incPerCount);
          
          setTimeout(UpdateCounter, 40) 
        }
    }
    UpdateCounter();
    
    if(counter.parentElement.style.animation){
      counter.parentElement.style.animation = "";
    } else { 
      counter.parentElement.style.animation = `slide-up 0.3s ease forwards ${index / counters.length + 0.5}s`;
    }
});
}, 
{
  root: null,
 threshold:0.4,

});
CounterObserver.observe(section_counter);


/* Loader*/
var loaderwrapper = document.querySelector('.loader-wrapper');


// setTimeout (() => {
//     spinnerwrapper.style.opacity = '0';

// },1000);
window.addEventListener('load', () =>{
    loaderwrapper.style.opacity = '0';

    setTimeout(() =>{
        loaderwrapper.style.display = 'none';
    },1000)
})

