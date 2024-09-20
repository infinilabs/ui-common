import styles from "./Error.module.less";
import { CloseCircleOutlined } from "@ant-design/icons";

export default (props) => {
  const { currentLocales, failed = true } = props;
  if (!failed) return null;
  return (
    <div className={styles.error}>
      <CloseCircleOutlined />
      <div className={styles.tips}>
        {currentLocales["dropdownlist.loading.failed"]}
      </div>
    </div>
  );
};
