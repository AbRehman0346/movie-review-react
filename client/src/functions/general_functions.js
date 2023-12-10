import Card from "../components/Card";
export const generateCards = (posts, options = false) => {
  // This function is called in
  // Manage page
  // Home Page
  const cards = [];
  if (posts)
    for (let s in posts) {
      let data = posts[s];
      cards.push(
        <div className='p-3'>
          <Card
            id={data._id}
            title={data.title}
            image={data.images}
            options={options}
          />
        </div>
      );
    }
  return cards;
};

export const handle_text_overflow = (text) => {
  // This function is called in
  // CARD components.
  if (text.length > 20) {
    text = text.substring(0, 20) + "...";
  }
  return text;
};

export function getArrayOfCommaSeparatedValues(value) {
  const arr = [];
  let index = 0;
  while (index !== -1) {
    index = value.indexOf(",");
    arr.push(value.substring(0, index === -1 ? value.length : index).trim());
    value = value.substring(index === -1 ? 0 : index + 1);
  }
  return arr;
}

export async function processImage(file) {
  return new Promise((resolve, reject) => {
    // const [fileHandle] = await window.showOpenFilePicker();
    // const file = await fileHandle.getFile();
    // const imageUrl = URL.createObjectURL(file);
    // document.getElementById("imagePreview").src = imageUrl;

    // Because we get the file above as argument. We don't need the above lines
    // but this is how we get that file.

    const imageBlob = file.slice(0, file.size, "image/jpeg");
    const compressedImageUrl = URL.createObjectURL(imageBlob);

    const compressedImage = new Image();
    compressedImage.src = compressedImageUrl;

    compressedImage.onload = function () {
      const canvas = document.createElement("canvas");
      const maxWidth = 800; // Adjust this as needed
      const scaleFactor = maxWidth / compressedImage.width;
      canvas.width = compressedImage.width * scaleFactor;
      canvas.height = compressedImage.height * scaleFactor;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(compressedImage, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL("image/jpeg");
      // console.log("Compressed and Base64 image:", base64Image);
      resolve(base64Image);
      // You can use the base64Image as needed
    };
    compressedImage.onerror = function (error) {
      reject(error);
    };
  });
}
