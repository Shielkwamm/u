import mongoose from "mongoose";
import { debugMongo } from "~/lib/debuggers";
import { connectToDb } from "~/api/middlewares/mongoConnection";
import seedDatabase from "~/api/seed";
import { contextBase } from "~/api/context";

function runSeed() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MONGO_URI env variable is not defined");
  const isLocalMongo = mongoUri.match(/localhost/);
  // Seed in development
  // In production, we expect you to seed the database manually
  if (process.env.NODE_ENV === "development") {
    connectToDb(mongoUri, {
      serverSelectionTimeoutMS: isLocalMongo ? 3000 : undefined,
    }) // fail the seed early during development
      .then(() => {
        debugMongo("Connected to db, seeding admin and organizations");
        // TODO: what is the best pattern to seed in a serverless context?
        // We pass the default graphql context to the seed function,
        // so it can access our models
        seedDatabase(contextBase);
        // seed organizations
        const seedOrganizations = async () => {
          const db = mongoose.connection;
          const count = await db.collection("organizations").countDocuments();
          if (count === 0) {
            db.collection("organizations").insertMany([
              {
                organizationName: "Shielkwamm",
              },
              {
                organizationName: "LearnEverything",
              },
              {
                organizationName: "staticStatic",
              },
            ]);
          }
        };
        seedOrganizations();
      })
      .catch((err) => {
        console.error(
          `\nCould not connect to Mongo database on URI ${mongoUri} during seed step.`
        );
        if (isLocalMongo) {
          console.error("Did you forget to run 'yarn run start:mongo'?\n");
        }
        console.error(err);
        process.exit(1);
      });
  }
}

export default runSeed;
