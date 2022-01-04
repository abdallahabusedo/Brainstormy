import { toast } from "react-toastify";

export const logError   = (err) => toast.error(err);
export const logSuccess = (msg) => toast.success(msg);