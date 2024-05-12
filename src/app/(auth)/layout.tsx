import styles from "@/styles/authLayout.module.scss";
export default function AuthLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <>
         <div className={styles.layout}>{children}</div>
      </>
   );
}
