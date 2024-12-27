import type { MetaFunction } from "@remix-run/node";
import { Fragment } from "react";
import Help from "~/components/intro/help";
import UserName from "~/components/intro/username";
import Introduction from "~/components/intro/introduction";
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
    </Fragment>
  );
}
