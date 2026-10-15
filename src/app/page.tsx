import Portfolio from "@/components/Portfolio";
import { profile, projects, honors, news, patents } from "@/data/portfolio";

export default function HomePage() {
  return <Portfolio profile={profile} projects={projects} honors={honors} news={news} patents={patents} />;
}
