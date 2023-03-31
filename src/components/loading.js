import styles from "@/styles/Home.module.css";


const LoadingSpinner = () => {
    return (
      <div className={styles.loadingSpinnerContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  };
  
  export default LoadingSpinner;