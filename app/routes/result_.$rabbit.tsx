import { css } from "@emotion/react";
import { Link, useParams } from "@remix-run/react";
import { Button } from "~/components/button";

const result: {
  [key: string]: {
    title: string;
    description: string;
  };
} = {
  "0000": {
    title: "모든걸 잃어버린 달토끼",
    description: "아무것도 못찾았은 김에 떡도 안만들어도 될거같아\n귀찮아서 그러는건 아니고\n굴러다니던 선글라스나 끼고 놀자 우리",
  },
  "1111": {
    title: "전부 다 찾은 달토끼",
    description: "다 찾았다! 고마워!\n이제 떡을 만들면 되겠어",
  },
  "1110": {
    title: "절구를 잃어버린 달토끼",
    description: "절구를 잃어버려서 떡을 못만들어\n그러니까 너도 먹지말자",
  },
  "1101": {
    title: "달을 읽어버린 달토끼",
    description: "달이 사라져서 그런가 막 떠다니네\n어쩔 수 없이 떡 안만들어도 되겠다",
  },
  "1011": {
    title: "귀를 잃어버린 달토끼",
    description: "떡 만드는 것도 피곤한데\n귀까지 사라져서 더 피곤하네\n아 피곤해서 떡은 못만들겠다",
  },
  "0111": {
    title: "당근을 잃어버린 달토끼",
    description: "당근을 잃어버려서 먹을게 없다\n그러니까 떡도 안만들게 다같이 먹지 말자\n일하기 싫어서 그러는거 아니야 진짜야",
  },
  "1010": {
    title: "귀와 절구를 일어버린 달토끼",
    description: "절구가 없어서 떡을 못만들겠네\n응? 뿅망치로 만들 수 있다고?\n아니, 나 지금 잘 안들려",
  },
  "1001": {
    title: "달과 귀를 잃어버린 토끼",
    description: "달이 없으면 빛이 없어\n캄캄한데 떡을 어떻게 만들어\n그냥 누워서 자자",
  },
  "0110": {
    title: "절구와 당근을 잃어버린 달토끼",
    description: "당근 잃어버려서 나 먹을것도 없으니까\n사이좋게 너도 떡 먹지 말자\n떡 만들기 싫어서 그러는건 아니고",
  },
  "1100": {
    title: "달과 절구를 잃어버린 달토끼",
    description: "달이 없어서 빛이 없어\n절구도 없으니까 그냥 떡 만들지 말자\n귀찮아서 그러는건 아니고",
  },
  "0011": {
    title: "당근과 귀를 잃어버린 달토끼",
    description: "당근을 못먹어서 기운이 없어\n기운없으니까 떡은 못 만들거 같아\n뭐? 오이? 아니, 나 귀가 잘 안들려",
  },
  "0101": {
    title: "달과 당근을 잃어버린 달토끼",
    description: "달이 없어서 그런가 막 떠나니네\n당근도 못먹어서 기운도 없고\n어쩔 수 없이 떡은 못만들거 같아",
  },
  "0100": {
    title: "달, 절구, 당근을 잃어버린 달토끼",
    description: "있잖아, 찾은거라곤 귀밖에 없는데\n그냥 떡 만들지 말자 다같이 잠이나 자자",
  },
  "0001": {
    title: "달, 당근, 귀를 잃어버린 달토끼",
    description: "절구가 있긴 한데 달이 없어서 그런가\n막 떠다니고 있잖아 떡은 못만들거 같아\n귀찮아서 그러는건 아니고",
  },
  "0010": {
    title: "귀, 당근, 절구를 잃어버린 달토끼",
    description: "아 절구만 있었으면 떡 만들었을텐데\n응? 절구 찾아주겠다고?\n아니, 아니야 그냥 놀자 우리",
  },
  "1000": {
    title: "달, 절구, 귀를 잃어버린 달토끼",
    description: "달빛도 없고 절구도 없고\n어쩔 수 없이 떡은 못만들겠다 그치?\n응? 절구 찾아주겠다고? 아니, 나 잘 안들려",
  },
} as const;

export default function Page() {
  const { rabbit = "0000" } = useParams();
  const resultText = result[rabbit];

  return (
    <>
      <div
        css={containerCss}
        style={{
          background: `#151528 url("/images/result/rabbit_${rabbit}.png") center/cover no-repeat`,
        }}
      >
        <div css={textWrapperCss}>
          <h1>{resultText.title}</h1>
          <div>{resultText.description}</div>
        </div>
      </div>

      <div css={buttons.wrapperCss}>
        <Button as="link" to="/result/card">
          새해 덕담카드 만들기
        </Button>
        <Link to={"/"} css={buttons.homeButtonCss}>
          처음으로 돌아가기
        </Link>
      </div>
    </>
  );
}

const containerCss = css`
  padding-top: 42px;
  height: 100vh;
`;

const textWrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;

  > h1 {
    font-weight: 400;
    font-size: 20px;
  }

  > div {
    padding-top: 12px;

    font-weight: 400;
    font-size: 14px;
    white-space: pre-wrap;
  }
`;

const buttons = {
  wrapperCss: css`
    position: fixed;
    bottom: 0;

    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 12px 24px 32px;

    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;

    > a {
      text-align: center;
    }
  `,

  homeButtonCss: css`
    font-size: 12px;
    color: #7d7d7d;
  `,
};