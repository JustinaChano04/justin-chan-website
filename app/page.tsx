import Portfolio from '@/components/Portfolio';
import { getBlogs, getExperience, getProfile, getProjects } from '@/lib/content';

export default async function Home() {
  const [profile, experience, projects, blogs] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
    getBlogs(),
  ]);

  return (
    <Portfolio
      blogs={blogs}
      experience={experience}
      profile={profile}
      projects={projects}
    />
  );
}
