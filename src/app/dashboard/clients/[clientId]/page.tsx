import ClientDetails from "./ClientDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  return <ClientDetails clientId={clientId} />;
}