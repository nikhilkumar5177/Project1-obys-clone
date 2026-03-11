let h5timmer = document.querySelector("#progress h5")

let tl = gsap.timeline();

tl.from(".h1loader h1", {
    y: 1500,
    duration: 1
    // stagger: 0.3,
})

tl.from("#progress", {
    opacity: 0,
    onStart: function(){
    let count = 0;

    let Interval = setInterval(function () {
        if (count == 101) {
            clearInterval(Interval);
        }
        else {
            h5timmer.innerHTML = count++;
        }
    }, 30);
}
})

tl.to("#loader",{
    opacity: 0,
    duration:0.2,
    delay: 4
})
tl.from("#page1",{
    delay: 0.2,
    y: 1600,
    opacity:0,
})
tl.to("#loader",{
    display: "none",
})