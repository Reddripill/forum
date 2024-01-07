import { IResponseWithAttributes, ITag } from "@/types/main.types";
import axios from "axios";

class Tags {
   async getTags() {
      const res = await axios.get<IResponseWithAttributes<ITag>>(
         `http://localhost:1337/api/tags?populate=*`
      );
      const tags = await res.data;
      return tags;
   }
}

const TagsService = new Tags();

export default TagsService;
