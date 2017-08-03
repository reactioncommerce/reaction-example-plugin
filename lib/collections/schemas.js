import { Accounts } from "/lib/collections";
import { Accounts as AccountsSchema } from "/lib/collections/schemas";
Accounts.attachSchema(AccountsSchema, { replace: true });
