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
   organizationName: {
     type: String,
     canRead: ["guests"],
     canUpdate: ["admins"],
     canCreate: ["admins"]
   },
   organizationWebsite: {
     type: String,
     optional: true,
     canRead: ["guests"],
   },
   createdAt: {
     type: Date,
     optional: true,
     canRead: ["admins"],
     onCreate: () => {
       return new Date();
     },
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
   },

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
 
 
 
 export interface OrganizationType extends VulcanDocument {
   organizationName: string;
   organizationWebsite?: string;
   owner?: string;
   teams?: string;
 }
 
 const name = "Organization" // Change this value when creating your own model
 const typeName = name
 const multiTypeName = "Organizations" // Change this value when creating your own model
 export const Organization = createGraphqlModel({
   name: "Organization",
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
 
 export const OrganizationConnector = createMongooseConnector<OrganizationType>(Organization);
 