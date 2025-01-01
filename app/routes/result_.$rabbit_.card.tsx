import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { useRef, useState } from "react";
import { Button } from "~/components/button";
import { FloatingBottomArea } from "~/components/floating-bottom-area";
import { Header } from "~/components/header";
import { nameAtom } from "~/utils/usePhaseActions";

import html2canvas from "html2canvas";
import fileSaver from "file-saver";
import { useParams } from "@remix-run/react";
import { encrypt } from "~/utils/crypto";

export default function Page() {
  const nickname = useAtomValue(nameAtom);
  const { rabbit = "0000" } = useParams();

  const cardRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  /**
   * 줄바꿈 최대 1번 / 최대 40자 제한
   */
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const newValue = value
      .split(/[\r\n]/)
      .slice(0, 2)
      .join("\n")
      .slice(0, 40);

    setText(newValue);
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

  const handleClickShare = () => {
    const shareUrl = `https://www.9haejo-tokki.co.kr/rabbit-card/${encrypt(rabbit)}`;

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
      text: `${nickname} 용사의 덕담카드`,
      url: shareUrl,
    });
  };

  return (
    <>
      <Header backgroundColor="#f0f4fc" />

      <div css={containerCss}>
        <h1>
          {nickname} 용사의 달토끼로
          <br />
          덕담카드 만들기
        </h1>

        <div css={cardCss} ref={cardRef}>
          <div
            css={imageCss}
            style={{
              background: `#151528 url("/images/result/card/${rabbit}.png") center/cover no-repeat`,
            }}
          />
          <div css={textAreaWrapperCss}>
            <div
              id="rabbit_print_textarea"
              css={[textareaCss, printTextareaCss]}
              dangerouslySetInnerHTML={{
                __html: text.replace("\n", "<br/>"),
              }}
            />
            <textarea
              id="rabbit_textarea"
              css={textareaCss}
              value={text}
              onChange={handleChangeTextarea}
              rows={2}
              placeholder={"2025년도 새해\n덕담 메시지를 입력해주세요!✨"}
            />
            <div css={underlineCss}>
              <div />
              <div />
            </div>
          </div>
        </div>

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
          <Button onClick={handleClickShare}>결과 공유하기</Button>
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
  }
`;

const imageCss = css`
  width: 100%;
  aspect-ratio: 1/1;

  object-fit: cover;
  border-radius: 12px;

  background-color: #151528;
`;

const cardCss = css`
  padding: 16px 17px;
  margin-top: 24px;
  border-radius: 16px;
  background-color: #dde6fa;
`;

const textAreaWrapperCss = css`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
`;

const printTextareaCss = css`
  position: absolute;
  top: -5px;

  visibility: hidden;

  height: auto;
  padding-bottom: 10px;
  z-index: 1;
`;

const textareaCss = css`
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 10px 0 0;
  line-height: 36px;
  border: none;
  outline: none;
  resize: none;
  color: black;
  overflow: hidden;
  text-align: center;
  z-index: 5;
  white-space: pre-wrap;

  &::placeholder {
    white-space: pre-line;
    color: #8e8e8e;
  }
`;

const underlineCss = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 36px;

  div {
    border-bottom: 1px solid #6b7ca1;
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
