function loco() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        lerp: 0.08
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

    setTimeout(() => {
        document.body.style.height =
            document.querySelector("#main").scrollHeight + "px";
    }, 500);
}
// ================= LOADING ANIMATION =================
function loading() {
    let h5timmer = document.querySelector("#progress h5");
    let tl = gsap.timeline();

    function disableScroll() {
        document.body.style.overflow = "hidden";
    }

    function enableScroll() {
        document.body.style.overflow = "auto";
    }

    disableScroll();

    tl.from(".h1loader h1", {
        y: 1500,
        duration: 1.5
    });

    tl.from("#progress", {
        opacity: 0,
        onStart: function () {
            let count = 0;

            let interval = setInterval(function () {
                if (count === 101) {
                    clearInterval(interval);
                } else {
                    h5timmer.innerHTML = count++;
                }
            }, 5);
        }
    });

    tl.from("#page1, #page2, #page3, #page4, #page5, #footer", {
        y: 1600,
        opacity: 0,
        duration: 0.5,
        delay: 4.5
    });

    tl.to("#loader", {
        opacity: 0,
        display: "none",
        onComplete: enableScroll
    });

    tl.from(".hero h1, .hero h2, .hero h3", {
        y: 200,
        stagger: 0.1
    });

    tl.from("#cursor", {
        opacity: 0
    });

    tl.from("#nav-part2", {
        opacity: 0
    });
}

// ================= CURSOR + VIDEO =================
function cursor() {
    // main cursor follow
    document.addEventListener("mousemove", function (move) {
        gsap.to("#cursor", {
            left: move.x,
            top: move.y
        });
    });

    // magnetic nav
    Shery.makeMagnet("#nav-part2 h4");

    let videocursor = document.querySelector("#video-container");
    let video = document.querySelector("#video-container video");

    // move inside video
    videocursor.addEventListener("mousemove", function (move) {
        gsap.to("#cursor", {
            opacity: 0
        });

        gsap.to("#video-cursor", {
            left: move.x - 700,
            top: move.y - 150
        });
    });

    // leave video
    videocursor.addEventListener("mouseleave", function () {
        gsap.to("#cursor", {
            opacity: 1
        });

        gsap.to("#video-cursor", {
            top: "-10%",
            left: "70%"
        });
    });

    // click toggle (PRO WAY)
    videocursor.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            video.style.opacity = 1;

            document.querySelector("#video-cursor").innerHTML =
                `<i class="ri-pause-mini-line"></i>`;

            gsap.to("#video-cursor", {
                scale: 0.5
            });
        } else {
            video.pause();
            video.style.opacity = 0;

            document.querySelector("#video-cursor").innerHTML =
                `<i class="ri-play-mini-line"></i>`;

            gsap.to("#video-cursor", {
                scale: 1
            });
        }
    });


    document.addEventListener("mousemove", function (move) {
        gsap.to("#flag", {
            top: move.y,
            left: move.x,

        })
    })
    document.querySelector(".flag").addEventListener("mouseenter", function () {
        gsap.to("#flag", {
            duration: 0.1,
            opacity: 1
        })
    })
    document.querySelector(".flag").addEventListener("mouseleave", function () {
        gsap.to("#flag", {
            duration: 0.1,
            opacity: 0
        })
    })
}

// ================= PAGE 3 IMAGE EFFECT =================
function page3img() {
    Shery.imageEffect(".img-div", {
        style: 6,
        gooey: true
    });
}


loco();
cursor();
loading();
page3img();