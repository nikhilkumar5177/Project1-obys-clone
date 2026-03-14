function loading() {
    let h5timmer = document.querySelector("#progress h5")
    let tl = gsap.timeline();

    function disableScroll() {
        document.body.style.overflow = "hidden"
    }
    
    function enableScroll() {
        document.body.style.overflow = "auto"
    }
    
    disableScroll();
    tl.from(".h1loader h1", {
        y: 1500,
        duration: 1.5,

        stagger: 0.3,
    })


    tl.from("#progress", {
        opacity: 0,
        onStart: function () {
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

    tl.from("#page1, #page2, #page3, #page4, #page5", {
        y: 1600,
        opacity: 0,
        duration: 0.5,
        delay: 3.2
    })

    tl.to("#loader", {
        opacity: 0,
        display: "none",
        onComplete: enableScroll()
    })

    tl.from(".hero h1, .hero h2, .hero h3", {
        y: 100,
        stagger: 0.1,
    })
    tl.from("#cursor", {
        opacity: 0
    })
    tl.from("#nav-part2", {
        opacity: 0
    })


}

function cursor() {
    document.addEventListener("mousemove", function (move) {
        gsap.to("#cursor", {
            left: move.x,
            top: move.y
        })
    })
    Shery.makeMagnet("#nav-part2 h4");
}



cursor()
loading() 