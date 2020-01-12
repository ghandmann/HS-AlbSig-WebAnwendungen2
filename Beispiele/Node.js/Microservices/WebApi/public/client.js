$(async () => {
    // get the images and render the list after document ready
    const imageIds = await getImageList();
    renderImageList(imageIds);

    // Connect the reload button
    $("#reload-file-listing").click(async () => renderImageList(await getImageList()));
});

// Load all images from the API
async function getImageList() {
    const response = await fetch("/images");
    return await response.json();
}

// Render all imageIds in a list
function renderImageList(imageIds) {
    const list = $("#file-listing");
    list.empty();
    imageIds.forEach((id) => {
        const item = $("<li />");
        const link = $("<a />");
        link.attr("href", "/images/" + id);
        link.text(id);
        item.append(link);
        list.append(item);
    });
}