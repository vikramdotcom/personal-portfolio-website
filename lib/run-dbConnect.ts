import dbConnect from "./dbConnect";

dbConnect().catch(() => process.exit(1));
