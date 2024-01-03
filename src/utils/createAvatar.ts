import axios from "axios";
import { toSvg } from "jdenticon";

const createAvatar = (userId: number, size: number) => {
   const svgString = toSvg(userId, size);
   const svg = new Blob([svgString], { type: "image/svg+xml" });
   const formData = new FormData();

   formData.append("files", svg);
   axios
      .post("http://localhost:1337/api/upload", formData)
      .then((response) => {
         console.log("succes request: ", response);
      })
      .catch((err) => {
         console.log("Error: ", err);
      });
};

export default createAvatar;
