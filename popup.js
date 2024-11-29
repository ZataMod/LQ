document.getElementById("heroes").addEventListener("change", async () => {
    const heroId = document.getElementById("heroes").value;
    const imageList = document.getElementById("image-list");
    imageList.innerHTML = ""; // Xóa danh sách cũ

    if (heroId !== "None") {
        for (let i = 0; i <= 20; i++) {
            const imageNumber = i.toString().padStart(2, '0');
            const imageUrl = `https://dl.ops.kgtw.garenanow.com/CHT/HeroTrainingLoadingNew_B36/${heroId}${imageNumber}.jpg`;

            try {
                // Fetch nội dung HTML nguồn
                const response = await fetch(imageUrl);
                const text = await response.text();

                // Kiểm tra nếu không chứa <Error>
                if (!text.includes("<Error>")) {
                    const container = document.createElement("div");
                    container.classList.add("image-container");

                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.classList.add("hero-image");

                    const caption = document.createElement("p");
                    caption.textContent = `${heroId}${imageNumber}`;
                    caption.classList.add("image-caption");

                    container.appendChild(imgElement);
                    container.appendChild(caption);
                    imageList.appendChild(container);
                }
            } catch (error) {
                console.error(`Lỗi tải ảnh ${imageUrl}:`, error);
            }
        }
    }
});
