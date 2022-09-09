import styles from "../styles/Home.module.css";
import IndexCard from "../components/IndexCard";

export default function Home() {
  return (
    <div
      className={
        styles.container +
        " d-flex flex-column flex-md-row justify-content-md-end align-items-md-center w-100"
      }
    >
      <div className={styles.img + " d-flex d-md-none m-0 p-0 m-2 mt-4 mx-auto"}>
        <img src="/bg1_169.jpg" alt="BackgroundImage" />
        <h4 className="m-0 p-0 py-1">
          Noi avem grija de ochii dumneavoastra!
        </h4>
      </div>
      <IndexCard />
    </div>
  );
}
