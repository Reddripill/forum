import styles from "../../styles/feedLayout.module.scss";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function FeedLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className={styles.wrapper}>
         <Sidebar />
         <div className={styles["main-wrapper"]}>{children}</div>
      </div>
   );
}
