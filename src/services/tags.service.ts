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
      const limitFilter = "pagination[limit]=6";
      const res = await axiosInstance.get<ITag>(
         `/tags?filters[name][$contains]=${input}&${limitFilter}&populate=*`,
         {
            transformResponse: [
               (response) => {
                  const resp = JSON.parse(response) as IResponse<ITag[]>;
                  console.log("Response: ", resp);
                  return resp.data.map((item) => ({
                     label: item.name,
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
