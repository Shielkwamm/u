import { getSession } from "~/api/passport/iron";
import runSeed from "~/api/runSeed";
import { OrganizationConnector } from "~/models/organization";

export default async function organizations(req, res) {
  const session = await getSession(req);
  // Get fresh data about the user
  console.log("session id", session?._id)
  const organizaiton = await OrganizationConnector.find({})
  /*const thes = session?._id
    ? await TheConnector.find({})
    : null;*/
  res.status(200).json({ organization: organizaiton || null });
}

// Seed in development if necessary
runSeed();
