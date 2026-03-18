function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}


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
            }, 10);
        }
    })

    tl.from("#page1, #page2, #page3, #page4, #page5, #footer", {
        y: 1600,
        opacity: 0,
        duration: 0.5,
        delay: 4
    })

    tl.to("#loader", {
        opacity: 0,
        display: "none",
        onComplete: enableScroll
    })

    tl.from(".hero h1, .hero h2, .hero h3", {
        y: 200,
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

    let videocursor = document.querySelector("#video-container")
    videocursor.addEventListener("mouseenter", function () {
        videocursor.addEventListener("mousemove", function (move) {
            gsap.to("#cursor",{
                opacity:0
            })
            gsap.to("#video-cursor", {
                left: move.x -700,
                top: move.y -150
            })
        })
        videocursor.addEventListener("mouseleave", function(){
            gsap.to("#cursor",{
                opacity:1
            })
            gsap.to("#video-cursor",{
                top: "-10%",
                left:"70%"
            })
        })
    })
}

function page3img() {
    Shery.imageEffect(".img-div", {
        style: 6,
        gooey: true,
    });
}

loco()
cursor()
loading()
page3img()