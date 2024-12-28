import type { MetaFunction } from "@remix-run/node";
import { Fragment } from "react";
import Game from "~/components/progress/game";
import Help from "~/components/progress/help";
import Introduction from "~/components/progress/introduction";
import UserName from "~/components/progress/username";
import { usePhaseActions } from "~/utils/usePhaseActions";

export const meta: MetaFunction = () => {
  return [{ title: "토끼 구출 대작전" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Intro() {
  const { phase } = usePhaseActions();

  return (
    <Fragment>
      {phase === 0 && <Help />}
      {phase === 1 && <UserName />}
      {phase === 2 && <Introduction />}
      {phase === 3 && <Game />}
    </Fragment>
  );
}
