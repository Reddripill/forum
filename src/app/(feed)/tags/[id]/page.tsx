import React from "react";

const TagPage = ({ params }: { params: { id: string } }) => {
   return <div>Current tagId: {params.id}</div>;
};

export default TagPage;
