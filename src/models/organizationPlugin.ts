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
     canRead: ["guests"],
     canUpdate: ["admins"],
     canCreate: ["admins"]
   },
   slug: {
     type: String,
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
 
 
 
 export interface OrganizationPluginType extends VulcanDocument {
   name: string;
   slug: string;
 }
 
 const name = "OrganizationPlugin" // Change this value when creating your own model
 const typeName = name
 const multiTypeName = "OrganizationPlugins" // Change this value when creating your own model
 export const OrganizationPlugin = createGraphqlModel({
   name: "OrganizationPlugin",
   schema,
   graphql: {
     typeName,
     multiTypeName,
     queryResolvers: buildDefaultQueryResolvers({ typeName }),
     /*mutationResolvers: buildDefaultMutationResolvers({
       typeName,
     }),*/
   },
   permissions: {
     canCreate: ["admin"],
     canUpdate: ["owners", "admins"],
     canDelete: ["owners", "admins"],
     canRead: ["guests", "admins"],
   },
 });
 
 export const OrganizationPluginConnector = createMongooseConnector<OrganizationPluginType>(OrganizationPlugin);
 