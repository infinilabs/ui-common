import { CloseCircleOutlined } from "@ant-design/icons";

import styles from "./Error.module.less";

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
