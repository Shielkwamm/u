/**
 * I am a sample model
 * Replace me with your own
 */
import { VulcanSchema, VulcanDocument } from "@vulcanjs/schema";
import {
  buildDefaultMutationResolvers,
  buildDefaultQueryResolvers,
  createGraphqlModel,
  // VulcanGraphqlModel,
} from "@vulcanjs/graphql";
import { createMongooseConnector } from "@vulcanjs/mongo";

const schema: VulcanSchema = {
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  name: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["admins"]
  },
  description: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["admins"]
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    onCreate: () => {
      return new Date();
    },
  },
  glyphs: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["admins"]
  },
  owner: {
    type: Object,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["admins"]
  },
  teams: {
    type: Object,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["admins"]
  }
};

/*
{
  "name": "staticStatic",
  "slug": "static-static",
  "description": "StsT",
  "website": "https://github.com/staticStatic",
  "glyphs": ["🎈","🎈","🎈","🎈"],
  "owner": {
    "type": "user",
    "profile": "g@neobii"
  },
  "zones": [{
    "comm": {
      "address": "@"
    }
  }]
}

*/



export interface ProperType extends VulcanDocument {
  name: string;
  description?: string;
  glyphs: string;
}

const name = "Proper" // Change this value when creating your own model
const typeName = name
const multiTypeName = "Propers" // Change this value when creating your own model
export const Proper = createGraphqlModel({
  name: "Proper",
  schema,
  graphql: {
    typeName,
    multiTypeName,
    queryResolvers: buildDefaultQueryResolvers({ typeName }),
    mutationResolvers: buildDefaultMutationResolvers({
      typeName,
    }),
  },
  permissions: {
    canCreate: ["admin"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["guests", "admins"],
  },
});

export const ProperConnector = createMongooseConnector<ProperType>(Proper);
