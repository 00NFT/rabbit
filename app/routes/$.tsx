import { LinksFunction } from "@remix-run/node";
import styles from "../../style/module/error-page.module.css";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/button";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: "/style/module/error-page.module.css" }];

export default function CatchAllRoute() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <h1>앗! 페이지를 찾을 수 없어!</h1>
          <span>
            링크를 다시 확인하거나 <br />
            아래 버튼을 눌러서 시작화면으로 돌아와줘
          </span>
        </div>
        <img src="/images/404/rabbit_error.svg" alt="토끼 이미지" className={styles.rabbit} />
      </div>
      <div className={styles.buttonsWrapper}>
        <Button onClick={handleClick} buttonType="secondary">
          시작 화면으로 가기
        </Button>
      </div>
    </>
  );
}
