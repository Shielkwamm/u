// Export all your models here
// Please do not remove the User model, which is necessary for auth
import { User } from "./user";
import { Organization } from "./organization";
import { Product } from "./product";
import { OrganizationPlugin } from "./organizationPlugin";
import { ProductPlugin } from "./productPlugin";

// _sh_ specific
import { Proper } from "./proper";
export default [User, Proper, Organization, OrganizationPlugin, Product, ProductPlugin];
