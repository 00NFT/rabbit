import styles from "../../../style/module/prevent-external-page.module.css";

export function PreventExternalBrowser() {
  const handleCopy = () => {
    const url = window.location.href;
    window.navigator.clipboard.writeText(url).then(() => {
      alert("성공적으로 복사를 했어!");
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <h1>
            편안한 사용을 위해 <br />
            인앱 브라우저에서는 <br />
            제공하지 않고 있어!
          </h1>
          <span>
            하단의 버튼을 누르면 링크가 자동으로 복사 돼! <br />
            다른 브라우저를 통해서 나를 보러와!
          </span>
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <button onClick={handleCopy}> 링크 복사하기 </button>
      </div>
    </>
  );
}
