import { ITag } from "@/types/post.types";
import { axiosInstance } from "../../axios.config";
import { IResponse } from "@/types/main.types";

class Tags {
   async getTags() {
      const res = await axiosInstance.get<IResponse<ITag[]>>(
         `/tags?populate=*`
      );
      const tags = await res.data;
      return tags;
   }
   async getTagsByInput(input: string) {
      const res = await axiosInstance.get<ITag>(
         `/tags?filters[name][$contains]=${input}&populate=*`,
         {
            transformResponse: [
               (response) => {
                  const resp = JSON.parse(response) as ITag[];
                  return resp.map((item) => ({
                     name: item.name,
                     id: item.id,
                  }));
               },
            ],
         }
      );
      const tags = await res.data;
      return tags;
   }
}

const TagsService = new Tags();

export default TagsService;
