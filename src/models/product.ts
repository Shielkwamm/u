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
   repo: {
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
   description: {
     type: Object,
     optional: true,
     canRead: ["guests"],
     canUpdate: ["admins"],
     canCreate: ["admins"]
   },
   bigIdea: {
     type: Object,
     optional: true,
     canRead: ['guests'],
     canUpdate: ["admins"],
     canCreate: ["admins"]
   },
   productOwner: {
     type: String,
     optional: true,
     canRead: ["guests"],
     canUpdate: ["admins"],
     canCreate: ["admins"]
   },
   leanCanvas: {
     type: Object,
     optional: true,
     canRead: ['guests'],
     canUpdate: ['admins'],
     canCreate: ['admins']
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
 
 
 
 export interface ProductType extends VulcanDocument {
   productName: string;
   productWebsite?: string;
   owner?: string;
   teams?: string;
 }
 
 const name = "Product" // Change this value when creating your own model
 const typeName = name
 const multiTypeName = "Products" // Change this value when creating your own model
 export const Product = createGraphqlModel({
   name: "Product",
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
 
 export const ProductConnector = createMongooseConnector<ProductType>(Product);
 