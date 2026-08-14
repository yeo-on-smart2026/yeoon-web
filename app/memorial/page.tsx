import { redirect } from "next/navigation";
import PageFrame from "@/components/PageFrame";
import MemorialView from "@/components/MemorialView";
import { getActiveProfile, getMessages } from "@/lib/queries";

export default async function MemorialPage() {
  const profile = await getActiveProfile();
  if (!profile) redirect("/");

  const messages = await getMessages(profile.id);

  return (
    <PageFrame>
      <MemorialView profile={profile} messages={messages} />
    </PageFrame>
  );
}
