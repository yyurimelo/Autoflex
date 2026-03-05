import { Github } from "lucide-react";
import { Button } from "./ui/button";

export function GithubLink() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => window.open("https://github.com/yyurimelo/Autoflex", "_blank")}
    >
      <Github />
    </Button>
  );
}