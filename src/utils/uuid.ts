import { ulid as uuidUtil } from "ulid";

export function uuid(): string {
    return uuidUtil();
}
