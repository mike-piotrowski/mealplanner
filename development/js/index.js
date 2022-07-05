const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNavs = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNavs.children);

let idx = 0;

const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide, index) =>{
    slide.style.left= slideWidth * index + 'px';
}
slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) =>{
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('carousel__indicator--current');
    targetDot.classList.add('carousel__indicator--current');
}

nextButton.addEventListener('click', e => {
    const currentSlide = document.querySelector('.current-slide')
    const nextSlide =  currentSlide.nextElementSibling;
    const currentDot = dotsNavs.querySelector('.carousel__indicator--current')
    const nextDot = currentDot.nextElementSibling;
    idx += 1;

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
});

prevButton.addEventListener('click', e =>{
    const currentSlide = document.querySelector('.current-slide')
    const prevSlide =  currentSlide.previousElementSibling;
    const currentDot = dotsNavs.querySelector('.carousel__indicator--current')
    const prevDot = currentDot.previousElementSibling;
    idx -= 1;
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
});

dotsNavs.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if(!targetDot) return;
    const currenSlide = track.querySelector('.current-slide');
    const currentDot = dotsNavs.querySelector('.carousel__indicator--current');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currenSlide, targetSlide);
    updateDots(currentDot, targetDot)
})