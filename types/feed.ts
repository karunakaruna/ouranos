import {} from "@atproto/api";
import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export type SavedFeed = GeneratorView & {
  pinned: boolean;
};

export type FeedSearchResult = {
  tid: string;
  cid: string;
  user: {
    did: string;
    handle: string;
  };
  post: {
    createdAt: number;
    text: string;
    user: string; // handle
  };
};

export type FeedAlert =
  | "empty"
  | "doesNotExist"
  | "misconfigured"
  | "badResponse"
  | "offline"
  | "blocked";

export type ContentFilter = {
  type: string;
  label: string;
  visiblity: string;    
  adult: boolean;
  message: string;
};



export type FilterResult = {  
  visibility: "warn" | "hide";
  message: string;
} | null;
