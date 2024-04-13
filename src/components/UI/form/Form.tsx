import React from "react";

const Form = ({
   children,
   actionFunc,
}: {
   children: React.ReactNode;
   actionFunc: (fd: FormData) => void;
}) => {
   return <form action={actionFunc}>{children}</form>;
};

export default Form;
