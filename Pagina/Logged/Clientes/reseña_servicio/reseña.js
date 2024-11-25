window.addEventListener("load", () => {
    gsap.to(".servicio-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2
    });

    gsap.from(".carousel-control-prev, .carousel-control-next", {
        opacity: 0,
        x: -50,
        duration: 0.5
    });
});
