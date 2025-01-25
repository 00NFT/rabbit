import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { useRef, useState } from "react";

import html2canvas from "html2canvas";
import fileSaver from "file-saver";
import { useParams } from "@remix-run/react";

import { Button } from "~/components/button";
import { Header } from "~/components/header";
import { RabbitCard } from "~/components/rabbit-card";
import { FloatingBottomArea } from "~/components/floating-bottom-area";
import { nameAtom } from "~/utils/usePhaseActions";
import { usePostNickname } from "~/hooks/apis/usePostNickname";

export default function Page() {
  const nickname = useAtomValue(nameAtom);
  const { rabbit = "0000" } = useParams();
  const { mutate } = usePostNickname();

  const cardRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  /**
   * 줄바꿈 최대 1번 / 최대 40자 제한
   */
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const formattedMessage = value
      .split(/[\r\n]/)
      .slice(0, 2)
      .join("\n")
      .slice(0, 40);

    setMessage(formattedMessage);
  };

  const handleClickDownload = async () => {
    if (!cardRef.current) return;
    const hiddenTextarea = cardRef.current.querySelector("#rabbit_textarea") as HTMLElement;
    const printTextarea = cardRef.current.querySelector("#rabbit_print_textarea") as HTMLElement;

    if (hiddenTextarea && printTextarea) {
      hiddenTextarea.style.visibility = "hidden";
      printTextarea.style.visibility = "visible";
    }

    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        logging: true,
        scale: 2,
      });
      const fileName = `${nickname}의 덕담카드.png`;

      canvas.toBlob((blob) => {
        if (blob !== null) {
          fileSaver.saveAs(blob, fileName);
        }
      });
    } catch (error) {
      console.error("이미지 저장에 실패했어요!");
    }

    if (hiddenTextarea && printTextarea) {
      hiddenTextarea.style.visibility = "visible";
      printTextarea.style.visibility = "hidden";
    }
  };

  const shareRabbitLink = (shareUrl: string) => {
    if (!navigator.canShare) {
      try {
        navigator.clipboard.writeText(shareUrl);
        alert("링크가 복사되었어요!");
      } catch {
        alert("문제가 발생했어요!");
      }
      return;
    }

    navigator.share({
      title: "새해맞이 달토끼 구출 대작전",
      text: `${nickname} 용사의 덕담카드 🐰`,
      url: shareUrl,
    });
  };

  const handleClickShare = () => {
    mutate(
      {
        message,
        username: nickname,
        game_result: rabbit,
      },
      {
        onSuccess: ({ id }) => {
          // TODO: console.log 제거 예정
          console.log(id);
          const shareUrl = `https://www.9haejo-tokki.co.kr/rabbit-card/${id}`;
          shareRabbitLink(shareUrl);
        },
        onError: (error) => {
          console.error(error);
          alert("문제가 발생했어요!");
        },
      },
    );
  };

  return (
    <>
      <Header backgroundColor="#f0f4fc" />

      <div css={containerCss}>
        <h1>{nickname} 용사의 덕담카드 만들기</h1>

        <RabbitCard message={message} onChangeMessage={handleChangeTextarea} rabbitId={rabbit} ref={cardRef} />

        <p css={descriptionCss}>최대 2줄, 40글자까지 작성 가능합니다</p>
      </div>

      <FloatingBottomArea backgroundColor="#F0F4FC">
        <div css={buttonWrapper}>
          {/* NOTE: 베타테스트 버튼 */}
          {/* <Button as="link" to="/result/feedback">
            베타테스트 후기 남기기
          </Button> */}

          <Button buttonType="secondary" onClick={handleClickDownload}>
            카드 다운로드
          </Button>
          <Button onClick={handleClickShare}>덕담 공유하기</Button>
        </div>
      </FloatingBottomArea>
    </>
  );
}

const containerCss = css`
  padding: 0px 24px 16px;
  background-color: #f0f4fc;

  > h1 {
    font-size: 20px;
    text-align: center;
    padding-top: 12px;
    margin-bottom: 20px;
  }
`;

const buttonWrapper = css`
  width: 100%;

  display: flex;
  gap: 10px;
  justify-content: center;
`;

const descriptionCss = css`
  font-size: 10px;
  color: #6b7ca1;
  margin-top: 12px;
  text-align: center;
`;
