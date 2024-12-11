document.getElementById("heroes").addEventListener("change", async () => {
    const heroId = document.getElementById("heroes").value;
    const imageList = document.getElementById("image-list");
    imageList.innerHTML = "";

    if (heroId !== "None") {
        for (let i = 0; i <= 20; i++) {
            const imageNumber = i.toString().padStart(2, '0');
            const imageUrl = `https://dl.ops.kgtw.garenanow.com/CHT/HeroTrainingLoadingNew_B36/${heroId}${imageNumber}.jpg`;

            try {
                const response = await fetch(imageUrl);
                const text = await response.text();

                if (!text.includes("<Error>")) {
                    const container = document.createElement("div");
                    container.classList.add("image-container");

                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.classList.add("hero-image");
                    
                    const downloadButton = document.createElement("button");
                    downloadButton.textContent = `Tải ${heroId}${imageNumber}.jpg`;
                    downloadButton.classList.add("download-button");
                    downloadButton.style.display = "none";

                    imgElement.addEventListener("click", (e) => {
                        e.stopPropagation();
                        hideAllButtons();
                        downloadButton.style.display = "block";
                    });
                    
                    downloadButton.addEventListener("click", async () => {
                        try {
                            const fileName = `${heroId}${imageNumber}.jpg`;
                            const fileResponse = await fetch(imageUrl);

                            if (!fileResponse.ok) throw new Error("Lỗi tải file");

                            const blob = await fileResponse.blob();
                            const url = URL.createObjectURL(blob);

                            const a = document.createElement("a");
                            a.href = url;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();

                            URL.revokeObjectURL(url);
                            a.remove();
                        } catch (error) {
                            console.error("Lỗi tải ảnh:", error);
                        }
                    });

                    container.appendChild(imgElement);
                    container.appendChild(downloadButton);
                    imageList.appendChild(container);
                }
            } catch (error) {
                console.error(`Lỗi tải ảnh ${imageUrl}:`, error);
            }
        }
    }
});

document.addEventListener("click", () => {
    hideAllButtons();
});

function hideAllButtons() {
    const buttons = document.querySelectorAll(".download-button");
    buttons.forEach(button => {
        button.style.display = "none";
    });
}
