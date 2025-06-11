document.addEventListener("DOMContentLoaded", async function() {
    const anata_carousel = document.getElementById("anata-carousel");
    const dotsContainer = document.querySelector(".dots-container");

    if (!anata_carousel || !dotsContainer) {
        console.error("Element not found.");
        return;
    }

    async function getContentData() {
        const response = await fetch("./json/fw-content.json");
        const data = await response.json();
        const cont = data["fw-contents"];

        if (!cont || !cont[0] || !cont[0].anata) {
            console.error("The expected structure is not found.");
            return;
        }

        const getContent = cont[0].anata[0];  // Assuming only one item in the anata array

        // Create the images and dots
        Object.keys(getContent).forEach((key, index) => {
            const imgPath = getContent[key];

            const imgContainer = document.createElement("figure");
            const img = document.createElement("img");

            img.src = imgPath;
            img.alt = `Image ${index + 1}`;

            imgContainer.classList.add('carousel-image');
            img.classList.add('object-cover', 'aspect-square'); // Ensures images fill the container
            anata_carousel.appendChild(imgContainer);
            imgContainer.appendChild(img);

            // Create dots
            const dot = document.createElement("div");
            dot.classList.add('dot', 'w-2.5', 'h-2.5', 'rounded-full', 'bg-white', 'opacity-50', 'cursor-pointer', 'transition-opacity', 'duration-300');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });

        setupCarousel();
    }

    function setupCarousel() {
        const images = document.querySelectorAll(".carousel-image");
        const dots = document.querySelectorAll(".dot");

        let currentIndex = 0;

        // Show the first image by default
        showImage(currentIndex);

        // Add event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                currentIndex = parseInt(dot.dataset.index);
                showImage(currentIndex);
            });
        });

        // Function to show the image and highlight the dot
        function showImage(index) {
            // Show the corresponding image and hide others
            images.forEach((img, i) => {
                img.style.display = (i === index) ? 'block' : 'none';
            });

            // Highlight the active dot
            dots.forEach(dot => dot.classList.remove("opacity-100"));
            dots[index].classList.add("opacity-100");
        }

        // Optional: Auto-slide the images every 3 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 3000);
    }

    getContentData();
});
