import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [
    { title: "System-Dict" },
    { name: "System-Dict", content: "System-Dict" },
  ];
};

export default function Page() {
  return <Route />;
}
