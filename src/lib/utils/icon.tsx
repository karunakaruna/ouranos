import { FeedAlert } from "../../../types/feed";
import { HiMiniShieldExclamation } from "react-icons/hi2";
import { PiWarningCircleFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import {
  BiRepost,
  BiSolidErrorAlt,
  BiSolidHeart,
  BiSolidUserPlus,
} from "react-icons/bi";
import { IoCloudOffline } from "react-icons/io5";

export function getAlertIcon(variant: Alert) {
  switch (variant) {
    case "success":
      return <FaCircleCheck className="text-2xl" />;
    case "error":
      return <HiMiniShieldExclamation className="text-2xl" />;
    case "info":
      return <PiWarningCircleFill className="text-2xl" />;
    case "warning":
      return <PiWarningCircleFill className="text-2xl" />;
    default:
      return <PiWarningCircleFill className="text-2xl" />;
  }
}

export function getFeedAlertIcon(variant: FeedAlert) {
  switch (variant) {
    case "empty":
      return <PiWarningCircleFill className="text-2xl" />;
    case "doesNotExist":
      return <PiWarningCircleFill className="text-2xl" />;
    case "misconfigured":
      return <HiMiniShieldExclamation className="text-2xl" />;
    case "badResponse":
      return <BiSolidErrorAlt className="text-2xl" />;
    case "offline":
      return <IoCloudOffline className="text-2xl" />;
    case "blocked":
      return <HiMiniShieldExclamation className="text-2xl" />;
    default:
      return <PiWarningCircleFill className="text-2xl" />;
  }
}

export const getNotificationIcon = (reason: string) => {
  switch (reason) {
    case "like":
      return <BiSolidHeart className="text-skin-icon-like shrink-0 text-2xl" />;
    case "repost":
      return <BiRepost className="text-skin-icon-repost shrink-0 text-2xl" />;
    case "follow":
      return <BiSolidUserPlus className="text-primary shrink-0 text-2xl" />;
    default:
      return null;
  }
};
