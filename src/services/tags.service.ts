import { IResponseWithAttributes, ITag } from "@/types/main.types";
import { axiosInstance } from "../../axios.config";

class Tags {
   async getTags() {
      const res = await axiosInstance.get<IResponseWithAttributes<ITag>>(
         `/tags?populate=*`
      );
      const tags = await res.data;
      return tags;
   }
   async getTagsByInput(input: string) {
      const res = await axiosInstance.get<IResponseWithAttributes<ITag>>(
         `/tags?filters[name][$contains]=${input}&populate=*`,
         {
            transformResponse: [
               (response) => {
                  const resp = JSON.parse(
                     response
                  ) as IResponseWithAttributes<ITag>;
                  return resp.data.map((item) => ({
                     name: item.attributes.name,
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
